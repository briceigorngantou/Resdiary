import React, { useContext } from "react";

import { Grid, Paper, Typography } from "@mui/material/";
import Section1 from "../../layouts/booking/Section1";
import Section2 from "../../layouts/booking/Section2";
import Section3 from "../../layouts/booking/Section3";
import AppContext from "../../config/AppContext";

export default function Booking() {
  const { CurrentRestaurant } = useContext(AppContext);
  return (
    <Paper sx={{ padding: 5, margin: 1, marginBottom: "10%" }}>
      <Grid sx={{ width: "100%" }}>
        <Typography sx={{ textAlign: "center" }}>
          {CurrentRestaurant?.AccessedName} BOOKING
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Section1 Restaurant={CurrentRestaurant} />
      </Grid>
      <Grid container item xs={12}>
        <Section2 Restaurant={CurrentRestaurant} />
      </Grid>
      <Grid container item xs={12}>
        <Section3 Restaurant={CurrentRestaurant} />
      </Grid>
    </Paper>
  );
}
