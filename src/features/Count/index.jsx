import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Decrease, Increase } from "./countSlice";

CountFeature.propTypes = {};

function CountFeature(props) {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);
  const handleClickIncrease = () => {
    const action = Increase();
    dispatch(action);
  };
  const handleClickDecrease = () => {
    const action = Decrease();
    dispatch(action);
  };
  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClickDecrease}>Decrease</button>
      <button onClick={handleClickIncrease}>Increase</button>
    </div>
  );
}

export default CountFeature;
