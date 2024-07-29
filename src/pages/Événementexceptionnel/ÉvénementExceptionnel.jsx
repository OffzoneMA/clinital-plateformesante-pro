import React from "react";
import "./ÉvénementExceptionnel.scss";
import Navbar from "../../components/navbar/Navbar";
import { SettingMenu } from "../../components/SettingsAgenda/SettingMenu";
import { useTranslation } from "react-i18next";
import { ContentExceptionnel } from "../../components/SettingsAgenda/ContentExceptionnel";
function ÉvénementExceptionnel() {
  const { t , i18n} = useTranslation();
  return (
    <div className="settings" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>

        <Navbar/>
    <div className="settings-agenda">
      <div className="div-4">
        <div className="container" style={{
        [ i18n.language === 'ar'  ? "right" : "left"]:
        "0px",
      }}>
          <div className="heading">
            <div className="mon-agenda">{t('SETTINGS')}</div>
          </div>
        </div>
        <SettingMenu activeMenu="EXCEPTIONAL_EVENT" />
        <ContentExceptionnel/>
      </div>
    </div>
    </div>
  );
};
export default ÉvénementExceptionnel;