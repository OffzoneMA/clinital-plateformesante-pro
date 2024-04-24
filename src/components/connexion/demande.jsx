import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePhone,
  validatePassword,
} from "./rules/validation";
import { useDispatch, useSelector } from "react-redux";
import Mark from "mark.js";
import SearchServices from "../searchBarDoc/SearchServices/SearchServices";
import { setSpecialite, setVilles } from "../../utils/redux/GlobalSlice";
import "./Demande.scss";
function Demande() {
  const [isAccepted, setIsAccepted] = useState(false); //les conditions générales
  const [isRegistered, setIsRegistered] = useState(false); //Enregistrement du user
  const [loading, setLoading] = useState(false); //une opération est en cours de chargement.
  const [isSame, setIsSame] = useState(true); //verifie si les deux mots de passe sont identiques
  const dispatch=useDispatch();
  const [search, setSearch] = useState({
    city: "",
    spec: "",
  });
  const citySearchContainer = useRef();
  const specSearchContainer = useRef();
  const [formData, setFormData] = useState({
    nom_med: "",
    prenom_med: "",
    mail: "",
    role: "ROLE_PATIENT",
  });
  const [city,setCity]=useState([{}])
  const [spec,setSpec]=useState([{}])

  const cnx = useRef();

  useEffect(() => {
    try {
      setLoading(true)
     SearchServices.getAllCities().then((res)=>{
      console.log(res.data)
        setCity(res.data)
        dispatch(setVilles(res.data))
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(()=>{
        setLoading(false)
      });
      
    } catch (error) {
      toast.error(error.message)
    }
    try{

    SearchServices.getAllSpecialities().then((res)=>{
      console.log(res)
        setSpec(res.data)
        dispatch(setSpecialite(res.data))
      }).catch((error)=>{
        toast.error(error.message)
      }).finally(()=>{
        setLoading(false)
      });
    } catch (error) {
      toast.error(error.message)
    }
    window.scrollTo(0, 0);
  }, []);

  // Filter citys
  const filterSearch = (array, search, param) => {
    const x = array && array.toLowerCase();
    const newArray = search?.filter((item) =>
      item[param]
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(x)
    );
    const y = !array ? [] : newArray;
    return y;
  };
  // Mark citys
  const handleSeach = (array, container) => {
    const context = container.current;
    const instance = new Mark(context);
    if (array && city) instance.unmark(array);
    if (array && city && !loading) instance.mark(array);
  };

  // Toggle search
  const toggleSeach = (e) => {
    const { name, value } = e.target;
    setSearch((x) => {
      return { ...x, [name]: value };
    });
  };
  const toggleSeachOnClick = (name, libelle) => {
    setSearch((y) => {
      return { ...y, [name]: libelle, villeName: '' };
    });
  };

  // Mark on typing
  useEffect(() => {
    handleSeach(search.city, citySearchContainer);
    handleSeach(search.spec, specSearchContainer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, city]);


  // INSCRIPTION D'UN NOUVEAU PATIENT
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation des champs
    if (!validateEmail(formData.mail)) {
      toast.error("Veuillez saisir une adresse e-mail valide");
      setLoading(false);
      return;
    }

    if (!validatePhone(formData.telephone)) {
      toast.error("Veuillez saisir un numéro de téléphone valide");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error("Veuillez saisir un mot de passe de plus de 8 caractères");
      setLoading(false);
      return;
    }

    if (!isAccepted) {
      toast.error("Veuillez accepter les conditions générales");
      setLoading(false);
      return;
    }

    if (!isSame) {
      toast.error("Les mots de passe ne sont pas identiques");
      setLoading(false);
      return;
    }

    ConnexionService.SignUp(formData)
      .then((Response) => {
        if (Response.status === 200) {
          toast.success("L'enregistrement a été effectué avec succès");
          setIsRegistered(true); // state d'enregistrement
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Log des données du formulaire
    console.log("Form Data:", formData);
  };

  // Traitement de renvoi d'un nouveau mail sur la demande du patient
  const handleResendEmail = (token) => {
    ConnexionService.Accountuser(token)
      .then((response) => {
        console.log(token, response);
        if (response.status === 200) {
          toast.success(
            "Un nouvel e-mail de confirmation vous a été envoyé avec succès."
          );
        } else {
          toast.error(
            "Une erreur s'est produite lors de l'envoi du nouvel e-mail de confirmation."
          );
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'envoi du nouveau e-mail de confirmation :",
          error
        );
        toast.error(
          "Une erreur s'est produite lors de l'envoi du nouvel e-mail de confirmation."
        );
      });
  };

  return (
    <div className="register inscription">
      <div className="container" ref={cnx}>
        <div className="linear-border"></div>

        {!isRegistered ? (
          <>
            {" "}
            <h1>Nouveau Praticien sur Clinital ?</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Civilité</label>
                <div className="addForm">
                  <label htmlFor="dam" className="input-check-box1">
                    <input
                      required
                      type="radio"
                      name="Civilité"
                      id="dam"
                      onClick={() => {
                        setPatient({ ...patient, civilite_pat: "Mme" });
                        setCivilite_pat("Mme");
                      }}
                    />
                    <div className="input-doth"></div>
                    <span>Femme</span>
                  </label>
                  <label htmlFor="Mr" className="input-check-box">
                    <input
                      required
                      type="radio"
                      name="Civilité"
                      id="Mr"
                      onClick={() => {
                        setPatient({ ...patient, civilite_pat: "Mr" });
                        setCivilite_pat("Mr");
                      }}
                    />
                    <div className="input-doth"></div>
                    <span>Homme</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <label htmlFor="">Prénom</label>
                    <input
                      type="text"
                      name=""
                      placeholder="Saisir votre prénom"
                      required
                    />
                    <span className="err">Prénom est obligatoire</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label htmlFor="">Nom</label>
                    <input
                      type="text"
                      name=""
                      placeholder="Saisir votre nom"
                      required
                    />
                    <span className="err">Nom est obligatoire</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="telephone">Numéro de téléphone </label>
                <input
                  type="tele"
                  id="telephone"
                  value={formData.phoneNumber}
                  
                  placeholder="Saisir votre numéro de téléphone "
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Adresse e-mail</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  placeholder="Saisir votre adresse e-mail "
                  required
                />
              </div>
              <div>
                <label htmlFor="ville">Ville</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Choisir votre ville "
                  value={search.city}
                  onChange={(e) => {
                    toggleSeach(e);
                  }}
                />
                <div className="result" ref={citySearchContainer}>
                  {loading ? (
                    <span className="loading">Loading...</span>
                  ) : (
                      filterSearch(search.city, city, "nom_ville")?.map(
                        (x, index) => (
                          <span
                            key={index}
                            onClick={() => {
                              console.log("ville", x.id_ville);
                              toggleSeachOnClick("city", x.nom_ville);
                            }}
                          >
                            {x.nom_ville}
                          </span>
                        )
                      )
                    
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="specialité">Spécialité</label>
                <input
                  type="text"
                  name="spec"
                  placeholder="Choisir votre spécialité  "
                  value={search.spec}
                  onChange={(e) => {
                    toggleSeach(e);
                  }}
                />
                  <div className="result" ref={specSearchContainer}>
                  {loading ? (
                    <span className="loading">Loading...</span>
                  ) : (
                   
                      filterSearch(search.spec, spec, "libelle")?.map(
                        (x, index) => (
                          <span
                            key={index}
                            onClick={() => {
                              console.log("libelle", x.id_spec);
                              toggleSeachOnClick("spec", x.libelle);
                            }}
                          >
                            {x.libelle}
                            </span>
                        )
                      )
                    
                  )}
                </div>
               
              </div>
              <div>
                <label htmlFor="inpe">N° INPE</label>
                <input
                  type="text"
                  id="inpe"
                  value={formData.inpe}
                  placeholder="Saisir votre N° INPE "
                  required
                />
              </div>
              <div
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16.8px",
                  textAlign: "left",
                  color: "#8A8F95",
                }}
              >
                Conformément à la loi 09-08, vous disposez d’un droit d’accès,
                de rectification et d’opposition au traitement de vos données
                personnelles. Ce traitement a été autorisé par la CNDP sous le
                n° A-S-259/2022.
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="terms"
                  onChange={() => setIsAccepted(true)}
                />
                <label htmlFor="terms">
                  J’accepte les
                  <Link to="/login/succes">
                    {" "}
                    CGU et la Politique de Confidentialité
                  </Link>{" "}
                  de Clinital
                </label>
              </div>

              <button type="submit">
                S'inscrire
                <img src="../icons/flech-white.svg" alt="se connecter" />
              </button>
            </form>
            <img src="../images/insc-img.png" alt="" />
          </>
        ) : (
          <div className="confirmation">
            <div className="row d-flex">
              <div className="col-md-12">
                <svg
                  className="float-end p-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M11.9518 9.56543L18.6315 2.88574C18.9485 2.56928 19.1269 2.13985 19.1273 1.69192C19.1276 1.24399 18.9501 0.814241 18.6336 0.497224C18.3172 0.180208 17.8877 0.00188743 17.4398 0.00149184C16.9919 0.00109626 16.5621 0.178658 16.2451 0.495115L9.56543 7.1748L2.88574 0.495115C2.56872 0.178098 2.13876 0 1.69043 0C1.2421 0 0.812131 0.178098 0.495115 0.495115C0.178098 0.812131 0 1.2421 0 1.69043C0 2.13876 0.178098 2.56872 0.495115 2.88574L7.1748 9.56543L0.495115 16.2451C0.178098 16.5621 0 16.9921 0 17.4404C0 17.8888 0.178098 18.3187 0.495115 18.6357C0.812131 18.9528 1.2421 19.1309 1.69043 19.1309C2.13876 19.1309 2.56872 18.9528 2.88574 18.6357L9.56543 11.9561L16.2451 18.6357C16.5621 18.9528 16.9921 19.1309 17.4404 19.1309C17.8888 19.1309 18.3187 18.9528 18.6357 18.6357C18.9528 18.3187 19.1309 17.8888 19.1309 17.4404C19.1309 16.9921 18.9528 16.5621 18.6357 16.2451L11.9518 9.56543Z"
                    fill="#A9ACB0"
                  />
                </svg>
              </div>
            </div>
            <div className="row d-flex">
              <div className="col-md-12 text-center my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="146"
                  height="146"
                  viewBox="0 0 146 146"
                  fill="none"
                >
                  <circle cx="73" cy="73" r="73" fill="#0FB900" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M47.5 72.5001L62.8 87.8001L103.5 47.1001L93.1 36.7001L62.8 67.0001L53.5 57.8001L47.5 63.8001L47.5 72.5001Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center my-2">
                <h4 className="text-center">
                  Félicitations!{" "}
                  <span>
                    {" "}
                    Vous avez rejoint avec succès la communauté de Clinital.
                  </span>
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center my-2">
                <p>
                  Vous allez recevoir un e-mail de confirmation dans quelques
                  instants. Veuillez consulter votre boîte de réception et
                  cliquer sur le lien pour activer votre compte.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center my-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleResendEmail(formData.token)}
                >
                  Renvoyer le mail de confirmation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Demande;
