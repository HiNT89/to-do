import { createSelector } from "reselect";
const stateLogin = (state) => state.reducerLogin;
const stateGlobal = (state) => state.reducerGlobal;
// login
export const loginSE = createSelector(stateLogin, (state) => state.isLogin);
export const userSE = createSelector(stateLogin, (state) => state.user);
// global
export const dataTaskSE = createSelector(
  stateGlobal,
  (state) => state.dataTask
);
