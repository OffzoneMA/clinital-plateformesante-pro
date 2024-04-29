import React from "react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import "./login.scss";

const SecondLoginForm = ({ cnxSecondForm, error,setError, setUserCredentials,
  togglePassw, connexion, loading, conxBtn,email }) => {


  
  console.log("seconde form",email);
   const handleConnexion = (e) => {
    e.preventDefault();

  
    // Procéder à la connexion
    connexion(e);
  };

  //reinitialiser les valuers pour retourner au premier form
  const handleFirstFormFocus = () => {
   
    setError(false);
   
    setUserCredentials({ email: "", password: "" });
  };

  //Ce formulaire est afficher seulement en cas d'erreur sur l'email  et le password sont inccorectes
  return (
      <div className="login">
        <img src="../images/inv_mdp-img.png" alt="" style={{
              position: "absolute",
              width: "217.65px",
              height: "562px",
              top: "150px",
              left: "-120px",
              gap: "0px",
              opacity: "0px",
              cursor: "pointer",
              right: "15px",
              bottom: "14px"
            }} />
          
        <div className="container">
        <div className="linear-border"></div>
             <h1>J'ai déjà un compte Clinital</h1>
              <form ref={cnxSecondForm} className="invalid">
                <div>
                 
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              required
              //onFocus={() => cnxSecondForm.current.classList.remove("invalid")}
              onFocus={handleFirstFormFocus}
              onChange={(e) => {
              
                setUserCredentials((x) => {
                  return { ...x, email: e.target.value };
                });
                
              }}
               
            />
          
              </div>
              {error === "no_account" && (
                  <p>L'adresse email saisie n'est associée à aucun compte Clinital</p>
                )}
                <div>
                <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="on"
                placeholder="Saisir votre mot de passe"
                required
                minLength="8"
                onFocus={handleFirstFormFocus}
                onChange={(e) => {
                  
                  setUserCredentials((x) => {
                    return { ...x, password: e.target.value };
                  });
                }}
                  
                />
                  <img src="../../icons/eye-off.png" alt="" onClick={togglePassw} />
                
              </div>
              {error === "incorrect_password" && (
                  <p>Veuillez vérifier les informations saisies, puis réessayez !</p>
                )}
                <div className="checkbox">
                            <input type="checkbox" id="remembre" />
                            <label htmlFor="remembre">Se souvenir de mon identifiant</label>
          </div>
          

          <button ref={conxBtn} onClick={handleConnexion}>
              {loading ? (
                "Connection..."
              ) : (
                <>
                  Se Connecter
                  <img src="../../icons/flech-white.svg" alt="se connecter" />
                </>
              )}
          </button>
              
                <Link to="forgot-password">Mot de passe oublié ?</Link>
                <div className="subForm">
                  <h2>Nouveau sur Clinital ?</h2>
                  <Link to="inscription">S’inscrire sur Clinital</Link>
                </div>
            
              </form>
      </div>
      
   </div>
        
  );
};

export default SecondLoginForm;
