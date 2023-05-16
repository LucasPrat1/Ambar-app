import {
  DELETE_ITEM_PENDING,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
  ADD_ITEM_PENDING,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_ERROR,
  CLEAR_ITEMS_ERROR,
  CLEAR_ITEMS_PENDING,
  CLEAR_ITEMS_SUCCESS
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

export const clearItemsPending = () => ({
  type: CLEAR_ITEMS_PENDING
});

export const clearItemsSuccess = () => ({
  type: CLEAR_ITEMS_SUCCESS,
});

export const clearItemsError = () => ({
  type: CLEAR_ITEMS_ERROR
});