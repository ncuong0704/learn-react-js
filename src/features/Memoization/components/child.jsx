import React from "react";
import PropTypes from "prop-types";

Child.propTypes = {};

function Child(props) {
  console.log("rerender child");
  return <div>child</div>;
}

export default React.memo(Child);
