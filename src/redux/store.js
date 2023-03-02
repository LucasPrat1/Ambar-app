import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productReducer } from './products/reducer';
import { cartReducer } from './cart/reducer';
import { authReducer } from './auth/reducer';

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  auth: authReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
