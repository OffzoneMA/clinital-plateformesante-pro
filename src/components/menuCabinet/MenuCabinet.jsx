import React, { useState } from 'react';
import './MenuCabinet.css'; // Assurez-vous de créer ce fichier CSS pour styliser votre navbar
import { useTranslation } from 'react-i18next';

function Circle({ icon, selected,text,style}) {
  return (
    <div className={`circle ${selected ? 'selected' : ''}`} style={style}>
      <img className="circle-icon" src={icon} alt="icon" />
      <div className={`circle-text ${selected ? 'selected-text' : ''}`}>{text}</div> 
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
      <Circle icon={selectedCircle === 0?"../../icons/homeCabinet.svg":"../../icons/checkCabinet.svg"} selected={selectedCircle === 0 || selectedCircle === 1} style={{ 
         backgroundColor: selectedCircle === 1 ? "#C989DD" : "#ffffff", }} text= {t("monCabinet")} />
      <Line style={{ 
        borderColor: selectedCircle === 1 ? "#C989DD" : "#D9D8D8",
      }} />
      <Circle icon={selectedCircle === 1?"../../icons/documentCabinetV.svg":"../../icons/documentCabinet.svg"} selected={selectedCircle === 1}  text= {t("monDocuments")}/>
      <Line />
      <Circle icon="../../icons/offreCabinet.svg" selected={selectedCircle === 2}  text= {t("choisirUneOffre")}/>
      <Line />
      <Circle icon="../../icons/paiementCabinet.svg" selected={selectedCircle === 3} text= {t("paiement")} />
      <Line />
      <Circle icon="../../icons/profilCabinet.svg" selected={selectedCircle === 4} text= {t("publierMonProfil")}/>
    </div>
  );
}

export default MenuCabinet;

