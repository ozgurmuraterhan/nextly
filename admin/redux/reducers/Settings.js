import { CHANGE_COLLAPSED, SWITCH_LANGUAGE } from "../types";
import { defaultLanguage } from "../../config"


const initialSettings = {

  locale: defaultLanguage,
  collapsed: false
};

const settings = (state = initialSettings, action) => {
  switch (action.type) {

    case SWITCH_LANGUAGE:
      return {
        ...state,
        locale: action.payload,

      };
    case CHANGE_COLLAPSED:
      return {
        ...state,
        collapsed: action.payload,

      };
    default:
      return state;
  }
};

export default settings;
