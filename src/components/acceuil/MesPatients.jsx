import React from "react";
import { DatingDayInMonth } from "../dashboard/DatingDayInMonth";
import { DatingDayOutOf } from "../dashboard/DatingDayOutOf";
import { DatingWeekLabel } from "../dashboard/DatingWeekLabel";
import { HeaderPro } from "../dashboard/HeaderPro";
import { ArrowCircleLeft1 } from "../../icons/ArrowCircleLeft1";
import { ArrowCircleRight1 } from "../../icons/ArrowCircleRight1";
import { ChevronDown } from "../../icons/ChevronDown";
import { PlusCircle2 } from "../../icons/PlusCircle2";
import Navbar from "../navbar/Navbar";
import maki_doctor from '../../assets/icons/maki_doctor-15.svg';
import fluent_patient from '../../assets/icons/fluent_patient-32-regular.svg';
import fluent_people from '../../assets/icons/fluent_people-community-20-regular.svg';
import calendar from '../../assets/icons/calendar-outline.svg';
//import "./style.css";
import Dashboard from "./Dashboard";

function MesPatients () {
  return (

    <div className="frame-35">
      <div className="frame-36">
        <div className="text-wrapper-16">Mes Patients</div>
        <div className="frame-37">
          <div className="text-wrapper-22">Voir plus</div>
        </div>
      </div>
      <div className="frame-38">
        <img className="vector-11" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-21.svg" />
        <p className="vous-n-avez-pas-2">Vous n&#39;avez pas encore de Patients.</p>
      </div>
    </div>
    
  );
};

export default MesPatients;
