import React from "react";
import "./PublishProfil1.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";

function PublishProfil1() {
  return (
    <div className="publishProfil">
      <div className="result-container">
        <MenuCabinet state="4" />
      </div>
      <div className="container">
      <div className="div">
        <div className="div-2">
          <div className="titre">Publier mon profil</div>
          <p className="text-wrapper">1 - Configurer mon Agenda</p>
        </div>
        <div className="div-3">
          <img className="ellipse" alt="Ellipse" src="../../icons/doctor.svg" />
          <div className="div-4">
            <div className="text-wrapper-2">Dr Démos CLINITAL</div>
            <div className="text-wrapper-3">Médecin généraliste</div>
          </div>
        </div>
      </div>   
      <hr className="line" alt="Line"  />
      <div className="div-5">
        <img className="img" alt="Frame" src="../../icons/Frame.svg" />
        <div className="div-6">
          <p className="pour-publier-votre">
            Pour publier votre profil sur Clinital
            <br />
            Veuillez paramétrer votre agenda en ajoutant des créneaux de rendez-vous.
          </p>
          <div className="button">
            <div className="button-2">
            <img className="plus-circle" alt="plus-circle" src="../../icons/plus-circle.svg" />
              <div className="titre-2">Ajouter un créneau</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default PublishProfil1;
