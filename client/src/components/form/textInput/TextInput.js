import React from "react";

import { Grid, TextField, Typography } from "@mui/material";

function TextInput({
  id,
  rows,
  type,
  name,
  value,
  label,
  error,
  style,
  variant,
  InputRef,
  multiline,
  disabled,
  fullWidth,
  required,
  onChange,
  placeholder,
  InputProps,
}) {
  return (
    <>
      {type === "number" ? (
        <TextField
          id={id}
          sx={style}
          disabled={disabled}
          required={required}
          ref={InputRef}
          label={label}
          placeholder={placeholder}
          fullWidth={fullWidth}
          value={value}
          name={name}
          variant={variant ? variant : "outlined"}
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]",
          }}
          type={type}
          onChange={onChange}
          InputProps={InputProps}
        />
      ) : (
        <TextField
          id={id}
          disabled={disabled}
          required={required}
          ref={InputRef}
          label={label}
          placeholder={placeholder}
          fullWidth={fullWidth}
          value={value}
          name={name}
          InputProps={InputProps}
          variant={variant ? variant : "outlined"}
          type={type}
          onChange={onChange}
          rows={rows}
          multiline={multiline}
        />
      )}
      {error ? (
        <Grid sx={{ flex: 1 }}>
          <Typography
            sx={{
              color: "red",
              letterSpacing: 0.5,
              textTransform: "capitalize",
              fontSize: 10,
            }}
          >
            {error}
          </Typography>
        </Grid>
      ) : null}
    </>
  );
}
export default TextInput;
