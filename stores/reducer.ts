import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import userSlice from "./userSlice";
import farmSlice from "./farmSlice";

const combinedReducer = combineReducers({
  user: userSlice,
  farm: farmSlice,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
export default rootReducer;
