import React, { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

ColorBox.propTypes = {};

function getColor(current) {
  const listColor = ["red", "blue", "yellow", "pink", "green"];

  const index = listColor.findIndex(color => color === current)
  let random = Math.floor(Math.random() * listColor.length)
  while(index === random){
    random = Math.floor(Math.random() * listColor.length)
  }
  return listColor[random]
}

function ColorBox(props) {
  const [color, setColor] = useState(()=>{
    const beginColor = localStorage.getItem("color-box")
    return beginColor ? beginColor : "red"
  });
  const handleClickChangeColor = () => {
    const newColor = getColor(color);
    setColor(newColor)
    localStorage.setItem("color-box", newColor)
  };
  return <div style={{ backgroundColor: color }} className="color-box" onClick={handleClickChangeColor}></div>;
}

export default ColorBox;
