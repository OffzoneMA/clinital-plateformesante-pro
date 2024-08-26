import React from "react";
import "./SettingsAgenda.scss";
import Navbar from "../../components/navbar/Navbar";
import { SettingMenu } from "../../components/SettingsAgenda/SettingMenu";
import { Content } from "../../components/SettingsAgenda/Content";
import { useTranslation } from "react-i18next";
function SettingsAgenda() {
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
        <SettingMenu activeMenu="SETTINGS" />
        <Content/>
      </div>
    </div>
    </div>
  );
};
export default SettingsAgenda;