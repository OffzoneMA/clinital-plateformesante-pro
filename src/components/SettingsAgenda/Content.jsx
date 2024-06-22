import React from "react";
import "./Content.scss";
import { Group } from "./components/Group";

export const Content = () => {
  return (
    <div className="content">
      <Group/>
      <div className="frame-3">
      <table className="agenda-table">
        <thead>
          <tr>
            <th>JOUR</th>
            <th>DÉBUT</th>
            <th>FIN</th>
            <th>DURÉE</th>
            <th>CATÉGORIE</th>
            <th>MOTIF</th>
            <th>MODE/LIEU</th>
          </tr>
        </thead>
        <tbody>
          {/* Rows would be dynamically generated here */}
        </tbody>
      </table>
      </div>
      <div className="frame">
        <img className="img" alt="Frame" src="https://c.animaapp.com/BGaboWTw/img/frame.svg" />
        <div className="frame-2">
          <p className="vous-n-avez-aucune">Vous n&#39;avez aucune plage horaire disponible ou programmée</p>
          <div className="button-wrapper">
            <div className="button-2">
              <img  src="../../icons/circleplus.svg" className="plus-circle" />
              <div className="titre-2">Ajouter un créneau</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
