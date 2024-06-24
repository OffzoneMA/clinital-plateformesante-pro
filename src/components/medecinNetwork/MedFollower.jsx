import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams,useNavigate } from "react-router-dom";
import MedNetworksService from "../medecinNetwork/services/medNetworkService";


function MedFollower() {
   
    const { id } = useParams();
    const [medDetails, setMedDetails] = useState(null);
    const [isOpen, setIsOpen] = useState(true); // État pour contrôler l'ouverture/fermeture du popup
    const navigate = useNavigate(); 
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

    if (!isOpen) {
        return null; // Retourner null si le popup est fermé
    }

    /*if (!medDetails) {
        return <div>Chargement en cours...</div>;
    }*/

    return (
         <div className="popup-container">
      <div className="popup-content">
        <div className="popup-header">
          <div className="close-icon" onClick={handleClosePopup}>
            <div className="close-line"></div>
            <div className="close-line"></div>
          </div>
        </div>
        <div className="popup-body">
          <div className="doctor-details">
            <div className="doctor-avatar">
              <img
                src="https://via.placeholder.com/128x128"
                alt="Avatar du médecin"
              />
            </div>
            <div className="doctor-info">
              <div className="doctor-name">Dr Safouan CLNT</div>
              <div className="doctor-specialty">Médecin généraliste</div>
              <div className="doctor-address">
                33 Rue Najib Mahfoud, Casablanca 20000
              </div>
              <div className="doctor-phone">0547829111</div>
              <div className="doctor-email">Démos@clinital.io</div>
            </div>
          </div>
          <div className="popup-actions">
            <button className="remove-button">Retirer</button>
            <button className="view-profile-button">Voir le profil</button>
          </div>
        </div>
      </div>
    </div>
    
    );
}


export default MedFollower;

