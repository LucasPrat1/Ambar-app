import {
    LOGIN_SUCCESS,
    LOGIN_PENDING,
    LOGIN_ERROR,
    // SET_AUTHENTICATION,
    SET_AUTH_SUCCESS,
    SET_AUTH_PENDING,
    SET_AUTH_ERROR
} from './constants';

export const loginPending = () => {
    return {
        type: LOGIN_PENDING
    };
};

export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
};

export const loginError = () => {
    return {
        type: LOGIN_ERROR,
    };
};

// export const setAuthentication = (user) => {
//     return {
//         type: SET_AUTHENTICATION,
//         payload: user
//     };
// };

export const setAuthenticationPending = () => {
    return {
        type: SET_AUTH_PENDING
    };
};

export const setAuthenticationSuccess = (data) => {
    return {
        type: SET_AUTH_SUCCESS,
        payload: data
    };
};

export const setAuthenticationError = () => {
    return {
        type: SET_AUTH_ERROR,
    };
};