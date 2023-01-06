import PRODUCT_ACTION from "../../actionTypes/product.action";

export const getAllProdcuts = (payload) => ({
  type: PRODUCT_ACTION.GET_APP_PRODUCTS,
  payload,
});
