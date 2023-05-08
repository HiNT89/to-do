import { loginSV, logoutSV } from "~/service";
import { call, put } from "redux-saga/effects";
import { loginSuccessAC, logoutSuccessAC } from "./action";
function* loginSG(action) {
  try {
    const response = yield call(loginSV);
    yield put(loginSuccessAC(response));
  } catch (e) {}
}
function* logoutSG(action) {
  try {
    const response = yield call(logoutSV);
    yield put(logoutSuccessAC(response));
  } catch (e) {}
}
export { loginSG, logoutSG };
