import {
  LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_SUCCESS,
} from "~/constants";
export const loginAC = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};
export const loginSuccessAC = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
};
export const loginFailedAC = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload,
  };
};
export const logoutAC = (payload) => {
  return {
    type: LOGOUT,
    payload,
  };
};
export const logoutSuccessAC = (payload) => {
  return {
    type: LOGOUT_SUCCESS,
    payload,
  };
};
export const logoutFailedAC = (payload) => {
  return {
    type: LOGIN_FAILED,
    payload,
  };
};
