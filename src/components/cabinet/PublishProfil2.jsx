import React, { useState } from "react";
import "./PublishProfil2.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";
import { useTranslation } from "react-i18next";

function PublishProfil2() {
  const [isRegisred, setisRegistred] = useState(false);
  const { t } = useTranslation();
  const isArabic = localStorage.getItem("language") === "ar";
  return (
    <div className="publishProfilP">
      <div
        className="result-container"
        style={{
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        <MenuCabinet state="4" />
      </div>
      {!isRegisred ? (
        <div
          className="containerP"
          style={{
            direction: isArabic ? "rtl" : "ltr",
          }}
        >
          <div className="divP">
            <div className="div-2P">
              <div className="titreP">{t("publierMonProfil")}</div>
              <p className="text-wrapperP">{t("publier_mon_profil")}</p>
            </div>
            <div className="div-3P">
              <img
                className="ellipseP"
                alt="Ellipse"
                src="../../icons/doctor.svg"
              />
              <div className="div-4P">
                <div className="text-wrapper-2P">Dr Démos CLINITAL</div>
                <div className="text-wrapper-3P">Médecin généraliste</div>
              </div>
            </div>
          </div>
          <hr className="lineP" alt="Line" />
          <div className="div-5P">
            <img className="imgP" alt="Frame" src="../../icons/Frame.svg" />
            <div className="div-6P">
              <div className="flexcontainerP">
                <p className="textP">
                  <span className="spanP">
                    {t("bienvenue_sur_clinital")} <br />
                  </span>
                </p>
                <p className="textP">
                  <span className="text-wrapper-4P">
                    {t("en_cliquant_sur_le_bouton")}
                    <br />
                    {t("users")}
                    <br />
                    {t("nous_vous_remercions")}
                  </span>
                </p>
              </div>
              <div className="buttonP" onClick={() => setisRegistred(true)}>
                <div className="button-2P">
                  <div className="titre-2P"> {t("publier")}</div>
                  {isArabic ? (
                    <img
                      className="plus-circleP"
                      alt="plus-circle"
                      src="../../icons/flech-white-left.svg"
                    />
                  ) : (
                    <img
                      className="plus-circleP"
                      alt="plus-circle"
                      src="../../icons/flech-white.svg"
                    />
                  )}
                
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="containerS"
          style={{
            direction: isArabic ? "rtl" : "ltr",
          }}
        >
          <p className="text-wrapperS">
            {t("felicitations")} <br />
            {t("votre_profil_a_ete_publie")}
          </p>
          <img className="checkS" alt="Check" src="../icons/check.svg" />
          <div className="groupS">
            <div className="overlap-groupS">
              <div className="buttonS">
                <div className="button-2S">
                  <div className="titre-2S"> {t("voir_mon_profil")}</div>
                </div>
              </div>
              <img
                className="funnyS"
                alt="Funny"
                src="../images/suc_mdp-img.png"
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default PublishProfil2;
