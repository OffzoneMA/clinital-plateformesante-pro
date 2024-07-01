import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import MedNetworksService from "../medecinNetwork/services/medNetworkService";


function MedFollower() {
  const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    const [medDetails, setMedDetails] = useState(null);
    const [isOpen, setIsOpen] = useState(true); // État pour contrôler l'ouverture/fermeture du popup
    const navigate = useNavigate(); 
  const photoUrlBase = `/images/profile_photomed/`;
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // État pour contrôler l'ouverture/fermeture du popup de confirmation

   useEffect(() => {
        const fetchMedDetails = async () => {
            if (id) {
                try {
                    const response = await MedNetworksService.getMedNetwork(id);
                    setMedDetails(response);
                    console.log(response)
                } catch (error) {
                    console.error("Erreur lors de la récupération des détails du médecin", error);
                }
            }
        };

        fetchMedDetails();
    }, [id]);

 const handleClosePopup = () => {
     setIsOpen(false); // Fermer le popup en changeant l'état
    navigate("/mynetwork", { replace: true });

 };
  
   const handleOpenConfirm = () => {
    setIsConfirmOpen(true); // Ouvrir le popup de confirmation en changeant l'état
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false); // Fermer le popup de confirmation en changeant l'état
  };

  const handleDeleteMed = async () => {
    try {
      console.log(id);
    if (id) {
      const response = await MedNetworksService.deleteMedFromNetwork(id);
      console.log(response);
      console.log("Médecin supprimé avec succès");
      
      
      navigate("/mynetwork", { replace: true });
      window.location.reload();
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du médecin", error);
  }
};



    if (!isOpen) {
        return null; // Retourner null si le popup est fermé
    }

    if (!medDetails) {
        return <div></div>
    }
  
    return (
      <div className="popup-container">
        {isConfirmOpen ? (
          <div className="contentconfirm">
            <div className="confirmation-popup">
              <div className="confirmation-content">
                <h2>Souhaitez-vous réellement supprimer ce praticien de votre réseau ?</h2>
                <div className="button-containerconf">
                  <button onClick={handleCloseConfirm} className="cancel-button">Fermer</button>
                  <button onClick={handleDeleteMed} className="delete-button">Supprimer</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="popup-content">
            <div className="popup-header">
              <div className="close-icon" onClick={handleClosePopup}>
                <img src="/images/network/x-close.svg" alt="Close" />
              </div>
            </div>
            <div className="popup-body">
              <div className="doctor-details">
                <div className="image-container">
                  <img className="profile-img" src={`${photoUrlBase}${medDetails.photo_med ? medDetails.photo_med : "defaultprofil.png"}`} alt="Profil médical" />
                  <img className="icon-img" src="/images/network/Gastroentérologue.png" alt="Gastroentérologue" />
       
                </div>
                <div className="doctor-info">
                  <div className="doctor-name">Dr {medDetails.nom_med} {medDetails.prenom_med}</div>
                  <div className="doctor-specialty">Médecin {medDetails.specialite.libelle}</div>
                  <div className="contactmed">
                    
                    {medDetails.cabinet.map((cabinet, index) => (
                      <>
                        <div className="doctor-address" key={index}>
                          <img className="address-icon" src="/images/network/marker-pin-01.svg" alt="marker" />
                          {cabinet.adresse} , {medDetails.ville.nom_ville}
                        </div>
                        <div className="doctor-phone">
                          <img className="address-icon" src="/images/network/phone.svg" alt="phone" />
                          {cabinet.phoneNumber}</div>
                      </>
                    ))}
                    <div className="doctor-email">
                      <img className="address-icon" src="/images/network/mail-02.svg" alt="mail-02" />
                      {medDetails.user.email}</div>
                  </div>
                </div>
              </div>
              
          
              <div className="button-container">
                <div className="button-retirer" onClick={handleOpenConfirm}>
                  <img className="icon-retirer" src="/images/network/delete-32-regular.svg" alt="Retirer" />
                  <div className="text-retirer">Retirer</div>
                </div>
                 <div className="button-profil">
                    <a href={`/profil/${medDetails.id}`}>
                      <div className="text-profil">Voir le profil</div>
                    </a>
                  </div>

              </div>
        
        
            </div>
          </div>
        )}
    
      </div>
      
    );
}


export default MedFollower;



