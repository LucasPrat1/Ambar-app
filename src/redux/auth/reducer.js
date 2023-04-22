import {
    LOGIN_PENDING,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    SET_AUTH_PENDING,
    SET_AUTH_SUCCESS,
    SET_AUTH_ERROR,
    ADD_USER_PENDING,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    CLEAN_USER
} from './constants';

const initialState = {
    token: '',
    user: {},
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
                token: action.payload,
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
        case ADD_USER_PENDING: {
            return {
                ...state,
                isLoading: true,
                error: false
            };
        }
        case ADD_USER_SUCCESS: {
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                error: false
            };
        }
        case ADD_USER_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: true
            };
        }
        case CLEAN_USER: {
            return {
                ...state,
                token: '',
                user: {},
                isLoading: false,
                error: false
            };
        }

        default: {
            return state;
        }
    }
};