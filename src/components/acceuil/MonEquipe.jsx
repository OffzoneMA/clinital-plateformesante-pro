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

function MonEquipe () {
  return (


  
    <div className="frame-39">
      <div className="frame-36">
        <div className="text-wrapper-16">Mon équipe</div>
        <div className="frame-37">
          <div className="text-wrapper-22">Voir plus</div>
        </div>
      </div>
      <div className="frame-38">
        <img className="help-2" alt="Help" src="https://c.animaapp.com/NnydzBh0/img/help-2.svg" />
        <p className="vous-n-avez-pas-3">Vous n&#39;avez pas encore d&#39;équipe.</p>
        <div className="button">
          <div className="button-2">
            <PlusCircle2 className="plus-circle" />
            <div className="titre">Ajouter une équipe</div>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default MonEquipe;
