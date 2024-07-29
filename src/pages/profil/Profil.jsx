import React, { useEffect, useState } from "react";
import axios from "axios";
import {Route, Routes,useParams,Link,useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Navbar from "../../components/navbar/Navbar";
import MiniFooter from "../../components/footer/MiniFooter";
import Adresse from "../../components/profil/Components/Adresse";
import General from "../../components/profil/Components/General";
import Horaire from "../../components/profil/Components/Horaire";
import Tarif from "../../components/profil/Components/Tarif";
import Presentation from "../../components/profil/Components/Presentation";
import "./profil.scss";
import ProfileServices from "../../components/profil/ProfileServices/ProfileServices";
import PriseRdv from "../../components/result/priseRdv/PriseRdv";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToggle } from "../../utils/redux/GlobalSlice";
import Register from "../../components/connexion/Register";
import { toast } from "react-toastify";

import AgendaWorkDays_ from "../../components/result/AgendaWorkDays_";
import { useTranslation } from "react-i18next";
import MedNetworksService from "../../components/medecinNetwork/services/medNetworkService";
import PatientRdv from "../../components/result/priseRdv/PatientRdv";
import MedFollower from "../../components/medecinNetwork/MedFollower";


const Profil = () => {
  
  const url = window.location.search;
  
  const [isOpen, setIsOpen] = useState(false);
  const [profilInfo, setProfilInfo] = useState([]);
  const [horaires, setHoraires] = useState([]);
  const [specialite, setSpecialite] = useState();
  const [loading, setLoading] = useState(false);
  const [viewPhoto, setViewPhoto] = useState(false);
  const { t } = useTranslation();
  const { id } = useParams();
  const photoUrl = `/images/profile_photomed/${profilInfo.photo_med}`; //l'URL de la photo de profil
  const photocouvertureUrl = `/images/profile_photomed/${profilInfo.photo_couverture_med}`;
  const logintoggle = useSelector((state) => state.global.logintoggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const [isInNetwork, setIsInNetwork] = useState(false);

  const togglePhoto = () => {
    setViewPhoto(!viewPhoto);
  };
  useEffect(() => {

      setLoading(true);
        ProfileServices.getProfileMedecin(id).then((response) => {
          setProfilInfo(response.data);
          //console.log(response.data);
        }).catch((error)=>{
          toast.error(error.message)
        }).finally(()=>{
          setLoading(false);
        });
    
    
    // Récupération des horaires du médecin
    ProfileServices.getSchedulsofMed(id)
      .then((response) => {
        setHoraires(response.data);
      })
      .catch((error) => {
        toast.error(error.message)
      });

  }, [id]);


  

//----------------------------------------------------------------
 
  const handleCloseModal=()=>{
    dispatch(setLoginToggle(!logintoggle));
  }
  useEffect(() => {
    console.log("login ")
    console.log('change logintoggle:', logintoggle)
  }, [logintoggle]);
//----------------------------------------------------------------
  const Loading = () => {
    return (
      <div className="">
        <Skeleton
          className="skelet"
          width={165}
          height={165}
          variant="circular"
        // sx={{ bgcolor: "grey.900" }}
        />
      </div>
    );
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const ActiveClasseMenu = (e) => {
    const allElements = [...document.querySelectorAll(".menu .menuItem")];
    allElements.forEach((element) => element.classList.remove("activeLink"));
    e.target.classList.add("activeLink");
  };
  //----------------------------------------------------------------
  
   
  const handleAddNetwork = async () => {
    try {
       console.log("fff",id)
    const data = {
    follower_id: id,
    comment: "ok"
    };

      if (data) {  // Assuming `data` is available in the current scope
      console.log(data)
      const response = await MedNetworksService.addMedToNetwork(data);
      console.log(response);
      toast.success("Médecin ajouté avec succès");
      
      checkIsInNetwork();
     
     
    }
  } catch (error) {
    console.error("Erreur lors de l'ajout du médecin", error);
  }
};
  //----------------------check
  
  useEffect(() => {
    // Vérifier si le médecin est déjà dans votre réseau lors du chargement du composant
    checkIsInNetwork();
  }, []);

  const checkIsInNetwork = async () => {
    try {
     
      const isInNetworkResult = await MedNetworksService.getcheckIfInNetwork(id);
        const isInNetworkBool = isInNetworkResult === true;
      setIsInNetwork(isInNetworkBool);
    } catch (error) {
      console.error('Erreur lors de la vérification du réseau :', error);
    }
  };
  //--------------remove
  
  const handleRemoveNetwork = async () => {
    try {
      console.log(id);
    if (id) {
      const response = await MedNetworksService.deleteMedFromNetwork(id);
      console.log(response);
      // toast.success("Médecin retiré avec succès");;
      
       setIsInNetwork(false); 
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du médecin", error);
  }
  };
  
  return (
    <>
     <Navbar />
    <div className="divPrincipal profil-wrapper" style={{ direction: localStorage.getItem("language") === "ar" ? "rtl" : "ltr" }}>
  
       {logintoggle && <Register isOpen={logintoggle} onClose={handleCloseModal} />}
    
      <img src="/images/bg-profilemedecin.png" alt="fond" style={{
        position: 'absolute',
        width: "829px",
        height: '801px',
        marginTop: "20px",
        marginLeft: "0px",
        gap: "0px",
        objectFit: 'cover', 
        transform: 'rotate(180deg)', // Rotation de 180 degrés
        opacity: '0.3', // Opacité à 30%
      }} />
       
      <div className="sectionPic" >
                  <div className="sectionPic">
          <div className="couverture" style={{ position: 'relative' }}>
            {profilInfo.photo_couverture_med ? (
              <img src={photocouvertureUrl} alt="couverture" />
            ) : (
              <img src="/images/couverture.png" alt="imagepardéfaut" />
            )}
          </div>
        </div>

       
            <div className="divProfilImgAndName" >
              <div className="photoPro" onClick={toggleMenu}>
            {/*loading ? <img alt="Photodeprofil" src={photoUrl} /> : <img alt="Photodeprofil" src={photoUrl}/>*/}
      {loading ? ( <img alt="Photodeprofil" src={profilInfo.photo_med ? photoUrl: "/images/profile_photomed/defaultprofil.png"} />
        ) : (
          <img alt="ProfilPhotomed" src={profilInfo.photo_med ? photoUrl : "/images/profile_photomed/defaultprofil.png"} />
        )}

                {/*<div className={`${"miniMenu"} ${isOpen ? "active" : "inactive"}`}>
                  <ul>
                    <li onClick={togglePhoto}> Voir La photo de profil </li>
                    <li>
                      Mettre à jour la photo de profil{" "}
                      <input type="file" className="PhotoUpload" />
                    </li>
                    <li> Supprimer la photo de profil</li>
                  </ul>
                </div>
                <div
                  className={`${"voirPhoto"} ${viewPhoto ? "activePhoto" : "inactive"
                    }`}
                >
                  <img alt="" id="img" src={profilInfo.photo_med} />
                  <img
                    alt=""
                    onClick={togglePhoto}
                    className="cancel"
                    src="/icons/cancel.svg"
                  />
                  </div>*/}
              </div>

              <p className="nomMedcin">
                {profilInfo.nom_med} <span> {profilInfo.prenom_med} </span>
              </p>

          <p className="specialite">{profilInfo.specialite && t(profilInfo.specialite.libelle)} </p>
  <div className="buttons-container">
      <div className="button-rdv">
    
        <Link to={`rdv-mypatient/?id=${id}`}>
          <div className="button-rdv-text">
            {t("MakeanappointmentforaPatient")}
          </div>
        </Link>
      </div>
     {isInNetwork ? (
                <div className="button-remove" onClick={handleRemoveNetwork}>
                    <div className="button-remove-text">
                       {t("Removefrommynetwork")}
                    </div>
                </div>
            ) : (
                <div className="button-add" onClick={handleAddNetwork}>
                    <div className="button-add-text">
                        {t("Addtomynetwork")}
                    </div>
                </div>
            )}
    </div>

            </div>
          </div>
          <img src="/images/bg-profilemedecin.png" alt="fond" style={{
                position: 'absolute',
                width: "829px",
                height: '393.13px',
                marginTop: "0px",
                marginLeft: "600px",
                gap: "0px",
                objectFit: 'cover', 
              // transform: 'rotate(180deg)', 
                opacity: '0.3', // Opacité à 30%
            }} />
          <div className="menu" style={{
            position: 'relative',
            
      }} >
            <a
              className="menuItem activeLink"
              onClick={ActiveClasseMenu}
              href="#general"
            >
          {t("General")}
            </a>
            <a
              className="menuItem"
              onClick={ActiveClasseMenu}
              href="#adresse"
            >
              {t("Address")}
            </a>
            <a
              className="menuItem"
              onClick={ActiveClasseMenu}
              href="#presentation"
            >
            
          {t("Profile")}
            </a>
            <a
              className="menuItem"
              onClick={ActiveClasseMenu}
              href="#horaire"
            >
              {t("Schedules")}
            </a>
            <a
              href="#tarif"
              className="menuItem"
              onClick={ActiveClasseMenu}
            >
              {t("Prices")}
            </a>
        
        </div>
        <div className="sections" style={{
            position: 'relative',
            //overflow: 'hidden', 
      }} >
        
     
        
          <General data={profilInfo} />
          <Adresse data={profilInfo} />
          <Presentation data={profilInfo} />
        <Horaire data={profilInfo}
                horaires={horaires} />
          <Tarif data={profilInfo} />
        </div>
      <MiniFooter />

       <Routes>
          <Route path="/prise-rdv/" element={<PriseRdv />} />
          <Route path="/rdv-mypatient/" element={<PatientRdv />} />
          
    </Routes>


    </div>
    </>
  );
  
};

export default Profil;