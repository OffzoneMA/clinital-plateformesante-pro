import React, { useState,useEffect,useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
import RdvPatientService from "../services/RdvPatientService";
import "./patientmed.scss";
import Mark from 'mark.js';
import { useTranslation } from "react-i18next";

//PRISE DE RDV D'UN MEDECIN POUR SON PATIENT 
function PatientRdv() {
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const { t } = useTranslation();

    //const [medDetails, setMedDetails] = useState(null);
    const [medPatients, setMedPatients] = useState([]);
    const [isOpen, setIsOpen] = useState(true); // État pour contrôler l'ouverture/fermeture du popup
   
    
    const navigate = useNavigate(); 
  const photoUrlBase = `/images/profile_photomed/`;
    const [isConfirmOpen, setIsConfirmOpen] = useState(true); // État pour contrôler l'ouverture/fermeture du popup de confirmation

   useEffect(() => {
        const fetchMedDetails = async () => {
           
                try {
                    const response = await RdvPatientService.getAllPatient();
                    setMedPatients(response);
                    console.log(response)
                } catch (error) {
                    console.error("Erreur lors de la récupération des détails du médecin", error);
                }
            
        };

        fetchMedDetails();
   }, []);
  /* const medPatients = [
  {
    nom_pat: "Dupont",
    prenom_pat: "Marie",
    dateNaissance: "1990-02-14",
    adresse_pat: "12 Rue de Rivoli",
    ville: { nom_ville: "Paris" },
  },
  {
    nom_pat: "Martin",
    prenom_pat: "Jean",
    dateNaissance: "1985-06-21",
    adresse_pat: "3 Avenue Victor Hugo",
    ville: { nom_ville: "Lyon" },
  },
  {
    nom_pat: "Bernard",
    prenom_pat: "Lucie",
    dateNaissance: "1992-11-05",
    adresse_pat: "25 Boulevard Saint-Michel",
    ville: { nom_ville: "Bordeaux" },
  },
  {
    nom_pat: "Thomas",
    prenom_pat: "Paul",
    dateNaissance: "1988-03-12",
    adresse_pat: "18 Rue du Faubourg",
    ville: { nom_ville: "Marseille" },
  },
  {
    nom_pat: "Petit",
    prenom_pat: "Sophie",
    dateNaissance: "1995-07-30",
    adresse_pat: "5 Place de la République",
    ville: { nom_ville: "Lille" },
  },
  {
    nom_pat: "Robert",
    prenom_pat: "Antoine",
    dateNaissance: "1975-12-02",
    adresse_pat: "10 Quai de la Bourse",
    ville: { nom_ville: "Nantes" },
  },
  {
    nom_pat: "Richard",
    prenom_pat: "Claire",
    dateNaissance: "2000-05-18",
    adresse_pat: "22 Rue de la Paix",
    ville: { nom_ville: "Strasbourg" },
  },
  {
    nom_pat: "Durand",
    prenom_pat: "Louis",
    dateNaissance: "1993-08-09",
    adresse_pat: "8 Chemin de la Forêt",
    ville: { nom_ville: "Toulouse" },
  },
  {
    nom_pat: "Leroy",
    prenom_pat: "Emma",
    dateNaissance: "1989-01-25",
    adresse_pat: "14 Avenue de la Liberté",
    ville: { nom_ville: "Nice" },
  },
  {
    nom_pat: "Moreau",
    prenom_pat: "Gabriel",
    dateNaissance: "1996-09-17",
    adresse_pat: "7 Rue de la République",
    ville: { nom_ville: "Montpellier" },
  },
  {
    nom_pat: "Simon",
    prenom_pat: "Chloé",
    dateNaissance: "1982-04-04",
    adresse_pat: "9 Allée des Lilas",
    ville: { nom_ville: "Rennes" },
  },
  {
    nom_pat: "Laurent",
    prenom_pat: "Mathieu",
    dateNaissance: "1978-10-16",
    adresse_pat: "17 Rue de l'Église",
    ville: { nom_ville: "Reims" },
  },
  {
    nom_pat: "Lefevre",
    prenom_pat: "Isabelle",
    dateNaissance: "1991-06-03",
    adresse_pat: "2 Rue de la Gare",
    ville: { nom_ville: "Toulon" },
  },
  {
    nom_pat: "Michel",
    prenom_pat: "Jules",
    dateNaissance: "1986-08-29",
    adresse_pat: "21 Rue des Fleurs",
    ville: { nom_ville: "Saint-Étienne" },
  },
  {
    nom_pat: "Garcia",
    prenom_pat: "Laura",
    dateNaissance: "1998-11-11",
    adresse_pat: "19 Avenue des Champs-Élysées",
    ville: { nom_ville: "Le Havre" },
  },
  {
    nom_pat: "David",
    prenom_pat: "Nicolas",
    dateNaissance: "1979-03-07",
    adresse_pat: "23 Boulevard de la Liberté",
    ville: { nom_ville: "Grenoble" },
  },
  {
    nom_pat: "Bertrand",
    prenom_pat: "Alice",
    dateNaissance: "1994-07-25",
    adresse_pat: "13 Rue des Tilleuls",
    ville: { nom_ville: "Dijon" },
  },
  {
    nom_pat: "Roux",
    prenom_pat: "Émilie",
    dateNaissance: "1983-12-14",
    adresse_pat: "16 Rue des Écoles",
    ville: { nom_ville: "Angers" },
  },
  {
    nom_pat: "Vincent",
    prenom_pat: "Lucas",
    dateNaissance: "1999-02-22",
    adresse_pat: "4 Allée des Roses",
    ville: { nom_ville: "Nîmes" },
  },
  {
    nom_pat: "Fournier",
    prenom_pat: "Hélène",
    dateNaissance: "1987-09-30",
    adresse_pat: "11 Rue des Maréchaux",
    ville: { nom_ville: "Villeurbanne" },
  },
  {
    nom_pat: "Girard",
    prenom_pat: "Patrick",
    dateNaissance: "1980-07-18",
    adresse_pat: "15 Avenue du Général de Gaulle",
    ville: { nom_ville: "Aix-en-Provence" },
  },
  {
    nom_pat: "Lemaire",
    prenom_pat: "Sandrine",
    dateNaissance: "1997-01-08",
    adresse_pat: "6 Rue des Oliviers",
    ville: { nom_ville: "Metz" },
  },
  {
    nom_pat: "Renaud",
    prenom_pat: "Cédric",
    dateNaissance: "1976-05-23",
    adresse_pat: "20 Rue du Moulin",
    ville: { nom_ville: "Besançon" },
  },
  {
    nom_pat: "Dumas",
    prenom_pat: "Florence",
    dateNaissance: "1990-10-10",
    adresse_pat: "30 Rue du Château",
    ville: { nom_ville: "Orléans" },
  },
  {
    nom_pat: "Gauthier",
    prenom_pat: "Sylvain",
    dateNaissance: "1984-11-28",
    adresse_pat: "27 Boulevard des Capucines",
    ville: { nom_ville: "Caen" },
  },
  {
    nom_pat: "Perrin",
    prenom_pat: "Nathalie",
    dateNaissance: "1992-03-16",
    adresse_pat: "32 Rue des Amandiers",
    ville: { nom_ville: "Clermont-Ferrand" },
  },
  {
    nom_pat: "Marchand",
    prenom_pat: "Éric",
    dateNaissance: "1981-06-25",
    adresse_pat: "24 Avenue de la République",
    ville: { nom_ville: "Tours" },
  },
  {
    nom_pat: "Aubry",
    prenom_pat: "Léa",
    dateNaissance: "1995-12-19",
    adresse_pat: "35 Rue du Soleil",
    ville: { nom_ville: "Nancy" },
  },
  {
    nom_pat: "Poirier",
    prenom_pat: "Thomas",
    dateNaissance: "1983-02-02",
    adresse_pat: "31 Rue des Platanes",
    ville: { nom_ville: "Mulhouse" },
  },
  {
    nom_pat: "Leblanc",
    prenom_pat: "Valérie",
    dateNaissance: "1977-09-09",
    adresse_pat: "38 Rue de la Liberté",
    ville: { nom_ville: "Rouen" },
  },
];*/

 const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const formattedDate = date.toISOString().slice(0, 19).replace("T", " ");
    const dateComponents = formattedDate.split(" ")[0].split("-");
    const year = dateComponents[0];
    const month = dateComponents[1];
    const day = dateComponents[2];
    return `${day}-${month}-${year}`;
 };
  
  const calculateAge = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef();
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

 
  useEffect(() => {
    const context = searchRef.current;
    const instance = new Mark(context);

    if (searchTerm) {
      instance.unmark({
        done: () => {
          instance.mark(searchTerm);
        }
      });
    } else {
      instance.unmark();
    }
  }, [searchTerm]);


   const medPatientsFilter = medPatients.filter((patient) => {
    const fullName = `${patient.nom_pat} ${patient.prenom_pat}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

    
  
 const handleClosePopup = () => {
     setIsOpen(false); // Fermer le popup en changeant l'état
    navigate(-1);

 };
  
   const handleOpenConfirm = () => {
    setIsConfirmOpen(true); // Ouvrir le popup de confirmation en changeant l'état
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false); // Fermer le popup de confirmation en changeant l'état
  };


    if (!isOpen) {
        return null; // Retourner null si le popup est fermé
    }

  
  
    return (
  <div className="popup-container">
    {medPatients.length > 0 ? (
      <div className="popup-content">
        <div
          style={{
            width: '100%',
            height: '100%',
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 18,
            paddingBottom: 18,
            background: 'white',
            boxShadow: '0px 2.767256498336792px 2.2138051986694336px rgba(0, 0, 0, 0.02)',
            borderRadius: 14,
            border: '1px rgba(170, 170, 170, 0.20) solid',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            display: 'inline-flex'
          }}
        >
          <div
            style={{
              alignSelf: 'stretch',
              height: 59,
              paddingBottom: 16,
             // borderBottom: '1px solid',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              gap: 8,
              display: 'flex'
            }}
          >
                <div style={{ width: 18, height: 18, position: 'relative' }}>
                
              <div
              onClick={handleClosePopup}
                style={{
                  //width: 9,
                  //height: 9,
                  left: 4.5,
                  top: 4.5,
                  position: 'absolute',
                 // border: '1.20px #A9ACB0 solid'
                }}
                    
              > <img src="/images/network/x-close.svg" alt="Close" /></div>
                </div>
                
                    <div
                      style={{
                        alignSelf: 'stretch',
                        color: '#303030',
                        fontSize: 14,
                        fontFamily: 'Avenir Next LT Pro',
                        fontWeight: '600',
                        wordWrap: 'break-word'
                      }}
                    >
                      {t("MakeanappointmentforaPatient")}
                    </div>
                  </div>
                
                <div
          style={{
            width: '100%',
            height: '100%',
            paddingLeft: 18,
            paddingRight: 18,
            paddingTop: 9,
            paddingBottom: 9,
            background: 'white',
            borderRadius: 8,
            border: '1.4px rgba(170, 170, 170, 0.20) solid',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 8,
            display: 'inline-flex',
          }}
        >
          <input
            type="text"
            placeholder="Rechercher le nom du Patient"
             value={searchTerm}
             onChange={handleSearchChange}
            style={{
              flex: '1 1 0',
              height: 26, 
              color: '#AAAAAA',
              fontSize: 14,
              fontFamily: 'Avenir Next LT Pro',
              fontWeight: 400,
              wordWrap: 'break-word',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: '0 8px', // Ajoute un padding horizontal
              boxSizing: 'border-box',
              lineHeight: '36px', // Ligne ajustée pour centrage vertical
            }}
          />
          <div style={{ width: 22, height: 22, position: 'relative' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
            >
              <path
                d="M19.25 19.25L15.2625 15.2625M17.4167 10.0833C17.4167 14.1334 14.1334 17.4167 10.0833 17.4167C6.03325 17.4167 2.75 14.1334 2.75 10.0833C2.75 6.03325 6.03325 2.75 10.0833 2.75C14.1334 2.75 17.4167 6.03325 17.4167 10.0833Z"
                stroke="#A9ACB0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

          <div
          ref={searchRef}
            style={{
              alignSelf: 'stretch',
              paddingTop: 4,
              paddingBottom: 4,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: 10,
              display: 'inline-flex',
              
            }}
          >
            <div
              style={{
                flex: '1 1 0',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                display: 'inline-flex',
                flexDirection: 'column', // Ajoutez cette ligne pour gérer la disposition verticale
                overflowY: 'auto',
                maxHeight: '470px' 
              }}
            >
              {medPatientsFilter.map((patient, index) => (
                <div
                  key={index}
                  style={{
                    alignSelf: 'stretch',
                    height: 67,
                    paddingTop: 14,
                    paddingBottom: 14,
                    background: 'white',
                    borderBottom: '1px rgba(170, 170, 170, 0.30) solid',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    gap: 10,
                    display: 'flex'
                  }}
                >
                  <div
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 8,
                      display: 'inline-flex'
                    }}
                  >
                    <div
                      style={{
                        color: '#424242',
                        fontSize: 13,
                        fontFamily: 'Avenir Next LT Pro',
                        fontWeight: '600',
                        wordWrap: 'break-word'
                      }}
                    >
                      {patient.nom_pat} {patient.prenom_pat}
                    </div>
                    <div
                      style={{ width: 4, height: 4, background: '#303030', borderRadius: 9999 }}
                    />
                    <div
                      style={{
                        color: '#6C727B',
                        fontSize: 13,
                        fontFamily: 'Avenir Next LT Pro',
                        fontWeight: '400',
                        wordWrap: 'break-word'
                      }}
                    >
                      {formatDate(patient.dateNaissance)}
                    </div>
                    <div
                      style={{ width: 4, height: 4, background: '#303030', borderRadius: 9999 }}
                    />
                    <div
                      style={{
                        color: '#4B5460',
                        fontSize: 13,
                        fontFamily: 'Avenir Next LT Pro',
                        fontWeight: '400',
                        wordWrap: 'break-word'
                      }}
                    >
                     {calculateAge (patient.dateNaissance)} ans
                    </div>
                  </div>
                  <div
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      gap: 4,
                      display: 'inline-flex'
                    }}
                  >
                                    
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5013 7.04183C7.39876 7.04183 8.1263 6.31429 8.1263 5.41683C8.1263 4.51937 7.39876 3.79183 6.5013 3.79183C5.60384 3.79183 4.8763 4.51937 4.8763 5.41683C4.8763 6.31429 5.60384 7.04183 6.5013 7.04183Z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6.5013 11.9168C8.66797 9.75016 10.8346 7.81006 10.8346 5.41683C10.8346 3.0236 8.89454 1.0835 6.5013 1.0835C4.10807 1.0835 2.16797 3.0236 2.16797 5.41683C2.16797 7.81006 4.33464 9.75016 6.5013 11.9168Z" stroke="#C4C4C4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
           
                 
                    <div
                      style={{
                        color: '#303030',
                        fontSize: 12,
                        fontFamily: 'Avenir Next LT Pro',
                        fontWeight: '400',
                        wordWrap: 'break-word'
                      }}
                    >
                      {patient.adresse_pat} {patient.ville.nom_ville}
                    </div>
                  </div>
                </div>
              ))}
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
          <div
            style={{
              width: '100%',
              color: '#303030',
              fontSize: 14,
              fontFamily: 'Avenir Next LT Pro',
              fontWeight: '600',
              wordWrap: 'break-word'
            }}
          >
            {t("MakeanappointmentforaPatient")}
          </div>
          <div className="doctor-details">
            <div
              style={{
                width: '100%',
                height: '100%',
                paddingTop: 60,
                paddingBottom: 60,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 27,
                display: 'inline-flex'
              }}
            >
              <div style={{ width: 64.43, height: 82 }}>
                <img src="/images/network/Vector.svg" alt="Vector" />
              </div>
              <div
                style={{
                  width: 243,
                  textAlign: 'center',
                  color: '#303030',
                  fontSize: 16,
                  fontFamily: 'Avenir Next LT Pro',
                  fontWeight: '600',
                  wordWrap: 'break-word'
                }}
              >
               {t("Youdonthaveanypatientsyet")}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

}


export default PatientRdv;



