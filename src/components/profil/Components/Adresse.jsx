import axios from "axios";
import React, { useEffect, useState } from "react";
import Map from "react-map-gl";
import { useTranslation } from "react-i18next";

const Adress = ({ data }) => {
  const [adresse, setAdresse] = useState([]);
  const [editAdresse, setEditAdresse] = useState(false);
  const [paye, setPaye] = useState([]);
  const [tele, setTele] = useState();
  // const { id } = useParams();
 const { t } = useTranslation();
  const clickEditAdresse = () => {
    setEditAdresse(true);
  };
  const clickSauvgardeAdresse = () => {
    setEditAdresse(false);
  };

  return (
    <div id="adresse" className="container">
      <section className="sectionAdresse">
        <div className="leftPart">
          <div>
            <h5 className="titreDeChamp ">
              <img src="/icons/location-outline.svg" alt="" style={{ marginRight: "5px" }} /> 
              {t("MapandAccessInformation")}
            </h5> <br />
            {editAdresse ? (
              <div>
                <input
                  // defaultValue={data.cabinet.adresse}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <br />
                <input
                  // defaultValue={data.cabinet.code_post}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  // defaultValue={data.ville.nom_pays}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <br />
                <input
                  defaultValue={data.telephone}
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
              </div>
            ) : (
                
            <div className="AdresseInfo">
                  {/* <p className="clinicname"> Clinique - ANFA PALACE</p> */}
                  {/* <p className="Info"> */}
                  {/*   {data.cabinet.adresse} */}
                  {/*   <br /> */}
                  {/*   {data.cabinet.code_post} {data.ville.nom_pays} */}
                  {/* </p> */}

                
                  {data.cabinet && data.cabinet.length > 0 ? (
                data.cabinet.map(cabinet => (
                  <div key={cabinet.id}>
                    <p className="clinicname">{cabinet.nom}</p>  
                    <p className="Info">
                      {cabinet.adresse}<br />
                      {cabinet.ville} {cabinet.code_post}, {data.ville.pays.nom_pays}
                    </p>
                    <p className="Info">{cabinet.phoneNumber}</p>
                  </div>
                ))
              ) : (
                      <p>{t("Notavailable")}</p>
              )}
            </div>
                
                

                
            )}
          </div>
          <div>
           {/* {editAdresse ? (
              <button onClick={clickSauvgardeAdresse} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditAdresse}
              />
            )}*/}
          </div>
        </div>
        <div className="map-container">
        
              <Map
                initialViewState={{
                  longitude: -7.4,
                  latitude: 33.6,
                  zoom: 10,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken="pk.eyJ1IjoibWFyd2FuZW5oIiwiYSI6ImNsNndwYjZjOTBhdXMzam8xc3psdzhvYTEifQ.BNnvlSlxD2Zo8X9i9FVdMw"
            />
      
         </div>
        
      </section>
    </div>
  );
};

export default Adress;
