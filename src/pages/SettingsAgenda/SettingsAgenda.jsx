import React from "react";
import "./SettingsAgenda.scss";
import Navbar from "../../components/navbar/Navbar";
import { SettingMenu } from "../../components/SettingsAgenda/SettingMenu";
import { Content } from "../../components/SettingsAgenda/Content";
function SettingsAgenda() {
  return (
    <div className="settings">
        <Navbar/>
    <div className="settings-agenda">
      <div className="div-4">
        <div className="container">
          <div className="heading">
            <div className="mon-agenda">Paramètres</div>
          </div>
        </div>
        <SettingMenu />
        <Content/>
      </div>
    </div>
    </div>
  );
};
export default SettingsAgenda;