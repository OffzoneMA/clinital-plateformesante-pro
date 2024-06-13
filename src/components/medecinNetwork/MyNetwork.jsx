

import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { TOKEN } from "../../services/api";
import Axios from "axios"; 
import MedNetworksService from "../medecinNetwork/services/medNetworkService";
import { setSpecialite, setVilles } from "../../utils/redux/GlobalSlice";
import SearchServices from "../searchBarDoc/SearchServices/SearchServices";
import { useDispatch } from "react-redux";



function myNetwork() {

  
    const [isOtherSpecChecked, setisOtherSpecChecked] = useState(false) //les conditions génerales
    const [loading, setLoading] = useState(false); //une opération est en cours de chargement.
    const [isChecked, setIsChecked] = useState(false); 
    
    const [contacts, setContacts] = useState([]);
    const [city,setCity]=useState([{}])
    const [spec, setSpec] = useState([{}])
    const dispatch = useDispatch();
    const [selectedSpecs, setSelectedSpecs] = useState([]); 
    //Charger les followers
    useEffect(() => {
        fetchFollowers();
    }, []);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        console.log(isChecked)
    };
    const handleOtherSpecCheckboxChange= (event) => {
        setisOtherSpecChecked(event.target.checked);
        console.log(isChecked)
    };

     const fetchFollowers = async () => {
        setLoading(true);
        try {
            const response = await MedNetworksService.getAllMedNetworks();
            
            if (response.status === 200) {
                if (response.data && response.data.length > 0) {
                    setContacts(response.data);
                } else {
                    toast.info("Aucun contact trouvé.");
                    setContacts([]);
                }
            } else {
                toast.error("Erreur de chargement des contacts.");
            }
        } catch (error) {
            toast.error("Erreur lors du chargement des contacts.");
        } finally {
            setLoading(false);
        }
    };
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
    //
    const handleSpecCheckboxChange = (specialiteId) => {
        // Vérifie si la spécialité est déjà sélectionnée
        if (selectedSpecs.includes(specialiteId)) {
            setSelectedSpecs(selectedSpecs.filter(id => id !== specialiteId)); // Décocher la spécialité
        } else {
            setSelectedSpecs([...selectedSpecs, specialiteId]); // Cocher la spécialité
        }
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
                        placeholder="Rechercher un spécialiste"
                    />
                    <div className="input-icon">
                        <img src="/images/network/search-md.svg" alt="Icone de recherche" className="icon-img" />
                    </div>

                </div>
                <div className="scrollable-section"> 
                            
                    <div className="checkbox-container">
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="tout"
                                name="tout"
                                className="checkbox-input"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="tout" className="checkbox-label"></label>
                        </div>
                        <div className="checkbox-text">Tout</div>
                     </div>
                {spec.map((specialite) => (
                    <div className="checkbox-container" key={specialite.id_spec}>
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                                id={`spec_${specialite.id_spec}`}
                                name={`spec_${specialite.id_spec}`}
                                className="checkbox-input"
                                checked={isOtherSpecChecked}
                                onChange={() => handleSpecCheckboxChange(specialite.id_spec)}
                            />
                            <label htmlFor="otherspec" className="checkbox-label"></label>
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
                        />
                        <div className="input-icon">
                        <img src="/images/network/search-md.svg" alt="Icone de recherche" className="icon-img" />
                    </div>

                </div>
                     
            <div className="scrollable-section">   
                    <div className="checkbox-container">
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                            id="tout"
                            name="tout"
                            className="checkbox-input"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="tout" className="checkbox-label"></label>
                    </div>
                    <div className="checkbox-text">Tout</div>
                    </div>
                {city.map((city) => (
                        <div className="checkbox-container" key={city.id_city}>
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                    id="otherspec"
                                    name="otherspec"
                                    className="checkbox-input"
                                  
                                    onChange={handleOtherSpecCheckboxChange}
                                />
                                <label htmlFor="otherspec" className="checkbox-label"></label>
                        </div>
                        <div className="checkbox-text">{city.nom_ville}</div>
                        </div>
                ))}
                      
                                  
               </div>
                </> )}
            
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
                    {contacts.map(contact => (   
                          <div className="card" key={contact.id}>
                              <div className="image-container">
                                <img className="profile-img" src={`${photoUrlBase}${contact.photo_med ? contact.photo_med : "/images/profile_photomed/defaultprofil.png"}`} alt="Ellipse" />
                                  <img className="icon-img" src="/images/network/Gastroentérologue.png" alt="Gastroentérologue" />
                              </div>
                              <div className="text-container">
                                <div className="name">Dr {contact.nom_med} {contact.prenom_med}</div>
                                <div className="specialty">{contact.specialite.libelle}</div>
                              </div>
                          </div>
                         
                       ))}
                      </div>
                  </div>
              
              </div>
          ) : (
           <div className="contact-container">
                  
                    <div className="contact-image">
                         <img src="/images/network/Group7859.svg" alt="Contact" />
                    </div>
                <div className="contact-details">
                    <div className="contact-message">Vous n'avez pas encore de contacts</div>
                    <div  className="add-contact-button">
                        <div className="button-content">
                            <div className="button-icon">
                             <img src="/images/network/plus-circle.svg" alt="Plus Circle Icon" /> 
                            </div>
                            <div  className="button-text">Ajouter des contacts</div>
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


