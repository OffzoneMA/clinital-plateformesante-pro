import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { DatingDayInMonth } from "../dashboard/DatingDayInMonth";
import { DatingDayOutOf } from "../dashboard/DatingDayOutOf";
import { DatingWeekLabel } from "../dashboard/DatingWeekLabel";
import { ArrowCircleLeft1 } from "../../icons/ArrowCircleLeft1";
import { ArrowCircleRight1 } from "../../icons/ArrowCircleRight1";
import { ChevronDown } from "../../icons/ChevronDown";
import cabinet from '../../assets/icons/cabinet_icon.svg';
import domicile from '../../assets/icons/domicile_icon.svg';
import video from '../../assets/icons/video_icon.svg';
import chevrondown from '../../assets/icons/chevron_down.svg';
import { getProchainRdv } from "../../action/Rdv";
import Calendar from "./Calendar";
//import "./style.css";


function Agenda () {
  const [prochain, setProchain] = useState([]);
  const [dropdown, setDropdown]= useState(false);
  const user = useSelector((state) => state.global.user);

  useEffect(() => {
    if(user){
      getProchainRdv(setProchain)
    }
    console.log(prochain);
  }, []);
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", 
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const formatDate = (day, start) => {
    const daysOfWeek = {
      MONDAY: 'Lun',
      TUESDAY: 'Mar',
      WEDNESDAY: 'Mer',
      THURSDAY: 'Jeu',
      FRIDAY: 'Ven',
      SATURDAY: 'Sam',
      SUNDAY: 'Dim'
    };

    const startDate = new Date(start);
    const options = { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' };
    return startDate.toLocaleDateString('fr-FR', options);
  };

  const formatTime = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const options = { hour: '2-digit', minute: '2-digit' };
    return `${startTime.toLocaleTimeString('fr-FR', options)} - ${endTime.toLocaleTimeString('fr-FR', options)}`;
  };
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
    ) {
      age--;
    }

    return age;
  };
  return (

    <div className="overlap">
    <div className="frame-7">
      <div className="frame-8">
        <div className="text-wrapper-7">Prochain Rendez-vous</div>
        <Link to="/agenda">
        <div className="frame-9">
          <div className="text-wrapper-8">Voir Agenda</div>
        </div>
        </Link>
        
      </div>
      <div className="calendar-april">
        {/* <div className="frame-10">
          <div className="frame-11">
            <div className="text-wrapper-9">Avril 2023</div>
            <img className="img chevron-down" alt="Frame" src={chevrondown} onClick={() => setDropdown((x) => !x)}/> 
          </div>
          <div className="frame-12">
            <ArrowCircleLeft1 className="icon-instance-node" />
            <ArrowCircleRight1 className="icon-instance-node" />
          </div>
        </div> */}
        <Calendar prochRdv={prochain}/>
        {/* <div className="frame-13">
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
        </div> */}
      </div>
      
      <div className="frame-15">
      {prochain.length > 0 ? (
        <div className="scroll-container">
        {prochain.map((rdv, index) => (
          <div key={index} className="RVS">
              <div className="frame">
                <div className="div">
                  <div className="frame-2">
                    <div className="text-wrapper">{formatDate(rdv.day, rdv.start)}</div>
                  </div>
                  <div className="frame-2">
                    <div className="text-wrapper">{formatTime(rdv.start, rdv.end)}</div>
                  </div>
                </div>
              </div>
              <div className="frame-71">
                {rdv.modeConsultation.mode==="CABINET"&&(<img className="img" alt="Frame" src={cabinet} />)}
                {rdv.modeConsultation.mode==="DOMICILE"&&(<img className="img" alt="Frame" src={domicile} />)}
                {rdv.modeConsultation.mode==="VIDEO"&&(<img className="img" alt="Frame" src={video} />)}
                <div className="frame-77">
                  <div className="frame-71">
                    <div className="text-wrapper-2">{rdv.patient.prenom_pat} {rdv.patient.nom_pat}</div>
                    <div className="text-wrapper-3"> {rdv.patient.civilite_pat === "Mr"?"Homme":"Femme"} - {calculateAge(rdv.patient.dateNaissance)} ans</div>
                  </div>
                  <div className="text-wrapper-4">{rdv.motifConsultation.motif==="CONSULTATION"?"1ère Consultation":
                   rdv.motifConsultation.motif==="URGENCE"?"Urgence":"Consultation de suivi"}</div>
                </div>
              </div>
          </div>
        ))}
      
        
      </div>
     
    ):(
        <>
          <img className="frame-16" alt="Frame" src="https://c.animaapp.com/NnydzBh0/img/frame.svg" />
          <div className="frame-17">
            <p className="vous-n-avez-pas">Vous n&#39;avez pas encore de rendez-vous prévu</p>
          </div>
        </> 
       )}
      </div>
    </div>
    
    {/* {dropdown && (
      <div className="dropdown">
        <div className="frame-18">
          <div className="frame-19">
          <div className="scroll-container" style={{ height: '200px' }}>
            {months.map((month, index) => (
              <div className={`frame-20`} key={index}>
                <div className={`text-wrapper-10`}>{month}</div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
)} */}
  </div>
  );
};

export default Agenda;
