import React, { useState } from "react";
import "./PaymentOptions.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";
import Model, {
  ModelBody,
  ModelFooter,
  ModelHeader,
} from "../../components/Models/Model";
const PaymentOptions = () => {
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
      <div className="result-container">
        <MenuCabinet state="3" />
      </div>
      <div className="options">
        <h1> Payment</h1>
        <div className="payment-options">
          <h2>Choisir un mode de paiement</h2>
          <div className="payment-options-body">
            <div
              className={`payment-option ${
                selectedOption === "versement" ? "selected" : ""
              }`}
              onClick={() => handleOptionClick("versement")}
            >
              <span>
                {" "}
                <img src="../icons/bankNote.svg" alt="" className="icon" />
                Versement
              </span>
              {selectedOption === "versement" && (
                <div className="payment-details">
                  <hr />
                  <p>
                    <span className="label">Raison sociale </span> :{" "}
                    <strong> CLINITAL</strong>
                  </p>
                  <p>
                    <span className="label">RIB </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088 9891 0930 0183 8458{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
                        className="copyIcon"
                        onClick={() =>
                          handleCopyClick("5000 3088 9891 0930 0183 8458")
                        }
                      />
                    </strong>
                  </p>
                  <p>
                    <span className="label">Code Swift </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
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
                <img src="../icons/creditCard.svg" alt="" className="icon" />
                Carte bancaire
              </span>
              {selectedOption === "carte" && (
                <div className="payment-details">
                  <hr />
                  <p className="paragraphe">Cher partenaire,</p>
                  <p className="paragraphe">
                    Nous vous informons que vous serez redirigé(e) vers une page
                    extérieure sécurisée, afin de procéder au règlement de votre
                    abonnement.
                  </p>
                  <p className="paragraphe">
                    Nous vous remercions pour votre collaboration.
                  </p>
                  <button>Payer</button>
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
                <img src="../icons/wallet.svg" alt="" className="icon" />
                Transfert-Mandat cash
              </span>
              {selectedOption === "mandat" && (
                <div className="payment-details">
                  <hr />
                  <p>
                    <span className="label">Raison sociale </span> :{" "}
                    <strong> CLINITAL</strong>
                  </p>
                  <p>
                    <span className="label">RIB </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088 9891 0930 0183 8458{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
                        className="copyIcon"
                        onClick={() =>
                          handleCopyClick("5000 3088 9891 0930 0183 8458")
                        }
                      />
                    </strong>
                  </p>
                  <p>
                    <span className="label">Code Swift </span> :{" "}
                    <strong>
                      {" "}
                      5000 3088{" "}
                      <img
                        src="../icons/copy.svg"
                        alt=""
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
                selectedOption === "prelevement" ? "selected" : ""
              }`}
              onClick={() => {
                handleOptionClick("prelevement");
                setShowAutorisation(true);
              }}
            >
              <span>
                {" "}
                <img src="../icons/bank.svg" alt="" className="icon" />
                Prélèvement automatique
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="butt">
        <button
          className="button"
          style={{
            marginLeft: isArabic ? "325px" : "460px",
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
      <Model show={showAutorisation} setShow={setShowAutorisation}>
        {" "}
        <div className="container-addProche" style={{width:"636px",height:"614px"}}>
          <ModelHeader className="model-header">
            <h3 style={{fontFamily:"Montserrat",
              fontSize:"14.35px",
            fontWeight:"600",
            lineHeight:"16.8px",   
              marginLeft:"-30px",
            }}>Optez pour le prélèvement automatique pour une gestion simplifiée !  </h3>
          <img
            className="close-black"
            src="/icons/Icon-close.svg"
            alt=""
            style={{marginTop:"15px",
              width:"16px",
              height:"16px",
              marginLeft:"10px"
            }}
            onClick={() => {handleOptionClick("");
            setShowAutorisation(false);}}
          />
          </ModelHeader>
          <ModelBody className="model-body">
            <div>
              <p className="text">
                Cher partenaire,<br/><br/>
                 Nous sommes ravis de vous présenter une option
                de paiement plus pratique et efficace : le prélèvement
                automatique ! Optez dès maintenant pour cette méthode de
                paiement sécurisée et facilitez la gestion de vos transactions.<br/><br/>
                Le prélèvement automatique vous permettra de régler vos
                abonnements et paiements récurrents sans avoir à vous soucier de
                le faire manuellement. Fini les oublis de paiement ou les
                retards ! Une fois configuré, votre compte sera automatiquement
                débité selon les échéances convenues.<br/><br/>
                Pour activer le prélèvement automatique, il vous suffit de prendre contact avec
                nous en appuyant sur le bouton ci-dessous. Notre équipe dédiée
                sera enchantée de vous guider à travers le processus et de
                répondre à toutes vos questions.<br/><br/>
                Opter pour le prélèvement
                automatique, c'est choisir une solution pratique et sans tracas
                pour vos transactions régulières. Simplifiez votre gestion
                financière dès aujourd'hui !<br/><br/> Nous vous remercions de votre
                confiance et de votre préférence pour notre plateforme.
              </p>
            </div>
          </ModelBody>
          <ModelFooter>
            <div className="autorisation-footer">
              <button className="btn-Model">Contacter l’équipe Clinital</button>
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
