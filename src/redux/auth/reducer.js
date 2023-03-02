import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SET_AUTH_PENDING,
    SET_AUTH_SUCCESS,
    SET_AUTH_ERROR,
    // SET_AUTHENTICATION
} from './constants';

const initialState = {
    user: {},
    // authenticated: false,
    isLoading: false,
    error: false
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_PENDING: {
            return {
                ...state,
                isLoading: true,
                error: false
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: false
            };
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true
            };
        }
        case SET_AUTH_PENDING: {
            return {
                ...state,
                isLoading: true,
                error: false
            };
        }
        case SET_AUTH_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: false
            };
        }
        case SET_AUTH_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true
            };
        }
        // case SET_AUTHENTICATION: {
        //     return {
        //         ...state,
        //         authenticated: action.payload,
        //         isLoading: false
        //     };
        // }
        default: {
            return state;
        }
    }
};