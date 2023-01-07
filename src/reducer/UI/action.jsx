import UI_ACTION from "../../actionTypes/UI.action";

export const isSideBar = (payload) => ({
  type: UI_ACTION.IS_SIDEBAR_ICON,
  payload: payload,
});

export const updateAddCard = () => ({
  type: UI_ACTION.UPDATE_ADD_CARD,
});
