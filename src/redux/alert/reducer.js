import {
  SET_MESSAGE_ALERT,
  SET_TIME_ALERT,
  SET_TYPE_ALERT,
  SET_SHOW_ALERT
} from './constants';

const initialState = {
  message: '',
  type: 'success',
  show: false,
  time: 3500,
};

export const alertReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_MESSAGE_ALERT:
      return {
        ...state,
        message: action.payload,
      };
    case SET_TIME_ALERT:
      return {
        ...state,
        time: action.payload,
      };
    case SET_TYPE_ALERT:
      return {
        ...state,
        type: action.payload,
      };
    case SET_SHOW_ALERT:
      return {
        ...state,
        show: action.payload,
      };

    default: {
      return state;
    }
  }
};
