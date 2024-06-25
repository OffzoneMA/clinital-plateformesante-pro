/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Agenda1 } from "../../../icons/Agenda1";
import { Help } from "../../../icons/Help";
import { Notif } from "../../../icons/Notif";
import { Settings01 } from "../../../icons/Settings01";
import { Btn } from "../Btn";
import { Connecter } from "../Connecter";
import "./style.css";

export const HeaderPro = ({
  login,
  className,
  text = "Paramètres d’agenda",
  line = "https://c.animaapp.com/NnydzBh0/img/line-42.svg",
  helpClassName,
  bytesizeHome = "https://c.animaapp.com/NnydzBh0/img/bytesize-home.svg",
  hasFrame = true,
  img = "https://c.animaapp.com/NnydzBh0/img/line-42.svg",
  vector = "https://c.animaapp.com/NnydzBh0/img/vector-2.svg",
  vector1 = "https://c.animaapp.com/NnydzBh0/img/vector-3.svg",
  vector2 = "https://c.animaapp.com/NnydzBh0/img/vector-4.svg",
  vector3 = "https://c.animaapp.com/NnydzBh0/img/vector-5.svg",
  vector4 = "https://c.animaapp.com/NnydzBh0/img/vector-6.svg",
  vector5 = "https://c.animaapp.com/NnydzBh0/img/vector-7.svg",
  vector6 = "https://c.animaapp.com/NnydzBh0/img/vector-8.svg",
  vector7 = "https://c.animaapp.com/NnydzBh0/img/vector-9.svg",
  vector8 = "https://c.animaapp.com/NnydzBh0/img/vector-10.svg",
}) => {
  return (
    <div className={`header-PRO login-${login} ${className}`}>
      {!login && (
        <div className="header">
          <img className="vector" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector.svg" />
          <div className="frame">
            <Btn className="btn-instance" divClassName="instance-node" text="Prendre un rendez-vous" />
            <Help className="property-1-default" color="white" stroke="#C989DD" />
            <Connecter
              divClassName="connecter-instance"
              personCircle="https://c.animaapp.com/NnydzBh0/img/person-circle-outline.svg"
              property1="default"
            />
          </div>
        </div>
      )}

      {login && (
        <>
          <img className="img" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-11.svg" />
          <div className="div">
            <div className="frame-2">
              <button className="div-wrapper">
                <div className="text-wrapper">Prendre un rendez-vous</div>
              </button>
              <div className="btn-2">
                <Settings01 className="settings" />
                <div className="param-tres-d-agenda">{text}</div>
              </div>
            </div>
            <img className="line" alt="Line" src={line} />
            <div className="frame-3">
              <div className="frame-4">
                <div className={`bytesize-home-wrapper ${helpClassName}`}>
                  <img className="bytesize-home" alt="Bytesize home" src={bytesizeHome} />
                </div>
                <div className="text-wrapper-2">Dashboard</div>
              </div>
              <div className="frame-4">
                <Agenda1 className="agenda" />
                <div className="text-wrapper-2">Agenda</div>
              </div>
              {hasFrame && (
                <div className="frame-4">
                  <div className="group">
                    <img
                      className="person-circle"
                      alt="Person circle"
                      src="https://c.animaapp.com/NnydzBh0/img/person-circle-outline-1.svg"
                    />
                  </div>
                  <div className="text-wrapper-2">Compte</div>
                </div>
              )}
            </div>
            <img className="line" alt="Line" src={img} />
            <div className="frame-5">
              <div className="group-2">
                <div className="overlap-group">
                  <Notif className="notif-1" />
                  <div className="ellipse" />
                </div>
                <div className="text-wrapper-3">Notifications</div>
              </div>
              <div className="group-3">
                <img className="vector-2" alt="Vector" src={vector} />
                <img className="vector-3" alt="Vector" src={vector1} />
                <img className="vector-4" alt="Vector" src={vector2} />
                <img className="vector-5" alt="Vector" src={vector3} />
                <img className="vector-6" alt="Vector" src={vector4} />
                <img className="vector-7" alt="Vector" src={vector5} />
                <img className="vector-8" alt="Vector" src={vector6} />
                <img className="vector-9" alt="Vector" src={vector7} />
                <img className="vector-10" alt="Vector" src={vector8} />
                <div className="text-wrapper-3">Menu</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

HeaderPro.propTypes = {
  login: PropTypes.bool,
  text: PropTypes.string,
  line: PropTypes.string,
  bytesizeHome: PropTypes.string,
  hasFrame: PropTypes.bool,
  img: PropTypes.string,
  vector: PropTypes.string,
  vector1: PropTypes.string,
  vector2: PropTypes.string,
  vector3: PropTypes.string,
  vector4: PropTypes.string,
  vector5: PropTypes.string,
  vector6: PropTypes.string,
  vector7: PropTypes.string,
  vector8: PropTypes.string,
};
