/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const Help = ({ color = "white", stroke = "#C989DD", className }) => {
  return (
    <svg
      className={`help ${className}`}
      fill="none"
      height="35"
      viewBox="0 0 35 35"
      width="35"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle className="circle" cx="17.5" cy="17.5" fill={color} r="17.5" />
      <path
        className="path"
        d="M17.5 9.59375C15.9363 9.59375 14.4077 10.0574 13.1075 10.9262C11.8074 11.7949 10.794 13.0297 10.1956 14.4744C9.59718 15.9191 9.44061 17.5088 9.74567 19.0424C10.0507 20.5761 10.8037 21.9849 11.9094 23.0906C13.0151 24.1963 14.4239 24.9493 15.9576 25.2543C17.4912 25.5594 19.0809 25.4028 20.5256 24.8044C21.9703 24.206 23.2051 23.1927 24.0738 21.8925C24.9426 20.5923 25.4063 19.0637 25.4063 17.5C25.4063 15.4031 24.5733 13.3921 23.0906 11.9094C21.6079 10.4267 19.5969 9.59375 17.5 9.59375Z"
        stroke={stroke}
        strokeMiterlimit="10"
        strokeWidth="1.75581"
      />
      <path
        className="path"
        d="M14.9844 15.0872C14.9844 15.0872 15.0221 14.3011 15.8635 13.6241C16.3626 13.2221 16.9609 13.1057 17.5 13.0977C17.991 13.0914 18.4294 13.1727 18.6918 13.2976C19.141 13.5114 20.0156 14.0334 20.0156 15.1434C20.0156 16.3114 19.252 16.8419 18.3818 17.4254C17.5117 18.009 17.2754 18.6424 17.2754 19.2969"
        stroke={stroke}
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="1.53634"
      />
      <path
        className="path"
        d="M17.2305 22.5312C17.7267 22.5312 18.1289 22.129 18.1289 21.6328C18.1289 21.1366 17.7267 20.7344 17.2305 20.7344C16.7343 20.7344 16.332 21.1366 16.332 21.6328C16.332 22.129 16.7343 22.5312 17.2305 22.5312Z"
        fill={stroke}
      />
    </svg>
  );
};

Help.propTypes = {
  color: PropTypes.string,
  stroke: PropTypes.string,
};
