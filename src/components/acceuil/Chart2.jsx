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

function Chart2 () {
  return (

    <div className="group-4">
    <div className="frame-33">
      <div className="text-wrapper-16">Statistiques</div>
      <div className="frame-11">
        <div className="text-wrapper-17">Avril 2023</div>
        <ChevronDown className="chevron-down-1" />
      </div>
    </div>
    <div className="line-chart-2">
      <div className="y-axis">
        <div className="y-axis-line">
          <div className="number">100</div>
          <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-6.svg" />
        </div>
        <div className="y-axis-line">
          <div className="number">80</div>
          <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-7.svg" />
        </div>
        <div className="y-axis-line">
          <div className="number">60</div>
          <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-8.svg" />
        </div>
        <div className="y-axis-line-2">
          <div className="number-2">40</div>
          <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-9.svg" />
        </div>
        <div className="y-axis-line-2">
          <div className="number-2">20</div>
          <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-10.svg" />
        </div>
        <div className="y-axis-line-2">
          <div className="number-2">0</div>
          <img className="divider" alt="Divider" src="https://c.animaapp.com/NnydzBh0/img/divider-11.svg" />
        </div>
      </div>
      <div className="group-5">
        <div className="chart-data">
          <div className="frame-26">
            <div className="rectangle-2" />
            <div className="text-wrapper-18">Femme</div>
          </div>
          <div className="frame-26">
            <div className="rectangle-3" />
            <div className="text-wrapper-18">Homme</div>
          </div>
          <div className="frame-26">
            <div className="rectangle-4" />
            <div className="text-wrapper-18">Enfant</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Chart2;
