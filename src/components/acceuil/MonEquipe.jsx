import React,  { useState, useEffect } from "react";
import mail02 from "../../assets/icons/mail-02.svg";
import phone from '../../assets/icons/phone.svg';
import {PlusCircle2} from '../../icons/PlusCircle2/PlusCircle2'
import { getEquipe } from "../../action/praticien";
import { Link } from "react-router-dom"; 

import './monequipe.css';
function MonEquipe () {
  const [equipe, setEquipe] = useState({ medecins: [], secretaires: [], assistants: [] });
  useEffect(() => {
  
    getEquipe(setEquipe)
    console.log(equipe);
  }, []);
  const premierMedecin = equipe.medecins[0];
  const premierSecretaire = equipe.secretaires[0];
  const premierAssistant = equipe.assistants[0];
  return (


  
    <div className="frame-39">
        <div className="frame-36">
        <div className="text-wrapper-16">Mon équipe</div>
        <Link to="/myteam" state={{equipe}}>
        <div className="frame-9">
          <div className="text-wrapper-8">Voir plus</div>
        </div>
        </Link>
      </div>
      {equipe ? (
        <>
      
      {premierAssistant && (
        <div className="card" key={premierAssistant.id}>
          <div className="frame">
            <div className="div-wrapper">
              <div className="text-wrapperr">{`${premierAssistant.prenom} ${premierAssistant.nom}`}</div>
            </div>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper-2">Médical</div>
                <div className="frame-3">
                  <div className="text-wrapper-3">Assistant(e)</div>
                </div>
              </div>
              <div className="text-wrapper-4">Service : {premierAssistant.adresse}</div>
              <div className="frame-4">
                <div className="address">
                  <img className="icon-instance-node" alt="Frame" src={phone} />
                  <div className="text-wrapper-5">{premierAssistant.user.telephone}</div>
                </div>
                <div className="address-2">
                  <img className="icon-instance-node" alt="Frame" src={mail02} />
                  <div className="text-wrapper-5">{premierAssistant.user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {premierMedecin && (
        <div className="card" key={premierMedecin.id}>
          <div className="frame">
            <div className="div-wrapper">
              <div className="text-wrapperr">{`${premierMedecin.prenom_med} ${premierMedecin.nom_med}`}</div>
            </div>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper-2">Médical</div>
                <div className="frame-3">
                  <div className="text-wrapper-3">Docteur</div>
                </div>
              </div>
              <div className="text-wrapper-4">Service : {premierMedecin.specialite.libelle}</div>
              <div className="frame-4">
                <div className="address">
                  <img className="icon-instance-node" alt="Frame" src={phone} />
                  <div className="text-wrapper-5">{premierMedecin.contact_urgence_med}</div>
                </div>
                <div className="address-2">
                  <img className="icon-instance-node" alt="Frame" src={mail02} />
                  <div className="text-wrapper-5">regoug@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {premierSecretaire && (
        <div className="card" key={premierSecretaire.id}>
          <div className="frame2">
            <div className="div-wrapper2">
              <div className="text-wrapper2">{`${premierSecretaire.prenom} ${premierSecretaire.nom}`}</div>
            </div>
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper-2">Administratif</div>
                <div className="frame-32">
                  <div className="text-wrapper-3">Secrétaire</div>
                </div>
              </div>
              <div className="text-wrapper-4">Service : Dermatologique</div>
              <div className="frame-4">
                <div className="address">
                  <img className="icon-instance-node" alt="Frame" src={phone} />
                  <div className="text-wrapper-5">{premierSecretaire.user.telephone}</div>
                </div>
                <div className="address-2">
                  <img className="icon-instance-node" alt="Frame" src={mail02} />
                  <div className="text-wrapper-5">{premierSecretaire.user.email}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
        </>
      ):(
        <div className="frame-38">
        <img className="help-2" alt="Help" src="https://c.animaapp.com/NnydzBh0/img/help-2.svg" />
        <p className="vous-n-avez-pas-3">Vous n&#39;avez pas encore d&#39;équipe.</p>
        <div className="button">
          <div className="button-2">
            <PlusCircle2 className="plus-circle" />
            <div className="titre">Ajouter une équipe</div>
          </div>
        </div>
      </div>
      )}
      
  

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

export default MonEquipe;
