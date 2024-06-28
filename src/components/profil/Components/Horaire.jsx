import React, { useState } from "react";
import groupAndMergeSchedules from "../ProfileServices/scheduleUtils";
import { useTranslation } from "react-i18next";

const Horaire = ({ data, horaires }) => {
  
  const groupedSchedules = groupAndMergeSchedules(horaires);
  const [editContact, setEditContact] = useState(false);
  const { t } = useTranslation();
  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];


  //Formater les heures
  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}h${minutes}`;
  };

  const clickEditCS = () => {
    setEditContact(true);
  };
  const clickSauvgardeCS = () => {
    setEditContact(false);
  };


  return (
    <div className="container" id="horaire">
      <section className="sectionPresentation">
        <div className="flex justif">
          <div>
            <h5 className="titreDeChamp mb">
              <img src="/icons/timeIcon.svg" alt="" style={{ marginRight: "5px" }} />
              <span style={{marginTop:"4px" }}>{t("SchedulesandContacts")}</span>
            </h5>
          </div>
          <div>
            {/*{editContact ? (
              <button onClick={clickSauvgardeCS} className="Sauvegarder">
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit Info"
                alt="edit"
                onClick={clickEditCS}
              />
            )}*/}
          </div>
        </div>
        {editContact ? (
          <div className=" ms flex justif w-75">
            <div>
              <h5 className="titreDeChamp  ">{t("SecretarialOpeningHours")}</h5>
              <select className="Info select">
                <option value="">Lundi: 8h30 - 18h00 </option>
                <option value="">Mardi: 8h30 - 18h00</option>
                <option value="">Mercredi: 8h30 - 18h00</option>
                <option value="">Jeudi: 8h30 - 18h00</option>
                <option value="">Vendredi: 8h30 - 18h00</option>
                <option value="">Samedi: 8h30 - 12h00</option>
              </select>
            </div>
            
            <div>
              <h5 className="titreDeChamp "> {t("ContactSecretariat")}</h5>
              <input
                defaultValue="05 42 03 49 50"
                type="text"
                className="inputBorder inputEdit Info"
                onChange=""
              />
            </div>
            <div>
              <h5 className="titreDeChamp "> {t("EmergencyContact") }</h5>
              <input
                defaultValue="En cas d'urgence, contactez le 15"
                type="text"
                className=" inputBorder inputEdit Info"
                onChange=""
              />
            </div>
          </div>
        ) : (
            <div className="flex ms justif align-center ">
                <div className="horaireMed">
                  <h5 className="titreDeChamp mb" >{t("SecretarialOpeningHours")}</h5>
                  {Object.keys(groupedSchedules).length > 0 ? (
                  
                    Object.keys(groupedSchedules)
                      .filter((day) => groupedSchedules[day].length > 0) 
                      .sort((day1, day2) => daysOfWeek.indexOf(day1) - daysOfWeek.indexOf(day2)) // Trier les jours de la semaine
                      .map((day) => (
                        <div className="flex" key={day}>
                          <div className="Info" style={{width:"80px"}}>{t(day)}</div>
                          {/*<div className="dayschedules">{day.charAt(0).toUpperCase() + day.slice(1)}</div>*/}
                  
                            <span className="ms point" style={{width:"10px"}}> : </span>
                          {/* Mapper les horaires */} 
                      
                              {groupedSchedules[day].map((schedule, index) => (
                         
                            <div className="Info schedule" key={index}>
                                  
                                  {index !== 0 && ", "}
                                  {/* heure de début */}
                                  
                              {schedule.start.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  {/* heure de fin */}
                                  -{" "}
                              {schedule.end.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                         
                              ))}
                      </div>
                      
                     
                                              
                      ))
                  ) : (
                    
                    <p>{t("Notavailable")}</p>
                  )}
                </div>
            

            
                
                <div>
                  
                    <h5 className="titreDeChamp mb "> {t("ContactSecretariat")}</h5>
                    
                      {data.cabinet && data.cabinet.length > 0 ? (
                    data.cabinet.map(cabinet => (
                      <div key={cabinet.id}>
                        <p className="Info">{cabinet.phoneNumber}</p>
                      </div>
                    ))
                  ) : (
                    <p>{t("Notavailable")}</p>
                  )}
                
                </div>
                  
                <div>
                  <h5 className="titreDeChamp mb">{t("EmergencyContact") }</h5>
                  <p className="Info">{t("EmergencyContacttexte")}</p>
                </div>
          </div>
          )}
          </section>
    </div>
  );
};

export default Horaire;
