import { call, put } from "redux-saga/effects";
import {
  getDataTaskSV,
  updateTaskSV,
  addTaskSV,
  deleteTaskSV,
} from "~/service";
import {
  addTaskSuccessAC,
  deleteTaskSuccessAC,
  getDataTaskSuccessAC,
  updateTaskFailedAC,
  updateTaskSuccessAC,
} from "./action";
function* getDataTaskSG(action) {
  try {
    const response = yield call(getDataTaskSV, action.payload);
    yield put(getDataTaskSuccessAC(response));
  } catch (e) {}
}
function* updateTaskSG(action) {
  try {
    const response = yield call(updateTaskSV, action.payload);
    if (response.status) {
      yield put(updateTaskSuccessAC(response.result));
    } else {
      yield put(updateTaskFailedAC(response.result));
    }
  } catch (e) {}
}
function* addTaskSG(action) {
  try {
    const response = yield call(addTaskSV, action.payload);
    yield put(addTaskSuccessAC(response));
  } catch (e) {}
}
function* deleteTaskSG(action) {
  try {
    yield call(deleteTaskSV, action.payload);
    yield put(deleteTaskSuccessAC(action.payload));
  } catch (e) {}
}
export { getDataTaskSG, updateTaskSG, addTaskSG, deleteTaskSG };
