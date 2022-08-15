import React from "react";
import PropTypes from "prop-types";
import FormRegister from "../FormRegister";
import { useDispatch } from "react-redux";
import { register } from "features/Auth/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "notistack";
Register.propTypes = {
  handleSuccessRegister: PropTypes.func,
};

function Register({ handleSuccessRegister }) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const handleSubmitForm = async (values) => {
    try {
      values.username = values.email;
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      enqueueSnackbar("Đăng ký thành công", { variant: "success" });
      handleSuccessRegister();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <div>
      <FormRegister onSubmit={handleSubmitForm} />
    </div>
  );
}

export default Register;
