import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectInput({
  width,
  label,
  options,
  value,
  setValue,
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: width ? width : 300 }}>
        <InputLabel sx={{ width: width ? width : 300 }} id="promotion-label-id">
          {label}
        </InputLabel>
        <Select
          labelId="promotion-label-id"
          id="demo-simple-select-autowidth"
          value={value}
          sx={{ width: width ? width : 300 }}
          onChange={handleChange}
          autoWidth
          label={label}
        >
          <MenuItem sx={{ width: width ? width : 300 }} value=""></MenuItem>
          {options.length > 0 &&
            options.map((value, key) => {
              <MenuItem
                sx={{ width: width ? width : 300 }}
                key={key}
                value={value?.Id}
              >
                {value?.Name}
              </MenuItem>;
            })}
        </Select>
      </FormControl>
    </div>
  );
}
