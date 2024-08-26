import React from "react";
import "./Group.scss";
import { useTranslation } from "react-i18next";

export const Group = ({ onClick }) => {
  const { t , i18n} = useTranslation();
  return (
    <div className="groupk" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} >
      <div className="text-wrapper-4k"
       style={{
        [ i18n.language === 'ar'  ? "right" : "left"]:
        "0px",
      }}>{t('AGENDA')}</div>
      <div className="buttonk button-instancek" style={{
      [ i18n.language === 'ar'  ? "right" : "left"]:
      "810px",
    }}>
        <div className="divk" onClick={onClick}>
          <img
            src="../../icons/arrow.svg"
            alt="se connecter"
            className="arrow-rightk "
          />
          <div className="titrek">{t('ajouter_un_creneau')}</div>
        </div>
      </div>
      <img
        className="line-2k"
        alt="Line"
        src="https://c.animaapp.com/hExK9oUF/img/line-41.svg"
        style={{
          [ i18n.language === 'ar'  ? "right" : "left"]:
          "0px",
        }}
      />
    </div>
  );
};
