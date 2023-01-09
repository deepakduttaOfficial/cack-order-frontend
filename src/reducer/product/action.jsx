import PRODUCT_ACTION from "../../actionTypes/product.action";

export const getAllProdcuts = (payload) => ({
  type: PRODUCT_ACTION.GET_ALL_PRODUCTS,
  payload,
});

export const getSingleProdcut = (payload) => ({
  type: PRODUCT_ACTION.GET_SINGLE_PRODUCT,
  payload,
});
