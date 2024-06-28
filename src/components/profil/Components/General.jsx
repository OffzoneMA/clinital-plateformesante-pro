import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const General = ({ data }) => {
  const [editInpe, setEditInpe] = useState(false);
  const [editPayment, setEditPayment] = useState(false);
  const [editExpertises, setEditExpertises] = useState(false);
  const { t } = useTranslation();
  const clickEditInpe = () => {
    setEditInpe(true);
  };
  const clickSauvgardeExpertises = () => {
    setEditExpertises(false);
  };
  /*********************** */
  const clickEditExpertises = () => {
    setEditExpertises(true);
  };
  const clickSauvgardeInpe = () => {
    setEditInpe(false);
  };
  /*********************** */
  const clickEditPayment = () => {
    setEditPayment(true);
  };
  const clickSauvgardePayment = () => {
    setEditPayment(false);
  };

  // const handleChange = (e) => {
  //   setInpe(e.target.value);
  // };
  /******************************************** */

  return (
    <div className="container" id="general">
      <section className="sectionGeneral">
        <div className="hautSec">
          <div className="part1 ">
            <div className="">
              <h5 className="titreDeChamp ">
                <img src="/icons/information-circle.svg" alt="" style={{ marginRight: "5px" }} /> 
                {t("LegalInformation")}
              </h5>
              <p className="titreDeChamp p">
               {t("INPENumber")} :
                {editInpe ? (
                  <input
                    defaultValue={data.inpe}
                    type="text"
                    className="inputEdit Info inputBorder"
                    onChange=""
                  />
                ) : (
                  <span className="Info">{data.inpe}</span>
                )}
              </p>
            </div>
            <div>
              {/* {editInpe ? (
                <button onClick={clickSauvgardeInpe} className="Sauvegarder">
                  Sauvegarder
                </button>
              ) : (
                <img
                  src="/icons/icons_edit.svg"
                  className="iconIdit Info"
                  alt="edit"
                  onClick={clickEditInpe}
                />
              )}*/}
            </div>
          </div>
          <div className="part2">
            <div>
              <h5 className="titreDeChamp">
                <img src="/icons/payment.svg" alt="" style={{marginRight:"5px"}}/>
               {t("PaymentMethods")}
              </h5>
              {editPayment ? (
              <div>
                {data.moyenPaiement.map(paiement => (
                  <input
                    key={paiement.id}
                    defaultValue={paiement.type}
                    type="text"
                    className="inputEdit Info inputBorder"
                   // onChange={(e) => handleInputChange(e, index)}
                  />
                ))}
              </div>
                
              ) : (
            <div className="moyenpaiement" style={{ marginLeft: "40px" }}>
                {data.moyenPaiement && data.moyenPaiement.length > 0 ? (
                  data.moyenPaiement.map(paiement => (
                    <div key={paiement.id}>
                      <span className="Info">{paiement.type}</span>
                      <br />
                    </div>
                  ))
                ) : (
                        <span>{t("Nopaymentmethodsavailable")}</span>
                )}
            </div>



              )}
            </div>
            <div>
              {/* {editPayment ? (
                <button onClick={clickSauvgardePayment} className="Sauvegarder">
                  Sauvegarder
                </button>
              ) : (
                <img
                  src="/icons/icons_edit.svg"
                  className="iconIdit"
                  alt="edit"
                  onClick={clickEditPayment}
                />
              )} */}
            </div>
          </div>
        </div>
        <div className="basSec">
          <div className="expertise">
            <h5 className="titreDeChamp ">
              <img src="/icons/ribbon-outline.svg" alt="" style={{marginRight:"5px"}}/> {t("ExpertiseProceduresSymptoms")}
            </h5>
            {editExpertises ? (
              <div>
                <input
                  defaultValue="Frottis"
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  defaultValue="Suivi en gynécologie"
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  defaultValue="Pilule contraceptive"
                  type="text"
                  className="inputEdit Info inputBorder"
                  onChange=""
                />
                <input
                  defaultValue="Médecine de l'enfant et de l'adolescent"
                  type="text"
                  className="inputEdit Info inputBorder "
                  onChange=""
                />
              </div>
            ) : (
             
                <div className="part3">
                  {data.expertisesMedecin && data.expertisesMedecin.length > 0 ? (
                    data.expertisesMedecin.map(expertise => (
                      <p key={expertise.id} className="Info bg">{expertise.nom_exp}</p>
                    ))
                  ) : (
                    <p>{t("Notavailableatthemoment")}</p>
                  )}
                </div>


         

            )}
          </div>
          <div>
            {/* {editExpertises ? (
              <button
                onClick={clickSauvgardeExpertises}
                className="Sauvegarder"
              >
                Sauvegarder
              </button>
            ) : (
              <img
                src="/icons/icons_edit.svg"
                className="iconIdit"
                alt="edit"
                onClick={clickEditExpertises}
              />
            )}*/}
          </div>
        </div>
      </section>
    </div>
  );
};

export default General;
