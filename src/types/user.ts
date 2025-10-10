export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}
export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}