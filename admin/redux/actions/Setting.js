import { SWITCH_LANGUAGE, CHANGE_COLLAPSED } from "../types";

export function switchLanguage(locale) {
  return {
    type: SWITCH_LANGUAGE,
    payload: locale
  };
}

export function changeCollapsed_r(collapsed) {
  return {
    type: CHANGE_COLLAPSED,
    payload: collapsed
  };
}
