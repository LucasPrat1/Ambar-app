import {
  getOrdersError,
  getOrdersPending,
  getOrdersSuccess,
  getOrderIdSuccess,
  deleteOrderError,
  deleteOrderPending,
  deleteOrderSuccess,
  addOrderError,
  addOrderPending,
  addOrderSuccess,
  editOrderError,
  editOrderPending,
  editOrderSuccess
} from './actions';

export const getOrders = () => {
  return async (dispatch) => {
    dispatch(getOrdersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`);
      const res = await response.json();
      dispatch(getOrdersSuccess(res.data));
      return { error: false, message: res.message, data: res.data };
    } catch (error) {
      dispatch(getOrdersError());
      return { error: true, message: error.toString() }
    }
  };
};

export const getOrdersId = (id) => {
  return async (dispatch) => {
    dispatch(getOrdersPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`);
      const res = await response.json();
      dispatch(getOrderIdSuccess());
      return { error: false, message: res.message, data: res.data };
    } catch (error) {
      dispatch(getOrdersError());
      return { error: true, message: error.toString() };
    }
  };
};

export const addOrder = (order) => {
  return async (dispatch) => {
    dispatch(addOrderPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          user: order.user,
          deliveryOptions: order.deliveryOptions,
          deliveryAddress: order.deliveryAddress,
          isDelivered: order.isDelivered,
          paymentOptions: order.paymentOptions,
          isPaid: order.isPaid,
          total: order.total,
          items: order.items,
        })
      });
      const res = await response.json();
      dispatch(addOrderSuccess(res.data));
      return { error: false, message: res.message, data: res.data };
    } catch (error) {
      dispatch(addOrderError());
      return { error: true, message: error.toString() };
    }
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    dispatch(deleteOrderPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteOrderSuccess(id));
      return { error: false, message: "deleted successfully" };
    } catch (error) {
      dispatch(deleteOrderError(error.toString()));
      return { error: true, message: error.toString() };
    }
  };
};

export const editOrder = (order, _id) => {
  return async (dispatch) => {
    dispatch(editOrderPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/orders/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          user: order.user,
          deliveryOptions: order.deliveryOptions,
          deliveryAddress: order.deliveryAddress,
          isDelivered: order.isDelivered,
          paymentOptions: order.paymentOptions,
          isPaid: order.isPaid,
          total: order.total,
          items: order.items,
        })
      });
      const res = await response.json();
      dispatch(editOrderSuccess(res.data));
      return { error: false, message: res.message, data: res.data };
    } catch (error) {
      dispatch(editOrderError(error));
      return { error: true, message: error.toString() };
    }
  };
};
