/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Btn = ({ className, divClassName, text = "Vous êtes professionnel de santé ?" }) => {
  return (
    <div className={`btn ${className}`}>
      <p className={`vous-tes ${divClassName}`}>{text}</p>
    </div>
  );
};

Btn.propTypes = {
  text: PropTypes.string,
};
