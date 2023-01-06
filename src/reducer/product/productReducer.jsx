import PRODUCT_ACTION from "../../actionTypes/product.action";

const initialState = {
  search: "",
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTION.GET_APP_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};
