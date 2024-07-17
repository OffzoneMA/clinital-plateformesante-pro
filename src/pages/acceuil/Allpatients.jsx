import React from 'react'
import { useEffect, useState } from 'react';

import { ORIGIN, TOKEN, USER_ID } from '../../services/api'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }
const URL="http://localhost:8080/api/med/getallpatients"
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import "./patientcard.css"
import Card from '../../components/acceuil/card';
const Allpatients = () => {

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
    <div className="dashboard" >
      <div className="div-2">
            <div className="container">
                <div className="heading">
                    <div className="mon-agenda"></div>
                </div>
                </div>
                
                <Navbar />
                <div className="container">
                <div className="frame-35">
      <div className="frame-36">
       
          <div className="text-wrapper-16">Mes Patients</div>
          <div className="frame-37">
          </div>
       
        
      </div>
      <div className="frame-38">
        
        {patients.length>0 ? patients.map((rdv, index) => (
          <Card
            key={index}
            name={`${rdv?.nom_pat} ${rdv?.prenom_pat}`}
            birthDate={rdv?.dateNaissance}
            address={rdv?.adresse_pat}
          />
        )): <div className="empty-pat"><img className="vector-11" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-21.svg" /> 
            <p className="vous-n-avez-pas-2">Vous n'avez pas encore de Patients.</p></div>}
        
 
 

      </div>
    </div>
            </div>
            {/* overlap */}
      </div>
        
      
    </div>
    
      




        
    
  )
}

export default Allpatients