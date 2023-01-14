import CATEGORY_ACTION from "../../actionTypes/category";

export const getAllCategories = (payload) => ({
  type: CATEGORY_ACTION.GET_ALL_CATEGORY,
  payload,
});

export const reRenderCategory = () => ({
  type: CATEGORY_ACTION.RE_RENDER_CATEGORY,
});
