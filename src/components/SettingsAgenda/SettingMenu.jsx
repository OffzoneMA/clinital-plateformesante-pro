import React from "react";
import "./SettingMenu.scss";
import { MenuList } from "./components/MenuList";

export const SettingMenu = () => {
  return (
    <div className="setting-menu">
      <div className="div-3">
        <div className="main">
          <img
            className="icon-instance-node"
            alt="Stethoscope"
            src="https://c.animaapp.com/hExK9oUF/img/stethoscope.svg"
          />
          <div className="text-wrapper-7">Praticiens</div>
        </div>
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Modifier mon mot de passe"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Mon cabinet"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Mon équipe"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Gérer les accès"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Mes factures"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Support technique"
        />
      </div>
      <div className="div-3">
        <div className="main">
        <img
            src="../../icons/userEdit1.svg"
            alt="se connecter"
        className="icon-instance-node "
          />
          <div className="text-wrapper-7">Assistant(e)s / Secrétaires</div>
        </div>
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Gérer mon Profil"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Modifier mon mot de passe"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Vérifier mes accès"
        />
      </div>
      <div className="div-3">
        <div className="main">
          <img
            src="../../icons/calentar1.svg"
            alt="se connecter"
        className="icon-instance-node "
          />
         
          <div className="text-wrapper-7">Agenda</div>
        </div>
        <MenuList
          className="menu-list-instance"
          menuActive={true}
          textMenu="Paramètres"
        />
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu="Événement exceptionnel"
        />
      </div>
    </div>
  );
};
