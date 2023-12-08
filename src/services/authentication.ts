import { Authentication, RegisterAccountRequest } from "../utils/types/Authentication";
import api from "./api";

export const login = async (credentials: Authentication) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        console.log(error);
    }

    return null;
};

export const register = async (credentials: RegisterAccountRequest) => {
    const response = await api.post('/auth/register', credentials);
    return response.data;
}