import { applyMiddleware } from "redux";

const middleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("Action", action);
  const returnValue = next(action);
  console.log("new state", store.getState());
  console.groupEnd();

  return returnValue;
};

export default applyMiddleware(middleware);
