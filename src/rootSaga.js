import { all, takeEvery } from "redux-saga/effects";
import { loginSG, logoutSG } from "./container/Login/saga";
import {
  getDataTaskSG,
  updateTaskSG,
  addTaskSG,
  deleteTaskSG,
} from "./container/Home/saga";
import {
  LOGIN,
  GET_DATA_TASK,
  UPDATE_TASK,
  ADD_TASK,
  DELETE_TASK,
  LOGOUT,
} from "~/constants";
export default function* rootSaga() {
  yield all([
    takeEvery(LOGIN, loginSG),
    takeEvery(GET_DATA_TASK, getDataTaskSG),
    takeEvery(UPDATE_TASK, updateTaskSG),
    takeEvery(ADD_TASK, addTaskSG),
    takeEvery(DELETE_TASK, deleteTaskSG),
    takeEvery(LOGOUT, logoutSG),
  ]);
}
