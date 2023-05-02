import {
  DELETE_ITEM_PENDING,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_ERROR,
  ADD_ITEM_PENDING,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_ERROR,
} from './constants';

const initialState = {
  cart: [],
  isLoading: false,
  error: false
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_CART_PENDING:
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case GET_CART_SUCCESS:
    //   return {
    //     ...state,
    //     list: action.payload,
    //     isLoading: false
    //   };
    // case GET_CART_ERROR:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     error: true
    //   };
    case ADD_ITEM_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_ITEM_SUCCESS:
      const exist = state.cart.find((i) => i._id === action.payload._id)
      if (exist) {
        return {
          ...state,
          cart: state.cart.map((i) => i._id === action.payload._id ? {...i, qty: i.qty + 1} : i ),
          isLoading: false,
          error: false
        };
      } else {
        return {
          ...state,
          cart: [...state.cart,
            {
              ...action.payload,
              qty: 1,
            }
          ],
          isLoading: false,
          error: false
        };
      };
    case ADD_ITEM_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case DELETE_ITEM_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case DELETE_ITEM_SUCCESS:
      const exist1 = state.cart.find((i) => i._id === action.payload)
      if (exist1.qty === 1) {
        return {
          ...state,
          cart: state.cart.filter((i) => i._id !== exist1._id),
          isLoading: false,
          error: false
        };
      } else {
        return {
          ...state,
          cart: state.cart.map((i) => i._id === action.payload ? {...i, qty: i.qty - 1} : i ),
          isLoading: false,
          error: false
        };
      }
    case DELETE_ITEM_ERROR:
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
