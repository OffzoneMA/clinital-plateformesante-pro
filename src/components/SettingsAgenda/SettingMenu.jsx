import React from "react";
import "./SettingMenu.scss";
import { MenuList } from "./components/MenuList";
import { useTranslation } from 'react-i18next';

export const SettingMenu = ({ activeMenu }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className="setting-menu" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
    style={{
      [ i18n.language === 'ar'  ? "right" : "left"]:
      "0 px",
      padding: i18n.language === 'ar' ? "10px 30px 0px 0px" : "10px 0px 0px 30px",
    }}>
      <div className="div-3">
        <div className="main">
          <img
            className="icon-instance-node"
            alt={t('PRACTITIONERS')}
            src="https://c.animaapp.com/hExK9oUF/img/stethoscope.svg"
          />
          <div className="text-wrapper-7">{t('PRACTITIONERS')}</div>
        </div>
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'CHANGE_PASSWORD'}
          textMenu={t('CHANGE_PASSWORD')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'MY_PRACTICE'}
          textMenu={t('MY_PRACTICE')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'MY_TEAM'}
          textMenu={t('MY_TEAM')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'MANAGE_ACCESS'}
          textMenu={t('MANAGE_ACCESS')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'MY_BILLS'}
          textMenu={t('MY_BILLS')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'TECH_SUPPORT'}
          textMenu={t('TECH_SUPPORT')}
        />
      </div>
      <div className="div-3">
        <div className="main">
          <img
            src="../../icons/userEdit1.svg"
            alt={t('ASSISTANTS_SECRETARIES')}
            className="icon-instance-node"
          />
          <div className="text-wrapper-7">{t('ASSISTANTS_SECRETARIES')}</div>
        </div>
        <MenuList
          className="menu-list-instance"
          menuActive={false}
          textMenu={t('MANAGE_PROFILE')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'MANAGE_PROFILE'}
          textMenu={t('CHANGE_PASSWORD')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'VERIFY_ACCESS'}
          textMenu={t('VERIFY_ACCESS')}
        />
      </div>
      <div className="div-3">
        <div className="main">
          <img
            src="../../icons/calentar1.svg"
            alt={t('AGENDA')}
            className="icon-instance-node"
          />
          <div className="text-wrapper-7">{t('AGENDA')}</div>
        </div>
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'SETTINGS'}
          textMenu={t('SETTINGS')}
        />
        <MenuList
          className="menu-list-instance"
          menuActive={activeMenu === 'EXCEPTIONAL_EVENT'}
          textMenu={t('EXCEPTIONAL_EVENT')}
        />
      </div>
    </div>
  );
};
