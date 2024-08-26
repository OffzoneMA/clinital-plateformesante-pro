import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import help from '../assets/icons/help.svg';
import plusCircle from '../assets/icons/plus-circle.svg';
import medicalSquare from '../assets/icons/medical-square.svg';
import stethoscope from '../assets/icons/Stethoscope.svg';
import userEdit from '../assets/icons/user-edit@2x.svg';
import vector from '../assets/icons/Vector 413.svg';
import Navbar from "../components/navbar/Navbar";
import CardPage from "./acceuil/CardPage";
import "./MonEquipe.css";
import "../components/acceuil/monequipe.css";

function MonEquipe() {
  const location = useLocation();
  const { equipe } = location.state || { equipe: { medecins: [], secretaires: [], assistants: [] } };

  const [selected, setSelected] = useState(0);
  const [type, setType] = useState("prat");

  const handleClick = (index, tp) => {
    setSelected(index);
    setType(tp);
  };

  const isMedecinsEmpty = !equipe.medecins.length;
  const isSecretairesEmpty = !equipe.secretaires.length;
  const isAssistantsEmpty = !equipe.assistants.length;

  const renderEmptyMessage = () => {
    if (type === "prat" && isMedecinsEmpty) {
      return (
        <div className="frame-2">
          <img className="help" alt="Help" src={help} />
          <div className="frame-3">
            <p className="vous-n-avez-aucun">Vous n&#39;avez aucun praticien</p>
            <div className="button">
              <div className="button-2">
                <img className="plus-circle" alt="plus circle" src={plusCircle} />
                <div className="titre">Ajouter un praticien</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (type === "sec" && isSecretairesEmpty) {
      return (
        <div className="frame-2">
          <img className="help" alt="Help" src={help} />
          <div className="frame-3">
            <p className="vous-n-avez-aucun">Vous n&#39;avez aucun secrétaire</p>
            <div className="button">
              <div className="button-2">
                <img className="plus-circle" alt="plus circle" src={plusCircle} />
                <div className="titre">Ajouter un secrétaire</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (type === "ass" && isAssistantsEmpty) {
      return (
        <div className="frame-2">
          <img className="help" alt="Help" src={help} />
          <div className="frame-3">
            <p className="vous-n-avez-aucun">Vous n&#39;avez aucun assistant</p>
            <div className="button">
              <div className="button-2">
                <img className="plus-circle" alt="plus circle" src={plusCircle} />
                <div className="titre">Ajouter un assistant</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <CardPage equipe={equipe} type={type} />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="mon-quipe-my-team">
        <div className="div">
          <div className="overlap">
            <div className="overlap-group">
              <div className="container">
                <div className="heading">
                  <div className="mon-agenda">Mon équipe</div>
                </div>
              </div>
              <img className="vector" alt="Vector" src={vector} />
            </div>
            <div className="setting-menu">
              <div
                className="main-wrapper"
                onClick={() => handleClick(0, "prat")}
              >
                <div className="main">
                  <img className="icon-instance-node" alt="Stethoscope" src={stethoscope} />
                  <div className={selected === 0 ? 'text-wrapper' : 'text-wrapper-2'}>Praticiens</div>
                </div>
              </div>
              <div
                className="main-wrapper"
                onClick={() => handleClick(1, "sec")}
              >
                <div className="main">
                  <img className="icon-instance-node" alt="user edit" src={userEdit} />
                  <div className={selected === 1 ? 'text-wrapper' : 'text-wrapper-2'}>Secrétaires</div>
                </div>
              </div>
              <div
                className="main-wrapper"
                onClick={() => handleClick(2, "ass")}
              >
                <div className="main">
                  <img className="icon-instance-node" alt="medicale square" src={medicalSquare} />
                  <div className={selected === 2 ? 'text-wrapper' : 'text-wrapper-2'}>Assistant(e)s</div>
                </div>
              </div>
            </div>
            <div className="frame-22">
              {renderEmptyMessage()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MonEquipe;
