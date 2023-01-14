import PRODUCT_ACTION from "../../actionTypes/product.action";

const initialState = {
  search: "",
  products: [],
  singleproduct: {},
  rerender: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ACTION.GET_ALL_PRODUCTS:
      return { ...state, products: action.payload };
    case PRODUCT_ACTION.GET_SINGLE_PRODUCT:
      return { ...state, singleproduct: action.payload };
    case PRODUCT_ACTION.RE_RENDER_PRODUCT:
      return { ...state, rerender: !state.rerender };
    default:
      return state;
  }
};
