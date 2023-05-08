import {
  GET_DATA_TASK,
  GET_DATA_TASK_SUCCESS,
  GET_DATA_TASK_FAILED,
  UPDATE_TASK,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILED,
  DELETE_TASK_FAILED,
  DELETE_TASK_SUCCESS,
  DELETE_TASK,
} from "~/constants";
export const getDataTaskAC = (payload) => {
  return {
    type: GET_DATA_TASK,
    payload,
  };
};
export const getDataTaskSuccessAC = (payload) => {
  return {
    type: GET_DATA_TASK_SUCCESS,
    payload,
  };
};
export const getDataTaskFailedAC = (payload) => {
  return {
    type: GET_DATA_TASK_FAILED,
    payload,
  };
};
export const updateTaskAC = (payload) => {
  return {
    type: UPDATE_TASK,
    payload,
  };
};
export const updateTaskSuccessAC = (payload) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload,
  };
};
export const updateTaskFailedAC = (payload) => {
  return {
    type: UPDATE_TASK_FAILED,
    payload,
  };
};
export const addTaskAC = (payload) => {
  return {
    type: ADD_TASK,
    payload,
  };
};
export const addTaskSuccessAC = (payload) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload,
  };
};
export const addTaskFailedAC = (payload) => {
  return {
    type: ADD_TASK_FAILED,
    payload,
  };
};
export const deleteTaskAC = (payload) => {
  return {
    type: DELETE_TASK,
    payload,
  };
};
export const deleteTaskSuccessAC = (payload) => {
  return {
    type: DELETE_TASK_SUCCESS,
    payload,
  };
};
export const deleteTaskFailedAC = (payload) => {
  return {
    type: DELETE_TASK_FAILED,
    payload,
  };
};
