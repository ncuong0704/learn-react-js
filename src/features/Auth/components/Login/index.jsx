import { unwrapResult } from "@reduxjs/toolkit";
import { login, register } from "features/Auth/userSlice";
import { useDispatch } from "react-redux";
import FormLogin from "../FormLogin";
import PropTypes from "prop-types";

Login.propTypes = {
  handleCloseDialog: PropTypes.func,
};

function Login({handleCloseDialog}) {
  const dispatch = useDispatch();
  const handleSubmitForm = async (values) => {
    try {
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);
      handleCloseDialog()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <FormLogin onSubmit={handleSubmitForm} />
    </div>
  );
}

export default Login;
