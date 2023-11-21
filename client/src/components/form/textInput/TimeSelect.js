import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import AppContext from "../../../config/AppContext";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function TimeSelect({ disabled, width, style, timesAvailable }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const { setVisitTime } = React.useContext(AppContext);
  const loading = open && options.length === 0;
  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.
      if (active) {
        setOptions(
          timesAvailable
            ? [...timesAvailable]
            : [{ TimeSlot: "Not Availability" }]
        );
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={style || { width: width || 300 }}
      placeholder="Not Availability"
      open={open}
      disabled={disabled}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option?.TimeSlot === value?.TimeSlot
      }
      getOptionLabel={(option) => {
        setVisitTime(option?.TimeSlot);
        return option?.TimeSlot;
      }}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Times Available"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
