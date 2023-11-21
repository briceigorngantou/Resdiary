import React from "react";
import { Button } from "@mui/material";

import "./styles.css";

export default function MenuButton({
  text,
  icon,
  variant,
  style,
  onClick,
  color,
  bgcolor,
  bordercolor,
}) {
  return (
    <Button
      variant={variant}
      style={{
        justifyContent: "left",
        margin: 5,
        borderRadius: 5,
        color: color,
        borderColor: bordercolor,
        backgroundColor: bgcolor,
        height: 45,
        width: "90%",
      }}
      startIcon={icon}
      sx={style}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}
