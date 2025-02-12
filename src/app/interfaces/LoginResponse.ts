export interface LoginResponse {
    status: string
    data: {
        token: string
    }
    message: string
}