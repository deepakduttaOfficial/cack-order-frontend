import UI_ACTION from "../../actionTypes/UI.action";

const initialState = {
  sidebarIcon: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UI_ACTION.IS_SIDEBAR_ICON:
      return { ...state, sidebarIcon: action.payload };

    default:
      return state;
  }
};
