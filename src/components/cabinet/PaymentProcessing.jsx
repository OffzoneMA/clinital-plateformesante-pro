import React, { useState } from "react";
import "./PaymentProcessing.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

function PaymentProcessing() {
  const { t } = useTranslation();

  return (
    <div className="documents">
      <div
        className="result-container"
        style={{
          direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
        }}
      >
        <MenuCabinet state="3" />
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

        <div className="sous-container2">
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
            <h2> {t("demandUnderReview")}</h2>
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

export default PaymentProcessing;
