import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "components/form-controls/inputField";
import { Button } from "@mui/material";
import PasswordField from "components/form-controls/passwordField";

FormRegister.propTypes = {
    onSubmit: PropTypes.func,
};

function FormRegister({onSubmit = null}) {
  const schema = yup
    .object({
      fullName: yup.string().required("Please enter your fullname!")
      .test("should has at least two words", "Please enter at least two words!", (value) => {
          return value.trim().split(" ").length >= 2;
      }),
      email: yup.string().required("Please enter your email!").email("Please enter a valid email address!"),
      password: yup
        .string()
        .required("Please enter your password!")
        .min(8, "Please enter at least 8 characters!")
        .test("isValidPass", " Passowrd must have been one UpperCase & One Symbol", (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbole = /[!@#%&]/.test(value);
          let validConditions = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbole];
          conditions.forEach((condition) => (condition ? validConditions++ : null));
          if (validConditions >= numberOfMustBeValidConditions) {
            return true;
          }
          return false;
        }),
      retypePassword: yup
        .string()
        .required("Please retype your password!")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      retypePassword: "",
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
        <InputField name="fullName" form={form} label="Full Name" />
        <InputField name="email" form={form} label="Email" />
        <PasswordField name="password" form={form} label="Password" />
        <PasswordField name="retypePassword" form={form} label="Retype Password" />
        <Button fullWidth type="submit">Register</Button>
      </form>
    </div>
  );
}

export default FormRegister;
