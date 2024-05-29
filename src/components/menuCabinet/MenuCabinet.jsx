import React, { useState } from "react";
import "./MenuCabinet.css"; // Assurez-vous de créer ce fichier CSS pour styliser votre navbar
import { useTranslation } from "react-i18next";

function Circle({ icon, selected, text, style }) {
  return (
    <div className={`circle ${selected ? "selected" : ""}`} style={style}>
      <img className="circle-icon" src={icon} alt="icon" />
      <div className={`circle-text ${selected ? "selected-text" : ""}`}>
        {text}
      </div>
    </div>
  );
}

function Line({ style }) {
  return <div className="line" style={style}></div>;
}

function MenuCabinet({ state }) {
  const selectedCircle = parseInt(state, 10);
  const { t } = useTranslation();

  return (
    <div className="menuclinital">
      <Circle
        icon={
          selectedCircle === 0
            ? "../../icons/homeCabinet.svg"
            : "../../icons/checkCabinet.svg"
        }
        selected={[0, 1, 2,3].includes(selectedCircle)}
        style={{
          backgroundColor: selectedCircle === 0 ? "#ffffff" : "#C989DD",
        }}
        text={t("monCabinet")}
      />
      <Line
        style={{
          borderColor: selectedCircle === 0 ? "#D9D8D8" : "#C989DD",
        }}
      />
      <Circle
        icon={
          selectedCircle === 1
            ? "../../icons/documentCabinetV.svg"
            : selectedCircle === 2 ||
              selectedCircle === 3 ||
              selectedCircle === 4
            ? "../../icons/checkCabinet.svg"
            : "../../icons/documentCabinet.svg"
        }
        selected={[1, 2,3].includes(selectedCircle)}
        text={t("monDocuments")}
        style={{
          backgroundColor:
            selectedCircle === 0 || selectedCircle === 1
              ? "#ffffff"
              : "#C989DD",
        }}
      />
      <Line
       style={{
        borderColor: selectedCircle === 0|| selectedCircle === 1 ? "#D9D8D8" : "#C989DD",
      }} />
      <Circle
        icon={
          selectedCircle === 2
            ? "../../icons/offreCabinetV.svg"
            : selectedCircle === 3 || selectedCircle === 4
            ? "../../icons/checkCabinet.svg"
            : "../../icons/offreCabinet.svg"
        }
        selected={[2,3].includes(selectedCircle)}
        text={t("choisirUneOffre")}
        style={{
          backgroundColor:
            selectedCircle === 0 || selectedCircle === 1|| selectedCircle === 2
              ? "#ffffff"
              : "#C989DD",
        }}
      />
      <Line 
        style={{
          borderColor: selectedCircle === 0|| selectedCircle === 1|| selectedCircle === 2 ? "#D9D8D8" : "#C989DD",
        }}/>
      <Circle
             icon={
              selectedCircle === 3
                ? "../../icons/paiementCabinettV.svg"
                : selectedCircle === 4 
                ? "../../icons/checkCabinet.svg"
                : "../../icons/paiementCabinet.svg"
            }
        selected={[3].includes(selectedCircle)}
        text={t("paiement")}
      />
      <Line />
      <Circle
        icon="../../icons/profilCabinet.svg"
        selected={selectedCircle === 4}
        text={t("publierMonProfil")}
      />
    </div>
  );
}

export default MenuCabinet;
