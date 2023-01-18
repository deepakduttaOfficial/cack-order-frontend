import ORDER_ACTION from "../../actionTypes/order.action";

const initialState = {
  rerender: false,
  createOrder: {
    shippingInfo: {},
    orderItems: [],
    totalAmount: 0,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_ACTION.RE_RENDER_ORDER:
      return { ...state, rerender: !state.rerender };
    case ORDER_ACTION.ORDER_ITEMS:
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          orderItems: action.payload.items,
          totalAmount: action.payload.totalAmount,
        },
      };
    case ORDER_ACTION.ADD_SHIPPING:
      return {
        ...state,
        createOrder: {
          ...state.createOrder,
          shippingInfo: action.payload,
        },
      };
    default:
      return state;
  }
};
