import {
SET_MESSAGE_ALERT,
SET_TIME_ALERT,
SET_TYPE_ALERT,
SET_SHOW_ALERT
} from './constants';

export const setTimeAlert = (data) => {
  return {
    type: SET_TIME_ALERT,
    payload: data
  };
};
export const setTypeAlert = (data) => {
  return {
    type: SET_TYPE_ALERT,
    payload: data
  };
};
export const setMessageAlert = (data) => {
  return {
    type: SET_MESSAGE_ALERT,
    payload: data
  };
};
export const setShowAlert = (data) => {
  return {
    type: SET_SHOW_ALERT,
    payload: data
  };
};
