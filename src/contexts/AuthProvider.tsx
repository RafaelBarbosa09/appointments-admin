import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextData {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    loggedUser: any; //será refatorado
    setLoggedUser: React.Dispatch<React.SetStateAction<any>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const [loggedUser, setLoggedUser] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedUser = localStorage.getItem('loggedUser');

        if (!token) {
            setAuthenticated(false);
            setLoggedUser('');
            navigate('/login');
            return;
        }

        setAuthenticated(true);
        setLoggedUser(loggedUser!);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{
            authenticated,
            setAuthenticated,
            loggedUser,
            setLoggedUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};