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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`);
      const res = await response.json();
      dispatch(getProductsSuccess(res.data));
      return { error: false, message: res.message, data: res.data};
    } catch (error) {
      dispatch(getProductsError());
      return { error: true, message: error.toString() };
    }
  };
};

export const getProductsId = (id) => {
  return async (dispatch) => {
    dispatch(getProductsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}`);
      const res = await response.json();
      dispatch(getProductIdSuccess(res.data));
      return { error: false, message: res.message, data: res.data};
    } catch (error) {
      dispatch(getProductsError());
      return { error: true, message: error.toString() };
    }
  };
};

export const addProduct = (productData) => {
  return async (dispatch) => {
    dispatch(addProductPending());
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('brand', productData.brand);
      formData.append('category', productData.category);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('rating', productData.rating);
      formData.append('image', productData.image[0]);
      formData.append('status', true);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        method: 'POST',
        body: formData
      });
      const res = await response.json();
      dispatch(addProductSuccess(res.data));
      return { error: false, message: res.message , data: res.data};
    } catch (error) {
      dispatch(addProductError(error.toString()));
      return { error: true, message: error };
    }
  };
};

export const editProduct = (productData, _id) => {
  return async (dispatch) => {
    dispatch(editProductPending());
    try {
      console.log('productData en thunk', productData)
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('brand', productData.brand);
      formData.append('category', productData.category);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('rating', productData.rating);
      formData.append('status', productData.status);
      productData.image.length > 0 && formData.append('image', productData.image[0]);

      console.log('formData finished en thunk', formData.toString())

      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${_id}`, {
        method: 'PUT',
        body: formData
      });
      const res = await response.json();
      dispatch(editProductSuccess(res.data));
      return { error: false, message: res.message , data: res.data};
    } catch (error) {
      dispatch(editProductError());
      return { error: true, message: error.toString() };
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(deleteProductPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/products${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteProductSuccess(id));
      return { error: false };
    } catch (error) {
      dispatch(deleteProductError());
      return { error: true, message: error.toString() };
    }
  };
};
