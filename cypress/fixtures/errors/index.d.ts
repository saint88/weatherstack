export type ErrorType = {
    success: boolean,
    error: {
        code: number,
        type: string,
        info: string
    }
}