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
import ConnexionService from "./services/ConnexionService";

function Demande() {
  const [isAccepted, setIsAccepted] = useState(false); //les conditions générales
  const [isRegisred, setisRegistred] = useState(false); //Enregistrement du user
  const [loading, setLoading] = useState(false); //une opération est en cours de chargement.
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    phoneError: false,
    emailError: false,
    prenomError: false,
    nomError: false,
  });

  const [search, setSearch] = useState({
    city: " ",
    spec: " ",
  });
  const [formData, setFormData] = useState({
    nom_med: "",
    prenom_med: "",
    mail: "",
    phonenumber: "",
    specialite: "",
    inpe: "",
    ville: "",
    validation: "ENCOURS",
    civilite_med: "Mme",
  });
  const citySearchContainer = useRef();
  const specSearchContainer = useRef();

  const [city, setCity] = useState([{}]);
  const [spec, setSpec] = useState([{}]);

  const [cityInputFocused, setCityInputFocused] = useState(false);
  const [specInputFocused, setSpecInputFocused] = useState(false);

  const cnx = useRef();

  useEffect(() => {
    try {
      setLoading(true);
      SearchServices.getAllCities()
        .then((res) => {
          console.log(res.data);
          setCity(res.data);
          dispatch(setVilles(res.data));
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
    }
    try {
      SearchServices.getAllSpecialities()
        .then((res) => {
          console.log(res);
          setSpec(res.data);
          dispatch(setSpecialite(res.data));
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
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

  // Toggle search
  const toggleSeach = (e) => {
    const { name, value } = e.target;
    setSearch((x) => {
      return { ...x, [name]: value };
    });
  };
  const toggleSeachOnClick = (name, libelle) => {
    setSearch((y) => {
      return { ...y, [name]: libelle, villeName: "" };
    });
  };
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

    if (!isAccepted) {
      toast.error("Veuillez accepter les conditions générales");
      setLoading(false);
      return;
    }
    console.log("data:", formData);

    ConnexionService.createrequest(formData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("votre demande  a été ajouté avec succes");
          setisRegistred(true);
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
    <div className="register inscription">
      <div className="container" ref={cnx}>
        <div className="linear-border"></div>

        {!isRegisred ? (
          <>
            {" "}
            <h1>Nouveau Praticien sur Clinital ?</h1>
            <form onSubmit={createRequest}>
              <div
                style={{
                  marginTop: "-2px",
                }}
              >
                <label
                  htmlFor=""
                  style={{
                    marginLeft: "-8px",
                  }}
                >
                  Civilité
                </label>
                <div className="addForm">
                  <label htmlFor="dam" className="input-check-box1">
                    <input
                      
                      type="radio"
                      name="Civilité"
                      id="dam"
                      onClick={() => {
                        setFormData({ ...formData, civilite_med: "Mme" });
                        setCityInputFocused(false);
                        setSpecInputFocused(false);
                      }}
                    />
                    <div className="input-doth"></div>
                    <span>Femme</span>
                  </label>
                  <label htmlFor="Mr" className="input-check-box">
                    <input
                      
                      type="radio"
                      name="Civilité"
                      id="Mr"
                      onClick={() => {
                        setFormData({ ...formData, civilite_med: "Mr" });
                        setCityInputFocused(false);
                        setSpecInputFocused(false);
                      }}
                    />
                    <input type="hidden" name="Civilité" value={formData.civilite_med} />
                    <div className="input-doth"></div>
                    <span>Homme</span>
                  </label>
                </div>
              </div>
              <div
                className="btns"
                style={{
                  marginTop: "-8px",
                }}
              >
                <div>
                  <label htmlFor="">Prénom</label>
                  <input
                    type="text"
                    name=""
                    placeholder="Saisir votre prénom"
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
                    onFocus={() => {
                      setCityInputFocused(false);
                      setSpecInputFocused(false);
                    }}
                  />
                  {errors.prenomError && (
                <span className="err"><br/>Le prénom est obligatoire</span>
              )}
                </div>
                <div>
                  <label htmlFor="">Nom</label>
                  <input
                    type="text"
                    name=""
                    placeholder="Saisir votre nom"
                    
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
                    onFocus={() => {
                      setCityInputFocused(false);
                      setSpecInputFocused(false);
                    }}
                  />
                  {errors.nomError && (
                <span className="err"><br/>Le nom est obligatoire</span>
              )}
                </div>
              </div>
              <div className="adresse">
                <label htmlFor="telephone">Numéro de téléphone </label>
                <input
                  type="tele"
                  id="telephone"
                  placeholder="Saisir votre numéro de téléphone "
                  
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
                  onFocus={() => {
                    setCityInputFocused(false);
                    setSpecInputFocused(false);
                  }}
                />
              </div>
              {errors.phoneError && (
                <span className="err"> Veuillez saisir un numéro de téléphone valide</span>
              )}
          
              <div className="adresse">
                <label htmlFor="email">Adresse e-mail</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Saisir votre adresse e-mail "
                  
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
                  onFocus={() => {
                    setCityInputFocused(false);
                    setSpecInputFocused(false);
                  }}
                />
              </div>
              {errors.emailError && (
                <span className="err"> Veuillez saisir une adresse e-mail valide</span>
              )}
           
              <div>
                <label htmlFor="ville">Ville</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Choisir votre ville "
                  value={search.city === " " ? "" : search.city}
                  onChange={(e) => {
                    toggleSeach(e);
                  }}
                  onFocus={() => {
                    setCityInputFocused(true);
                    setSpecInputFocused(false);
                  }} // Set focus state when input is focused
                  style={{
                    paddingRight: "30px",
                  }}
                />
                <img
                  src="../icons/select.svg" // Remplacez cette source par celle de votre icône de recherche
                  alt="Search Icon"
                  style={{
                    position: "absolute",
                    top: "68%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />

                {cityInputFocused && (
                  <div className="result" ref={citySearchContainer}>
                    <input
                      type="text"
                      name="city"
                      placeholder="Rechercher une ville"
                      value={search.city === " " ? "" : search.city}
                      onChange={(e) => {
                        toggleSeach(e);
                      }}
                      style={{
                        marginTop: "10px",
                        paddingRight: "30px",
                      }}
                    />
                    <img
                      src="../icons/search-md.svg" // Remplacez cette source par celle de votre icône de recherche
                      alt="Search Icon"
                      style={{
                        position: "absolute",
                        top: "9%",
                        right: "10px",

                        cursor: "pointer",
                      }}
                    />
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
                              setCityInputFocused(false);
                              setSpecInputFocused(false);
                              setFormData({
                                ...formData,
                                ville: x.nom_ville,
                              });
                            }}
                          >
                            {x.nom_ville}
                          </span>
                        )
                      )
                    )}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="specialité">Spécialité</label>
                <input
                  type="text"
                  name="spec"
                  placeholder="Choisir votre spécialité  "
                  value={search.spec === " " ? "" : search.spec}
                  onChange={(e) => {
                    toggleSeach(e);
                  }}
                  onFocus={() => {
                    setCityInputFocused(false);
                    setSpecInputFocused(true);
                  }}
                  style={{
                    paddingRight: "30px",
                  }}
                />
                <img
                  src="../icons/select.svg" // Remplacez cette source par celle de votre icône de recherche
                  alt="Search Icon"
                  style={{
                    position: "absolute",
                    top: "68%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                />

                {specInputFocused && (
                  <div className="result" ref={specSearchContainer}>
                    <input
                      type="text"
                      name="spec"
                      placeholder="Rechercher une spécialité  "
                      value={search.spec === " " ? "" : search.spec}
                      onChange={(e) => {
                        toggleSeach(e);
                      }}
                      style={{
                        marginTop: "10px",
                        paddingRight: "30px",
                      }}
                    />
                    <img
                      src="../icons/search-md.svg" // Remplacez cette source par celle de votre icône de recherche
                      alt="Search Icon"
                      style={{
                        position: "absolute",
                        top: "14%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    />

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
                              setCityInputFocused(false);
                              setSpecInputFocused(false);
                              setFormData({
                                ...formData,
                                specialite: x.libelle,
                              });
                            }}
                          >
                            {x.libelle}
                          </span>
                        )
                      )
                    )}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="inpe">N° INPE</label>
                <input
                  type="text"
                  id="inpe"
                  placeholder="Saisir votre N° INPE "
                  
                  onFocus={() => {
                    setCityInputFocused(false);
                    setSpecInputFocused(false);
                  }}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      inpe: e.target.value,
                    });
                  }}
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
                  <Link> CGU</Link> et
                  <Link> la Politique de Confidentialité</Link> de Clinital
                </label>
              </div>

              <button type="submit">
                S'inscrire
                <img src="../icons/flech-white.svg" alt="se connecter" />
              </button>
            </form>
            <img
              src="../images/insc-img.png"
              alt=""
              style={{
                width: "424px",
                height: "562px",
                top: "503px",
                left: "970px",
                gap: "0px",
                opacity: "0px",
              }}
            />
          </>
        ) : (
          <div
            className="confirmation"
            style={{
              width: "550px",
              height: "320px",
              top: "195px",
              left: "446px",
              gap: "0px",
              borderRadius: "15px 0px 0px 0px",
              opacity: "0px",
            }}
          >
            <div className="row d-flex">
              <div className="col-md-12 text-center my-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="146"
                  height="146"
                  viewBox="0 0 146 146"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2_32685)">
                    <path
                      d="M73 146C113.317 146 146 113.317 146 73C146 32.6832 113.317 0 73 0C32.6832 0 0 32.6832 0 73C0 113.317 32.6832 146 73 146Z"
                      fill="#5FC657"
                    />
                    <path
                      d="M88.362 144.277C89.761 144.005 91.1517 143.692 92.5324 143.339C94.8743 142.686 97.1822 141.917 99.4474 141.034C101.717 140.155 103.942 139.164 106.113 138.063C108.283 136.958 110.397 135.744 112.446 134.427C114.491 133.113 116.47 131.697 118.375 130.186C120.284 128.67 122.116 127.06 123.864 125.362C125.607 123.667 127.265 121.887 128.83 120.027C130.4 118.165 131.875 116.226 133.25 114.217C134.624 112.21 135.897 110.137 137.064 108.003C138.231 105.867 139.289 103.674 140.237 101.432C141.186 99.1905 142.023 96.9024 142.744 94.5768C143.36 92.5414 143.887 90.4799 144.324 88.3984L100.956 45.0309C93.2228 37.2972 83.1238 33.4346 73.0111 33.4346C62.8978 33.4346 52.7757 37.2966 45.042 45.0309C29.5745 60.4984 29.5745 85.4897 45.042 100.957L88.362 144.277Z"
                      fill="#12BF13"
                    />
                    <path
                      d="M73.0033 33.4398C83.1165 33.4398 93.2267 37.3024 100.96 45.0362C116.428 60.5037 116.428 85.495 100.96 100.962C85.493 116.43 60.5016 116.43 45.0342 100.962C29.5667 85.495 29.5667 60.5037 45.0342 45.0362C52.7679 37.3024 62.89 33.4398 73.0033 33.4398ZM91.0156 60.8267C90.4395 60.8795 89.8799 61.1008 89.4235 61.4564L67.2051 78.1262L56.9038 67.8249C54.669 65.4973 50.2751 69.8912 52.6027 72.126L64.7694 84.2927C65.7924 85.314 67.5792 85.4424 68.7378 84.5778L93.0711 66.3278C95.1191 64.8372 93.8573 60.8629 91.3246 60.8267C91.2217 60.8214 91.1185 60.8215 91.0156 60.8267Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2_32685">
                      <rect width="146" height="146" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <h1
                  className="title"
                  style={{
                    fontSize: "30px",
                    fontWeight: 700,
                    lineHeight: "26.82px",
                    textAlign: "center",
                  }}
                >
                  Votre demande a été envoyée avec succès
                </h1>
                <p
                  className="message"
                  style={{
                    fontSize: "16px",
                    fontWeight: 400,
                    lineHeight: "21px",
                    textAlign: "center",
                  }}
                >
                  Merci pour votre inscription.
                  <br />
                  Notre équipe vous contactera dans les meilleurs délais
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default Demande;
