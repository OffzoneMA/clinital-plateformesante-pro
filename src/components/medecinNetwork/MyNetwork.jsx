

import React, { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import {Route, Routes,useParams} from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN } from "../../services/api";
import Axios from "axios"; 
import MedNetworksService from "../medecinNetwork/services/medNetworkService";
import { setSpecialite, setVilles } from "../../utils/redux/GlobalSlice";
import SearchServices from "../searchBarDoc/SearchServices/SearchServices";
import { useDispatch } from "react-redux";
import Mark from 'mark.js';
import MedFollower from "./MedFollower";
import "./medfollower.scss";
import { refreshMedicins } from "../../utils/redux/GlobalSlice";
import PaginationNetwork from "./PaginationNetwork";
import MiniFooter from "../../components/footer/MiniFooter";
import { bottom } from "@popperjs/core";
import { useTranslation } from "react-i18next";
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

    const [ searchNameTerm, setSearchNameTerm] = useState('');
    const searchNameRef = useRef();
  

    const [searchTermCities, setSearchTermCities] = useState('');
    const searchRefCities = useRef();

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 15; 

    
    
    
    const [showMedFollowerPopup, setShowMedFollowerPopup] = useState(false);
    const [selectedMedFollowerId, setSelectedMedFollowerId] = useState(null);
   
    const photoUrlBase = `/images/profile_photomed/`;
    

    const [selectedFilters, setSelectedFilters] = useState([]); 

    const { t } = useTranslation();

//---------------------Charger les followers--------------------------------

 useEffect(() => {
        fetchAllMedecins(page);
 }, [page]);
    
    
const fetchAllMedecins = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await MedNetworksService.getAllMedNetworks(pageNumber, itemsPerPage);
            
            if (response.status === 200) {
                setContacts(response.data || []);
                const estimatedTotalPages = Math.ceil(response.data.length / itemsPerPage);
                setTotalPages(estimatedTotalPages);
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
    }, [page,selectedSpecs, selectedCities]);

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
              console.log("Selected cities:", selectedCities.nom_med);
              console.log("Selected specs:", selectedSpecs);
            if (selectedCities.length > 0 && selectedSpecs.length > 0) {
               
                response = await MedNetworksService.getMedbyNameOrSpecAndCity (selectedSpecs,selectedCities);
           
            }
             else if (searchNameTerm && selectedCities.length > 0) {
                response = await MedNetworksService.getMedbyNameOrSpecAndCity (searchNameTerm,selectedCities);
            }
            else if (selectedCities.length > 0) {
                response = await MedNetworksService.getMedbyCity(selectedCities);
            }
            else if (selectedSpecs.length > 0) {
                response = await MedNetworksService.getMedbySpec(selectedSpecs);
            }
            else if (searchNameTerm) {
                response = await MedNetworksService.getMedbySpec(searchNameTerm);
                
            }
           
            else {
                response = await MedNetworksService.getAllMedNetworks();
            }

            if (response.status === 200) {
                if (response.data && response.data.length > 0) {
                    const filteredData = response.data || [];
                    
                    const startIndex = (page - 1) * itemsPerPage;
                    const slicedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

                    setFilteredContacts(slicedData);
                    console.log(slicedData);
                const estimatedTotalPages = Math.ceil(filteredData.length / itemsPerPage);
                    setTotalPages(estimatedTotalPages);
                    
                } else {
                   // toast.info("Aucun médecin trouvé.");
                    setFilteredContacts([]);
                      setTotalPages(1); 
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


    //----------------------------------------------------------------
    
  
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
      setSelectAllCities(false) 
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
    //----------------------------PAGINATION----------------------------
     
    const changePage = (pageNumber) => {
        setPage(pageNumber);
    };

    const generatePageLink = (pageNumber) => {
        const baseUrl = window.location.href.split('?')[0];
        return `${baseUrl}?page=${pageNumber}`;
    };

    

    //----------------------------------------------------------------
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };
    //----------------------------------------------------------------

    //-------------------------Search by name---------------------------------------
  const handleNameSearchChange = (e) => {
    setSearchNameTerm(e.target.value);
  };

  const handleNameSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredMedecins();
  };



    return (
      
        <div className="mynetwork">
           <div className="network-container-title">
                    <div className="network-header">
                        <div className="network-title">{t("MyNetwork")}</div>
                    </div>
                </div>
        <div className="network-container">
             
                
            <div className="menu-container">
                    <div className="menu-section">
                        <div className="menu-item">
                            <div className="menu-text">{t("Specialties") }</div>
                    </div>
                {contacts.length > 0 && (
                        <>
                    <div className="input-container">
                        <input
                            type="text"
                            id="spec"
                            className="input-field"
                            placeholder={t("Searchforaspecialty")}
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
                            <div className="checkbox-text">{t("All")}</div>
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
                                //  disabled={selectAll}
                                />
                                <label htmlFor={`spec_${specialite.id_spec}`}  className="checkbox-label"></label>
                            </div>
                            <div className="checkbox-text">{t(specialite.libelle)}</div>
                        </div>
                    ))} 
                        
                    </div> 
                
                </>
                )}              
            </div>
            
                
                <div className="menu-section">
                     <div className="menu-item">
                         <div className="menu-text">{t("Cities")}</div>
                    </div>
                {contacts.length > 0 && ( 
                    <>     
                    <div className="input-container">
                        <input
                            type="text"
                            className="input-field"
                            placeholder={t("Searchforacity")}
                            value={searchTermCities}
                            onChange={handleSearchCitiesChange}
                        />
                        <div className="input-icon">
                        <img src="/images/network/search-md.svg" alt="Icone de recherche" className="icon-img" />
                    </div>

                </div>
                     
            <div className="scrollable-section-ville" ref={searchRefCities}>   
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
                    <div className="checkbox-text">{t("All")}</div>
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
                                //disabled={selectAllCities} // Désactive les cases individuelles si "Tout" est sélectionné
                            />
                            <label htmlFor={`city_${city.id_ville}`} className="checkbox-label"></label>
                        </div>
                        <div className="checkbox-text">{t(city.nom_ville)}</div>
                    </div>
                ))}
                                    
                                  
               </div>
                </> 
            )}
            
            </div>
                      
        </div>
              
        {contacts.length > 0 && (       
            <div style={{width: 1071, left: 322, top: 192, position: 'absolute', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{height: 40, justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
                
                    <form className="search-section">
                        <div>
                            <img src="../../icons/search.svg" alt="" />
                            <input
                            type="text"
                            //name="spec"
                            value={searchNameTerm}
                            onChange={handleNameSearchChange}
                            placeholder={t("SearchforapractitioneronClinital")}
                            />
                        
                        </div>

                        <button onClick={handleNameSearchSubmit}>
                                {t("search")}
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
                            <Link to={`medecinfollower/?id=${contact.id}`}
                                    className="card" key={contact.id}
                                     
                                >

                         
                            <div className="image-container">
                                <img className="profile-img" src={`${photoUrlBase}${contact.photo_med ? contact.photo_med : "defaultprofil.png"}`} alt="Profil médical" />
                                 <img className="icon-img" src="/images/network/Gastroentérologue.png" alt="Gastroentérologue" />
                            </div>
                             <div className="text-container">
                               <div className="name">{t("Dr")} {truncateText(`${contact.nom_med} ${contact.prenom_med}`, 12)}</div>

                                    <div className="specialty">{t(contact.specialite.libelle)}</div>
                                </div>
                     
                         </Link>
                                
                            )
                                
                            )
                        ) : (
                           
                        <div className="contact-details">
                                            <div className="contact-message">{t("Nodoctorfoundwiththisfilter")}</div>
                        </div>
                                    
                              )}
                              
                         
                           <PaginationNetwork
                            totalPages={totalPages}
                            currentPage={page}
                            onPageChange={changePage}  // Assurez-vous que changePage est correctement défini et transmis ici
                            generatePageLink={generatePageLink}
                        />
                                        

                            </div>
                        </div>
                  </div>
                  
                     ) : (
            
                        <div className="contact-container">
                            <div className="contact-image">
                                <img src="/images/network/Group7859.svg" alt="Contact" />
                            </div>
                            <div className="contact-details">
                                <div className="contact-message">{t("Youdonthaveanycontactsyet")}</div>
                            <Link to="/">
                                <div className="add-contact-button">
                                    <div className="button-content">
                                        <div className="button-icon">
                                            <img src="/images/network/plus-circle.svg" alt="Plus Circle Icon" />
                                        </div>
                                        <div className="button-text">{t("Addcontacts")}</div>
                                    </div>
                              </div>
                            </Link>
                          

                          </div>
                          
            </div>
                      
                      
                
        )}
          
                        {contacts.length === 0 && (
                    <div className="vertical-linemenu"></div>
                )}

          
             
    <Routes>
        <Route path="/medecinfollower/" element={<MedFollower />} />
    </Routes> 
         
          </div>
    
 
    </div> 
  
       
        
    );

}

export default myNetwork;


