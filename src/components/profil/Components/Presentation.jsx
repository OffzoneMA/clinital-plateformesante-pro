import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Presentation = ({ data }) => {
  const [editpresentation, setEditPresentation] = useState(false);
  const [editlangue, setEditLangue] = useState(false);
  const [editDiplome, setEditDiplome] = useState(false);
  const [editExperiences, setEditExperiences] = useState(false);
  const { t } = useTranslation();
  const photoUrl = `/images/profile_photomed/${data.photo_med}`; //l'URL de la photo de profil
  const photocouvertureUrl = `/images/profile_photomed/${data.photo_couverture_med}`;

  const clickEditPresentation = () => {
    setEditPresentation(true);
  };
  const clickSauvgardeExperience = () => {
    setEditExperiences(false);
  };

  const clickEditExperience = () => {
    setEditExperiences(true);
  };
  const clickSauvgardePresentation = () => {
    setEditPresentation(false);
  };

  const clickEditDiplome = () => {
    setEditDiplome(true);
  };
  const clickSauvgardeDiplome = () => {
    setEditDiplome(false);
  };

  const clickEditLangue = () => {
    setEditLangue(true);
  };
  const clickSauvgardeLangue = () => {
    setEditLangue(false);
  };

  return (
    <div id="presentation" className="container">
      <section className="sectionPresentation">
        <div className="section1">
          <div>
            <h5 className="titreDeChamp " style={{marginBottom:"2px"}}>
              <img src="/icons/list.svg" style={{ marginRight: "5px" }} /> {t("Presentation")}
            </h5>
            <div className="ms">
              {editpresentation ? (
                <div>
                  <textarea
                    defaultValue={data.description_med}
                    type="text"
                    className="inputBorder inputEdit Info disc"
                    onChange=""
                  />
                </div>
              ) : (
                <p className="Info">{data.description_med}</p>
              )}
          <div className="imagHistory">
              {data.photo_med && (
                <img
                  className="me"
                  src={photoUrl}
                  alt=""
                  style={{width: '65px', height: '65px', background: 'linear-gradient(0deg, #C4C4C4 0%, #C4C4C4 100%)', borderRadius: 3}}
                />
              )}

              {data.photo_couverture_med && (
                <img
                  className="me"
                  src={photocouvertureUrl}
                  alt=""
                  style={{width: '65px', height: '65px', background: 'linear-gradient(0deg, #C4C4C4 0%, #C4C4C4 100%)', borderRadius: 3}}
                />
              )}
            </div>

            </div>
          </div>
          <div>
            {/*{editpresentation ? (
              <button
                onClick={clickSauvgardePresentation}
                className="Sauvegarder"
              >
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditPresentation}
              />
            )}*/}
          </div>
        </div>
        <div className="section2 ">
          <div>
            <h5 className="titreDeChamp" style={{marginBottom:"2px"}}>
              <img src="/icons/language.svg" style={{marginRight:"5px"}}/> {t("SpokenLanguages")}
            </h5>
            <div className="ms">
              {editlangue ? (
                <div>
                  <input
                    defaultValue="Anglais et Français"
                    type="text"
                    className="inputBorder inputEdit Info"
                    onChange=""
                  />
                </div>
              ) : (
                  <div>
                  {data.langues && data.langues.length > 0 ? (
                    data.langues.map((languesmed,languesmedid) => (
                      <p key={languesmedid} className="Info">{languesmed.name}</p>
                    ))
                  ) : (
                        <p>{t("Notavailableatthemoment") }</p>
                  )}
                 
                  </div>
              )}
            </div>
          </div>
          <div>
            {/* {editlangue ? (
              <button onClick={clickSauvgardeLangue} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditLangue}
              />
            )}*/}
          </div>
        </div>
        <div className="section3">
          <div>
            <h5 className="titreDeChamp ">
              <img src="/icons/diplomeIcon.svg" style={{marginRight:"5px"}}/>
             {t("DiplomasandCertifications")}
            </h5>
            <div >
              {editDiplome ? (
                <div>
                  <input
                    defaultValue="2011"
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                  <span className="trais"></span>
                  <input
                    defaultValue={data.diplome_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                </div>
              ) : (
               <div className="diplome">
                  {data.diplome_med && data.diplome_med.length > 0 ? (
                    data.diplome_med.map((diplome, indexdiplome) => (
                     <div className="flex" key={indexdiplome}>
                        <p className="titreDeChamp ms">{new Date(diplome.date_fin).getFullYear()}</p>
                        <span className="trais"></span>
                        <p className="Info inputBorder">
                          {`${diplome.nom_diplome}`}
                        </p>
                     </div>
                    ))
                  ) : (
                        <p>{t("Nodiplomasavailableatthemoment") }</p>
                  )}
                </div>


              )}
            </div>
          </div>
          <div>
            {/* {editDiplome ? (
              <button onClick={clickSauvgardeDiplome} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info inputBorder"
                alt="edit"
                onClick={clickEditDiplome}
              />
            )}*/}
          </div>
        </div>

        <div className="section4">
          <div className="">
            <h5 className="titreDeChamp ">
              <img src="/icons/experience.svg" style={{marginRight:"5px"}}/>
              {t("Experiences")}
            </h5>
            {editExperiences ? (
              <div>
                <div className="">
                  <input
                    defaultValue="Depuis 2015"
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                  <span className="trais"></span>
                  <input
                   // defaultValue={data.experience_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                </div>
                <div className="">
                  <input
                    defaultValue="Depuis 2013"
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                  <span className="trais"></span>
                  <input
                    //defaultValue={data.experience_med}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                </div>
              </div>
            ) : (
              <div className="experiences">
                {data.experience_med && data.experience_med.length > 0 ? (
                  data.experience_med.map((experience, indexep) => (
                    <div className="flex" key={indexep}>
                      <p className="titreDeChamp ms ">{new Date(experience.date_debut).getFullYear()} - {new Date(experience.date_fin).getFullYear()} </p>
                      <span className="trais"></span>
                      <p className="Info">{experience.nom_experience}</p>
                    </div>
                  ))
                ) : (
                      <p>{t("Notavailableatthemoment")}</p>
                )}
              </div>

           
            )}
          </div>
          <div>
            {/* {editExperiences ? (
              <button
                onClick={clickSauvgardeExperience}
                className="Sauvegarder"
              >
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditExperience}
              />
            )}*/}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Presentation;
