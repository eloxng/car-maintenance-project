import React, {useEffect} from 'react';

const LoginValidater = ({username, password}) => {
    // Input requirements
    if(username.length === 0 && password.length === 0)
        return <div className='font-bold text-red-500'>Username and password required</div>
    if(username.length === 0)
        return <div className='font-bold text-red-500'>Username required</div>
    if(password.length === 0)
        return <div className='font-bold text-red-500'>Password required</div>
    /* 
        Set login status if uid is retrieved from db
            if(uid === undefined || uid === null)
                setIsLoggedIn(0);
            else
                setIsLoggedIn(1);
    */
}

export default LoginValidater;