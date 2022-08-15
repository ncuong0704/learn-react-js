import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function InputField({ form, name, label }) {
  const { formState } = form;

  const hasError = !!formState.errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <TextField
            margin="normal"
            fullWidth
            error={hasError}
            helperText={hasError ? formState.errors[name]?.message : ""}
            label={label}
            {...field}
          />
        );
      }}
    />
  );
}

export default InputField;
