import {
  GET_DATA_TASK,
  GET_DATA_TASK_SUCCESS,
  GET_DATA_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILED,
  ADD_TASK,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
} from "~/constants";
const initialState = {
  isLoading: false,
  dataTask: [],
};
const reducerGlobal = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_DATA_TASK: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_DATA_TASK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        dataTask: payload,
      };
    }
    case GET_DATA_TASK_FAILED: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UPDATE_TASK_SUCCESS: {
      const newDataTask = state.dataTask.map((it) =>
        it.id === payload.id ? payload : it
      );
      return {
        ...state,
        dataTask: newDataTask,
      };
    }
    case ADD_TASK_SUCCESS: {
      return {
        ...state,
        dataTask: payload,
      };
    }
    case DELETE_TASK_SUCCESS: {
      const newDataTask = state.dataTask.filter((it) => it.id !== payload.id);
      return {
        ...state,
        dataTask: newDataTask,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
export default reducerGlobal;
