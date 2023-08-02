import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';
import { authReducer } from './auth/reducer';
import { orderReducer } from './order/reducer'
import { alertReducer } from './alert/reducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer,
  order: orderReducer,
  alert: alertReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
