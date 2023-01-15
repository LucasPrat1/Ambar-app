import {
  // getItemsPending,
  // getItemsSuccess,
  // getItemsError,
  deleteItemPending,
  deleteItemSuccess,
  deleteItemError,
  addItemPending,
  addItemSuccess,
  addItemError,
} from './actions';

// export const getItems = () => {
//   return async (dispatch) => {
//     dispatch(getItemsPending());
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`);
//       const res = await response.json();
//       dispatch(getItemsSuccess(res.data));
//       return response.data;
//     } catch (error) {
//       dispatch(getItemsError(error.toString()));
//     }
//   };
// };

export const addItem = (item) => {
  return async (dispatch) => {
    dispatch(addItemPending());
    try {
      // const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     project_name: project.project_name,
      //     client: project.client,
      //     start_date: project.start_date,
      //     finish_date: project.finish_date,
      //     active: true,
      //     employees
      //   })
      // });
      // const res = await response.json();
      dispatch(addItemSuccess(item));
      return { error: false, message: "item added successfully" };
    } catch (error) {
      dispatch(addItemError(error.toString()));
      return { error: true, message: error };
    }
  };
};

export const deleteItem = (itemId) => {
  return async (dispatch) => {
    dispatch(deleteItemPending());
    try {
      // await fetch(`${process.env.REACT_APP_API_URL}/projects/${_id}`, {
      //   method: 'DELETE'
      // });
      dispatch(deleteItemSuccess(itemId));
      return {
        error: false,
        message: "item deleted successfully"
      };
    } catch (error) {
      dispatch(deleteItemError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};
