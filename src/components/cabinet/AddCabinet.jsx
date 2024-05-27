import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./AddCabinet.scss";
import MenuCabinet from "../../components/menuCabinet/MenuCabinet";
import { useSelector } from "react-redux";
import Mark from "mark.js";
import { useTranslation } from "react-i18next";
import CabinetService from "./Services/CabinetServices";
import { useNavigate } from "react-router-dom";

function AddCabinet() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { villes, specialite } = useSelector((state) => state.global);
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
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
        navigate("/cabinet/mydocuments");
        const responses = await CabinetService.updateDemandeStateByUserId(2);
        const storedUserJSON = localStorage.getItem('user');
        const storedUser = JSON.parse(storedUserJSON);
        storedUser.state = 2; // Mettez ici la nouvelle valeur de state
        
        const updatedUserJSON = JSON.stringify(storedUser);

        localStorage.setItem('user', updatedUserJSON);
        
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
          <h1
            style={{
              [localStorage.getItem("language") === "ar" ? "right" : "left"]:
                "46px",
            }}
          >
            {" "}
            {t("joinMyPractice")}
          </h1>
          <div className="innerContainerAdd">
            <div className="firstInnerDiv">
              <div className="content">
                <form>
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
                      <div style={{ position: "relative" }}>
                        <label htmlFor="nomCabinet">{t("city")}</label>
                        <input
                          type="text"
                          name="city"
                          placeholder={t("chooseCity")}
                          className="input1"
                          onChange={(e) => {
                            toggleSeach(e);
                            setHidden(false);
                          }}
                          value={search.city}
                        />
                        <img
                          id="icon-secces"
                          src="../icons/select.svg"
                          alt=""
                          style={{
                            width: "16px",
                            height: "16px",
                            position: "absolute",
                            top: "38%",
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
                                marginRight: "10px",
                                width: "14px",
                                height: "14px",
                              }}
                            />
                          ) : (
                            <img
                              src="../../icons/flech-white.svg"
                              alt="se connecter"
                              style={{
                                marginLeft: "10px",
                                width: "14px",
                                height: "14px",
                              }}
                            />
                          )}
                        </button>
                      </div>
                    </div>
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
                  mapStyle="mapbox://styles/mapbox/streets-v9"
                  mapboxAccessToken="pk.eyJ1IjoibWFyd2FuZW5oIiwiYSI6ImNsNndwYjZjOTBhdXMzam8xc3psdzhvYTEifQ.BNnvlSlxD2Zo8X9i9FVdMw"
                />
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
            style={{
              marginTop: "-250px",
            }}
          >
            <img
              id="icon-secces"
              src="../icons/check.svg"
              alt=""
              style={{
                width: "96px",
                height: "96px",
                marginTop: "20px",
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
