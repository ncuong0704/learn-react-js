import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

SearchPost.propTypes = {
  onSubmit: PropTypes.func,
};

function SearchPost({ onSubmit = null }) {
  const [value, setValue] = useState("");
  const debounce = useRef(null);
  const handleSubmitForm = (e) => {
    e.preventDefault();
    setValue("");
  };
  const handleChangeInput = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (onSubmit) {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
      debounce.current = setTimeout(() => {
        onSubmit(e.target.value);
      }, 300);
    }
  };
  return (
    <form onSubmit={handleSubmitForm}>
      <input onChange={handleChangeInput} type="text" value={value} />
    </form>
  );
}

export default SearchPost;
