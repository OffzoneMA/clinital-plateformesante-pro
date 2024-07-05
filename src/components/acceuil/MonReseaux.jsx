import React, { useEffect, useState } from "react";
import { DatingDayInMonth } from "../dashboard/DatingDayInMonth";
import { DatingDayOutOf } from "../dashboard/DatingDayOutOf";
import { DatingWeekLabel } from "../dashboard/DatingWeekLabel";
import { HeaderPro } from "../dashboard/HeaderPro";
import { ArrowCircleLeft1 } from "../../icons/ArrowCircleLeft1";
import { ArrowCircleRight1 } from "../../icons/ArrowCircleRight1";
import { ChevronDown } from "../../icons/ChevronDown";
import { PlusCircle2 } from "../../icons/PlusCircle2";
import Navbar from "../navbar/Navbar";
import maki_doctor from '../../assets/icons/maki_doctor-15.svg';
import fluent_patient from '../../assets/icons/fluent_patient-32-regular.svg';
import fluent_people from '../../assets/icons/fluent_people-community-20-regular.svg';
import calendar from '../../assets/icons/calendar-outline.svg';
//import "./style.css";

import Dashboard from "./Dashboard";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import MedNetworksService from "../medecinNetwork/services/medNetworkService";
import "react-toastify/dist/ReactToastify.css";
function MonReseaux() {
  
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const photoUrlBase = `/images/profile_photomed/`;
   useEffect(() => {
    fetchAllMedecins();
  }, []);

  const fetchAllMedecins = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const displayedContacts = contacts.slice(0, 4);
  return (
    <div className="frame-40">
      <div className="frame-36">
        <div className="text-wrapper-16">Mon Réseau</div>
        <Link to="/mynetwork"> <div style={{paddingLeft: 12, paddingRight: 12, paddingTop: 7, paddingBottom: 7, background: '#6DC0F9', borderRadius: 39, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
            <div style={{color: 'white', fontSize: 12, fontFamily: 'Avenir Next LT Pro', fontWeight: '600', wordWrap: 'break-word'}}>Voir plus</div>
        </div></Link> 
      </div>
    {displayedContacts.length === 0 ? (
      <div className="frame-41">
   
          <div className="group-6">
            <img className="vector-12" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-22.png" />
            <img className="vector-13" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-23.png" />
            <img className="vector-14" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-24.png" />
            <img className="vector-15" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-25.png" />
            <img className="vector-16" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-26.png" />
            <img className="vector-17" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-27.png" />
            <img className="vector-18" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-28.png" />
          </div>
          <p className="vous-n-avez-pas-2">Vous n'avez pas encore de contacts.</p>
          <div className="button">
            <Link to="/">
            <div className="button-2">
              <PlusCircle2 className="plus-circle" />
              <div className="titre">Ajouter des contacts</div>
            </div>
            </Link>
          </div>
        </div>
        ): (
          displayedContacts.map((contact) => (
         
       <div key={contact.id}style={{alignSelf: 'stretch', flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 16, display: 'flex'}}>

        <div style={{alignSelf: 'stretch', height: 85, paddingLeft: 12, paddingRight: 12, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 8, border: '1px rgba(109, 192, 249, 0.50) solid', justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'inline-flex'}}>
            <div style={{width: 60, height: 60, position: 'relative'}}>
                <img style={{width: 60, height: 60, left: 0, top: 0, position: 'absolute', borderRadius: 9999}}   src={`${photoUrlBase}${contact.photo_med ? contact.photo_med : "defaultprofil.png"}`}
                    alt="Profil médical"/>
                <img style={{width: 45, height: 37, left: 0, top: 23, position: 'absolute'}}  src="/images/network/Gastroentérologue.png"
                    alt="Icon" />
            </div>
            <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 6, display: 'inline-flex'}}>
                <div style={{color: '#303030', fontSize: 12, fontFamily: 'Montserrat', fontWeight: '600', wordWrap: 'break-word'}}>Dr {contact.nom_med} {contact.prenom_med}</div>
                <div style={{color: '#6C727B', fontSize: 12, fontFamily: 'Avenir Next LT Pro', fontWeight: '400', wordWrap: 'break-word'}}>Médecin {contact.specialite.libelle}</div>
            </div>
        </div>
          </div>
        ))
        )} 
      </div> 
   
  
  );
};

export default MonReseaux;
