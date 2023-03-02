import {
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTID_SUCCESS,
  GET_PRODUCTS_ERROR,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  EDIT_PRODUCT_PENDING,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
} from './constants';

const initialState = {
  list: [],
  product: {},
  isLoading: false,
  error: false
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
      case GET_PRODUCTID_SUCCESS:
        return {
          ...state,
          product: action.payload,
          isLoading: false
        };
    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: false
      };
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          }
          return p;
        })
      };
    case EDIT_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_PRODUCT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((p) => p._id !== action.payload),
        isLoading: false
      };
    case DELETE_PRODUCT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    default: {
      return state;
    }
  }
};
