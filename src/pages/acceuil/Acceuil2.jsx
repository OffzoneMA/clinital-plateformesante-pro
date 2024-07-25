import React from "react";
import { ArrowCircleLeft } from "../../icons/ArrowCircleLeft/ArrowCircleLeft";
import { ArrowCircleRight } from "../../icons/ArrowCircleRight/ArrowCircleRight";
import { ChevronDown } from "../../icons/ChevronDown/ChevronDown";
import { DatingDayInMonth } from "../../components/dashboard/DatingDayInMonth/DatingDayInMonth";
import { DatingDayOutOf } from "../../components/dashboard/DatingDayOutOf/DatingDayOutOf";
import { DatingWeekLabel } from "../../components/dashboard/DatingWeekLabel/DatingWeekLabel";
import { HeaderPro } from "../../components/dashboard/HeaderPro/HeaderPro";
// import { Mail02 } from "./Mail02";
// import { MarkerPin01 } from "./MarkerPin01";
// import { Phone } from "./Phone";
import "./style2.css";

function Acceuil2 (){
    return (
        <div className="dashboard">
            <div className="div-2">
                <div className="container">
                    <div className="heading">
                        <div className="mon-agenda">Dashboard</div>
                    </div>
                </div>
                <div className="mini-footer">
                    <div className="overlap-group-2">
                        <div className="frame-5">
                            <div className="text-wrapper-4">Conditions Générales d&#39;Utilisation</div>
                            <div className="text-wrapper-5">·</div>
                            <div className="text-wrapper-4">Mentions légales</div>
                            <div className="text-wrapper-5">·</div>
                            <div className="text-wrapper-4">Politique de Confidentialité</div>
                            <div className="text-wrapper-5">·</div>
                            <p className="text-wrapper-4">Politique en matière des Cookies</p>
                        </div>
                        <p className="p">Copyright © 2021 Clinital, tous droits réservés.</p>
                    </div>
                </div>
                <HeaderPro
                    bytesizeHome="bytesize-home-2.svg"
                    className="header-PRO-instance"
                    hasFrame={false}
                    helpClassName="design-component-instance-node"
                    img="line-42-2.svg"
                    line="line-43-2.svg"
                    login
                    text="Paramètres de l&#39;agenda"
                    vector="vector-23.svg"
                    vector1="vector-14.svg"
                    vector2="vector-15.svg"
                    vector3="vector-16.svg"
                    vector4="vector-17.svg"
                    vector5="vector-18.svg"
                    vector6="vector-19.svg"
                    vector7="vector-20.svg"
                    vector8="vector-21.svg"
                    vector9="vector-22.svg"
                />
                <div className="overlap">
                    <div className="frame-6">
                        <div className="div-wrapper">
                            <div className="text-wrapper-6">Prochain Rendez-vous</div>
                        </div>
                        <div className="calendar-april">
                            <div className="frame-7">
                                <div className="frame-8">
                                    <div className="text-wrapper-7">Avril 2023</div>
                                    <ChevronDown className="chevron-down" />
                                </div>
                                <div className="frame-9">
                                    <ArrowCircleLeft className="icon-instance-node" />
                                    <ArrowCircleRight className="icon-instance-node" />
                                </div>
                            </div>
                            <div className="frame-10">
                                <div className="frame-11">
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
                                    <div className="rectangle" />
                                    <div className="rectangle-2" />
                                    <div className="rectangle-3" />
                                    <div className="rectangle-4" />
                                    <div className="rectangle-5" />
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
                                    <div className="rectangle" />
                                    <div className="rectangle-2" />
                                    <div className="rectangle-3" />
                                    <div className="rectangle-4" />
                                    <div className="rectangle-5" />
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
                        <div className="RVS">
                            <div className="frame-12">
                                <div className="frame-13">
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">Sam, 14 Avril 2023</div>
                                    </div>
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">09:00 - 09:30</div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-15">
                                <div className="frame-16">
                                    <img className="vector-10" alt="Vector" src="vector.svg" />
                                </div>
                                <div className="frame-17">
                                    <div className="frame-18">
                                        <div className="text-wrapper-9">Fati Zah ARES</div>
                                        <div className="text-wrapper-10">Femme - 30 ans</div>
                                    </div>
                                    <div className="frame-19">
                                        <div className="text-wrapper-11">1ère Consultation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="RVS">
                            <div className="frame-12">
                                <div className="frame-20">
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">Sam, 14 Avril 2023</div>
                                    </div>
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">09:30 - 09:45</div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-21">
                                <div className="frame-22">
                                    <img className="vector-11" alt="Vector" src="image.svg" />
                                </div>
                                <div className="frame-17">
                                    <div className="frame-18">
                                        <div className="text-wrapper-9">Christophe Langelier</div>
                                        <div className="text-wrapper-10">Homme - 46 ans</div>
                                    </div>
                                    <div className="frame-19">
                                        <div className="text-wrapper-11">Consultation de suivi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="RVS">
                            <div className="frame-12">
                                <div className="frame-20">
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">Sam, 14 Avril 2023</div>
                                    </div>
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">09:45 - 10:00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-21">
                                <div className="frame-23">
                                    <img className="vector-12" alt="Vector" src="vector-2.svg" />
                                </div>
                                <div className="frame-17">
                                    <div className="frame-18">
                                        <div className="text-wrapper-9">Linette Desnoyers</div>
                                        <div className="text-wrapper-10">Femme - 61 ans</div>
                                    </div>
                                    <div className="frame-19">
                                        <div className="text-wrapper-11">Urgence</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="RVS">
                            <div className="frame-12">
                                <div className="frame-20">
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">Sam, 14 Avril 2023</div>
                                    </div>
                                    <div className="frame-14">
                                        <div className="text-wrapper-8">09:50 - 10:20</div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-21">
                                <div className="frame-23">
                                    <img className="vector-12" alt="Vector" src="vector-3.svg" />
                                </div>
                                <div className="frame-17">
                                    <div className="frame-18">
                                        <div className="text-wrapper-9">Linette Desnoyers</div>
                                        <div className="text-wrapper-10">Homme - 53 ans</div>
                                    </div>
                                    <div className="frame-19">
                                        <div className="text-wrapper-11">Urgence</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rectangle-6" />
                    <div className="frame-24">
                        <div className="text-wrapper-12">Voir Agenda</div>
                    </div>
                </div>
                <div className="frame-25">
                    <div className="frame-wrapper">
                        <div className="frame-26">
                            <div className="img-wrapper">
                                <img className="maki-doctor" alt="Maki doctor" src="maki-doctor-15.svg" />
                            </div>
                            <div className="frame-17">
                                <div className="text-wrapper-13">12</div>
                                <div className="text-wrapper-14">RDV de la journée</div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-wrapper">
                        <div className="frame-26">
                            <div className="img-wrapper">
                                <img className="calendar-outline" alt="Calendar outline" src="calendar-outline.svg" />
                            </div>
                            <div className="frame-17">
                                <div className="text-wrapper-13">148</div>
                                <div className="text-wrapper-14">RDV du mois</div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-wrapper">
                        <div className="frame-26">
                            <div className="fluent-patient-wrapper">
                                <img className="fluent-patient" alt="Fluent patient" src="fluent-patient-32-regular.svg" />
                            </div>
                            <div className="frame-17">
                                <div className="text-wrapper-13">752</div>
                                <div className="text-wrapper-14">Total des Patients</div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-wrapper">
                        <div className="frame-26">
                            <div className="img-wrapper">
                                <img className="fluent-people" alt="Fluent people" src="fluent-people-community-20-regular.svg" />
                            </div>
                            <div className="frame-17">
                                <div className="text-wrapper-13">234</div>
                                <div className="text-wrapper-14">Patients adressés</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-4">
                    <div className="frame-27">
                        <div className="text-wrapper-15">Statistiques</div>
                        <div className="frame-8">
                            <div className="text-wrapper-16">Avril 2023</div>
                            <ChevronDown className="chevron-down-instance" />
                        </div>
                    </div>
                    <div className="line-chart">
                        <div className="y-axis">
                            <div className="y-axis-line">
                                <div className="number">100</div>
                                <img className="divider" alt="Divider" src="divider.svg" />
                            </div>
                            <div className="y-axis-line">
                                <div className="number">80</div>
                                <img className="divider" alt="Divider" src="divider-2.svg" />
                            </div>
                            <div className="y-axis-line">
                                <div className="number">60</div>
                                <img className="divider" alt="Divider" src="divider-3.svg" />
                            </div>
                            <div className="y-axis-line-2">
                                <div className="number-2">40</div>
                                <img className="divider" alt="Divider" src="divider-4.svg" />
                            </div>
                            <div className="y-axis-line-2">
                                <div className="number-2">20</div>
                                <img className="divider" alt="Divider" src="divider-5.svg" />
                            </div>
                            <div className="y-axis-line-2">
                                <div className="number-2">0</div>
                                <img className="divider" alt="Divider" src="divider-6.svg" />
                            </div>
                        </div>
                        <div className="chart-data-wrapper">
                            <div className="chart-data">
                                <div className="frame-28">
                                    <div className="rectangle-7" />
                                    <div className="text-wrapper-17">Cabinet</div>
                                </div>
                                <div className="frame-29">
                                    <div className="rectangle-8" />
                                    <div className="text-wrapper-17">Vidéo</div>
                                </div>
                                <div className="frame-30">
                                    <div className="rectangle-9" />
                                    <div className="text-wrapper-17">Domicile</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-5">
                    <div className="frame-27">
                        <div className="text-wrapper-15">Statistiques</div>
                        <div className="frame-8">
                            <div className="text-wrapper-16">Avril 2023</div>
                            <ChevronDown className="chevron-down-instance" />
                        </div>
                    </div>
                    <div className="line-chart">
                        <div className="y-axis">
                            <div className="y-axis-line">
                                <div className="number">100</div>
                                <img className="divider" alt="Divider" src="divider-7.svg" />
                            </div>
                            <div className="y-axis-line">
                                <div className="number">80</div>
                                <img className="divider" alt="Divider" src="divider-8.svg" />
                            </div>
                            <div className="y-axis-line">
                                <div className="number">60</div>
                                <img className="divider" alt="Divider" src="divider-9.svg" />
                            </div>
                            <div className="y-axis-line-2">
                                <div className="number-2">40</div>
                                <img className="divider" alt="Divider" src="divider-10.svg" />
                            </div>
                            <div className="y-axis-line-2">
                                <div className="number-2">20</div>
                                <img className="divider" alt="Divider" src="divider-11.svg" />
                            </div>
                            <div className="y-axis-line-2">
                                <div className="number-2">0</div>
                                <img className="divider" alt="Divider" src="divider-12.svg" />
                            </div>
                        </div>
                        <div className="group-6">
                            <div className="chart-data">
                                <div className="frame-31">
                                    <div className="rectangle-7" />
                                    <div className="text-wrapper-17">Femme</div>
                                </div>
                                <div className="frame-32">
                                    <div className="rectangle-10" />
                                    <div className="text-wrapper-17">Homme</div>
                                </div>
                                <div className="frame-33">
                                    <div className="rectangle-8" />
                                    <div className="text-wrapper-17">Enfant</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="frame-34">
                    <div className="frame-35">
                        <div className="frame-36">
                            <div className="text-wrapper-15">Mes Patients</div>
                            <div className="frame-37">
                                <div className="text-wrapper-18">Voir plus</div>
                            </div>
                        </div>
                        <div className="frame-38">
                            <div className="card">
                                <div className="frame-39">
                                    <div className="frame-40">
                                        <div className="text-wrapper-19">Mme. Fati Zah ARES</div>
                                    </div>
                                    <img className="line-2" alt="Line" src="line-118.svg" />
                                    <div className="frame-41">
                                        <div className="text-wrapper-20">01/01/1990 - 30 ans</div>
                                        <div className="frame-42">
                                            <div className="address">
                                                {/* <MarkerPin01 className="marker-pin" /> */}
                                                <p className="text-wrapper-21">55 lot Amane, 24 000 Casablanca</p>
                                            </div>
                                        </div>
                                        <div className="frame-43">
                                            <div className="frame-44">
                                                <div className="text-wrapper-22">Consulter le dossier</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="frame-39">
                                    <div className="frame-40">
                                        <div className="text-wrapper-19">Christophe Langelier</div>
                                    </div>
                                    <img className="line-2" alt="Line" src="line-118-2.svg" />
                                    <div className="frame-41">
                                        <div className="text-wrapper-20">01/01/1990 - 30 ans</div>
                                        <div className="frame-42">
                                            <div className="address">
                                                {/* <MarkerPin01 className="marker-pin" /> */}
                                                <p className="text-wrapper-21">55 lot Amane, 24 000 Casablanca</p>
                                            </div>
                                        </div>
                                        <div className="frame-43">
                                            <div className="frame-44">
                                                <div className="text-wrapper-22">Consulter le dossier</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-39">
                                <div className="frame-40">
                                    <div className="text-wrapper-19">Christophe Langelier</div>
                                </div>
                                <img className="line-2" alt="Line" src="line-118-3.svg" />
                                <div className="frame-41">
                                    <div className="text-wrapper-20">01/01/1990 - 30 ans</div>
                                    <div className="frame-42">
                                        <div className="address">
                                            {/* <MarkerPin01 className="marker-pin" /> */}
                                            <p className="text-wrapper-21">55 lot Amane, 24 000 Casablanca</p>
                                        </div>
                                    </div>
                                    <div className="frame-43">
                                        <div className="frame-44">
                                            <div className="text-wrapper-22">Consulter le dossier</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-35">
                        <div className="frame-36">
                            <div className="text-wrapper-15">Mon équipe</div>
                            <div className="frame-37">
                                <div className="text-wrapper-18">Voir plus</div>
                            </div>
                        </div>
                        <div className="frame-45">
                            <div className="card">
                                <div className="frame-46">
                                    <div className="frame-47">
                                        <div className="text-wrapper-23">André Vaillancourt</div>
                                    </div>
                                    <img className="line-2" alt="Line" src="line-118-4.svg" />
                                    <div className="frame-41">
                                        <div className="frame-36">
                                            <div className="text-wrapper-24">Médical</div>
                                            <div className="frame-48">
                                                <div className="text-wrapper-22">Assistant(e)</div>
                                            </div>
                                        </div>
                                        <div className="text-wrapper-25">Service : Dermatologie</div>
                                        <div className="frame-42">
                                            <div className="address">
                                                {/* <Phone className="icon-instance-node-2" /> */}
                                                <div className="text-wrapper-21">0547829111</div>
                                            </div>
                                            <div className="address-2">
                                                {/* <Mail02 className="icon-instance-node-2" /> */}
                                                <div className="text-wrapper-21">démos@clinital.io</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="frame-49">
                                    <div className="frame-50">
                                        <div className="text-wrapper-26">Leslie Saindon</div>
                                    </div>
                                    <img className="line-2" alt="Line" src="line-118-5.svg" />
                                    <div className="frame-41">
                                        <div className="frame-36">
                                            <div className="text-wrapper-24">Administratif</div>
                                            <div className="frame-51">
                                                <div className="text-wrapper-22">Secrétaire</div>
                                            </div>
                                        </div>
                                        <div className="text-wrapper-25">Service : Dermatologie</div>
                                        <div className="frame-42">
                                            <div className="address">
                                                {/* <Phone className="icon-instance-node-2" /> */}
                                                <div className="text-wrapper-21">0547829111</div>
                                            </div>
                                            <div className="address-2">
                                                {/* <Mail02 className="icon-instance-node-2" /> */}
                                                <div className="text-wrapper-21">démos@clinital.io</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="frame-49">
                                <div className="frame-50">
                                    <div className="text-wrapper-26">Leslie Saindon</div>
                                </div>
                                <img className="line-2" alt="Line" src="line-118-6.svg" />
                                <div className="frame-41">
                                    <div className="frame-36">
                                        <div className="text-wrapper-24">Administratif</div>
                                        <div className="frame-51">
                                            <div className="text-wrapper-22">Secrétaire</div>
                                        </div>
                                    </div>
                                    <div className="text-wrapper-25">Service : Dermatologie</div>
                                    <div className="frame-42">
                                        <div className="address">
                                            {/* <Phone className="icon-instance-node-2" /> */}
                                            <div className="text-wrapper-21">0547829111</div>
                                        </div>
                                        <div className="address-2">
                                            {/* <Mail02 className="icon-instance-node-2" /> */}
                                            <div className="text-wrapper-21">démos@clinital.io</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="frame-52">
                        <div className="frame-36">
                            <div className="text-wrapper-15">Mon Réseau</div>
                            <div className="frame-53">
                                <div className="text-wrapper-27">Voir plus</div>
                            </div>
                        </div>
                        <div className="frame-54">
                            <div className="frame-55">
                                <div className="gastro-entrologue-wrapper">
                                    <img className="gastro-entrologue" alt="Gastro entrologue" src="gastro-ent-rologue.png" />
                                </div>
                                <div className="frame-56">
                                    <div className="text-wrapper-19">Dr Mohamed Bouy</div>
                                    <div className="text-wrapper-28">Médecin généraliste</div>
                                </div>
                            </div>
                            <div className="frame-57">
                                <div className="gnraliste-wrapper">
                                    <img className="gnraliste" alt="Gnraliste" src="g-n-raliste.png" />
                                </div>
                                <div className="frame-58">
                                    <div className="text-wrapper-19">Dr Georges Charette</div>
                                    <div className="text-wrapper-28">Médecin généraliste</div>
                                </div>
                            </div>
                            <div className="frame-57">
                                <div className="kinsithrapeute-wrapper">
                                    <img className="kinsithrapeute" alt="Kinsithrapeute" src="kin-sith-rapeute.png" />
                                </div>
                                <div className="frame-56">
                                    <div className="text-wrapper-19">Dr Nathalie Marcil</div>
                                    <div className="text-wrapper-29">Médecin Endocrinologue</div>
                                </div>
                            </div>
                            <div className="frame-55">
                                <div className="group-7">
                                    <img className="kinsithrapeute-2" alt="Kinsithrapeute" src="kin-sith-rapeute-2.png" />
                                </div>
                                <div className="frame-56">
                                    <div className="text-wrapper-19">Dr Juliette Dufresne</div>
                                    <div className="text-wrapper-28">Médecin généraliste</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Acceuil2;