import {
  loginPending,
  loginSuccess,
  loginError,
  setAuthenticationError,
  setAuthenticationSuccess,
  setAuthenticationPending,
  addUserError,
  addUserPending,
  addUserSuccess,
  cleanUser
} from './actions';
// eslint-disable-next-line no-unused-vars
import firebaseApp from '../../firebase/';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const response = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      const token = await response.user.getIdToken();
      dispatch(loginSuccess(token));
      return { token: token, error: false, message: "Login successfully" };
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const setAuth = (token) => {
  return async (dispatch) => {
    dispatch(setAuthenticationPending());
    try {
      const resp = await fetch(`http://localhost:5000/api/users/auth/`, {
        headers: { token }
      });
      const response = await resp.json();
      return dispatch(setAuthenticationSuccess(response.data));
    } catch (error) {
      return dispatch(setAuthenticationError(error.toString()));
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      await dispatch(cleanUser());
      return { error: false, message: 'Log Out Successfully' };
    } catch (error) {
      console.error(error);
      return { error: true, message: error.toString() };
    }
  };
};


export const addUser = (user) => {
  return async (dispatch) => {
    dispatch(addUserPending());
    try {
      const response = await fetch(`http://localhost:5000/api/users/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone,
          email: user.email,
          password: user.password,
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addUserSuccess(res.data));
      return {
        data: res.data,
        message: res.message
      };
    } catch (error) {
      dispatch(addUserError(error.toString()));
      return {
        error: true,
        message: error
      };
    }
  };
};