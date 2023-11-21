import "./styles.css";
import CardRestaurant from "../../components/cardRestaurant/CardRestaurant";
import Loading from "../../components/Loading";
import { Grid, Typography } from "@mui/material";

const AllRestaurants = ({ error, loading, Restaurants }) => {
  return (
    <div className="row">
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
        Restaurants?.length > 0 &&
        Restaurants?.map((value, key) => {
          return (
            <div className="col" id={value.id} key={key}>
              <CardRestaurant dataCard={value} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default AllRestaurants;
