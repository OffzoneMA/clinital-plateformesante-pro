
import React, { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import {Route, Routes,useParams} from "react-router-dom";
import MedFollower from "./MedFollower";
import "./medfollower.scss";
import PaginationNetwork from "./PaginationNetwork";

function myNetwork() {
    return (
      
        <div className="mynetwork">
           <div className="network-container-title">
                    <div className="network-header">
                        <div className="network-title">Mon Réseau</div>
                    </div>
                </div>
        <div className="network-container">
             
                
            <div className="menu-container">
                    <div className="menu-section">
                        <div className="menu-item">
                            <div className="menu-text">Spécialistés</div>
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
                                //  disabled={selectAll}
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
                                //disabled={selectAllCities} // Désactive les cases individuelles si "Tout" est sélectionné
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
                            placeholder="Rechercher un praticien sur Clinital"
                            />
                        
                        </div>

                        <button onClick={handleNameSearchSubmit}>
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
                            <Link to={`medecinfollower/?id=${contact.id}`}
                                    className="card" key={contact.id}
                                     
                                >

                         
                            <div className="image-container">
                                <img className="profile-img" src={`${photoUrlBase}${contact.photo_med ? contact.photo_med : "defaultprofil.png"}`} alt="Profil médical" />
                                 <img className="icon-img" src="/images/network/Gastroentérologue.png" alt="Gastroentérologue" />
                            </div>
                             <div className="text-container">
                               <div className="name">Dr {truncateText(`${contact.nom_med} ${contact.prenom_med}`, 12)}</div>

                                    <div className="specialty">{contact.specialite.libelle}</div>
                                </div>
                     
                         </Link>
                                
                            )
                                
                            )
                        ) : (
                           
                        <div className="contact-details">
                             <div className="contact-message">Aucun médecin trouvé avec ce filtre.</div>
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
                                <div className="contact-message">Vous n'avez pas encore de contacts.</div>
                            <Link to="/">
                                <div className="add-contact-button">
                                    <div className="button-content">
                                        <div className="button-icon">
                                            <img src="/images/network/plus-circle.svg" alt="Plus Circle Icon" />
                                        </div>
                                        <div className="button-text">Ajouter des contacts</div>
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