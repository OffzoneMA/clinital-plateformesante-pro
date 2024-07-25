/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./style.css";

export const Connecter = ({
  property1,
  divClassName,
  personCircle = "https://c.animaapp.com/NnydzBh0/img/person-circle-outline-2.svg",
}) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className="connecter"
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
    >
      <div className={`text-wrapper-4 ${state.property1} ${divClassName}`}>Se connecter</div>
      <img
        className="person-circle-2"
        alt="Person circle"
        src={
          state.property1 === "hover" ? "https://c.animaapp.com/NnydzBh0/img/person-circle-outline-3.svg" : personCircle
        }
      />
    </div>
  );
};

function reducer(state, action) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        property1: "hover",
      };

    case "mouse_leave":
      return {
        ...state,
        property1: "default",
      };
  }

  return state;
}

Connecter.propTypes = {
  property1: PropTypes.oneOf(["hover", "default"]),
  personCircle: PropTypes.string,
};
