const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const uuidv4 = require('uuid').v4
const cookieParser = require('cookie-parser');
const port = 9007;
// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Connect to cmpdb.db
const db = new sqlite3.Database('cmpdb.db');


// Login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) 
        return res.status(401).json({ error: 'Username and password are required' });

    db.all('SELECT u_id FROM users WHERE username = (?) AND password = (?);', [username, password], (err, rows) => {
        const [ u_id ]  = rows.map(row => row.u_id);
        const session_id = uuidv4();
        if(err || u_id === null || u_id === undefined) {
            return res.status(401).json({error: "Not a valid user-pass combo."})
        }
        else {
            // Store u_id and session_id into LoginSessions
            db.run('INSERT INTO usersessions (u_id, session_id) VALUES (?, ?)', [u_id, session_id], 
                (err) => {
                    if(err)
                        return res.status(500).json({error: "User not added into usersessions"});
            })
            res.set('Set-Cookie', `session=${session_id}; Path=/; HttpOnly; SameSite=Strict; Secure;`);
            return res.status(200).json({mesage: "Successful login", u_id: `${u_id}`, session: `${session_id}`})
        }
    })
})

// Logout
app.post('/logout', (req, res) => {
    const sessionId = req.cookies.session;
    db.run('DELETE from usersessions WHERE session_id = ?;', [sessionId], 
        (err) => {
            if(err) 
                return res.status(500).json({message: "Logout error", error: err.message});
    })
    res.set('Set-Cookie', `session=null; Path=/; HttpOnly; SameSite=Strict; Secure;`);
    return res.status(200).json({message: "Successful logout", session: `${sessionId}`});
})

// Create Account
app.post('/create-account', (req, res) => {
    const { username, password, confPassword } = req.body;
    if (!username || !password || !confPassword) 
        return res.status(401).json({ error: 'All inputs needed for account creation' });

    const query = `INSERT INTO users (username, password) VALUES (?, ?);`
    db.run(query, [username, confPassword], 
        (err) => {
            if(err) 
                return res.status(400).json({message: "User not added", error: err.message});
            else
                return res.status(200).json({message: `User ${username} with password ${confPassword} inserted!`});
    })
})

// Get all Vehicles
app.get('/get-vehicles', (req, res) => {
    const sessionId = req.cookies.session;
    const query1 = `SELECT u_id FROM usersessions WHERE session_id = '${sessionId}';`;
    db.all(query1, [], (err, rows) => {
        if(err)
            return res.status(400).json({message: err.message, session: `${sessionId}`});
        else{
            const [ u_id ]  = rows.map(row => row.u_id);
            const query2 = `SELECT * FROM vehicles where u_id = ${u_id};`
            db.all(query2, [], (err, rows) => {
                if (err) 
                    return res.status(400).json({message: `Vehicle query for session ${sessionId} error`, error: err.message});
                else
                    return res.json({message: `Vehicle query for session ${sessionId} success`, data: rows});
            });

        }
    })
    
});

// Get all logs for all vehicles
app.get('/api/getlogs', (req, res) => {
    db.all('SELECT * FROM log', [], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    })
})

// Get logs based on vehicle id
app.get('/get-logs-by-id/:v_id', (req, res) => {
    let vehicleid = req.params['v_id'];
    db.all('SELECT l.v_id, l.l_id, l.odoreading, l.odounits, l.date, l.mdesc FROM log l INNER JOIN vehicles v ON l.v_id = v.v_id WHERE v.v_id = ?;', [vehicleid], (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    })
})



// Add vehicles into db 
app.post('/add-vehicles', (req, res) => {
    const sessionId = req.cookies.session;
    const { year, make, model, licensePlate } = req.body;
    const query = `SELECT u_id FROM usersessions WHERE session_id = '${sessionId}';`;
    db.all(query, [], 
            (err, rows) => {
                if(err)
                    return res.status(500).json({error: err.message });
                else {
                    const [ u_id ]  = rows.map(row => row.u_id);
                    //console.log("User ID add vehicle", u_id);
                    const query2 = `INSERT INTO vehicles (u_id, year, make, model, lplate) VALUES (${u_id}, ?, UPPER(?), UPPER(?), UPPER(?));`
                    //console.log(query2);
                    // insert data into the vehicles table
                    db.run(query2, [year, make, model, licensePlate],
                    function(err){
                        if(err) {
                            return res.status(500).json({error: err.message });
                        }
                        return res.json({message: "Vehicle added", id: this.lastID });
                    });
                }
            })

});

// Add maintenance log into db
app.post('/add-log', (req, res) => {
    const { VID, odoReading, odoUnits, date, desc } = req.body;
    // insert into log db
    db.run('INSERT INTO log (v_id, odoreading, odounits, date, mdesc) VALUES (?, ?, ?, ?, ?)',
            [VID, odoReading, odoUnits, date, desc],
            function(err){
                if(err){
                    return res.status(500).json({error: err.message})
                }
                res.json({mesage: "Logged maintenance", id: this.lastID});
            });
});

// Wipe Maintenance Logs
app.delete('/remove-logs-per-uid', (req, res) => {
    const sessionId = req.cookies.session;
    const query1 = `SELECT u_id FROM usersessions WHERE session_id = '${sessionId}';`;
    db.all(query1, [], (err, rows) => {
        if(err)
            return res.status(500).json({ message: `Error with session ID ${sessionId} removing logs`, error: err.message });
        else{
            const [ u_id ] = rows.map(row => row.u_id);
            const query2 = `DELETE FROM log WHERE v_id IN (SELECT v_id FROM vehicles WHERE u_id = ${u_id});`;
            db.run(query2, (err) => {
                if (err) {
                    return res.status(500).json({ message: `Error deleting logs for ${u_id}`, error: err.message });
                }
                return res.status(200).json({ message: `All logs deleted successfully for ${u_id}`, session: `${sessionId}` });
            });
        }  
    })

}) 

// Wipe Vehicles
app.delete('/remove-vehicles-per-uid', (req, res) => {
    const sessionId = req.cookies.session;
    const query1 = `SELECT u_id FROM usersessions WHERE session_id = '${sessionId}';`;
    db.all(query1, [], (err, rows) => {
        if(err)
            return res.status(500).json({ message: `Error with session ID ${sessionId} removing vehicles`, error: err.message });
        else {
            const [ u_id ] = rows.map(row => row.u_id);
            const query2 = `DELETE FROM vehicles WHERE u_id = ${u_id};`;
            db.run(query2, (err) => {
                if (err) {
                    return res.status(500).json({ message: `Error deleting vehicles from ${u_id}`, error: err.message });
                }
                return res.status(200).json({ message: `All vehicles deleted successfully from ${u_id}`, session: `${sessionId}` });
            });
        }
    });
}) 



// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});