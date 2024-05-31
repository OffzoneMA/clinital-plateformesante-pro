import React from "react";
import "./PublishProfil2.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";

function PublishProfil2() {
  return (
    <div className="publishProfilP">
      <div className="result-container">
        <MenuCabinet state="4" />
      </div>
      <div className="containerP">
      <div className="divP">
        <div className="div-2P">
          <div className="titreP">Publier mon profil</div>
          <p className="text-wrapperP">2 - Publier mon Profil</p>
        </div>
        <div className="div-3P">
          <img className="ellipseP" alt="Ellipse" src="../../icons/doctor.svg" />
          <div className="div-4P">
            <div className="text-wrapper-2P">Dr Démos CLINITAL</div>
            <div className="text-wrapper-3P">Médecin généraliste</div>
          </div>
        </div>
      </div>   
      <hr className="lineP" alt="Line"  />
      <div className="div-5P">
        <img className="imgP" alt="Frame" src="../../icons/Frame.svg" />
        <div className="div-6P">
          <div className="flexcontainerP">
          <p className="textP">
            <span className="spanP">
            Bienvenue sur Clinital ! <br/>
            </span>
          </p>
          <p className="textP">
          <span className="text-wrapper-4P">
          En cliquant sur le bouton ci-dessous, vous rendrez votre profil visible
            <br />
           à tous les utilisateurs. 
           <br/>
           Nous vous remercions de rejoindre notre communauté médicale.
            </span>
          </p>
          </div>
          <div className="buttonP">
            <div className="button-2P">
              <div className="titre-2P">Publier</div>
              <img className="plus-circleP" alt="plus-circle" src="../../icons/flech-white.svg" />
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
