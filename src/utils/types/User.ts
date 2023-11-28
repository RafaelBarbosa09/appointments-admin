import ROLE from "./Role";

export interface User {
    login: string;
    password: string;
    role: ROLE;
}