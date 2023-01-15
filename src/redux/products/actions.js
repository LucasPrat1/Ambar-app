import {
  GET_PRODUCTS_ERROR,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTID_SUCCESS,
  ADD_PRODUCT_ERROR,
  ADD_PRODUCT_PENDING,
  ADD_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  EDIT_PRODUCT_PENDING,
  EDIT_PRODUCT_SUCCESS
} from './constants';

export const getProductsPending = () => {
  return {
    type: GET_PRODUCTS_PENDING
  };
};
export const getProductsSuccess = (data) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: data
  };
};
export const getProductIdSuccess = (data) => {
  return {
    type: GET_PRODUCTID_SUCCESS,
    payload: data
  };
};
export const getProductsError = () => {
  return {
    type: GET_PRODUCTS_ERROR
  };
};

export const deleteProductPending = () => ({
  type: DELETE_PRODUCT_PENDING
});

export const deleteProductSuccess = (itemId) => ({
  type: DELETE_PRODUCT_SUCCESS,
  payload: itemId
});

export const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR
});

export const addProductPending = () => ({
  type: ADD_PRODUCT_PENDING
});

export const addProductSuccess = (item) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: item
});

export const addProductError = () => ({
  type: ADD_PRODUCT_ERROR
});

export const editProductPending = () => ({
  type: EDIT_PRODUCT_PENDING
});

export const editProductSuccess = (item) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: item
});

export const editProductError = () => ({
  type: EDIT_PRODUCT_ERROR
});
