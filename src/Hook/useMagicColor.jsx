import { useEffect, useState } from "react";

useMagicColor.propTypes = {};

function getColor(current) {
  const listColor = ["red", "blue", "yellow", "pink", "green"];

  const index = listColor.findIndex((color) => color === current);
  let random = Math.floor(Math.random() * listColor.length);
  while (index === random) {
    random = Math.floor(Math.random() * listColor.length);
  }
  return listColor[random];
}

function useMagicColor(props) {
  const [color, setColor] = useState(() => {
    const beginColor = localStorage.getItem("color-box");
    return beginColor ? beginColor : "red";
  });
  useEffect(() => {
    const a = setInterval(() => {
      const newColor = getColor(color);
      setColor(newColor);
      localStorage.setItem("color-box", newColor);
    }, 2000);
    return () => {
      clearInterval(a);
    };
  }, [color]);

  return color;
}

export default useMagicColor;
