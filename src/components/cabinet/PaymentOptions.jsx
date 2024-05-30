import React, { useState } from "react";
import "./PaymentOptions.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";
import Model, {
  ModelBody,
  ModelFooter,
  ModelHeader,
} from "../../components/Models/Model";
import { useTranslation } from "react-i18next";
import { auto } from "@popperjs/core";

const PaymentOptions = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState(null);
  const isArabic = localStorage.getItem("language") === "ar";
  const [showAutorisation, setShowAutorisation] = useState(false);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };
  const handleCopyClick = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {})
      .catch((err) => {});
  };
  return (
    <div className="payment">
      <div
        className="result-container"
        style={{
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        <MenuCabinet state="3" />
      </div>
      <div
        className="options"
        style={{
          direction: isArabic ? "rtl" : "ltr",
        }}
      >
        <h1> {t("paiement")}</h1>
        <div className="payment-options">
          <h2
            style={{
              textAlign: isArabic ? "right" : "left",
              [isArabic ? "marginRight" : "marginLeft"]: "10px",
            }}
          >
            {t("paymentMethodTitle")}
          </h2>
          <div className="payment-options-body">
            <div
              className={`payment-option ${
                selectedOption === "versement" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("versement")}
            >
              <span>
                {" "}
                <img
                  src="../icons/bankNote.svg"
                  alt=""
                  className="icon"
                  style={{
                    [isArabic ? "marginLeft" : "marginRight"]: "10px",
                  }}
                />
                {t("bankTransfer")}
              </span>
              {selectedOption === "versement" && (
                <div className="payment-details">
                  <hr />
                  <p>
                    <span className="label">{t("companyName")} </span> :{" "}
                    <strong> {t("CLINITAL")}</strong>
                  </p>
                  <p>
                    <span className="label">{t("RIB")} </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088 9891 0930 0183 8458{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
                        className="copyIcon"
                        style={{
                          [isArabic ? "marginRight" : "marginLeft"]: "5px",
                        }}
                        onClick={() =>
                          handleCopyClick("5000 3088 9891 0930 0183 8458")
                        }
                      />
                    </strong>
                  </p>
                  <p>
                    <span className="label">{t("swiftCode")} </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
                        style={{
                          [isArabic ? "marginRight" : "marginLeft"]: "5px",
                        }}
                        className="copyIcon"
                        onClick={() => handleCopyClick("5000 3088")}
                      />
                    </strong>
                  </p>
                </div>
              )}
            </div>
            <div
              className={`payment-option ${
                selectedOption === "carte" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("carte")}
            >
              <span>
                {" "}
                <img
                  src="../icons/creditCard.svg"
                  alt=""
                  className="icon"
                  style={{
                    [isArabic ? "marginLeft" : "marginRight"]: "10px",
                  }}
                />
                {t("creditCard")}
              </span>
              {selectedOption === "carte" && (
                <div className="payment-details">
                  <hr />
                  <p className="paragraphe"> {t("dearPartner")}</p>
                  <p className="paragraphe">{t("redirectMessage")}</p>
                  <p className="paragraphe">{t("thankYouCollaboration")}</p>
                  <button>{t("payNow")}</button>
                </div>
              )}
            </div>
            <div
              className={`payment-option ${
                selectedOption === "mandat" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("mandat")}
            >
              <span>
                {" "}
                <img
                  src="../icons/wallet.svg"
                  alt=""
                  className="icon"
                  style={{
                    [isArabic ? "marginLeft" : "marginRight"]: "10px",
                  }}
                />
                {t("cashTransfer")}
              </span>
              {selectedOption === "mandat" && (
                <div className="payment-details">
                  <hr />
                  <p>
                    <span className="label">{t("companyName")} </span> :{" "}
                    <strong> {t("CLINITAL")}</strong>
                  </p>
                  <p>
                    <span className="label">{t("RIB")} </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088 9891 0930 0183 8458{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
                        className="copyIcon"
                        style={{
                          [isArabic ? "marginRight" : "marginLeft"]: "5px",
                        }}
                        onClick={() =>
                          handleCopyClick("5000 3088 9891 0930 0183 8458")
                        }
                      />
                    </strong>
                  </p>
                  <p>
                    <span className="label">{t("swiftCode")} </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
                        className="copyIcon"
                        style={{
                          [isArabic ? "marginRight" : "marginLeft"]: "5px",
                        }}
                        onClick={() => handleCopyClick("5000 3088")}
                      />
                    </strong>
                  </p>
                </div>
              )}
            </div>
            <div
              className={`payment-option ${
                selectedOption === "prelevement" ? "selected" : ""
              }`}
              onClick={() => {
                handleOptionClick("prelevement");
                setShowAutorisation(true);
              }}
            >
              <span>
                {" "}
                <img
                  src="../icons/bank.svg"
                  alt=""
                  className="icon"
                  style={{
                    [isArabic ? "marginLeft" : "marginRight"]: "10px",
                  }}
                />
                {t("automaticWithdrawal")}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="butt">
        <button
          className="button"
          style={{
            marginLeft: isArabic ? "-510px" : "460px",
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
      <Model show={showAutorisation} setShow={setShowAutorisation}>
        {" "}
        <div
          className="container-addProche"
          style={{
            width: "636px",
            height: auto,
            direction: isArabic ? "rtl" : "ltr",
            paddingBottom: "25px",
          }}
        >
          <ModelHeader className="model-header">
            <h3
              style={{
                fontFamily: "Montserrat",
                fontSize: "14.35px",
                fontWeight: "600",
                lineHeight: "16.8px",
                marginLeft: "-30px",
              }}
            >
              {t("optForAutomaticWithdrawal")}{" "}
            </h3>
            <img
              className="close-black"
              src="/icons/Icon-close.svg"
              alt=""
              style={{
                marginTop: "16px",
                width: "16px",
                height: "16px",
                [isArabic ? "left" : "right"]: "15px",
                [isArabic ? "marginLeft" : "marginRight"]: "30px",
              }}
              onClick={() => {
                handleOptionClick("");
                setShowAutorisation(false);
              }}
            />
          </ModelHeader>
          <ModelBody className="model-body">
            <div>
              <p
                className="text"
                style={{
                  textAlign: isArabic ? "right" : "left",
                }}
              >
                {t("dearPartner")}
                <br />
                <br />
                {t("automaticWithdrawalDescription")}
                <br />
                <br />
                {t("benefitsOfAutomaticWithdrawal")}
                <br />
                <br />
                {t("activateAutomaticWithdrawal")}
                <br />
                <br />
                {t("chooseConvenience")}
                !<br />
                <br />
                {t("thankYouForTrust")}
              </p>
            </div>
          </ModelBody>
          <ModelFooter>
            <div className="autorisation-footer">
              <button
                className="btn-Model"
                onClick={() => (window.location = "/contact")}
              >
                {t("contactClinitalTeam")}
              </button>
            </div>
          </ModelFooter>
        </div>
      </Model>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
};

export default PaymentOptions;
