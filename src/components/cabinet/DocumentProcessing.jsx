import React, { useState } from "react";
import "./DocumentProcessing.scss";
import MenuCabinet from "../../components/menuCabinet/MenuCabinet";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CabinetService from "./Services/CabinetServices";
function DocumentProcessing() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { fileNames } = location.state || {};
  const isImageFile = (fileName) => {
    const imageExtensions = ["jpg", "jpeg", "png", "svg"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };
  const passToNext = async () => {
    try {
        const responses = await CabinetService.updateDemandeStateByUserId(3);
        const storedUserJSON = localStorage.getItem('user');
        const storedUser = JSON.parse(storedUserJSON);
        storedUser.state = 3; // Mettez ici la nouvelle valeur de state
        const updatedUserJSON = JSON.stringify(storedUser);

        localStorage.setItem('user', updatedUserJSON);
        navigate("/cabinet/chooseOffer");     
      
    } catch (error) {
 
    } finally {
    
    }
  };
  return (
    <div className="documents">
      <div
        className="result-container"
        style={{
          direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
        }}
      >
        <MenuCabinet state="1" />
      </div>
      <div
        className="container"
        style={{
          direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
        }}
      >
        <div className="sous-container1">
          <h1>{t("documentProcessing")}</h1>
          <span>{t("inProgress")}</span>
        </div>

        <div className="sous-containerq">
          <div className="title">
            <img
              src="../../icons/info-circle.svg"
              alt="se connecter"
              style={{
                [localStorage.getItem("language") === "ar"
                  ? "marginLeft"
                  : "marginRight"]: "10px",
              }}
            />
            <h2> {t("documentsUnderReview")}</h2>
          </div>
          <div className="form-group">
            {Object.keys(fileNames).map((category) =>
              fileNames[category].map((fileName, index) => (
                <div className="file" key={`${category}-${index}`}>
                  <label className="file-label">
                    <img
                      src={
                        isImageFile(fileName)
                          ? "../../icons/camera.svg"
                          : "../../icons/document.svg"
                      }
                      alt="document icon"
                      style={{
                        marginLeft:
                          localStorage.getItem("language") === "ar"
                            ? "10px"
                            : "0px",
                        marginBottom: "4px",
                        marginRight:
                          localStorage.getItem("language") === "ar"
                            ? "0px"
                            : "10px",
                      }}
                    />
                    {fileName}
                  </label>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="butt">
        <button
          className="button"
          onClick={passToNext}
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
              {t("send")}
            </>
          ) : (
            <>
              {t("send")}
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

export default DocumentProcessing;
