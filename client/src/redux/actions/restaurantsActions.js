import * as actionTypes from "../constants/restaurantsConstants";
import BASE_URL from '../../config/constant';
import axios from "axios";

export const getRestaurants = () => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_Restaurants_REQUEST,
    });

    const data = await axios
      .get(`${BASE_URL}/resdiary/all-restaurants/`)
      .then((response) => {
        return response?.data?.data;
      });

    dispatch({
      type: actionTypes.GET_Restaurants_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_Restaurants_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRestaurantsDetails = (micrositeName) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.GET_Restaurants_DETAILS_REQUEST,
    });

    const data = await axios
      .get(
        `${BASE_URL}/resdiary/restaurant-by-micrositeName?micrositeName=${micrositeName}`
      )
      .then((response) => {
        return response?.data?.data;
      });
    dispatch({
      type: actionTypes.GET_Restaurants_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_Restaurants_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
