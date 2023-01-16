import ORDER_ACTION from "../../actionTypes/order.action";

const initialState = {
  rerender: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTION.RE_RENDER_ORDER:
      return { ...state, rerender: !state.rerender };
    default:
      return state;
  }
};
