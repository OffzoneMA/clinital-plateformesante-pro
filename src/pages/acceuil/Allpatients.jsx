import React from 'react'
import { useEffect, useState } from 'react';

import { ORIGIN, TOKEN, USER_ID } from '../../services/api'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }
const URL="http://localhost:8080/api/med/getallpatients"
const URL2="http://localhost:8080/api/med/getallpatientsbyrdv"
const URL3="http://localhost:8080/api/med/getallrdvbypat"

import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import "./allpatients.css"
import Card from '../../components/acceuil/card';
import MiniFooter from '../../components/footer/MiniFooter';
import CardPage from './CardPage';

const Allpatients = () => {
  const data11=  [{id: 1,name: 'Patient 1',dateOfBirth: '1990-01-01',age: 30,address: 'Casablanca',consultation:'CONSULTATION'< 0.5,consultationsuivie: 'CONSULTATIONSUIVIE' < 0.5,urgence: 'URGENCE' < 0.5,nouveauPatient: Math.random() < 0.5,patientSuivi: Math.random() < 0.5,cabinet: 'CABINET' ,video: 'VIDEO' ,domicile:'DOMICILE' },]

  const [patients, setPatients] = useState([]);
  const [patients2, setPatients2] = useState([]);
  const [rdvs, setrdv] = useState([]);
  const [patientrdv,Setpatientrdv]=useState([]);
  const allPatients = [...patients];
////////////////////////

  const [filteredPatients, setFilteredPatients] = useState([]);
  const [filters, setFilters] = useState({
    CONSULTATION: false,
    CONSULTATIONSUIVIE: false,
    URGENCE: false,
    nouveauPatient: false,
    patientSuivi: false,
    CABINET: false,
    VIDEO: false,
    DOMICILE: false,
  });



  useEffect(() => {
    let filtered = allPatients.filter((patient) => {
      // Check if patient has rdv
      const hasRdv = rdvs.some((rdv) => rdv.patient.id === patient.id);
      const patientRdv = rdvs.find(rdv => rdv.patient.id === patient.id);


      // Apply filters
      return (
        (!filters.premiereConsultation ||
          (filters.premiereConsultation && hasRdv && patientRdv?.motifConsultation?.motif === 'CONSULTATION')) &&
        (!filters.suiviConsultation ||
          (filters.suiviConsultation && hasRdv && patientRdv?.motifConsultation?.motif === 'CONSULTATIONSUIVIE')) &&
        (!filters.urgenceConsultation ||
          (filters.urgenceConsultation && hasRdv && patientRdv?.motifConsultation?.motif === 'URGENCE')) &&
        (!filters.nouveauPatient || (!hasRdv)) &&
        (!filters.patientSuivi || (hasRdv)) &&
        (!filters.cabinetConsultation ||
          (filters.cabinetConsultation && hasRdv && patientRdv?.modeConsultation?.mode === 'CABINET')) &&
        (!filters.videoConsultation ||
          (filters.videoConsultation && hasRdv && patientRdv?.modeConsultation?.mode === 'VIDEO')) &&
        (!filters.domicileConsultation ||
          (filters.domicileConsultation && hasRdv && patientRdv?.modeConsultation?.mode === 'DOMICILE'))
      );
    });

    setFilteredPatients(filtered);
  }, [filters, allPatients, rdvs]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

////////


  useEffect(() => {
   const fetchData = async () => {
      try {
        const response = await axios.get(URL,AUTHORIZATION);
        setPatients(response.data); // Assuming response.data is an array of appointments
        console.log(response.data+'allpat')
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };
    fetchData()

  }, []);

  /*useEffect(() => {
    const fetchData = async () => {
       try {
         const response = await axios.get(URL2,AUTHORIZATION);
         setPatients2(response.data); // Assuming response.data is an array of appointments
         console.log(response.data+'allpat2')
       } catch (error) {
         console.error('Error fetching data2:', error);
 
       }
     };
     fetchData()
 
   }, [])*/

   useEffect(() => {
    const fetchData = async () => {
       try {
         const response = await axios.get(URL3,AUTHORIZATION);
         setrdv(response.data); // Assuming response.data is an array of appointments
         console.log(rdvs+'rdvpat')
       } catch (error) {
         console.error('Error fetching data3:', error);
 
       }
     };
     fetchData()
 
   }, [])
   
  
   /*patients2.map(patient => {
    console.log(`ID: ${patient.id}, Name: ${patient.nom_pat}, City: ${patient.prenom_pat}, ville: ${patient.ville?.nom_ville }`);
    console.log(patient +'allpat22')
    return patient;
     // Returning the patient object so that .map() doesn't change the original array
  });
  rdvs.map(pat => {
    console.log(`ID: ${pat?.id}, Name: ${pat.patient.nom_pat}, City: ${pat.patient.prenom_pat}, ville: ${pat.patient.ville?.nom_ville }`);
    console.log(pat +'allpat33')
    return pat;
     // Returning the patient object so that .map() doesn't change the original array
  });*/

  return (
    <div className='all'>
      <div className="dashboard" >
      <div className="div-1">
        <Navbar />
        <div className='pat'>
          <p className=" text-pat ">Mes Patients</p>
        </div>
        <div className="container-box">
      
          <div className="side-bar">
            <div className="motif">
              <p className="motif-cons">Motif de Consultation</p>
              <form className='motif-consultation'>
              <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='premiereConsultation'
                      checked={filters.premiereConsultation}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Première consultation
                  </label>
                  <br />
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='suiviConsultation'
                      checked={filters.suiviConsultation}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Consultation de suivi
                  </label>
                  <br />
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='urgenceConsultation'
                      checked={filters.urgenceConsultation}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Urgence
                  </label>
                </form>

                <p className='motif-cons'>Catégories</p>
                <form className='catégories'>
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='nouveauPatient'
                      checked={filters.nouveauPatient}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Nouveau Patient
                  </label>
                  <br />
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='patientSuivi'
                      checked={filters.patientSuivi}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Patient suivi
                  </label>
                </form>

                <p className='motif-cons'>Mode de consultation</p>
                <form className='mode-consultation'>
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='cabinetConsultation'
                      checked={filters.cabinetConsultation}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Cabinet
                  </label>
                  <br />
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='videoConsultation'
                      checked={filters.videoConsultation}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Vidéo
                  </label>
                  <br />
                  <label className='labelStyle'>
                    <input
                      type='checkbox'
                      name='domicileConsultation'
                      checked={filters.domicileConsultation}
                      onChange={handleCheckboxChange}
                      className='checkboxStyle'
                    />
                    Domicile
                  </label>
              </form>

            </div>
          </div>
          <div className="main">
            
          {filteredPatients.length > 0 ? (
              <CardPage patients={filteredPatients} />
            ) : (
              <div className="empty">
                <div className='emptydata'>
                  <div className="empty-patients">
                    <img className="vector-11" alt="Vector" src="https://c.animaapp.com/NnydzBh0/img/vector-21.svg" /> 
                    <p className="vous-n-avez-pas-2">Vous n'avez pas  de Patients.</p>
                  </div>
                </div>
              </div>
            )}

                 
               

              
            
          </div>

         </div>
         
      </div>
      
    </div>
    <MiniFooter />
    </div>
    
      




        
    
  )
}

export default Allpatients