import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";

import "./styles.css";
import AppContext from "../../config/AppContext";
import { colors } from "../../config/colors";
import image from "../../asset/icon.png";

const textPreviewLength = 22;

const CardRestaurant = ({ dataCard }) => {
  const { setActualData_AccessedName } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 250,
        height: 388,
        flexDirection: "row",
        borderRadius: 0,
        marginBottom: "5%",
      }}
    >
      <CardMedia
        image={dataCard?.MainImage?.Url ? dataCard?.MainImage?.Url : image}
        alt="Image Article"
        component="img"
        sx={{ height: "68%" }}
      />
      <CardContent sx={{ paddingLeft: 1, height: "10%", margin: 0 }}>
        <p className="card-title">
          {dataCard?.Name?.length > textPreviewLength
            ? `${dataCard?.Name?.slice(0, textPreviewLength)}...`
            : dataCard?.Name}
        </p>
      </CardContent>
      <CardActions
        sx={{ margin: 0, flexDirection: "column", padding: 0, height: "20%" }}
      >
        <div className="card-detail">
          <div>
            <p className="card-text">{dataCard?.Description}</p>
          </div>
        </div>
        <Button
          variant="outlined"
          sx={{
            width: "100%",
            marginTop: 1,
            color: colors.white,
            borderColor: colors.black,
            backgroundColor: colors.black,
            ":hover": {
              color: colors.black,
              borderColor: colors.black,
              backgroundColor: colors.white,
            },
          }}
          onClick={() => {
            setActualData_AccessedName(dataCard?.AccessedName);
            navigate(`/${dataCard?.AccessedName}`);
          }}
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardRestaurant;
