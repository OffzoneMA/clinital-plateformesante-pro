

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { TOKEN } from "../../services/api";
import Axios from "axios"; 


function myNetwork() {

  
   const [isOtherSpecChecked, setisOtherSpecChecked] = useState(false) //les conditions génerales
   const [loading, setLoading] = useState(false); //une opération est en cours de chargement.
    const [isChecked, setIsChecked] = useState(false); 
    
    const [contacts, setContacts] = useState([
    { id: 1, nom: 'Mohamed Bouy', email: 'john@example.com', specialite: 'Médecin généraliste' },
        { id: 2, nom: 'Jane Smith', email: 'jane@example.com', specialite: 'Médecin généraliste' },
    { id:3, nom: 'Mohamed Bouy', email: 'john@example.com', specialite: 'Médecin généraliste' },
   { id: 4, nom: 'Jane Smith', email: 'jane@example.com', specialite: 'Médecin généraliste' }
    // Ajoutez autant de contacts que vous le souhaitez
]);


    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        console.log(isChecked)
    };
    const handleOtherSpecCheckboxChange= (event) => {
        setisOtherSpecChecked(event.target.checked);
        console.log(isChecked)
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

                <div className="checkbox-container">
                <div className="checkbox-wrapper">
                    <input
                        type="checkbox"
                            id="otherspec"
                            name="otherspec"
                            className="checkbox-input"
                            checked={isOtherSpecChecked}
                            onChange={handleOtherSpecCheckboxChange}
                        />
                        <label htmlFor="otherspec" className="checkbox-label"></label>
                    </div>
                    <div className="checkbox-text">otherspec</div>
                </div>
                <div className="checkbox-container">
                <div className="checkbox-wrapper">
                    <input
                        type="checkbox"
                            id="otherspec"
                            name="otherspec"
                            className="checkbox-input"
                            checked={isOtherSpecChecked}
                            onChange={handleOtherSpecCheckboxChange}
                        />
                        <label htmlFor="otherspec" className="checkbox-label"></label>
                    </div>
                    <div className="checkbox-text">otherspec</div>
                </div>
                <div className="checkbox-container">
                <div className="checkbox-wrapper">
                    <input
                        type="checkbox"
                            id="otherspec"
                            name="otherspec"
                            className="checkbox-input"
                            checked={isOtherSpecChecked}
                            onChange={handleOtherSpecCheckboxChange}
                        />
                        <label htmlFor="otherspec" className="checkbox-label"></label>
                    </div>
                    <div className="checkbox-text">otherspec</div>
                </div>
                
                              </div> 
            
             </>
            )}              
        </div>
            
                <div className="ligne"></div>
                <div className="menu-section">
                     <div className="menu-item">
                         <div className="menu-text">Localisation</div>
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
                    
                <div className="checkbox-container">
                    <div className="checkbox-wrapper">
                        <input
                            type="checkbox"
                                id="otherspec"
                                name="otherspec"
                                className="checkbox-input"
                                checked={isOtherSpecChecked}
                                onChange={handleOtherSpecCheckboxChange}
                            />
                            <label htmlFor="otherspec" className="checkbox-label"></label>
                    </div>
                    <div className="checkbox-text">Casablanca</div>
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
                                  <img className="profile-img" src="/images/network/Ellipse 7.svg" alt="Ellipse" />
                                  <img className="icon-img" src="/images/network/Gastroentérologue.png" alt="Gastroentérologue" />
                              </div>
                              <div className="text-container">
                                  <div className="name">Dr {contact.nom}</div>
                                <div className="specialty">{contact.specialite}</div>
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


