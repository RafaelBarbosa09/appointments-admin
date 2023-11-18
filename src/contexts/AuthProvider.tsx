import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextData {
    authenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setAuthenticated(false);
            navigate('/login');
            return;
        }

        setAuthenticated(true);
    }, [navigate]);

    return (
        <AuthContext.Provider value={{
            authenticated,
            setAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};