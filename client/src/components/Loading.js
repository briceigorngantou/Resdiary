import React from "react";
import { Typography, CircularProgress, Backdrop } from "@mui/material";

function Loading({ loadingMsg, isLoading }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
      <Typography variant="p">
        {loadingMsg ? loadingMsg : "Loading..."}
      </Typography>
    </Backdrop>
  );
}

export default Loading;
