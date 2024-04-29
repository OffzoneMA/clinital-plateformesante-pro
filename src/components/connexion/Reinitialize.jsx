import React, { useState } from "react";
import Axios from "axios"; 
import ConnexionService from "./services/ConnexionService";
import { useParams,Redirect, Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { validatePassword } from './rules/validation';

function Reinitialize() {
   const { reset } = useParams();
  const [password, setPassword] = useState(""); // État pour stocker le nouveau mot de passe
  const [isSuccess, setIsSuccess] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");

  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };
const handlePasswordFocus = () => {
  setPassword(""); 
  setErrorMsg("");
  };
const handleSubmit = async (e) => {
  e.preventDefault();

   if (password.trim() === "") {
     //toast.error("Veuillez saisir un mot de passe");
      setErrorMsg("Veuillez saisir un mot de passe");
      return;
    }

    if (!validatePassword(password)) {
      //toast.error("Veuillez saisir un mot de passe de plus de 8 caractères");
      setErrorMsg("Veuillez saisir un mot de passe de plus de 8 caractères");
      
      return;
    }

  const params = new URLSearchParams(window.location.search);
  const resetToken = params.get('reset');

  // Mettez à jour l'URL de l'API avec le bon endpoint
  const url = `${process.env.BASE_URL}auth/resetpassword?reset=${resetToken}`;

  try {
    // Envoyez une requête à votre API pour réinitialiser le mot de passe
    const response = await Axios.post(url, { newPassword: password });

    // Gérez la réponse de l'API
    toast.success(response.data.message);
    setIsSuccess(true);
  } catch (error) {
    // Gérez les erreurs
    console.error(error);
  }
};



  return  isSuccess ? ( // Rediriger l'utilisateur si isSuccess est true
    <Navigate to="/login" />
  ) : (
    <div className="register forget-passw">
      <div className="container">
        <div className="linear-border"></div>

        <h1>Réinitialisation de votre mot de passe</h1>
        <p>Choisissez un nouveau mot de passe pour votre compte</p>

        <form className={errorMsg ? "invalid" : ""} onSubmit={handleSubmit}> 
          <div>
            <label htmlFor="password">Nouveau mot de passe </label>
            <input
                type="password"
                id="password"
                placeholder="Saisir votre nouveau mot de passe"
                value={password}
             
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
            />
            <img src="../icons/eye-off.png" alt="" onClick={togglePassw} />
            </div>
            {errorMsg && <p invalid="error-message">{errorMsg}</p>}
          <button type="submit">Se connecter</button> 
        </form>
      </div>
      <div className="bg">
        <img src="../images/bg-fgp.png" alt="" />
      </div>
    </div>
  );
}

export default Reinitialize;
