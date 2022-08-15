import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-controls/inputField";
import { Button } from "@mui/material";
import PasswordField from "components/form-controls/passwordField";

FormLogin.propTypes = {
    onSubmit: PropTypes.func,
};

function FormLogin({onSubmit = null}) {
  const schema = yup
    .object({
      identifier: yup.string().required("Please enter your email!"),
      password: yup
        .string()
        .required("Please enter your password!")
    })
    .required();
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    if(onSubmit){
        onSubmit(values)
    }
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name="identifier" form={form} label="Email" />
        <PasswordField name="password" form={form} label="Password" />
        <Button fullWidth type="submit">Login</Button>
      </form>
    </div>
  );
}

export default FormLogin;
