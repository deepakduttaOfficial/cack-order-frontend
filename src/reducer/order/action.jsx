import ORDER_ACTION from "../../actionTypes/order.action";

export const reRenderOrder = () => ({
  type: ORDER_ACTION.RE_RENDER_ORDER,
});

export const addItems = (payload) => ({
  type: ORDER_ACTION.ORDER_ITEMS,
  payload,
});

export const addShipingInfo = (payload) => ({
  type: ORDER_ACTION.ADD_SHIPPING,
  payload,
});
