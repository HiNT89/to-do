import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./rootReducer";
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);

// render the application

export default store;
