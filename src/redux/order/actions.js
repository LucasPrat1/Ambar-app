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

export const getOrdersPending = () => {
  return {
    type: GET_ORDERS_PENDING
  };
};
export const getOrdersSuccess = (data) => {
  return {
    type: GET_ORDERS_SUCCESS,
    payload: data
  };
};
export const getOrderIdSuccess = (data) => {
  return {
    type: GET_ORDERID_SUCCESS,
    payload: data
  };
};
export const getOrdersError = () => {
  return {
    type: GET_ORDERS_ERROR
  };
};

export const deleteOrderPending = () => ({
  type: DELETE_ORDER_PENDING
});

export const deleteOrderSuccess = (orderId) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: orderId
});

export const deleteOrderError = () => ({
  type: DELETE_ORDER_ERROR
});

export const addOrderPending = () => ({
  type: ADD_ORDER_PENDING
});

export const addOrderSuccess = (order) => ({
  type: ADD_ORDER_SUCCESS,
  payload: order
});

export const addOrderError = () => ({
  type: ADD_ORDER_ERROR
});

export const editOrderPending = () => ({
  type: EDIT_ORDER_PENDING
});

export const editOrderSuccess = (order) => ({
  type: EDIT_ORDER_SUCCESS,
  payload: order
});

export const editOrderError = () => ({
  type: EDIT_ORDER_ERROR
});
