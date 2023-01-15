import {
  DELETE_ITEM_PENDING,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
  ADD_ITEM_PENDING,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_ERROR,
} from './constants';

export const deleteItemPending = () => ({
  type: DELETE_ITEM_PENDING
});

export const deleteItemSuccess = (itemId) => ({
  type: DELETE_ITEM_SUCCESS,
  payload: itemId
});

export const deleteItemError = () => ({
  type: DELETE_ITEM_ERROR
});

export const addItemPending = () => ({
  type: ADD_ITEM_PENDING
});

export const addItemSuccess = (item) => ({
  type: ADD_ITEM_SUCCESS,
  payload: item
});

export const addItemError = () => ({
  type: ADD_ITEM_ERROR
});
