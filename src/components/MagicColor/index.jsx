import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";
import useMagicColor from "../../Hook/useMagicColor";

MagicColor.propTypes = {};

function MagicColor(props) {
    const color = useMagicColor()
  return <div style={{ backgroundColor: color }} className="color-box"></div>;
}

export default MagicColor;