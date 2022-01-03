import { BASKET_FETCH, GET_ALL_FETCH_FAIL } from "../../constants/ActionTypes";
import axios from "axios"
import { API_URL } from '../../config';

export const updateBasket_r = (data) => {
  return {
    type: BASKET_FETCH,
    payload: data
  }
};

export const getBasket_r = (id) => async (dispatch) => {

  await
    axios.get(`${API_URL}/basket/customer/${id}`).then(res => {
      dispatch({
        type: BASKET_FETCH,
        payload: res.data
      });

    }).catch(err => {
      dispatch({
        type: GET_ALL_FETCH_FAIL,
        payload: err.message + ": " + err.config.url.replace(API_URL, "api"),
      });
    })

};