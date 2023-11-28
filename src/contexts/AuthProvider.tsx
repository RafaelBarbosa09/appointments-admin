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
    const location = window.location.pathname;
    const [authenticated, setAuthenticated] = useState(false);
    const [loggedUser, setLoggedUser] = useState({} as any);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const loggedUser = localStorage.getItem('loggedUser');

        if (!token && location !== '/signup') {
            setAuthenticated(false);
            setLoggedUser(null);
            navigate('/login');
            return;
        }

        setAuthenticated(true);
        setLoggedUser(JSON.parse(loggedUser!));
    }, [navigate, location]);

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