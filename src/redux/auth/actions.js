import {
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGIN_ERROR,
    SET_AUTH_SUCCESS,
    SET_AUTH_PENDING,
    SET_AUTH_ERROR,
    ADD_USER_SUCCESS,
    ADD_USER_PENDING,
    ADD_USER_ERROR,
    CLEAN_USER
} from './constants';

export const loginPending = () => {
    return {
        type: LOGIN_PENDING
    };
};

export const loginSuccess = (token) => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    };
};

export const loginError = () => {
    return {
        type: LOGIN_ERROR,
    };
};

export const setAuthenticationPending = () => {
    return {
        type: SET_AUTH_PENDING
    };
};

export const setAuthenticationSuccess = (user) => {
    return {
        type: SET_AUTH_SUCCESS,
        payload: user
    };
};

export const setAuthenticationError = () => {
    return {
        type: SET_AUTH_ERROR,
    };
};

export const addUserPending = () => {
    return {
        type: ADD_USER_PENDING
    };
};

export const addUserSuccess = (data) => {
    return {
        type: ADD_USER_SUCCESS,
        payload: data
    };
};

export const addUserError = () => {
    return {
        type: ADD_USER_ERROR,
    };
};

export const cleanUser = () => {
    return {
        type: CLEAN_USER,
    };
};