import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Map , { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./AddCabinet.scss";
import MenuCabinet from "../../components/menuCabinet/MenuCabinet";
import { useSelector } from "react-redux";
import Mark from "mark.js";
import { useTranslation } from "react-i18next";
import CabinetService from "./Services/CabinetServices";
import { useNavigate } from "react-router-dom";
import SearchSelect from "../SearchInput/SearchSelect";

function AddCabinet() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [hidden, setHidden] = useState(true);
  const { villes, specialite } = useSelector((state) => state.global);
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedVille , setSelectedVille] = useState("");
  const [cabinet, setCabinet] = useState({
    nom: "",
    adresse: "",
    phoneNumber: "",
    code_post: "",
    id_ville: 363,
    cabinetmedecin: {
      status: "ADMIN",
    },
  });
  const [search, setSearch] = useState({
    city: "",
    spec: "",
  });
  const citySearchContainer = useRef();
  const citySearchParentContainer = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const toggleSeach = (e) => {
    const { name, value } = e.target;
    setSearch((x) => ({ ...x, [name]: value }));
  };

  const toggleSeachOnClick = (name, libelle) => {
    setSearch((y) => ({ ...y, [name]: libelle, villeName: "" }));
  };

  const handleSeach = (array, container) => {
    const context = container.current;
    const instance = new Mark(context);
    if (array && villes) instance.unmark(array);
    if (array && villes && !loading) instance.mark(array);
  };

  const filterSearch = (array, search, param) => {
    const x = array && array.toLowerCase();
    const newArray = search?.filter((item) =>
      item[param]
        ?.toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .includes(x)
    );
    return !array ? [] : newArray;
  };

  const addCabinet = async () => {
    setLoading(true);
    try {
      const DataCabinet = JSON.stringify(cabinet);
      const response = await CabinetService.addCabinet(DataCabinet);
      if (response.status === 200) {
        const responses = await CabinetService.updateDemandeStateByUserId(2);
        const storedUserJSON = localStorage.getItem('user');
        const storedUser = JSON.parse(storedUserJSON);
        storedUser.state = 2; // Mettez ici la nouvelle valeur de state

        const updatedUserJSON = JSON.stringify(storedUser);

        localStorage.setItem('user', updatedUserJSON);
        navigate("/cabinet/mydocuments");
        toast.success("cabinet est ajouter avec succes");
      } else {
        toast.error("Failed to add cabinet. Please try again.");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const { nom, phoneNumber, adresse, code_post, id_ville } = cabinet;
    return (
      nom !== "" &&
      phoneNumber !== "" &&
      adresse !== "" &&
      id_ville !== "" &&
      code_post !== ""
    );
  };

  useEffect(() => {
    setFormValid(validateForm());
  }, [cabinet]);

  useEffect(() => {
    handleSeach(search.city, citySearchContainer);
  }, [search, villes]);

  // Fermer la liste si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (citySearchParentContainer.current && !citySearchParentContainer.current.contains(event.target)) {
        setHidden(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="cabinetadd"
      style={{
        direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr",
      }}
    >
      <div className="result-container">
        <MenuCabinet state="0" />
      </div>

      {!isRegistered && !isAdded && (
        <div className="container">
          <h1
            style={{
              [localStorage.getItem("language") === "ar" ? "right" : "left"]:
                "46px",
            }}
          >
            {t("myCabinet")}
          </h1>
          <div className="innerContainer">
            <div className="childDiv">
              <div className="innerChildDiv">
                <p className="textZone">{t("optimizeCollaboration")}</p>
                <img
                  src="../images/cabinet.png"
                  alt="background image"
                  className="imageRight"
                  style={{
                    [localStorage.getItem("language") === "ar"
                      ? "left"
                      : "right"]: "0px",
                  }}
                />
              </div>
              <button className="button1" onClick={() => setIsRegistered(true)}>
                {t("joinMyPractice")}
              </button>
            </div>
            <div className="childDiv">
              <div className="innerChildDiv">
                <p className="textZone">{t("joinPracticeDescription")}</p>
                <img
                  src="../images/votrecabinet.png"
                  alt="background image"
                  className="imageRight"
                  style={{
                    [localStorage.getItem("language") === "ar"
                      ? "left"
                      : "right"]: "0px",
                  }}
                />
              </div>
              <button className="button2" onClick={() => setIsAdded(true)}>
                {t("joinMyPracticeButton")}
              </button>
            </div>
          </div>
        </div>
      )}
      {isRegistered && !isAdded && (
        <div className="containerAdd">
          <h1>
            {" "}
            {t("joinMyPractice")}
          </h1>
          <div className="innerContainerAdd">
            <div className="firstInnerDiv">
              <div className="content1">
                <form >
                  <div>
                    <label htmlFor="">{t("cabinetName")}</label>
                    <input
                      type="text"
                      id="email"
                      placeholder={t("enterCabinetName")}
                      onChange={(e) =>
                        setCabinet({ ...cabinet, nom: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="">{t("phoneNumber")}</label>
                    <input
                      type="text"
                      id="email"
                      placeholder={t("cabinetPhoneNumber")}
                      onChange={(e) =>
                        setCabinet({ ...cabinet, phoneNumber: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="">{t("address")}</label>
                    <input
                      type="text"
                      id="email"
                      placeholder={t("enterAddress")}
                      onChange={(e) =>
                        setCabinet({ ...cabinet, adresse: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-container">
                    <div className="inputRow">
                      <div ref={citySearchParentContainer} style={{ position: "relative" }}>
                        <label htmlFor="nomCabinet">{t("city")}</label>
                        <input
                          type="text"
                          name="city"
                          placeholder={t("chooseCity")}
                          className="input1"
                          onClick={() => {
                            setHidden(!hidden);
                            setSearch({ ...search, city: " " })
                          }}
                          readOnly
                          value={selectedVille}
                        />
                        <img
                          id="icon-secces"
                          src="../icons/select.svg"
                          alt=""
                          style={{
                            width: "16px",
                            height: "16px",
                            position: "absolute",
                            top: "70%",
                            [localStorage.getItem("language") === "ar"
                              ? "left"
                              : "right"]: "10px",
                            transform: "translateY(-50%)",
                          }}
                        />
                        <div
                          className="result"
                          style={{
                            visibility: hidden ? "hidden" : "visible",
                          }}
                          ref={citySearchContainer}
                        >
                          <div className="search-container">
                            <input
                              type="text"
                              name="city"
                              className="search-result"
                              placeholder={t("searchCity")}
                              onChange={(e) => {
                                toggleSeach(e);
                              }}
                              style={{
                                paddingRight: "30px",
                              }}
                            />
                            <img
                              src="../icons/search-md.svg" // Remplacez cette source par celle de votre icône de recherche
                              alt="Search Icon"
                              className="search-icon-result"
                            />
                          </div>
                          {loading ? (
                            <span className="loading">{t("loading")}</span>
                          ) : (
                            filterSearch(search.city, villes, "nom_ville")?.map(
                              (x, index) => (
                                <span
                                  key={index}
                                  onClick={() => {
                                    toggleSeachOnClick("city", x.nom_ville);
                                    setHidden(true);
                                    setCabinet({
                                      ...cabinet,
                                      id_ville: x.id_ville,
                                    });
                                    setSelectedVille(x.nom_ville);
                                  }}
                                  style={{
                                    direction:
                                      localStorage.getItem("language") === "ar"
                                        ? "ltr"
                                        : "ltr",
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
                        <label htmlFor="code_post" className="addressLabel">
                          {t("postalCode")}
                        </label>
                        <input
                          type="text"
                          id="code_post"
                          placeholder={t("enterPostalCode")}
                          className="input2"
                          onChange={(e) =>
                            setCabinet({
                              ...cabinet,
                              code_post: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btn3-container">
                    <button
                      className="button3"
                      type="button"
                      onClick={addCabinet}
                      disabled={!formValid}
                      style={{
                        backgroundColor: formValid ? "#6dc0f9" : "#C2E3FA",
                      }}
                    >
                      {t("nextStep")}
                      {localStorage.getItem("language") === "ar" ? (
                        <img
                          src="../../icons/flech-white-left.svg"
                          alt="se connecter"
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      ) : (
                        <img
                          src="../../icons/flech-white.svg"
                          alt="se connecter"
                          style={{
                            width: "14px",
                            height: "14px",
                          }}
                        />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="secondInnerDiv">
              <div className="imageRightAdd">
                <Map
                  initialViewState={{
                    longitude: -7.4,
                    latitude: 33.6,
                    zoom: 10,
                  }}
                  style={{ borderRadius: "10px" }}
                  width="100%" height="100%"
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoibWFyd2FuZW5oIiwiYSI6ImNsNndwYjZjOTBhdXMzam8xc3psdzhvYTEifQ.BNnvlSlxD2Zo8X9i9FVdMw"
                >
                  <Marker
                    longitude={-7.4}
                    latitude={33.6}
                    anchor="bottom"
                  >
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_d_2_37792)">
                        <path d="M8 3C5.23958 3 3 4.77927 3 6.97067C3 9.4922 6.33333 13.4881 7.55729 14.8683C7.6081 14.9265 7.67469 14.9739 7.75162 15.0066C7.82856 15.0393 7.91367 15.0563 8 15.0563C8.08633 15.0563 8.17144 15.0393 8.24838 15.0066C8.32531 14.9739 8.3919 14.9265 8.44271 14.8683C9.66667 13.4887 13 9.49422 13 6.97067C13 4.77927 10.7604 3 8 3Z" fill="#9E58FF" />
                        <path d="M8 3C5.23958 3 3 4.77927 3 6.97067C3 9.4922 6.33333 13.4881 7.55729 14.8683C7.6081 14.9265 7.67469 14.9739 7.75162 15.0066C7.82856 15.0393 7.91367 15.0563 8 15.0563C8.08633 15.0563 8.17144 15.0393 8.24838 15.0066C8.32531 14.9739 8.3919 14.9265 8.44271 14.8683C9.66667 13.4887 13 9.49422 13 6.97067C13 4.77927 10.7604 3 8 3Z" stroke="#9E58FF" stroke-width="1.0589" stroke-linecap="round" stroke-linejoin="round" />
                      </g>
                      <defs>
                        <filter id="filter0_d_2_37792" x="0.284588" y="0.284588" width="15.4308" height="17.4875" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                          <feFlood flood-opacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                          <feOffset />
                          <feGaussianBlur stdDeviation="1.09306" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
                          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_37792" />
                          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_37792" result="shape" />
                        </filter>
                      </defs>
                    </svg>
                  </Marker>
                </Map>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isRegistered && isAdded && (
        <div className="containerRejoindre">
          <h1> {t("joinMyCabinet")}</h1>
          <div
            className="icon-secces"
            // style={{
            //   marginTop: "-250px",
            // }}
          >
            <img
              id="icon-secces"
              src="../icons/check.svg"
              alt=""
              style={{
                width: "96px",
                height: "96px",
              }}
            />
          </div>
          <h2> {t("contactAdminMessage")}</h2>
          <img className="bottomimg" src="../images/suc_mdp-img.png" alt="" />
        </div>
      )}
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default AddCabinet;
