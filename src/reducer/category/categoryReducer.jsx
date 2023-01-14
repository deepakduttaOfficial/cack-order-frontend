import CATEGORY_ACTION from "../../actionTypes/category";

const initialState = {
  categories: [],
  rerender: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_ACTION.GET_ALL_CATEGORY:
      return { ...state, categories: action.payload };
    case CATEGORY_ACTION.RE_RENDER_CATEGORY:
      return { ...state, rerender: !state.rerender };
    default:
      return state;
  }
};
