import React,  { useState, useEffect } from "react";
import mail02 from "../assets/icons/mail-02.svg";
import phone from '../assets/icons/phone.svg';
import { useLocation } from 'react-router-dom';

import '../components/acceuil/monequipe.css';
function Myteam () {
  const location = useLocation();
  const { equipe } = location.state || { equipe: { medecins: [], secretaires: [], assistants: [] } };

  return (


  
    <div className="frame-39">
      <div className="frame-36">
        <div className="text-wrapper-16">Mon équipe</div>
        <div className="frame-9">
          <div className="text-wrapper-8">Voir plus</div>
        </div>
      </div>
      {equipe.medecins.map((medecin) => (
        <div className="card" key={medecin.id}>
          <div className="frame">
            <div className="div-wrapper">
              <div className="text-wrapperr">{`${medecin.prenom_med} ${medecin.nom_med}`}</div>
            </div>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper-2">Médical</div>
                <div className="frame-3">
                  <div className="text-wrapper-3">Docteur</div>
                </div>
              </div>
              <div className="text-wrapper-4">Service : {medecin.specialite.libelle}</div>
              <div className="frame-4">
                <div className="address">
                  <img className="icon-instance-node" alt="Frame" src={phone} />
                  <div className="text-wrapper-5">{medecin.contact_urgence_med}</div>
                </div>
                <div className="address-2">
                  <img className="icon-instance-node" alt="Frame" src={mail02} />
                  <div className="text-wrapper-5">regoug@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {equipe.secretaires.map((secretaire) => (
        <div className="card" key={secretaire.id}>
          <div className="frame2">
            <div className="div-wrapper2">
              <div className="text-wrapper2">{`${secretaire.prenom} ${secretaire.nom}`}</div>
            </div>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper-2">Administrative</div>
                <div className="frame-32">
                  <div className="text-wrapper-3">Secrétaire</div>
                </div>
              </div>
              <div className="text-wrapper-4">Adresse : {secretaire.adresse}</div>
              <div className="frame-4">
                <div className="address">
                  <img className="icon-instance-node" alt="Frame" src={phone} />
                  <div className="text-wrapper-5">{secretaire.user.telephone}</div>
                </div>
                <div className="address-2">
                  <img className="icon-instance-node" alt="Frame" src={mail02} />
                  <div className="text-wrapper-5">{secretaire.user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      

      {/* <div className="frame-38">
        <img className="help-2" alt="Help" src="https://c.animaapp.com/NnydzBh0/img/help-2.svg" />
        <p className="vous-n-avez-pas-3">Vous n&#39;avez pas encore d&#39;équipe.</p>
        <div className="button">
          <div className="button-2">
            <PlusCircle2 className="plus-circle" />
            <div className="titre">Ajouter une équipe</div>
          </div>
        </div>
      </div> */}
    </div>
  
  );
};

export default Myteam;
