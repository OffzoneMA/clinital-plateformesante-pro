import React from "react";
import "./PublishProfilSucces.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";

function PublishProfilSucces() {
  return (
    <div className="publishProfil">
      <div className="result-container">
        <MenuCabinet state="4" />
      </div>
      <div className="container">
        <p className="text-wrapper">
          Félicitations ! <br/>
          Votre profil a été publié avec succès
        </p>
        <img className="check" alt="Check" src="../icons/check.svg"/>
        <div className="group">
          <div className="overlap-group">
          <div className="button">
            <div className="button-2">
              <div className="titre-2">Voir mon profil</div>
            </div>
          </div>
          <img className="funny" alt="Funny" src="../images/suc_mdp-img.png"/>
          </div>
        </div>
      </div>
      <div className="bg">
        <img src="../images/bg-insc.png" alt="" />
      </div>
    </div>
  );
}

export default PublishProfilSucces;
