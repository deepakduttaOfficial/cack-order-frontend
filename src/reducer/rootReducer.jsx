import { combineReducers } from "redux";
import categoryReducer from "./category/categoryReducer";
import orderReducer from "./order/orderReducer";
import productReducer from "./product/productReducer";
import UiReducer from "./UI/UiReducer";

const rootReducer = combineReducers({
  UI: UiReducer,
  PRODUCT: productReducer,
  CATEGORY: categoryReducer,
  ORDER: orderReducer,
});

export default rootReducer;
