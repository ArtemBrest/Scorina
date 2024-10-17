export enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    FILE_TOO_LARGE = 413,
}

export enum StatusType {
    HIDDEN = 'hidden',
    PUBLISHED = 'published'
}

export enum FetchCombination {
    OVERWRITE = 'overwrite',
    CHAIN = 'chain'
}

export enum RequestMode {
    CORS = 'cors',
    NAVIGATE = 'navigate',
    NO_CORS = 'no-cors',
    SAME_ORIGIN = 'same-origin',
}

export enum RequestType {
    GET = 'get',
    POST = 'post',
    PATCH = 'patch',
    PUT = 'put',
    DELETE = 'delete'
}

export interface ApiError {
    code: number
    msg: string
    errors?: Record<string, string[]>
}

export interface ApiResponse<T> {
    data?: T
    error: ApiError
    statusCode: StatusCode | null
}

export type ApiResponsePromise<T = undefined> = Promise<ApiResponse<T>>
