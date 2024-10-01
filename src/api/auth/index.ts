import {apiWrapper} from '~/api/api.wrapper';
import type {ApiResponsePromise} from '~/api/types';
import type {GetAuthTokensResponse, GetUserInfoResponse} from '~/api/auth/types';

export const getAuthUrl = async (codeChallenge: string, redirectUrl: string): ApiResponsePromise<string> => apiWrapper.post('/api/v1/auth/getAuthUrl', {
    code_challenge: codeChallenge,
    // client_id: clientId,
    redirect_uri: redirectUrl,
});

export const getAuthTokens = async (code: string, email: string, password: string, codeVerifier: string, refreshToken: string): ApiResponsePromise<GetAuthTokensResponse> => apiWrapper.post('/api/v1/auth/getAuthTokens', {
    code,
    email,
    password,
    code_verifier: codeVerifier,
    refresh_token: refreshToken,
    // client_id: clientId,
});

export const refreshTokens = async (refreshToken: string): ApiResponsePromise<GetAuthTokensResponse> => apiWrapper.post('/api/v1/auth/getAuthTokens', {
    refresh_token: refreshToken,
    // client_id: clientId,
});

export const getUserInfo = async (): ApiResponsePromise<GetUserInfoResponse> => apiWrapper.post('/api/v1/auth/getUserInfo');
