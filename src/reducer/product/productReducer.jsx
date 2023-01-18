import PRODUCT_ACTION from "../../actionTypes/product.action";

const initialState = {
  search: "",
  minPrice: "",
  maxPrice: "",
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
    case PRODUCT_ACTION.SEARCH_BAR:
      return { ...state, search: action.payload };
    case PRODUCT_ACTION.FILTER_PRODUCT:
      return {
        ...state,
        minPrice: action.payload?.minPrice || state.minPrice,
        maxPrice: action.payload?.maxPrice || state.maxPrice,
      };
    default:
      return state;
  }
};
