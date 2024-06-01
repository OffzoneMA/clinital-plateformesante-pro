import React from "react";
import "./PublishProfil1.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";
import { useTranslation } from "react-i18next";

function PublishProfil1() {
  const { t } = useTranslation();
  const isArabic = localStorage.getItem("language") === "ar";
  return (
    <div className="publishProfil">
      <div className="result-container"  style={{
        direction: isArabic ? "rtl" : "ltr",
      }}>
        <MenuCabinet state="4" />
      </div>
      <div className="container" style={{
        direction: isArabic ? "rtl" : "ltr",
      }}>
      <div className="div">
        <div className="div-2">
          <div className="titre">{t('publierMonProfil')}</div>
          <p className="text-wrapper">{t('configurerMonAgenda')}</p>
        </div>
        <div className="div-3">
          <img className="ellipse" alt="Ellipse" src="../../icons/doctor.svg" />
          <div className="div-4">
            <div className="text-wrapper-2">Dr Démos CLINITAL</div>
            <div className="text-wrapper-3">Médecin généraliste</div>
          </div>
        </div>
      </div>   
      <hr className="line" alt="Line"  />
      <div className="div-5">
        <img className="img" alt="Frame" src="../../icons/Frame.svg" />
        <div className="div-6">
          <p className="pour-publier-votre">
          {t('pour_publier_votre_profil_sur_clinital')}
            <br />
            {t('veuillez_parametrer_votre_agenda')}
          </p>
          <div className="button">
            <div className="button-2">
            <img className="plus-circle" alt="plus-circle" src="../../icons/plus-circle.svg" />
              <div className="titre-2"> {t('ajouter_un_creneau')}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default PublishProfil1;
