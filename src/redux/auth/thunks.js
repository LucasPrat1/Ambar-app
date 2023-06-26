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
  cleanUser,
  editUserPending,
  editUserSuccess,
  editUserError
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
      dispatch(loginError());
      return { error: true, message: error.toString() };
    }
  };
};

export const setAuth = (token) => {
  return async (dispatch) => {
    dispatch(setAuthenticationPending());
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/auth/`, {
        headers: { token }
      });
      const response = await resp.json();
      dispatch(setAuthenticationSuccess(response.data));
      return { error: false, message: "Authentication successfully" };
    } catch (error) {
      dispatch(setAuthenticationError());
      return { error: true, message: error.toString() };
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          phone: user.phone,
          email: user.email,
          city: user.city,
          address: user.address,
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
        error: false,
        message: res.message
      };
    } catch (error) {
      dispatch(addUserError());
      return {
        error: true,
        message: error.toString()
      };
    }
  };
};

export const editUser = (user, _id) => {
  return async (dispatch) => {
    dispatch(editUserPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          city: user.city,
          address: user.address,
          isAdmin: false
        })
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(editUserSuccess(res.data));
      return {
        data: res.data,
        error: false,
        message: res.message
      };
    } catch (error) {
      dispatch(editUserError());
      return {
        error: true,
        message: error.toString()
      };
    }
  };
};

export const contactMessage = (data) => {
  return async (dispatch) => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_API_URL}/users/contact`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const response = await resp.json();
      return response;
    } catch (error) {
      return { error: true, message: error.toString() };
    }
  };
};