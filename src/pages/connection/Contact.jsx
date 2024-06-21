import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/navbar/Navbar";
import MiniFooter from "../../components/footer/MiniFooter";
import ConnexionService from "../../components/connexion/services/ConnexionService";
import {
  validateEmail,
  validatePhone,
} from "../../components/connexion/rules/validation";
import "./Contact.scss"
function Contact() {
  const [loading, setLoading] = useState(false); //une opération est en cours de chargement.
  const [errors, setErrors] = useState({
    phoneError: false,
    emailError: false,
    prenomError: false,
    nomError: false,
  });
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    nom_med: "",
    prenom_med: "",
    mail: "",
    phonenumber: "",
    message: "",
  });

  const createRequest = (e) => {
    e.preventDefault();
    setLoading(true);

    setErrors({
      phoneError: !validatePhone(formData.phonenumber),
      emailError: !validateEmail(formData.mail),
      prenomError: formData.prenom_med.trim() === "",
      nomError: formData.nom_med.trim() === "",
    });

    if (
      !validatePhone(formData.phonenumber) ||
      !validateEmail(formData.mail) ||
      formData.prenom_med.trim() === "" ||
      formData.nom_med.trim() === ""
    ) {
      setLoading(false);
      return;
    }

    console.log("data:", formData);

    ConnexionService.createrequest(formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="connexion">
      <Navbar />
      <div className="register contact"      style={{
        direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
      }}>
        <div className="container">
          <div className="linear-border"></div>
          <h1 style={{ marginBottom: "30px" }}>{t("contactUs")}</h1>

          <form onSubmit={createRequest}>
            <div
              className="btns"
              style={{
                marginTop: "-8px",
                width:"100%",
              }}
            >
              <div    style={{
                width:"100%",
              }}>
                <label htmlFor=""> {t("firstName")}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t("placeholderPrenom")}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      prenom_med: e.target.value,
                    });
                    setErrors({
                      phoneError: !validatePhone(formData.phonenumber),
                      emailError: !validateEmail(formData.mail),
                      prenomError: formData.prenom_med.trim() === "",
                      nomError: formData.nom_med.trim() === "",
                    });
                  }}
                />
                {errors.prenomError && (
                  <span className="err">
                    <br />
                    {t("requiredFirstName")}
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="">{t("lastName")}</label>
                <input
                  type="text"
                  name=""
                  placeholder={t("placeholderNom")}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      nom_med: e.target.value,
                    });
                    setErrors({
                      phoneError: !validatePhone(formData.phonenumber),
                      emailError: !validateEmail(formData.mail),
                      prenomError: formData.prenom_med.trim() === "",
                      nomError: formData.nom_med.trim() === "",
                    });
                  }}
                />
                {errors.nomError && (
                  <span className="err">
                    <br />
                    {t("requiredLastName")}
                  </span>
                )}
              </div>
            </div>
            <div className="adresse">
              <label htmlFor="telephone">{t("phoneNumber")} </label>
              <input
                type="tele"
                id="telephone"
                placeholder={t("placeholderPhoneNumber")}
                value={formData.phonenumber}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    phonenumber: e.target.value,
                  });
                  setErrors({
                    phoneError: !validatePhone(formData.phonenumber),
                    emailError: !validateEmail(formData.mail),
                    prenomError: formData.prenom_med.trim() === "",
                    nomError: formData.nom_med.trim() === "",
                  });
                }}
              />
            </div>
            {errors.phoneError && (
              <span className="err"> {t("invalidPhoneNumber")}</span>
            )}

            <div className="adresse">
              <label htmlFor="email">{t("emailAddress")}</label>
              <input
                type="text"
                id="email"
                placeholder={t("placeholderEmail")}
                value={formData.mail}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    mail: e.target.value,
                  });
                  setErrors({
                    phoneError: !validatePhone(formData.phonenumber),
                    emailError: !validateEmail(formData.mail),
                    prenomError: formData.prenom_med.trim() === "",
                    nomError: formData.nom_med.trim() === "",
                  });
                }}
              />
            </div>
            {errors.emailError && (
              <span className="err"> {t("invalidEmail")}</span>
            )}
            <div className="adresse">
              <label htmlFor="message">{t("yourMessage")} </label>
              <input
                type="text"
                id="message"
                placeholder={t("enterYourMessage")}
                value={formData.message}
                style={{ height: "114px",
                 }}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  });
                }}
              />
            </div>
           
            <button type="submit">
              {t("send")}
              {localStorage.getItem("language") === "ar" ? (
                <img src="../icons/flech-white-left.svg" alt="se connecter" />
              ) : (
                <img src="../icons/flech-white.svg" alt="se connecter" />
              )}
            </button>
          </form>
        </div>
        <div className="bg">
          <img src="../images/bg-fgp.png" alt="" />
        </div>
      </div>

      <MiniFooter />
    </div>
  );
}

export default Contact;
