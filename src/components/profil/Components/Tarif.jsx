import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Tarif = ({ data }) => {
  const [editTarif, setEditTarif] = useState(false);
  const { t } = useTranslation();
  const clickEditTarif = () => {
    setEditTarif(true);
  };
  const clickSauvgardeTarif = () => {
    setEditTarif(false);
  };

  return (
    <div id="tarif" className="container">
      <section className="sectionPresentation">
        <div className="">
          <div className=" ">
            <div className="">
              <div className="flex justif">
                <h5 className="titreDeChamp ">
                  <img src="/icons/tarifIcon.svg" alt="" style={{ marginRight: "5px" }} /> 
                  {t("Prices")}
                </h5>
                <div>
                  {/* {editTarif ? (
                    <button
                      onClick={clickSauvgardeTarif}
                      className="Sauvegarder"
                    >
                      Sauvegarder
                    </button>
                  ) : (
                    <img
                      src="/icons/icons_edit.svg"
                      className="iconIdit Info"
                      alt="edit"
                      onClick={clickEditTarif}
                    />
                  )}*/}
                </div>
              </div>
              <div className="divTarif">
               {data.tarifs && data.tarifs.length > 0 ? (
                  data.tarifs.map(tarif => (
                    <div className="flex justif mb" key={tarif.id}>
                      <div className="flex">
                        <p className="ms titreDeChamp">
                          {tarif.description}
                        </p>
                        <span className="trais traisTarif"></span>
                      </div>
                      {editTarif ? (
                        <input
                          defaultValue={tarif.price + " Dh"}
                          type="text"
                          className="inputEdit Info inputBorder"
                          onChange="{(e) => handlePriceChange(e, tarif.description)}"
                        />
                      ) : (
                          <p className="ms prix">{tarif.price} {t("Dirham")}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>{t("Notavailable")}</p>
                )}


              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tarif;
