import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
} from "~/constants";
const initialSate = {
  isLogin: false,
  user: {},
};
const reducerLogin = (state = initialSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN: {
      return {
        ...state,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLogin: true,
        user: payload,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
      };
    }
    case LOGOUT: {
      return {
        ...state,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isLogin: false,
        user: {},
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
export default reducerLogin;
