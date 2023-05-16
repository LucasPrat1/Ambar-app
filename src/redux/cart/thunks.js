import {
  deleteItemPending,
  deleteItemSuccess,
  deleteItemError,
  addItemPending,
  addItemSuccess,
  addItemError,
  clearItemsError,
  clearItemsPending,
  clearItemsSuccess
} from './actions';

export const addItem = (item) => {
  return async (dispatch) => {
    dispatch(addItemPending());
    try {
      dispatch(addItemSuccess(item));
      return { error: false, message: "item successfully added" };
    } catch (error) {
      dispatch(addItemError());
      return { error: true, message: error.toString() };
    }
  };
};

export const deleteItem = (itemId) => {
  return async (dispatch) => {
    dispatch(deleteItemPending());
    try {
      dispatch(deleteItemSuccess(itemId));
      return {
        error: false,
        message: "item deleted successfully"
      };
    } catch (error) {
      dispatch(deleteItemError());
      return {
        error: true,
        message: error.toString()
      };
    }
  };
};

export const clearItems = () => {
  return async (dispatch) => {
    dispatch(clearItemsPending());
    try {
      dispatch(clearItemsSuccess());
      return { error: false, message: "Cart successfully clear" };
    } catch (error) {
      dispatch(clearItemsError());
      return { error: true, message: error.toString() };
    }
  };
};
