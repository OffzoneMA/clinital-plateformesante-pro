/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Property1Variant21 = ({ color = "#9E58FF", stroke = "white", className }) => {
  return (
    <svg
      className={`property-1-variant2-1 ${className}`}
      fill="none"
      height="35"
      viewBox="0 0 35 35"
      width="35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="circle" cx="17.5" cy="17.5" fill={color} r="17.5" />
      <path
        className="path"
        d="M20.375 23.25V23.9688C20.375 24.7313 20.0721 25.4625 19.5329 26.0017C18.9937 26.5409 18.2625 26.8438 17.5 26.8438C16.7375 26.8438 16.0062 26.5409 15.467 26.0017C14.9279 25.4625 14.625 24.7313 14.625 23.9688V23.25M25.2122 21.7869C24.0586 20.375 23.2441 19.6563 23.2441 15.7638C23.2441 12.1992 21.4239 10.9293 19.9258 10.3125C19.7268 10.2308 19.5394 10.043 19.4788 9.83859C19.216 8.94419 18.4793 8.15627 17.5 8.15627C16.5207 8.15627 15.7835 8.94464 15.5234 9.83949C15.4628 10.0461 15.2754 10.2308 15.0764 10.3125C13.5765 10.9302 11.7581 12.1956 11.7581 15.7638C11.7558 19.6563 10.9414 20.375 9.78779 21.7869C9.30982 22.3718 9.72849 23.25 10.5645 23.25H24.44C25.2715 23.25 25.6874 22.3691 25.2122 21.7869Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4375"
      />
    </svg>
  );
};

Property1Variant21.propTypes = {
  color: PropTypes.string,
  stroke: PropTypes.string,
};
