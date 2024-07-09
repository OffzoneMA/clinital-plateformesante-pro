/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const DatingDayInMonth = ({ className, numClassName, text = "1" }) => {
  return (
    <div className={`dating-day-in-month ${className}`}>
      <div className={`num-2 ${numClassName}`}>{text}</div>
    </div>
  );
};

DatingDayInMonth.propTypes = {
  text: PropTypes.string,
};
