export const JWT_ACCESS_TOKEN_SERVICE = "JWT_ACCESS_TOKEN_SERVICE";
export const JWT_REFRESH_TOKEN_SERVICE = "JWT_REFRESH_TOKEN_SERVICE";
export const messages = {
    user_not_found: "Incorrect username or password"
};
export enum TokenType {
    ACCESS, REFRESH
}
export const cookieNames = {
    REFRESH_TOKEN: "x-refresh",
    ACCESS_TOKEN: "x-access"
}
export const REFRESH_TOKEN_EXPIRE_TIME = 6.048e8; // IN MILLISECOND
export const ACCESS_TOKEN_EXPIRE_TIME = 1.8e6; // IN MILLISECOND