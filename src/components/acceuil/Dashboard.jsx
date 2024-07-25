import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import maki_doctor from '../../assets/icons/maki_doctor-15.svg';
import fluent_patient from '../../assets/icons/fluent_patient-32-regular.svg';
import fluent_people from '../../assets/icons/fluent_people-community-20-regular.svg';
import calendar from '../../assets/icons/calendar-outline.svg';
//import "./style.css";
import { getStatisticsRdv } from "../../action/Rdv";

function Dashboard () {
  const [statistic, setStatistic] = useState({});

  useEffect(() => {

    getStatisticsRdv(setStatistic)

  }, []);

  return (
        <div className="frame-22">
          <div className="frame-wrapper">
            <div className="frame-23">
              <div className="img-wrapper">
                <img
                  className="maki-doctor"
                  alt="Maki doctor"
                  src={maki_doctor}
                />
              </div>
              <div className="frame-24">
                <div className="text-wrapper-13">
                {!statistic.day?"0":statistic.day}
                  </div>
                <div className="text-wrapper-14">RDV de la journée</div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-23">
              <div className="img-wrapper">
                <img
                  className="calendar-outline"
                  alt="Calendar outline"
                  src={calendar}
                />
              </div>
              <div className="frame-24">
                <div className="text-wrapper-13">
                  {!statistic.month?"0":statistic.month}
                  </div>
                <div className="text-wrapper-14">RDV du mois</div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-23">
              <div className="fluent-patient-wrapper">
                <img
                  className="fluent-patient"
                  alt="Fluent patient"
                  src={fluent_patient}
                />
              </div>
              <div className="frame-24">
                <div className="text-wrapper-13">
                {!statistic.patients?"0":statistic.patients}
                  </div>
                <div className="text-wrapper-14">Total des Patients</div>
              </div>
            </div>
          </div>
          <div className="frame-wrapper">
            <div className="frame-23">
              <div className="img-wrapper">
                <img
                  className="fluent-people"
                  alt="Fluent people"
                  src={fluent_people}
                />
              </div>
              <div className="frame-24">
                <div className="text-wrapper-13">-</div>
                <div className="text-wrapper-14">Patients adressés</div>
              </div>
            </div>
          </div>
        </div>
      

  );
};

export default Dashboard;
