import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./login.scss";
import ConnexionService from "./services/ConnexionService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../utils/redux/GlobalSlice";
import SecondLoginForm from "./SecondLoginForm";

function Login({ comp, setStep, setIsConnected }) {
  const cnx = useRef();
  const cnxSecondForm = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); //Etat de la gestion des erreurs
  const [rememberMe, setRememberMe] = useState(false); //Se souvenir de moi etat

  const conxBtn = useRef();
  const logintoggle = useSelector((state) => state.global.logintoggle);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.global.user);
  const handleEmailChange = (email) => {
    console.log("Email saisi :", email);
  };

  //Gerer la partie se souvenir de moi
  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    console.log("Email saisi :", storedEmail);
    if (storedEmail) {
      setUserCredentials((prevState) => ({ ...prevState, email: storedEmail }));
      setRememberMe(true);
    }
  }, []);

  // LogIn
  const connexion = async (e) => {
    e.preventDefault();

    // Inputs validity check
    if (!toggleError()) return false;

    handleEmailChange(userCredentials.email);

    try {
      // Inputs validity check
      setLoading(true);
      console.log(userCredentials);
      ConnexionService.signin(userCredentials)
        .then((response) => {
          console.log(response);

          if (response.data.token) {
            const data = {
              email: response.data.email,
              id: response.data.id,
              role: response.data.role,
              telephone: response.data.telephone,
              token: response.data.token,
              type: response.data.type,
              state: response.data.state,
            };

            if (
              data.role === "ROLE_MEDECIN" ||
              data.role === "ROLE_SECRETAIRE"
            ) {
              dispatch(setUser(data));

              setError(false);
              if (comp !== "priseRdv") {
                if (data.state === 1) {
                  window.location = "/cabinet";
                } else if (data.state === 2) {
                  window.location = "/cabinet/mydocuments";
                } else if (data.state === 3) {
                  window.location = "/cabinet/chooseOffer";
                } else if (data.state === 4) {
                  window.location = "/cabinet/chooseOffer";
                } else if (data.state === 5) {
                  window.location = "/cabinet/mydocuments";
                } else if (data.state > 5) {
                  window.location = "/acceuil";
                }
              } else {
                setStep(3);
                setIsConnected(user);
              }
              // comp === "priseRdv" && addRdv(e, user, 'conx');
              // comp === "priseRdv" && setRdvLoading(true);

              if (error === "no_account" || error === "incorrect_password") {
                return;
              }
            } else {
              toast.error("Ouups! Vous n'êtes ni Praticient ni Secretaire");
              return false;
            }
          } else {
            // Handle other types of error messages here
            const errorMessage = response.data.message;
            if (errorMessage === "no_account") {
              setError("no_account");
            } else if (errorMessage === "incorrect_password") {
              setError("incorrect_password");
            } else {
              setError(true);
              toast.error(errorMessage);
            }
          }
          /*else {
                setError(true);
                toast.error(response.data.message);
          }*/
        })
        .catch((error) => {
          toast.error("Ouups! Somethig Went Wrong : " + error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
      setError(err.message);
    }
  };

  // Hide/show error
  /*const toggleError = () => {
    const allInputs = [...cnx.current.querySelectorAll("input")];
    const allValid = !allInputs.some((input) => !input.validity.valid);
    !allValid && cnx.current.classList.add("invalid");

    return allValid;
  };*/

  const toggleError = () => {
    // Vérifier si cnxSecondForm.current est défini, sinon utiliser cnx.current
    const currentForm = cnxSecondForm.current
      ? cnxSecondForm.current
      : cnx.current;

    const allInputs = [...currentForm.querySelectorAll("input")];
    const allValid = !allInputs.some((input) => !input.validity.valid);
    !allValid && currentForm.classList.add("invalid");

    return allValid;
  };

  // Hide/show password
  const togglePassw = (e) => {
    const input = e.target.parentElement.querySelector("input");
    input.type === "password"
      ? (input.type = "text")
      : (input.type = "password");
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberedEmail");
    }
  };

  return (
    <div className="login">
      {error && (error === "no_account" || error === "incorrect_password") && (
        <SecondLoginForm
          cnxSecondForm={cnxSecondForm}
          error={error}
          setError={setError}
          setUserCredentials={setUserCredentials}
          togglePassw={togglePassw}
          connexion={connexion}
          loading={loading}
          conxBtn={conxBtn}
          email={userCredentials.email}
        />
      )}

      {!(error === "no_account" || error === "incorrect_password") && (
        <div className="container">
          <div className="linear-border"></div>
          <h1>J'ai déjà un compte Clinital</h1>
          {console.log(logintoggle)}

          <form ref={cnx} className={error ? "invalid" : ""}>
            <div>
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Saisir votre adresse e-mail"
                required
                onFocus={() => cnx.current.classList.remove("invalid")}
                onChange={(e) => {
                  setUserCredentials((x) => {
                    return { ...x, email: e.target.value };
                  });
                }}
              />
            </div>
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
                onFocus={() => cnx.current.classList.remove("invalid")}
                onChange={(e) => {
                  setUserCredentials((x) => {
                    return { ...x, password: e.target.value };
                  });
                }}
              />
              <img src="../../icons/eye-off.png" alt="" onClick={togglePassw} />
            </div>

            <p>Adresse e-mail ou mot de passe incorrect, veuillez réessayer</p>
            <div className="checkbox">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <label htmlFor="remember">Se souvenir de mon identifiant</label>
            </div>
            <button ref={conxBtn} onClick={(e) => connexion(e)}>
              {loading ? (
                "Connection..."
              ) : (
                <>
                  Se Connecter
                  <img src="../../icons/flech-white.svg" alt="se connecter" />
                </>
              )}
            </button>
          </form>
          <div className="btnsocial">
            <div className="btns">
              <button>
                <img src="/images/Facebook.png" alt="connexion avec facebook" />
              </button>
              <button>
                <img src="/images/Google.png" alt="connexion avec google" />
              </button>
            </div>

            <Link to="forgot-password">Mot de passe oublié ?</Link>

            <div className="subForm">
              <h2>Nouveau sur Clinital ?</h2>
              <Link to="demande">S’inscrire sur Clinital</Link>
            </div>
          </div>

          {comp !== "priseRdv" && (
            <img src="../../images/connexion-img.png" alt="" />
          )}
        </div>
      )}
      {comp !== "priseRdv" &&
        (!logintoggle ? (
          <div className="bg">
            <img src="../../images/connexion-bg.png" alt="" />
          </div>
        ) : null)}
      {comp === "priseRdv" && (
        <div className="close-btn" onClick={() => navigator(-1)}></div>
      )}
    </div>
  );
}

export default Login;
