import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";

import "./styles.css";
import SingleRestaurantLayout from "../../layouts/singleRestaurant/SingleRestaurant.layout";
import { getRestaurants as listRestaurants } from "../../redux/actions/restaurantsActions";
import Title from "../../components/title/Title";
// import AllRestaurants from "../../layouts/allRestaurant/AllRestaurants.layout";
import { Grid, Typography } from "@mui/material";
import Loading from "../../components/Loading";
import AppContext from "../../config/AppContext";
import SimpleAccordion from "../../components/accordion/Accordion";

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const { ActualData_AccessedName } = useContext(AppContext);
  const getRestaurants = useSelector((state) => state.getRestaurants);
  const { Restaurants, loading, error } = getRestaurants;

  useEffect(() => {
    dispatch(listRestaurants());
  }, [dispatch]);

  return (
    <div className="single-restaurant">
      {loading || !Restaurants ? (
        <Loading isLoading={loading} />
      ) : error ? (
        <Grid
          container
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            Any restaurant found
          </Typography>
        </Grid>
      ) : (
        Restaurants?.find(
          (value) => value?.AccessedName === ActualData_AccessedName
        ) && (
          <SingleRestaurantLayout
            Restaurant={Restaurants?.find(
              (value) => value?.AccessedName === ActualData_AccessedName
            )}
            loading={loading}
            error={error}
          />
        )
      )}
      <Grid sx={{ marginTop: 3 }}>
        <Title title={"About this restaurant"} />
      </Grid>
      <Divider />
      <Grid sx={{ margin: 2, marginBottom: "10%" }}>
        <SimpleAccordion />
      </Grid>
      {/* <Divider textAlign="left">LEFT</Divider> */}
      {/*<AllRestaurants
        Restaurants={Restaurants}
        loading={loading}
        error={error}
      /> */}
    </div>
  );
};
export default SingleRestaurant;
