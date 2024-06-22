import React from "react";
import "./Group.scss";

export const Group = () => {
  return (
    <div className="group">
      <div className="text-wrapper-4">Agenda</div>
      <div className="button button-instance">
        <div className="div">
          <img
            src="../../icons/arrow.svg"
            alt="se connecter"
            className="arrow-right "
          />
          <div className="titre">Ajouter un créneau</div>
        </div>
      </div>
      <img
        className="line-2"
        alt="Line"
        src="https://c.animaapp.com/hExK9oUF/img/line-41.svg"
      />
    </div>
  );
};
