import React, { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Child from "./components/child";

MemoizationFeature.propTypes = {};

function MemoizationFeature(props) {
  const [count, setCount] = useState(0);
  const testFunction = useCallback(() => {}, []);
  const myArray = useMemo(()=>[], []);
  return (
    <div>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        decrease
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increase
      </button>

      <Child testFunction={testFunction} myArray={myArray} />
    </div>
  );
}

export default MemoizationFeature;
