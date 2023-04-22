import {
  getProductsPending,
  getProductsSuccess,
  getProductIdSuccess,
  getProductsError,
  deleteProductPending,
  deleteProductSuccess,
  deleteProductError,
  addProductPending,
  addProductSuccess,
  addProductError,
  editProductPending,
  editProductSuccess,
  editProductError
} from './actions';

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(getProductsPending());
    try {
      // const response = await fetch(`https://fakestoreapi.com/products`);
      const response = await fetch(`http://localhost:5000/api/products`);
      const res = await response.json();
      dispatch(getProductsSuccess(res.data));
      return res.data;
    } catch (error) {
      dispatch(getProductsError(error.toString()));
    }
  };
};

export const getProductsId = (id) => {
  return async (dispatch) => {
    dispatch(getProductsPending());
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const res = await response.json();
      dispatch(getProductIdSuccess(res));
      return res;
    } catch (error) {
      dispatch(getProductsError(error.toString()));
    }
  };
};

export const addProduct = (product) => {
  return async (dispatch) => {
    dispatch(addProductPending());
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          product
        })
      });
      const res = await response.json();
      dispatch(addProductSuccess(res));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(addProductError(error.toString()));
      return { error: true, message: error };
    }
  };
};
export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(deleteProductPending());
    try {
      await fetch(`http://localhost:5000/api/products${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteProductSuccess(id));
      return {
        error: false
      };
    } catch (error) {
      dispatch(deleteProductError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    dispatch(editProductPending());
    try {
      const response = await fetch(`http://localhost:5000/api/products${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          product
        })
      });
      const res = await response.json();
      dispatch(editProductSuccess(res));
      return { error: false, message: res.message };
    } catch (error) {
      dispatch(editProductError(error.toString()));
      return { error: true, message: error };
    }
  };
};
