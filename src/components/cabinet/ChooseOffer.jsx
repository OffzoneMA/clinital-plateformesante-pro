import React, { useState } from "react";
import "./ChooseOffer.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CabinetService from "./Services/CabinetServices";
function ChooseOffer() {
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { t } = useTranslation();
    const handlePlanSelect = (plan) => {
      setSelectedPlan(plan);
    };
    const navigate = useNavigate();
    const isArabic = localStorage.getItem("language") === "ar";
    const passToNext = async () => {
      try {
          const responses = await CabinetService.updateDemandeStateByUserId(4);
          const storedUserJSON = localStorage.getItem('user');
          const storedUser = JSON.parse(storedUserJSON);
          storedUser.state = 4 ; // Mettez ici la nouvelle valeur de state
          const updatedUserJSON = JSON.stringify(storedUser);
  
          localStorage.setItem('user', updatedUserJSON);
          navigate("/cabinet/payment");     
        
      } catch (error) {
   
      } finally {
      
      }
    };
  return (
    <div className="chooseOffer">
      <div className="result-container"
       style={{
        direction: isArabic ? "rtl" : "ltr",
      }} >
        <MenuCabinet state="2" />
      </div>
      <div className="container">
        <h1
          style={{
            [isArabic? "right" : "left"]:
              "46px",
          }}
        >
           {t("choosePlan")}
        </h1>
        <div className="plans">
          <div className={`plan ${selectedPlan === "Médecin" ? "selected" : ""}`}>
            <img src="../images/cabinetpic.png" className="image" alt="" />
            {selectedPlan === "Médecin" && (
              <img src="../icons/RegistrationStep.svg" alt="" className="registration-icon" />
            )}
            <div className="plan-header"> {t("doctor")}</div>
            <div className="plan-price"> 20.000 €</div>
            <ul className={`plan-features ${isArabic ? "rtl" : "ltr"}`}>
              <li>
                <img src="../icons/miniagenda.svg" className="icon" alt="" />
                {t("onlineAgenda")}
              </li>
              <li>
                <img src="../icons/outil.svg" className="icon" alt="" />
                {t("appointmentTool")}
              </li>
              <li>
                {" "}
                <img src="../icons/coordination.svg" className="icon" alt="" />
                {t("coordinationTool")}
              </li>
              <li>
                {" "}
                <img src="../icons/rdv.svg" className="icon" alt="" />
                {t("onlineAppointments")}
              </li>
              <li>
                <img src="../icons/logiciel.svg" className="icon" alt="" />
                {t("interoperability")}
              </li>
            </ul>
            <button className="choose-button" onClick={() => handlePlanSelect("Médecin")} >{t("choose")}</button>
          </div>
          <div  className={`plan most-popular ${selectedPlan === "Cabinet" ? "selected" : ""}`}>
            <div className="most-popular-banner">{t("mostPopular")}</div>
            <img src="../images/clinique.png" className="imagepop" alt="" />
            {selectedPlan === "Cabinet" && (
              <img src="../icons/RegistrationStep.svg" alt="" className="registration-iconp" />
            )}
            <div className="plan-header">{t("cabinet")}</div>
            <div className="plan-price"> 20.000 €</div>
            <ul className={`plan-featuresp ${isArabic ? "rtl" : "ltr"}`}>
              <li>
                <img src="../icons/miniagenda.svg" className="icon" alt="" />
                {t("onlineAgenda")}
              </li>
              <li>
                <img src="../icons/outil.svg" className="icon" alt="" />
                {t("appointmentTool")}
              </li>
              <li>
                {" "}
                <img src="../icons/coordination.svg" className="icon" alt="" />
                {t("coordinationTool")}
              </li>
              <li>
                {" "}
                <img src="../icons/rdv.svg" className="icon" alt="" />
                {t("onlineAppointments")}
              </li>
              <li>
                <img src="../icons/logiciel.svg" className="icon" alt="" />
                {t("interoperability")}
              </li>
            </ul>
            <button className="choose-button"  onClick={() => handlePlanSelect("Cabinet")}>{t("choose")}</button>
          </div>
          <div className={`plan ${selectedPlan === "Centre de Santé" ? "selected" : ""}`}>
            <img src="../images/Centre.png" className="image" alt="" />
            {selectedPlan === "Centre de Santé" && (
              <img src="../icons/RegistrationStep.svg" alt="" className="registration-icon" />
            )}
            <div className="plan-header">{t("healthCenter")}</div>
            <div className="plan-price"> 20.000 €</div>
            <ul className={`plan-features ${isArabic ? "rtl" : "ltr"}`}>
              <li>
                <img src="../icons/miniagenda.svg" className="icon" alt="" />
                {t("onlineAgenda")}
              </li>
              <li>
                <img src="../icons/outil.svg" className="icon" alt="" />
                {t("appointmentTool")}
              </li>
              <li>
                {" "}
                <img src="../icons/coordination.svg" className="icon" alt="" />
                {t("coordinationTool")}
              </li>
              <li>
                {" "}
                <img src="../icons/rdv.svg" className="icon" alt="" />
                {t("onlineAppointments")}
              </li>
              <li>
                <img src="../icons/logiciel.svg" className="icon" alt="" />
                {t("interoperability")}
              </li>
            </ul>
            <button className="choose-button"  onClick={() => handlePlanSelect("Centre de Santé")}>{t("choose")}</button>
          </div>
        </div>
      </div>
      <div className="butt">
        <button
          className="button"
          onClick={passToNext}
          style={{
            
            marginLeft:
            isArabic ? "-910px" : "810px",
          }}
        >
          {isArabic ? (
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
             {t("nextStep")}
            </>
          ) : (
            <>
           {t("nextStep")}
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
