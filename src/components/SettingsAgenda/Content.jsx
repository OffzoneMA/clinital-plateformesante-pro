import React, { useState } from "react";
import "./Content.scss";
import { Group } from "./components/Group";
import Model,{ModelBody, ModelFooter, ModelHeader } from "../Models/Model";

export const Content = () => {
  const [showCreneau, setShowCreneau] = useState(false);
  return (
    <div className="content">
      <Group />
      <div className="frame-3l">
        <table className="agenda-tablel">
          <thead>
            <tr>
              <th>JOUR</th>
              <th>DÉBUT</th>
              <th>FIN</th>
              <th>DURÉE</th>
              <th>CATÉGORIE</th>
              <th>MOTIF</th>
              <th>MODE/LIEU</th>
            </tr>
          </thead>
          <tbody>{/* Rows would be dynamically generated here */}</tbody>
        </table>
      </div>
      <div className="framel">
        <img
          className="imgl"
          alt="Frame"
          src="https://c.animaapp.com/BGaboWTw/img/frame.svg"
        />
        <div className="frame-2l">
          <p className="vous-n-avez-aucunel">
            Vous n&#39;avez aucune plage horaire disponible ou programmée
          </p>
          <div className="button-wrapperl">
            <div className="button-2l" onClick={()=>setShowCreneau(true)}>
              <img src="../../icons/circleplus.svg" className="plus-circlel" />
              <div className="titre-2l">Ajouter un créneau</div>
            </div>
          </div>
        </div>
      </div>
      <Model show={showCreneau} setShow={setShowCreneau}>
  
          <div className="frame">
        <div className="frame-2">
         
        </div>
        <div className="text-wrapper">Créneau RDV</div>
        <div className="frame-3">
          <div className="frame-4">
            <div className="frame-5">
              <div className="form">
                <div className="label">Particiens</div>
                <div className="frame-6">
                  
                </div>
              </div>
              <div className="group">
                <div className="overlap">
                  <div className="rectangle" />
                  <div className="titre-2">Nouveau Patient</div>
                  <img className="img" alt="Rectangle" src="https://c.animaapp.com/nRbSI0ip/img/rectangle-3-4.svg" />
                </div>
                <div className="overlap-group">
                  <div className="rectangle-2" />
                  <div className="titre-3">Patient Suivi</div>
                  <img className="img" alt="Rectangle" src="https://c.animaapp.com/nRbSI0ip/img/rectangle-3-4.svg" />
                </div>
                <div className="titre-4">Catégories</div>
              </div>
              <div className="group-2">
                <div className="titre-5">Motif</div>
                <div className="overlap-2">
                  <div className="titre-6">1ère Consultation</div>
                  <div className="rectangle-3" />
                </div>
                <div className="overlap-3">
                  <div className="titre-7">Consultation de suivi</div>
                  <div className="rectangle-4" />
                </div>
                <div className="overlap-4">
                  <div className="titre-8">Urgence</div>
                  <div className="rectangle-4" />
                </div>
              </div>
              <div className="group-2">
                <div className="titre-9">Mode de consultation</div>
                <div className="overlap-2">
                  <div className="titre-10">Cabinet</div>
                  <img
                    className="img-2"
                    alt="Maki doctor"
                    src="https://c.animaapp.com/nRbSI0ip/img/maki-doctor-15.svg"
                  />
                  <div className="rectangle-5" />
                </div>
                <div className="overlap-3">
                  <div className="titre-11">Video</div>
                  <img
                    className="img-2"
                    alt="Videocam outline"
                    src="https://c.animaapp.com/nRbSI0ip/img/videocam-outline.svg"
                  />
                  <div className="rectangle-6" />
                </div>
                <div className="overlap-4">
                  <div className="titre-12">Domicile</div>
                  <img
                    className="img-2"
                    alt="Home outline"
                    src="https://c.animaapp.com/nRbSI0ip/img/home-outline.svg"
                  />
                  <div className="rectangle-6" />
                </div>
              </div>
            </div>
            <div className="frame-5">
              <div className="frame-7">
                <img className="ellipse" alt="Ellipse" src="https://c.animaapp.com/nRbSI0ip/img/ellipse-7.svg" />
                <div className="text-wrapper-2">Médecin</div>
              </div>
              <div className="frame-8">
                <div className="titre-13">Horaires</div>
                <div className="frame-9">
                  <div className="day">
                    <div className="titre-wrapper">
                      <div className="titre-14">L</div>
                    </div>
                    <div className="titre-wrapper">
                      <div className="titre-14">M</div>
                    </div>
                    <div className="titre-wrapper">
                      <div className="titre-14">M</div>
                    </div>
                    <div className="titre-wrapper">
                      <div className="titre-14">J</div>
                    </div>
                    <div className="titre-wrapper">
                      <div className="titre-14">V</div>
                    </div>
                    <div className="titre-wrapper">
                      <div className="titre-14">S</div>
                    </div>
                    <div className="titre-wrapper">
                      <div className="titre-14">D</div>
                    </div>
                  </div>
                  <div className="frame-10">
                    <div className="frame-11">
                      <div className="div-wrapper">
                        <div className="titre-15">09:00</div>
                      </div>
                      <div className="titre-16">à</div>
                      <div className="frame-12">
                        <div className="titre-15">14:00</div>
                      </div>
                    </div>
                    <div className="titre-17">Durée</div>
                    <div className="frame-13">
                      <div className="titre-15">15 mins</div>
                    </div>
                  </div>
                  <div className="frame-14">
                
                    <div className="titre-18">Ajouter un horaire</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className="line" alt="Line" src="https://c.animaapp.com/nRbSI0ip/img/line-109.svg" />
          <div className="frame-2">
           
          </div>
        </div>
      </div>
        
      </Model>
    </div>
  );
};
