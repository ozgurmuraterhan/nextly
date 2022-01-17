import { TOPMENU_FETCH } from "../../constants/ActionTypes";


const initialSettings = {
  topmenu: []
};

const topmenu = (state = initialSettings, action) => {
  switch (action.type) {

    case TOPMENU_FETCH:
      return {
        ...state,
        topmenu: action.payload,
      };

    default:
      return state;
  }
};

export default topmenu;
