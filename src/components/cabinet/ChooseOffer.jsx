import React, { useState } from "react";
import "./ChooseOffer.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";

function ChooseOffer() {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handlePlanSelect = (plan) => {
      setSelectedPlan(plan);
    };
  return (
    <div className="chooseOffer">
      <div className="result-container">
        <MenuCabinet state="2" />
      </div>
      <div className="container">
        <h1
          style={{
            [localStorage.getItem("language") === "ar" ? "right" : "left"]:
              "46px",
          }}
        >
          Choose Plan
        </h1>
        <div className="plans">
          <div className={`plan ${selectedPlan === "Médecin" ? "selected" : ""}`}>
            <img src="../images/cabinetpic.png" className="image" alt="" />
            {selectedPlan === "Médecin" && (
              <img src="../icons/RegistrationStep.svg" alt="" className="registration-icon" />
            )}
            <div className="plan-header">Médecin</div>
            <div className="plan-price">€ 20.000</div>
            <ul className="plan-features">
              <li>
                <img src="../icons/miniagenda.svg" className="icon" alt="" />
                Agenda en ligne
              </li>
              <li>
                <img src="../icons/outil.svg" className="icon" alt="" />
                Outil de réduction des RDVs on honorés
              </li>
              <li>
                {" "}
                <img src="../icons/coordination.svg" className="icon" alt="" />
                Outils de coordination des soins
              </li>
              <li>
                {" "}
                <img src="../icons/rdv.svg" className="icon" alt="" />
                Prise de RDV en ligne pour vos patients
              </li>
              <li>
                <img src="../icons/logiciel.svg" className="icon" alt="" />
                Interopérabilité avec votre logiciel médical
              </li>
            </ul>
            <button className="choose-button" onClick={() => handlePlanSelect("Médecin")} >Choisir</button>
          </div>
          <div  className={`plan most-popular ${selectedPlan === "Cabinet" ? "selected" : ""}`}>
            <div className="most-popular-banner">Most Popular</div>
            <img src="../images/clinique.png" className="imagepop" alt="" />
            {selectedPlan === "Cabinet" && (
              <img src="../icons/RegistrationStep.svg" alt="" className="registration-iconp" />
            )}
            <div className="plan-header">Cabinet</div>
            <div className="plan-price">€ 20.000</div>
            <ul className="plan-featuresp">
              <li>
                <img src="../icons/miniagenda.svg" className="icon" alt="" />
                Agenda en ligne
              </li>
              <li>
                <img src="../icons/outil.svg" className="icon" alt="" />
                Outil de réduction des RDVs on honorés
              </li>
              <li>
                {" "}
                <img src="../icons/coordination.svg" className="icon" alt="" />
                Outils de coordination des soins
              </li>
              <li>
                {" "}
                <img src="../icons/rdv.svg" className="icon" alt="" />
                Prise de RDV en ligne pour vos patients
              </li>
              <li>
                <img src="../icons/logiciel.svg" className="icon" alt="" />
                Interopérabilité avec votre logiciel médical
              </li>
            </ul>
            <button className="choose-button"  onClick={() => handlePlanSelect("Cabinet")}>Choisir</button>
          </div>
          <div className={`plan ${selectedPlan === "Centre de Santé" ? "selected" : ""}`}>
            <img src="../images/Centre.png" className="image" alt="" />
            {selectedPlan === "Centre de Santé" && (
              <img src="../icons/RegistrationStep.svg" alt="" className="registration-icon" />
            )}
            <div className="plan-header">Centre de Santé</div>
            <div className="plan-price">€ 20.000</div>
            <ul className="plan-features">
              <li>
                <img src="../icons/miniagenda.svg" className="icon" alt="" />
                Agenda en ligne
              </li>
              <li>
                <img src="../icons/outil.svg" className="icon" alt="" />
                Outil de réduction des RDVs on honorés
              </li>
              <li>
                {" "}
                <img src="../icons/coordination.svg" className="icon" alt="" />
                Outils de coordination des soins
              </li>
              <li>
                {" "}
                <img src="../icons/rdv.svg" className="icon" alt="" />
                Prise de RDV en ligne pour vos patients
              </li>
              <li>
                <img src="../icons/logiciel.svg" className="icon" alt="" />
                Interopérabilité avec votre logiciel médical
              </li>
            </ul>
            <button className="choose-button"  onClick={() => handlePlanSelect("Centre de Santé")}>Choisir</button>
          </div>
        </div>
      </div>
      <div className="butt">
        <button
          className="button"
          style={{
            marginLeft:
              localStorage.getItem("language") === "ar" ? "325px" : "810px",
          }}
        >
          {localStorage.getItem("language") === "ar" ? (
            <>
              <img
                src="../../icons/flech-white-left.svg"
                alt="send"
                style={{
                  marginRight: "10px",
                  marginTop: "3px",
                  width: "14px",
                  height: "14px",
                }}
              />
             L'étape suivante
            </>
          ) : (
            <>
            L'étape suivante
              <img
                src="../../icons/flech-white.svg"
                alt="send"
                style={{
                  marginLeft: "10px",
                  marginTop: "3px",
                  width: "14px",
                  height: "14px",
                }}
              />
            </>
          )}
        </button>
        </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}
export default ChooseOffer;
