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

function MonReseaux () {
  return (
    <div className="frame-40">
      <div className="frame-36">
        <div className="text-wrapper-16">Mon Réseau</div>
        <div className="frame-9">
          <div className="text-wrapper-22">Voir plus</div>
        </div>
      </div>
      <div className="frame-41">
        <div className="group-6">
          <img className="vector-12" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-22.png" />
          <img className="vector-13" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-23.png" />
          <img className="vector-14" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-24.png" />
          <img className="vector-15" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-25.png" />
          <img className="vector-16" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-26.png" />
          <img className="vector-17" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-27.png" />
          <img className="vector-18" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-28.png" />
        </div>
        <p className="vous-n-avez-pas-2">Vous n&#39;avez pas encore de contacts.</p>
        <div className="button">
          <div className="button-2">
            <PlusCircle2 className="plus-circle" />
            <div className="titre">Ajouter des contacts</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonReseaux;
