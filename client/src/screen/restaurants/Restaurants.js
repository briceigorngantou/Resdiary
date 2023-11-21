import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import { getRestaurants as listRestaurants } from "../../redux/actions/restaurantsActions";
import Title from "../../components/title/Title";
import AllRestaurants from "../../layouts/allRestaurant/AllRestaurants.layout";

const Restaurants = () => {
  const dispatch = useDispatch();

  const getRestaurants = useSelector((state) => state.getRestaurants);
  const { Restaurants, loading, error } = getRestaurants;

  useEffect(() => {
    dispatch(listRestaurants());
  }, [dispatch]);

  return (
    <div className="container">
      <div
        className="restaurants
      -title"
      >
        <Title subtitle={"List of "} />
        <Title title={"My Restaurants"} />
      </div>
      <AllRestaurants
        Restaurants={Restaurants}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Restaurants;
