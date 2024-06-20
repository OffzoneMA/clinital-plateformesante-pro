

import React, { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { TOKEN } from "../../services/api";
import Axios from "axios"; 
import MedNetworksService from "../medecinNetwork/services/medNetworkService";
import { setSpecialite, setVilles } from "../../utils/redux/GlobalSlice";
import SearchServices from "../searchBarDoc/SearchServices/SearchServices";
import { useDispatch } from "react-redux";
import Mark from 'mark.js';

function myNetwork() {

  
    const [isOtherSpecChecked, setisOtherSpecChecked] = useState(false) //les conditions génerales
    const [loading, setLoading] = useState(false); //une opération est en cours de chargement.
    const [isChecked, setIsChecked] = useState(false); 
    const [contacts, setContacts] = useState([]);
    const [city,setCity]=useState([{}])
    const [spec, setSpec] = useState([{}])
    const dispatch = useDispatch();
    const [selectedSpecs, setSelectedSpecs] = useState([]); 
    const [selectAll, setSelectAll] = useState(true);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectAllCities, setSelectAllCities] = useState(true);
    const [selectedCity, setSelectedCity] = useState(null); 
    const [filteredContacts, setFilteredContacts] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const searchRef = useRef();

    const [searchTermCities, setSearchTermCities] = useState('');
    const searchRefCities = useRef();



//---------------------Charger les followers--------------------------------
/*useEffect(() => {
    fetchFilteredMedecins();
}, [selectedCities, selectedSpecs, searchTerm]);*/


 useEffect(() => {
        fetchAllMedecins();
    }, []);
const fetchAllMedecins = async () => {
        setLoading(true);
        try {
            const response = await MedNetworksService.getAllMedNetworks();
            if (response.status === 200) {
                setContacts(response.data || []);
            } else {
                toast.error("Erreur de chargement des médecins.");
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des médecins.");
        } finally {
            setLoading(false);
        }
    };

    //----------------------------------------------------------------


    //---------------------------followers with filter-------------------------------------

    
    useEffect(() => {
        fetchFollowers();
    }, [selectedSpecs, selectedCities]);

    const fetchFollowers = async () => {
        setLoading(true);
        try {
            await fetchFilteredMedecins();
        } catch (error) {
            toast.error("Erreur lors du chargement des médecins.");
        } finally {
            setLoading(false);
        }
    };

    const fetchFilteredMedecins = async () => {
        setLoading(true);
        try {
            let response;
            if (selectedCities.length > 0 && selectedSpecs.length > 0) {
                response = await MedNetworksService.getMedbyNameOrSpecAndCity (selectedSpecs,selectedCities);
                

            } else if (selectedCities.length > 0) {
                response = await MedNetworksService.getMedbyCity(selectedCities);
            } else if (selectedSpecs.length > 0) {
                response = await MedNetworksService.getMedbySpec(selectedSpecs);
            } else {
                response = await MedNetworksService.getAllMedNetworks();
            }

            if (response.status === 200) {
                if (response.data && response.data.length > 0) {
                    setFilteredContacts(response.data);
                } else {
                    toast.info("Aucun médecin trouvé.");
                    setFilteredContacts([]);
                }
            } else {
                toast.error("Erreur de chargement des médecins.");
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des médecins.");
        } finally {
            setLoading(false);
        }
    };
  //----------------------------------------------------------------  
    
    const photoUrlBase = `/images/profile_photomed/`;
    
    // Fetch citys & speciality
  useEffect(() => {
    try {
      setLoading(true)
     SearchServices.getAllCities().then((res)=>{
       //console.log("villes:",res)
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
     // console.log("Les specialités: ", res)
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
    
    //----------------------------------------------------------------
    //-------------------------Search Bar specialité------

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

 const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSpecs = spec.length > 0 ? spec.filter((specialite) =>
    specialite.libelle && specialite.libelle.toLowerCase().includes(searchTerm.toLowerCase())
) : [];

    //------------------------filtre specialities------------------------
    
 const handleSpecCheckboxChange = (libelle) => {
    setSelectedSpecs(prevSelectedSpecs => {
        // Vérifier si la spécialité est déjà sélectionnée
        const alreadySelected = prevSelectedSpecs.includes(libelle);

        if (alreadySelected) {
            // Si déjà sélectionnée, la désélectionner en filtrant les autres spécialités
            return prevSelectedSpecs.filter(specLibelle => specLibelle !== libelle);
        } else {
            // Si non sélectionnée, l'ajouter à la liste des spécialités sélectionnées
            return [...prevSelectedSpecs, libelle];
        }
    });
    setSelectAll(false); // Désactiver la sélection 
};

 const handleSelectAllChange = () => {
        if (selectAll) {
            setSelectedSpecs([]);
        } else {
            setSelectedSpecs([]); 
        }
        setSelectAll(!selectAll);
    };
    
    //-----------------------------CITY SEARCH BAR-----------------------------------

    useEffect(() => {
        const context = searchRefCities.current;
        const instance = new Mark(context);

        if (searchTermCities) {
            instance.unmark({
                done: () => {
                    instance.mark(searchTermCities);
                }
            });
        } else {
            instance.unmark();
        }
    }, [searchTermCities]);

      const handleSearchCitiesChange = (e) => {
        setSearchTermCities(e.target.value);
      };
  
    const filteredCities = city && Array.isArray(city)
    ? city.filter((city) =>
        city.nom_ville && city.nom_ville.toLowerCase().includes(searchTermCities.toLowerCase())
    )
    : [];

    //--------------------------------filtre cities--------------------------------
    const handleCityCheckboxChange = (id_city) => {
        
        if (selectedCities.includes(id_city)) {
            setSelectedCities(prevSelectedCities =>
                prevSelectedCities.filter(cityId => cityId !== id_city)
            );
        } else {
            setSelectedCities(prevSelectedCities => [...prevSelectedCities, id_city]);
        }
      
    };

    const handleSelectAllCitiesChange = () => {
        if (!selectAllCities) {
            setSelectedCities(city.map(city => city.id_ville));
            setSelectedCities([]);
        } else {
            setSelectedCities([]);
        }
        setSelectAllCities(!selectAllCities);
    };

    
  return (
    <div className="mynetwork ">
          
      
        <div className="network-container">
                <div className="network-container-title">
                    <div className="network-header">
                        <div className="network-title">Mon réseau</div>
                    </div>
                </div>
                
            <div className="menu-container">
                    <div className="menu-section">
                        <div className="menu-item">
                            <div className="menu-text">Spécialistes</div>
                    </div>
            {contacts.length > 0 && (
                    <>
                <div className="input-container">
                    <input
                        type="text"
                        id="spec"
                        className="input-field"
                        placeholder="Rechercher une spécialiste"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <div className="input-icon">
                        <img src="/images/network/search-md.svg" alt="Icone de recherche" className="icon-img" />
                    </div>

                </div>
                <div className="scrollable-section" ref={searchRef}> 
                            
                    <div className="checkbox-container">
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="tout"
                                name="tout"
                                className="checkbox-input"
                                 checked={selectAll}
                                 onChange={handleSelectAllChange}
                            />
                            <label htmlFor="tout" className="checkbox-label"></label>
                        </div>
                        <div className="checkbox-text">Tout</div>
                     </div>
                {filteredSpecs.map((specialite) => (
                    <div className="checkbox-container" key={specialite.id_spec}>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                                id={`spec_${specialite.id_spec}`}
                                name={`spec_${specialite.id_spec}`}
                                className="checkbox-input"
                                checked={selectedSpecs.includes(specialite.libelle)}
                                onChange={() => handleSpecCheckboxChange(specialite.libelle)}
                                disabled={selectAll}
                            />
                            <label htmlFor={`spec_${specialite.id_spec}`}  className="checkbox-label"></label>
                        </div>
                        <div className="checkbox-text">{specialite.libelle}</div>
                    </div>
                   ))} 
                    
                </div> 
            
             </>
            )}              
        </div>
            
                
                <div className="menu-section">
                     <div className="menu-item">
                         <div className="menu-text">Villes</div>
                    </div>
                {contacts.length > 0 && ( 
                    <>     
                    <div className="input-container">
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Rechercher une ville"
                            value={searchTermCities}
                            onChange={handleSearchCitiesChange}
                        />
                        <div className="input-icon">
                        <img src="/images/network/search-md.svg" alt="Icone de recherche" className="icon-img" />
                    </div>

                </div>
                     
            <div className="scrollable-section" ref={searchRefCities}>   
                    <div className="checkbox-container">
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="tout_city"
                            name="tout_city"
                            className="checkbox-input"
                            checked={selectAllCities}
                            onChange={handleSelectAllCitiesChange}
                           
                        />
                        <label htmlFor="tout_city" className="checkbox-label"></label>
                    </div>
                    <div className="checkbox-text">Tout</div>
                    </div>
                {filteredCities.map((city) => (
                    <div className="checkbox-container" key={city.id_ville}>
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id={`city_${city.id_ville}`}
                                name={`city_${city.id_ville}`}
                                className="checkbox-input"
                                checked={selectedCities.includes(city.id_ville)}
                                onChange={() => handleCityCheckboxChange(city.id_ville)}
                                disabled={selectAllCities} // Désactive les cases individuelles si "Tout" est sélectionné
                            />
                            <label htmlFor={`city_${city.id_ville}`} className="checkbox-label"></label>
                        </div>
                        <div className="checkbox-text">{city.nom_ville}</div>
                    </div>
                ))}
                                    
                                  
               </div>
                </> 
            )}
            
            </div>
                      
        </div>
              
        {contacts.length > 0 && (       
            <div style={{width: 1071, left: 322, top: 172, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{height: 40, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                
                    <form className="search-section">
                        <div>
                            <img src="../../icons/search.svg" alt="" />
                            <input
                            type="text"
                            name="spec"
                            //value={search.spec}
                            //onChange={(e) => toggleSeach(e)}
                            placeholder="Rechercher un praticien sur Clinital"
                            />
                        
                        </div>

                        <button >
                                Rechercher
                        <img src="../../icons/flech-white.svg" alt="" /> </button>
                    </form>
                </div>
            </div>
              )}

    
            {contacts.length > 0 ? (
            <div className="container">
                <div className="inner-container">
                    <div className="row">
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map(contact => (
                                <div className="card" key={contact.id}>
                                    <div className="image-container">
                                        <img className="profile-img" src={`${photoUrlBase}${contact.photo_med ? contact.photo_med : "/images/profile_photomed/defaultprofil.png"}`} alt="Profil médical" />
                                        <img className="icon-img" src="/images/network/Gastroentérologue.png" alt="Gastroentérologue" />
                                    </div>
                                    <div className="text-container">
                                        <div className="name">Dr {contact.nom_med} {contact.prenom_med}</div>
                                        <div className="specialty">{contact.specialite.libelle}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="contact-container">
                                <div className="contact-image">
                                    <img src="/images/network/Group7859.svg" alt="Contact" />
                                </div>
                                <div className="contact-details">
                                    <div className="contact-message">Aucun médecin trouvé avec ce filtre.</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            
                        <div className="contact-container">
                            <div className="contact-image">
                                <img src="/images/network/Group7859.svg" alt="Contact" />
                            </div>
                            <div className="contact-details">
                                <div className="contact-message">Vous n'avez pas encore de contacts.</div>
                                <div className="add-contact-button">
                                    <div className="button-content">
                                        <div className="button-icon">
                                            <img src="/images/network/plus-circle.svg" alt="Plus Circle Icon" />
                                        </div>
                                        <div className="button-text">Ajouter des contacts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                
        )}

          
              <div className="vertical-linemenu"></div>
         
        </div>
    </div> 
   
      
  );
}

export default myNetwork;


