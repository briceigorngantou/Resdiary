import * as actionTypes from "../constants/restaurantsConstants";

export const getRestaurantsReducer = (state = { Restaurants: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_Restaurants_REQUEST:
      return {
        loading: true,
        Restaurants: [],
      };
    case actionTypes.GET_Restaurants_SUCCESS:
      return {
        loading: false,
        Restaurants: action.payload,
      };
    case actionTypes.GET_Restaurants_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getRestaurantDetailsReducer = (
  state = { Restaurant: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.GET_Restaurants_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_Restaurants_DETAILS_SUCCESS:
      return {
        loading: false,
        Restaurant: action.payload,
      };
    case actionTypes.GET_Restaurants_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_Restaurants_DETAILS_RESET:
      return {
        Restaurant: {},
      };
    default:
      return state;
  }
};
