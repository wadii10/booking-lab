export interface UserSignup {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?:string,
    role?:string,
}

export interface UserLogin {
    email?: string,
    password?: string,
}