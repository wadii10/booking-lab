export interface UserSignup {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?:string,
}

export interface UserLogin {
    email?: string,
    password?: string,
}

export interface UserProfile {
    id?:number;
    firstName?: string,
    lastName?: string,
    email?: string,
}