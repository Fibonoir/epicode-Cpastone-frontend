export interface LoginResponse {
    status: string
    data: {
        accessToken: string
        refreshToken: string
    }
    message: string
}