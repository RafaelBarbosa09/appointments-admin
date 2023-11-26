import ROLE from "./Role";

export interface Authentication {
    login: string;
    password: string;
}

export interface LoggedUserRequest {
    login: string;
}

export interface RegisterAccountRequest {
    login: string;
    password: string;
    role: ROLE;
}