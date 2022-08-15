import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/form-controls/inputField";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import * as yup from "yup";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function TodoForm({ onSubmit = null }) {
  const schema = yup
    .object({
      title: yup.string().required("Vui lòng nhập title"),
    })
    .required();
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
      form.reset();
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <InputField form={form} name="title" label="Title" />
    </form>
  );
}

export default TodoForm;
