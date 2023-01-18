import PRODUCT_ACTION from "../../actionTypes/product.action";

export const getAllProdcuts = (payload) => ({
  type: PRODUCT_ACTION.GET_ALL_PRODUCTS,
  payload,
});

export const getSingleProdcut = (payload) => ({
  type: PRODUCT_ACTION.GET_SINGLE_PRODUCT,
  payload,
});

export const reRenderProduct = () => ({
  type: PRODUCT_ACTION.RE_RENDER_PRODUCT,
});

export const searchBar = (payload) => ({
  type: PRODUCT_ACTION.SEARCH_BAR,
  payload,
});

export const filterProduct = (payload) => ({
  type: PRODUCT_ACTION.FILTER_PRODUCT,
  payload,
});
