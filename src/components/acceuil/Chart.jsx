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

function Chart () {
  return (

  <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="frame-25">
              <div className="text-wrapper-16">Statistiques</div>
              <div className="frame-11">
                <div className="text-wrapper-17">Avril 2023</div>
                <ChevronDown className="chevron-down-1" />
              </div>
            </div>
            <div className="line-chart">
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
              <div className="chart-data-wrapper">
                <div className="chart-data">
                  <div className="frame-26">
                    <div className="rectangle-2" />
                    <div className="text-wrapper-18">Cabinet</div>
                  </div>
                  <div className="frame-26">
                    <div className="rectangle-3" />
                    <div className="text-wrapper-18">Vidéo</div>
                  </div>
                  <div className="frame-26">
                    <div className="rectangle-4" />
                    <div className="text-wrapper-18">Domicile</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown-2">
              <div className="frame-27">
                <div className="frame-28">
                  <div className="frame-19">
                    <div className="frame-29">
                      <div className="text-wrapper-19">Mois</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-20">Janvier</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">Février</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">Mars</div>
                    </div>
                    <div className="frame-21">
                      <div className="text-wrapper-12">Avril</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">Mai</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">Juin</div>
                    </div>
                    <div className="frame-30">
                      <div className="text-wrapper-21">Juillet</div>
                    </div>
                  </div>
                  <div className="frame-31">
                    <div className="rectangle" />
                  </div>
                </div>
                <div className="frame-32">
                  <div className="frame-19">
                    <div className="frame-29">
                      <div className="text-wrapper-19">Année</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">2020</div>
                    </div>
                    <div className="frame-21">
                      <div className="text-wrapper-12">2021</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">2022</div>
                    </div>
                    <div className="frame-20">
                      <div className="text-wrapper-21">2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  </div>
  );
};

export default Chart;
