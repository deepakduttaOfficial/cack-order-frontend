import { combineReducers } from "redux";
import productReducer from "./product/productReducer";
import UiReducer from "./UI/UiReducer";

const rootReducer = combineReducers({
  UI: UiReducer,
  PRODUCT: productReducer,
});

export default rootReducer;
