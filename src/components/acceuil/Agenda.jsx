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
import cabinet from '../../assets/icons/cabinet_icon.svg';
//import "./style.css";
import Dashboard from "./Dashboard";

function Agenda () {
  return (

    <div className="overlap">
    <div className="frame-7">
      <div className="frame-8">
        <div className="text-wrapper-7">Prochain Rendez-vous</div>
        <div className="frame-9">
          <div className="text-wrapper-8">Voir Agenda</div>
        </div>
      </div>
      <div className="calendar-april">
        <div className="frame-10">
          <div className="frame-11">
            <div className="text-wrapper-9">Avril 2023</div>
            <ChevronDown className="chevron-down" />
          </div>
          <div className="frame-12">
            <ArrowCircleLeft1 className="icon-instance-node" />
            <ArrowCircleRight1 className="icon-instance-node" />
          </div>
        </div>
        <div className="frame-13">
          <div className="frame-14">
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="L" />
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="M" />
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="M" />
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="J" />
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="V" />
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="S" />
            <DatingWeekLabel className="dating-week-label-instance" divClassName="dating-week-label-2" text="D" />
          </div>
          <div className="week">
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="26"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="27"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="28"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="29"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="30"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="31"
            />
            <DatingDayInMonth className="dating-day-in-month-instance" numClassName="dating-day-in-month-2" />
          </div>
          <div className="week">
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="2"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="3"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="4"
            />
            <DatingDayInMonth
              className="dating-day-in-month-3"
              numClassName="design-component-instance-node-3"
              text="5"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="6"
            />
            <DatingDayInMonth
              className="dating-day-in-month-instance"
              numClassName="dating-day-in-month-2"
              text="7"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="8"
            />
          </div>
          <div className="week">
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="9"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="10"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="11"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="12"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="13"
            />
            <DatingDayInMonth className="dating-day-in-month-4" numClassName="dating-day-in-month-5" text="14" />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="15"
            />
          </div>
          <div className="week">
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="16"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="17"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="18"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="19"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="20"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="21"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="22"
            />
          </div>
          <div className="week">
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="23"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="24"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="25"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="26"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="27"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="28"
            />
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="29"
            />
          </div>
          <div className="week">
            <DatingDayInMonth
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="30"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="1"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="2"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="3"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="4"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="5"
            />
            <DatingDayOutOf
              className="design-component-instance-node-2"
              numClassName="design-component-instance-node-3"
              text="6"
            />
          </div>
        </div>
      </div>
      <div className="frame-15">
        <div className="RVS">
          <div className="frame">
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper">Sam, 14 Avril 2023</div>
              </div>
              <div className="frame-2">
                <div className="text-wrapper">09:00 - 09:30</div>
              </div>
            </div>
          </div>
          <div className="frame-71">
            <img className="img" alt="Frame" src={cabinet} />
            <div className="frame-77">
              <div className="frame-71">
                <div className="text-wrapper-2">Fati Zah ARES  </div>
                <div className="text-wrapper-3">  Femme - 30 ans</div>
              </div>
              <div className="text-wrapper-4">1ère Consultation</div>
            </div>
          </div>
          
          
          
      </div>
      <div className="RVS">
          <div className="frame">
            <div className="div">
              <div className="frame-2">
                <div className="text-wrapper">Sam, 14 Avril 2023</div>
              </div>
              <div className="frame-2">
                <div className="text-wrapper">09:00 - 09:30</div>
              </div>
            </div>
          </div>
          <div className="frame-71">
            <img className="img" alt="Frame" src={cabinet} />
            <div className="frame-77">
              <div className="frame-71">
                <div className="text-wrapper-2">Fati Zah ARES  </div>
                <div className="text-wrapper-3">  Femme - 30 ans</div>
              </div>
              <div className="text-wrapper-4">1ère Consultation</div>
            </div>
          </div>
          
          
          
      </div>
        {/* <img className="frame-16" alt="Frame" src="https://c.animaapp.com/NnydzBh0/img/frame.svg" />
        <div className="frame-17">
          <p className="vous-n-avez-pas">Vous n&#39;avez pas encore de rendez-vous prévu</p>
        </div> */}
      </div>
    </div>
    {/* <div className="dropdown">
      <div className="frame-18">
        <div className="frame-19">
          <div className="frame-20">
            <div className="text-wrapper-10">Avril</div>
          </div>
          <div className="frame-20">
            <div className="text-wrapper-11">Mai</div>
          </div>
          <div className="frame-21">
            <div className="text-wrapper-12">Juin</div>
          </div>
          <div className="frame-20">
            <div className="text-wrapper-11">Juillet</div>
          </div>
          <div className="frame-20">
            <div className="text-wrapper-11">Août</div>
          </div>
          <div className="frame-20">
            <div className="text-wrapper-11">Septembre</div>
          </div>
        </div>
        <div className="rectangle-wrapper">
          <div className="rectangle" />
        </div>
      </div>
    </div> */}
  </div>
  );
};

export default Agenda;
