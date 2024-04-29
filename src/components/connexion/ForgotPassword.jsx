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
       setErrorMessage("Veuillez saisir une adresse e-mail valide");
     
      
      return;
    }
   
    const isoDate = new Date(formData.birthdate).toISOString();
    const formattedDate = isoDate.split('T')[0];
    const data = {
      patientEmail: formData.email,
      dateNaissance: formattedDate
    };


    try {
      ConnexionService.ForgotPassword(data)
        .then(response => {
          if (response.data.success===true) {
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
    setErrorMessage(""); 
    setFormData(prevState => ({
      ...prevState,
      email: "", 
      birthdate: "" 
    }));
  }
};

  if (resetSuccess) {
    return <SuccessForgotPwd />;
  }

  return (
    <div className="register forget-passw">
       
      <div className="container" style={{ marginBottom: "160px", marginTop: "70px" }}>
       <div className="linear-border"></div>
        
        <h1>Mot de passe oublié ?</h1>
        <p>Renseignez les informations ci-dessous pour récupérer un nouveau mot de passe</p>
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
              type="date"
              id="birthdate"
              name="email"
              placeholder="Saisir votre date de naissance"
              value={formData.birthdate}
             // required
              onChange={(e) => {
                setFormData({ ...formData, birthdate: e.target.value });
                resetFieldError('birthdate');
              }}
              onFocus={handleEmailFocus}
            />
          
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
