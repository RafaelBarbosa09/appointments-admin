import { Authentication } from "../utils/types/Authentication";
import api from "./api";

export const login = async (credentials: Authentication) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};