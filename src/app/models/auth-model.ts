export interface LoginPayload {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export type UserFormData = Omit<LoginPayload, "returnSecureToken">;

export interface AuthResponse {
    idToken: string;
    expiresIn: string; // in seconds
}
