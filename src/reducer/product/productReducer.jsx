import PRODUCT_ACTION from "../../actionTypes/product.action";

const initialState = {
  search: "",
  products: [],
  singleproduct: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTION.GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };
    case PRODUCT_ACTION.GET_SINGLE_PRODUCT:
      return { ...state, singleproduct: action.payload };
    default:
      return state;
  }
};
