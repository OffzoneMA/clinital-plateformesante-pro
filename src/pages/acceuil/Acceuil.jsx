import React from "react";
import { DatingDayInMonth } from "../../components/dashboard/DatingDayInMonth";
import { DatingDayOutOf } from "../../components/dashboard/DatingDayOutOf";
import { DatingWeekLabel } from "../../components/dashboard/DatingWeekLabel";
import { HeaderPro } from "../../components/dashboard/HeaderPro";
import { ArrowCircleLeft1 } from "../../icons/ArrowCircleLeft1";
import { ArrowCircleRight1 } from "../../icons/ArrowCircleRight1";
import { ChevronDown } from "../../icons/ChevronDown";
import { PlusCircle2 } from "../../icons/PlusCircle2";
import Navbar from "../../components/navbar/Navbar";
import maki_doctor from '../../assets/icons/maki_doctor-15.svg';
import fluent_patient from '../../assets/icons/fluent_patient-32-regular.svg';
import fluent_people from '../../assets/icons/fluent_people-community-20-regular.svg';
import calendar from '../../assets/icons/calendar-outline.svg';
import "./style.css";
import Dashboard from "../../components/acceuil/Dashboard";
import Chart from "../../components/acceuil/Chart";
import Agenda from "../../components/acceuil/Agenda";
import Chart2 from "../../components/acceuil/Chart2";
import MesPatients from "../../components/acceuil/MesPatients";
import MonEquipe from "../../components/acceuil/MonEquipe";
import MonReseaux from "../../components/acceuil/MonReseaux";
import MiniFooter from "../../components/footer/MiniFooter";

function Acceuil () {
  return (
    <div className="dashboard">
      <div className="div-2">
        <div className="container">
          <div className="heading">
            <div className="mon-agenda">Dashboard</div>
          </div>
        </div>
        
        <Navbar />
       {/* overlap */}
        
        <Dashboard />
      <div className="inline">
        <Chart />
        <Chart2 />
        <Agenda />
      </div>
       

        <div className="frame-34">
        <MesPatients />
        <MonEquipe />
        <MonReseaux />
        </div>

        
      </div>
    <div className="mini-footer">
          <div className="overlap-group-2">
            <div className="frame-6">
              <div className="text-wrapper-5">Conditions Générales d&#39;Utilisation</div>
              <div className="text-wrapper-6">·</div>
              <div className="text-wrapper-5">Mentions légales</div>
              <div className="text-wrapper-6">·</div>
              <div className="text-wrapper-5">Politique de Confidentialité</div>
              <div className="text-wrapper-6">·</div>
              <p className="text-wrapper-5">Politique en matière des Cookies</p>
            </div>
            <p className="p">Copyright © 2021 Clinital, tous droits réservés.</p>
          </div>
        </div>
    </div>
  );
};

export default Acceuil;