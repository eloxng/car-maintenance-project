import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        // Retrieve the stored user data from local storage
        const savedAuth = localStorage.getItem('auth');
        return savedAuth ? JSON.parse(savedAuth) : null;
    });

    useEffect(() => {
        // Store the auth state in local storage whenever it changes
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    const logout = () => {
        setAuth(null); // Clear the auth state
    };

    return (
        <AuthContext.Provider value={{auth, setAuth, logout}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext;