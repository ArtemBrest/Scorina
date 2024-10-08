export enum TokenType {
    BEARER = 'bearer'
}

/* export enum AuthorizationStrategy {
    LOCAL = 'CMSCasinoOauthLocal',
    PROD = 'CMSCasinoOauthProd',
} */
export interface GetAuthTokensResponse {
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    state: string
    token_type: TokenType
}

/* export enum PermissionCode {
    CMSCasino_Games_Miniatures = '.CMSCasino_Games_Miniatures'
} */

/* export interface UserPermission {
    code: PermissionCode
} */

export interface GetUserInfoResponse {
    active: true // следующий параметр client_id: AuthorizationStrategy
    displayedName: string
    exp: number // следующий параметр permissions: UserPermission[]
    reason: number
    reasonText: string
    status: number
    statusText: string
    userInfo: {
        id: number
        role_id: number
        login: string
    }
    username: string
}
