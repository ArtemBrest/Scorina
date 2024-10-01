interface UserInfo {
    active: boolean
    id: number
    role_id: number
    login: string
    displayedName: string // следующий параметр permissions: UserPermission[]
}

interface AuthStorage {
    isSignIn?: boolean
    isRefreshActivated?: boolean
    codeChallenge?: null | string
    codeVerifier?: null | string
    accessToken?: null | string
    expiresIn?: null | number
    refreshExpiresIn?: null | number
    refreshToken?: null | string
    redirectUrl?: string
    user?: UserInfo
}

interface AuthState {
    isRefreshActivated: boolean
    isLoginActivated: boolean
}
export const useAuth = createSharedComposable(() => {
    // const {VITE_AUTH_REDIRECT_URL, VITE_AUTH_STRATEGY} = import.meta.env;
    // Default Store
    const localStorageStoreDefault: AuthStorage = {
        isSignIn: false,
        codeChallenge: null,
        codeVerifier: null,
        accessToken: null,
        expiresIn: null,
        refreshExpiresIn: null,
        refreshToken: null,
        redirectUrl: '/', // Редирект после успешной авторизации и переходу на страницу /login
        user: {
            active: false,
            id: 0,
            role_id: 0,
            login: '',
            displayedName: '', // следующий параметр  permissions: [],
        },
    };

    // Strategy
    // const AuthStrategy: AuthorizationStrategy = VITE_AUTH_STRATEGY;

    const authState = ref<AuthState>({
        isRefreshActivated: false,
        isLoginActivated: false,
    });

    // Reactive LocalStorage
    const authStorage: Ref<AuthStorage> = useStorage(
        'auth',
        localStorageStoreDefault,
        localStorage,
        {
            mergeDefaults: true,
        },
    );

    const updateAuthStorage = (partialSettings: AuthStorage) => {
        authStorage.value = {
            ...authStorage.value,
            ...partialSettings,
        };
    };

    const login = async () => {
        if (unref(authState).isLoginActivated) {
            return;
        }
        authState.value.isLoginActivated = true;
        /* updateAuthStorage({
            redirectUrl: window.location.href,
        }); */

        const {codeChallenge, codeVerifier} = await pkceChallenge(128);

        updateAuthStorage({
            codeChallenge,
            codeVerifier,
            accessToken: null,
            expiresIn: null,
            refreshExpiresIn: null,
            refreshToken: null,
        });

        // const {data: result} = await Api.auth.getAuthUrl(codeChallenge, AuthStrategy, VITE_AUTH_REDIRECT_URL);
        const {data: result} = await Api.auth.getAuthUrl(codeChallenge, '/');

        if (result) {
            window.location.href = result;
        } else {
            authState.value.isLoginActivated = false;
        }
    };

    const logout = () => {
        updateAuthStorage({
            ...localStorageStoreDefault,
        });
    };

    const getUserInfo = async () => {
        const {isLoginActivated, isRefreshActivated} = unref(authState);
        // const {isSignIn} = unref(authStorage);
        const {isSignIn, accessToken} = unref(authStorage); // Добавляем токен из authStorage

        // if (isLoginActivated || isRefreshActivated || !isSignIn) {
        if (isLoginActivated || isRefreshActivated || !isSignIn || !accessToken) {
            return;
        }

        const {data: info} = await Api.auth.getUserInfo();

        if (info) {
            /* const {
                active, userInfo, displayedName, permissions,
            } = info; */
            const {
                active, userInfo, displayedName,
            } = info;

            const user: UserInfo = {
                active,
                id: userInfo.id,
                role_id: userInfo.role_id,
                login: userInfo.login,
                displayedName, // следующий параметр  permissions,
            };

            updateAuthStorage({
                isSignIn: true,
                user,
            });

            return user;
        }

        updateAuthStorage({
            isSignIn: false,
        });
    };

    const getAuthTokens = async (code: string, email: string, password: string) => {
        // const {data: result} = await Api.auth.getAuthTokens(code, email, password, unref(authStorage).codeVerifier || '', unref(authStorage).refreshToken || '', AuthStrategy);
        const {data: result} = await Api.auth.getAuthTokens(code, email, password, unref(authStorage).codeVerifier || '', unref(authStorage).refreshToken || '');

        if (result) {
            const {
                access_token: accessToken,
                expires_in: expiresIn,
                refresh_token: refreshToken,
                refresh_expires_in: refreshExpiresIn,
            } = result;

            updateAuthStorage({
                isSignIn: true,
                accessToken,
                expiresIn,
                refreshToken,
                refreshExpiresIn,
            });
        } else {
            updateAuthStorage({
                isSignIn: false,
            });
        }
    };

    const refreshAuth = async (): Promise<boolean> => {
        authState.value.isRefreshActivated = true;

        // const {data: result} = await Api.auth.refreshTokens(unref(authStorage).refreshToken || '', AuthStrategy);
        const {data: result} = await Api.auth.refreshTokens(unref(authStorage).refreshToken || '');

        if (result) {
            const {
                access_token: accessToken,
                expires_in: expiresIn,
                refresh_token: refreshToken,
                refresh_expires_in: refreshExpiresIn,
            } = result;

            updateAuthStorage({
                isSignIn: true,
                accessToken,
                expiresIn,
                refreshToken,
                refreshExpiresIn,
            });

            authState.value.isRefreshActivated = false;

            return true;
        }

        updateAuthStorage({
            isSignIn: false,
        });

        await login();

        return false;
    };

    return {
        // Storage
        authStorage,

        // State
        authState,

        // Methods
        updateAuthStorage,
        login,
        logout,
        getAuthTokens,
        refreshAuth,
        getUserInfo,
    };
});
