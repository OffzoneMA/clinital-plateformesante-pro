import React from "react";
import "./PublishProfil2.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";

function PublishProfil2() {
  return (
    <div className="publishProfil">
      <div className="result-container">
        <MenuCabinet state="4" />
      </div>
      <div className="container">
      <div className="div">
        <div className="div-2">
          <div className="titre">Publier mon profil</div>
          <p className="text-wrapper">2 - Publier mon Profil</p>
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
          <div className="flexcontainer">
          <p className="text">
            <span className="span">
            Bienvenue sur Clinital ! <br/>
            </span>
          </p>
          <p className="text">
          <span className="text-wrapper-4">
          En cliquant sur le bouton ci-dessous, vous rendrez votre profil visible
            <br />
           à tous les utilisateurs. 
           <br/>
           Nous vous remercions de rejoindre notre communauté médicale.
            </span>
          </p>
          </div>
          <div className="button">
            <div className="button-2">
              <div className="titre-2">Publier</div>
              <img className="plus-circle" alt="plus-circle" src="../../icons/flech-white.svg" />
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

export default PublishProfil2;
