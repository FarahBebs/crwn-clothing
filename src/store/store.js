import { createStore, applyMiddleware, compose } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reduser";

const loggerMiddleWare = (state) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }
  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", state.getState());

  next(action);
  console.log("nextState", state.getState());
};

const middleware = [loggerMiddleWare];
const composedEnhancers = compose(applyMiddleware(...middleware));
export const store = createStore(rootReducer, undefined, composedEnhancers);
