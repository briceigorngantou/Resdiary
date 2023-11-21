import React, { useContext } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { colors } from "../../config/colors";
import Loading from "../../components/Loading";
import image from "../../asset/icon.png";
import AppContext from "../../config/AppContext";

export default function SingleRestaurantLayout({ Restaurant, loading, error }) {
  const navigate = useNavigate();
  const { setCurrentRestaurant } = useContext(AppContext);

  return (
    <Paper container p={2} sx={{ margin: 2, maxHeight: 500 }}>
      {loading ? (
        <Loading isLoading={loading} />
      ) : error ? (
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
        >
          <Typography sx={{ textAlign: "center" }}>
            An error occurred during the display, please try again
          </Typography>
        </Grid>
      ) : (
        <Grid className="detail">
          <Grid sx={{ width: "30%" }}>
            <img
              src={
                Restaurant?.MainImage?.Url ? Restaurant?.MainImage?.Url : image
              }
              alt={"logo"}
              className="image"
            />
          </Grid>
          <Grid sx={{ flexDirection: "column", width: "70%" }} margin={2}>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Restaurant Name : </strong>
                {Restaurant?.Name}
              </Typography>
            </Grid>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Location : </strong>
                {Restaurant?.Address?.FullAddress}
              </Typography>
            </Grid>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Country : </strong>
                {Restaurant?.Address?.Country}
              </Typography>
            </Grid>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Town : </strong>
                {Restaurant?.Address?.City}
              </Typography>
            </Grid>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Latitude : </strong>
                {Restaurant?.Address?.Latitude}
              </Typography>
            </Grid>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Longitude : </strong>
                {Restaurant?.Address?.Longitude}
              </Typography>
            </Grid>
            <Grid flexDirection={"row"} sx={{ margin: 1 }}>
              <Typography fontSize={16}>
                <strong>Restaurant Description : </strong>
                {Restaurant?.Description}
              </Typography>
            </Grid>
            <Grid className="detail-info">
              <Grid>
                <Button
                  onClick={() => {
                    setCurrentRestaurant(Restaurant);
                    navigate("/book");
                  }}
                  variant="outlined"
                  sx={{
                    margin: 1,
                    color: colors.white,
                    borderColor: colors.black,
                    backgroundColor: colors.black,
                    ":hover": {
                      color: colors.black,
                      borderColor: colors.black,
                      backgroundColor: colors.white,
                    },
                  }}
                >
                  Book now
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
