import {
  GET_ORDERS_ERROR,
  GET_ORDERS_PENDING,
  GET_ORDERS_SUCCESS,
  GET_ORDERID_SUCCESS,
  ADD_ORDER_ERROR,
  ADD_ORDER_PENDING,
  ADD_ORDER_SUCCESS,
  DELETE_ORDER_ERROR,
  DELETE_ORDER_PENDING,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_ERROR,
  EDIT_ORDER_PENDING,
  EDIT_ORDER_SUCCESS
} from './constants';

const initialState = {
  list: [],
  order: {},
  isLoading: false,
  error: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: false
      };
    case GET_ORDERID_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        error: false
      };
    case GET_ORDERS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case ADD_ORDER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        error: false
      };
    case ADD_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case EDIT_ORDER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: state.list.map((p) => {
          if (p._id === action.payload._id) {
            return action.payload;
          }
          return p;
        })
      };
    case EDIT_ORDER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_ORDER_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        list: state.list.filter((p) => p._id !== action.payload),
        isLoading: false,
        error: false
      };
    case DELETE_ORDER_ERROR:
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
