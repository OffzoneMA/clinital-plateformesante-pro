import React from "react";
import "./PublishProfilSucces.scss";
import MenuCabinet from "../menuCabinet/MenuCabinet";

function PublishProfilSucces() {
  return (
    <div className="publishProfilS">
      <div className="result-container">
        <MenuCabinet state="4" />
      </div>
      <div className="containerS">
        <p className="text-wrapperS">
          Félicitations ! <br/>
          Votre profil a été publié avec succès
        </p>
        <img className="checkS" alt="Check" src="../icons/check.svg"/>
        <div className="groupS">
          <div className="overlap-groupS">
          <div className="buttonS">
            <div className="button-2S">
              <div className="titre-2S">Voir mon profil</div>
            </div>
          </div>
          <img className="funnyS" alt="Funny" src="../images/suc_mdp-img.png"/>
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
