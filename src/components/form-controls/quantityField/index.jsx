import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import RemoveIcon from "@mui/icons-material/Remove";
import { FormControl, IconButton, OutlinedInput } from "@mui/material";
import { useState } from "react";
QuantityField.propTypes = {
  onChange: PropTypes.func,
};

function QuantityField({ onChange = null }) {
  const [value, setValue] = useState(1);
  const handleChange = (value) => {
    if (value <= 0) {
      value = 1;
    }
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <IconButton
        onClick={() => {
          handleChange(value - 1);
        }}
      >
        <RemoveIcon />
      </IconButton>
      <OutlinedInput value={value} />
      <IconButton
        onClick={() => {
          handleChange(value + 1);
        }}
      >
        <AddIcon />
      </IconButton>
    </FormControl>
  );
}

export default QuantityField;
