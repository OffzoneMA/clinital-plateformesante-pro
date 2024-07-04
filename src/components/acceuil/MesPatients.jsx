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
import Card from '../acceuil/card';
import { useEffect, useState } from 'react';
//import { fetchData } from "../../action/Rdv";
//import RdvService, { fetchData } from "../../components/result/services/RdvService"
import { ORIGIN, TOKEN, USER_ID } from '../../services/api'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }
const URL="http://localhost:8080/api/med/getallpatients"
import axios from "axios";

function MesPatients () {

  const [patients, setPatients] = useState([]);
  useEffect(() => {
   const fetchData = async () => {
      try {
        const response = await axios.get(URL,AUTHORIZATION);
        setPatients(response.data); // Assuming response.data is an array of appointments

        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };

    fetchData();
  }, []);





  return (

    <div className="frame-35">
      <div className="frame-36">
       
          <div className="text-wrapper-16">Mes Patients</div>
          <div className="frame-37">
            <button className="text-wrapper-22">Voir plus</button>
          </div>
       
        
      </div>
      <div className="frame-38">
        {/*<img className="vector-11" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-21.svg" />*/}
        {/*<p className="vous-n-avez-pas-2">Lmlawi xd</p>*/}
        {patients.map((rdv, index) => (
          <Card
            key={index}
            name={`${rdv?.nom_pat} ${rdv?.prenom_pat}`}
            birthDate={rdv?.dateNaissance}
            address={rdv?.adresse_pat}
          />
        ))}
        
 
 

      </div>
    </div>
    
  );
};

export default MesPatients;
