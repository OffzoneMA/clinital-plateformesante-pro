import React, { useState } from "react";
import ConnexionService from "./services/ConnexionService";
import { toast } from "react-toastify";
import SuccessForgotPwd from "./SuccessForgotPwd";
import { validateEmail } from './rules/validation';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    birthdate: ""
  });

  const [resetSuccess, setResetSuccess] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validateDateNaissance = (formattedDate) => {
    // Vérifier que le format est "dd/mm/yyyy"
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!regex.test(formattedDate)) {
      return false;
    }

    // Vérifier que la date est valide (par exemple, pas le 31 février)
    const [day, month, year] = formattedDate.split("/").map(Number);
    const date = new Date(`${year}-${month}-${day}`);
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const formatInputDate = (value) => {
    // Retirer tout caractère qui n'est pas un chiffre ou '/'
    const cleanedValue = value.replace(/[^0-9/]/g, "");

    // Vérifier que le format est conforme à dd/mm/yyyy
    const isValidFormat = /^(\d{1,2}\/)?(\d{1,2}\/)?(\d{1,4})?$/.test(cleanedValue);

    if (!isValidFormat) {
      setBirthdateError(t("Enteryourdateofbirth"));
      setFormData({
        ...data,
        birthdate: ""
      });
    } else {
      resetFieldError('birthdate');
    }

    return cleanedValue;
  };

  const parseFormattedDate = (formattedDate) => {
    // Convertir le format jj/mm/aaaa en un objet Date
    const [day, month, year] = formattedDate.split("/");
    if (day && month && year) {
      return new Date(`${year}-${month}-${day}`);
    }
    return null; // Retourner null si le format est invalide
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setEmailError("");
    setBirthdateError("");

    if (!validateFields()) {

      setLoading(false);
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }

    if (!validateEmail(formData.email)) {
      setLoading(false);
      setEmailError("Veuillez saisir une adresse e-mail valide");
      return;
    }

    if(!validateDateNaissance(formData.birthdate)) {
      setLoading(false);
      setBirthdateError("Veuillez saisir une date de naissance valide");
      return;
    }

    const parsedDate = parseFormattedDate(formData.birthdate);
    const isoDate = parsedDate.toISOString();
    const formattedDate = isoDate.split('T')[0];

    const data = {
      proEmail: formData.email,
      dateNaissance: formattedDate
    };


    try {
      ConnexionService.ForgotPasswordPro(data)
        .then(response => {
          if (response.data.success === true) {
            //toast.success(response.data.message);
            setResetSuccess(true);
          } else {
            // toast.error(response.data.message);
            setErrorMessage(response.data.message);
          }
        })
        .catch(error => {
          // Capture and display backend errors
          if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Une erreur s'est produite lors de la réinitialisation du mot de passe:", error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer plus tard.");
      setLoading(false);
    }
  };



  /*const validateFields = () => {
  if (!formData.email || !formData.birthdate) {
    setErrorMessage("Veuillez remplir tous les champs.");
    return false;
  }

  // Réinitialiser le message d'erreur s'il est déjà affiché
  setErrorMessage("");

  return true;
};*/

  const validateFields = () => {
    if (errorMessage) {
      setErrorMessage(""); // Réinitialisation du message d'erreur 
      setFormData(prevState => ({
        ...prevState,
        email: "",
        birthdate: ""
      }));
    }

    if (!formData.email || !formData.birthdate) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return false;
    }
    return true;
  };


  const resetFieldError = (fieldName) => {
    if (fieldName === 'email') {
      setEmailError("");
    } else if (fieldName === 'birthdate') {
      setBirthdateError("");
    }
  };

  // Réinitialiser le champ apres un click
  const handleEmailFocus = () => {
    if (errorMessage) {
      setEmailError("");
      setFormData(prevState => ({
        ...prevState,
        email: "",
        birthdate: ""
      }));
    }
  };

  const handlebirthDateChange = (e) => {
    const { name, value } = e.target;
    const formattedDate = formatInputDate(value);
    const isValid = validateDateNaissance(formattedDate);
    if (isValid) {
      setFormData((prevState) => ({
        ...prevState,
        birthdate: formattedDate
      }));
      resetFieldError('birthdate');
    } else {
      setBirthdateError("Veuillez saisir une date de naissance valide");
    }
  }

  if (resetSuccess) {
    return <SuccessForgotPwd />;
  }

  return (
    <div className="register forget-passw">

      <div className="container" style={{ marginBottom: "160px", marginTop: "70px" }}>
        <div className="linear-border"></div>

        <h1>Mot de passe oublié ?</h1>
        <p className='title'>Renseignez les informations ci-dessous pour récupérer un nouveau mot de passe</p>
        <form className={errorMessage ? "invalid" : ""} onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="email">Adresse e-mail Clinital</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Saisir votre adresse e-mail"
              value={formData.email}
              // required
              className={emailError?.trim() !== "" ? 'error' : ""}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                resetFieldError('email');
              }}

              onFocus={handleEmailFocus}
            />

          </div>
          {errorMessage && <p invalid="error-message">{errorMessage}</p>}
          <div>
            <label htmlFor="birthdate">Date de naissance</label>
            <input
              type="text"
              id="birthdate"
              name="email"
              placeholder="JJ/MM/AAAA"
              className={birthdateError?.trim() !== "" ? "error" : ""}
              value={formData.birthdate}
              // required
              onChange={(e) => handlebirthDateChange(e)}
              onFocus={handleEmailFocus}
            />
          </div>
          <div className="une-question" onClick={() => navigate("/faq")}>
            <span className="ou">Ou</span>
            <span className="question">bien une question ? </span>
          </div>
          <button type="submit">
            {loading ? "Chargement..." : "Réinitialiser mon mot de passe"}
          </button>
        </form>
        {errorMessage && (
          <img
            src="../images/inv_mdp-img.png"
            alt=""
            style={{
              position: "absolute",
              width: "217.65px",
              height: "562px",
              top: "375px",
              gap: "0px",
              opacity: "0px",
              cursor: "pointer",
              left: errorMessage ? "15px" : "-217.65px",

            }}
          />
        )}

      </div>
      <div className="bg">
        <img src="../images/bg-fgp.png" alt="" />
      </div>
    </div>
  );
}

export default ForgotPassword;
