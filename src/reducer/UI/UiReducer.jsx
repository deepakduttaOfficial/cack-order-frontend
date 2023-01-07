import UI_ACTION from "../../actionTypes/UI.action";

const initialState = {
  sidebarIcon: true,
  updateaddcard: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UI_ACTION.IS_SIDEBAR_ICON:
      return { ...state, sidebarIcon: action.payload };
    case UI_ACTION.UPDATE_ADD_CARD:
      return { ...state, updateaddcard: !state.updateaddcard };

    default:
      return state;
  }
};
