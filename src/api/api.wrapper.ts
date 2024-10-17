import {type UseFetchReturn, createFetch} from '@vueuse/core';
import {
    FetchCombination,
    RequestMode,
    RequestType,
    StatusCode,
} from '~/api/types';
import {wait} from '~/utils';

const {VITE_BACKEND_HOST, VITE_BACKEND_PORT} = import.meta.env;
const DEFAULT_SSL_PORT = 443;

export const useCustomFetch = createFetch({
    baseUrl: `http${Number(VITE_BACKEND_PORT) === DEFAULT_SSL_PORT ? 's' : ''}://${VITE_BACKEND_HOST}:${VITE_BACKEND_PORT}`,
    combination: FetchCombination.CHAIN,
    options: {
        async beforeFetch({options}) {
            const {authStorage} = useAuth();
            const {accessToken} = unref(authStorage);

            options.headers = {
                ...options.headers,
                // Authorization: `${accessToken}`, // X-Authorization
                Authorization: `Bearer ${accessToken}`,
            };

            return {
                options,
            };
        },
        onFetchError(ctx) {
            if (ctx.data) {
                ctx.error = ctx.data;
            }

            return ctx;
        },
    },
    fetchOptions: {
        mode: RequestMode.CORS,
    },
});

const request = async (type: RequestType, url: string, formData?: FormData | object) => {
    // Уникальный флаг для каждого запроса, когда после 401, ожидаем токен рефреша
    let isWaitForRefreshToken = false;

    // Кэшируем запрос для повторных вызовов
    let executeRequest: () => Promise<UseFetchReturn<any>>;

    switch (type) {
        case RequestType.POST:
            executeRequest = async () => useCustomFetch(url).post(formData).json();
            break;
        case RequestType.PATCH:
            executeRequest = async () => useCustomFetch(url).patch(formData).json();
            break;
        case RequestType.PUT:
            executeRequest = async () => useCustomFetch(url).put(formData).json();
            break;
        case RequestType.DELETE:
            executeRequest = async () => useCustomFetch(url).delete(formData).json();
            break;
        default:
            executeRequest = async () => useCustomFetch(url).get().json();
    }

    const {
        authStorage,
        authState,
        login,
        refreshAuth,
    } = useAuth();

    const {statusCode, data, error} = await executeRequest();

    const checkAccessAndRetry = async () => {
        const {accessToken, refreshToken} = unref(authStorage);

        if (accessToken && refreshToken) {
            if (unref(statusCode) === StatusCode.UNAUTHORIZED) {
                if (unref(authState).isRefreshActivated) {
                    isWaitForRefreshToken = true;
                    await wait(10);
                    await checkAccessAndRetry();
                } else {
                    const isSuccess = isWaitForRefreshToken ? true : await refreshAuth();

                    if (isSuccess) {
                        const {statusCode: sc, data: nData, error: nError} = await executeRequest();

                        if (nData && unref(sc) === StatusCode.OK) {
                            return {
                                data: unref(nData)?.data || unref(nData),
                                error: unref(nError),
                                statusCode: unref(sc),
                            };
                        }
                    }
                }
            }
        }

        if (!accessToken && unref(statusCode) === StatusCode.UNAUTHORIZED) {
            await login();
        }
    };
    const result = await checkAccessAndRetry();

    return {
        data: result || unref(data)?.data || unref(data),
        error: unref(error),
        statusCode: result?.statusCode || unref(statusCode),
    };
};

const getRequest = async (url: string, formData?: FormData | object) => request(RequestType.GET, url, formData);
const postRequest = async (url: string, formData?: FormData | object) => request(RequestType.POST, url, formData);
const patchRequest = async (url: string, formData?: FormData | object) => request(RequestType.PATCH, url, formData);
const putRequest = async (url: string, formData?: FormData | object) => request(RequestType.PUT, url, formData);
const deleteRequest = async (url: string, formData?: FormData | object) => request(RequestType.DELETE, url, formData);

export const apiWrapper = {
    get: getRequest,
    post: postRequest,
    patch: patchRequest,
    put: putRequest,
    delete: deleteRequest,
};
