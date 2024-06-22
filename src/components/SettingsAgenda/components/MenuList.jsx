import React from "react";
import "./MenuList.scss";

export const MenuList = ({ textMenu = "Changer mon mot de passe", menuActive, className }) => {
  return (
    <div className={`menu-list ${className} ${menuActive ? 'menu-active-true' : 'menu-active-false'}`}>
      <p className="changer-mon-mot-de">{textMenu}</p>
    </div>
  );
};
