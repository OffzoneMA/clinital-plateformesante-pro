/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const DatingDayOutOf = ({ className, numClassName, text = "1" }) => {
  return (
    <div className={`dating-day-out-of ${className}`}>
      <div className={`num ${numClassName}`}>{text}</div>
    </div>
  );
};

DatingDayOutOf.propTypes = {
  text: PropTypes.string,
};
