import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";

PasswordField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

function PasswordField({ form, name, label }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(() => !showPassword);
  };

  const { formState } = form;

  const hasError = !!formState.errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel style={{ color: hasError ? "#d32f2f" : "" }} htmlFor={name}>
              {label}
            </InputLabel>
            <OutlinedInput
              error={hasError}
              id={name}
              {...field}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
            />
            {hasError && <FormHelperText error>{formState.errors[name]?.message}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}

export default PasswordField;
