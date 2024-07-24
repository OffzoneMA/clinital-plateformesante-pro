import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ORIGIN, TOKEN, USER_ID } from '../../services/api'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }


const AUTHORIZATION2 = { headers: { Authorization: `Bearer ${TOKEN} UserID ${USER_ID}` } }
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import "./PatientFile.css"
import MiniFooter from '../../components/footer/MiniFooter';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Card from '../../components/acceuil/card';
import calendarOutline from './image/calendar-outline.svg';
import documentsoutline from './image/documents-outline.svg';
import fluent_calendar from './image/fluent_calendar-cancel-24-regular.svg';
import healthicons_doctor from './image/healthicons_doctor-outline.svg';
import frame  from './image/Frame.svg';
import documentsoutline2  from './image/documentsoutline.svg';
import Rdvcard from './rdvcard';
import Antecedant from './Antecedant';


const PatientFile = () => {
    const { patientId } = useParams(); // Get patientId from URL params using useParams()
    const Patients=`http://localhost:8080/api/med/getPatient/${patientId}`
    const RDVS=`http://localhost:8080/api/med/patient/rdvByIdPatient/${patientId}`
    const NumberDoc=`http://localhost:8080/api/med/patients/getnumberofMedecin/${patientId}`


    const [patient, setPatient] = useState(null); // State to store patient data
    const [rdv, setRdv] = useState([]);
    const [numberdoctors, setNumberdoctors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
           try {
             const response = await axios.get(Patients,AUTHORIZATION);
             setPatient(response.data); // Assuming response.data is an array of appointments
             console.log(response.data+'allpat')
           } catch (error) {
             console.error('Error fetching data:', error);
     
           }
         };
         fetchData()
     
       }, []);
       
       useEffect(() => {
        const fetchData2 = async () => {
           try {
             const response = await axios.get(RDVS,AUTHORIZATION);
             setRdv(response.data); // Assuming response.data is an array of appointments
             console.log(response.data+'allrdv')
           } catch (error) {
             console.error('Error fetching data:', error);
     
           }
         };
         fetchData2()
     
       }, [patientId]);
       useEffect(() => {
        const fetchData3 = async () => {
           try {
             const response = await axios.get(NumberDoc,AUTHORIZATION);
             setNumberdoctors(response.data); // Assuming response.data is an array of appointments
             console.log(response.data.numberOfDoctors+'number')
           } catch (error) {
             console.error('Error fetching data: numbers', error);
     
           }
         };
         fetchData3()
     
       }, []);


const birthDate=patient?.dateNaissance.split('T')[0] 
const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
          age--;
        }
        return age;
      };
  const age = calculateAge(birthDate);
    /*const rdvs={
      name:rdv?.medecin?.nom_med,
      spec:rdv?.medecin?.specialite.id_spec,
      motif:rdv?.motifConsultation.motif
    }
   
    {rdvs.map((rdvData, index) => {
      const rdv = {
        name: rdvData?.medecin?.nom_med,
        spec: rdvData?.medecin?.specialite.id_spec,
        motif: rdvData.motifConsultation.motif
      };})}*/


     
      const countCanceledRdv = (rdvs) => {
        // Filter appointments with status "ANNULE" and count them
        const canceledRdvCount = rdv.filter(rdv => rdv.statut === 'ANNULE').length;
        return canceledRdvCount;
    };
    console.log('Number of canceled appointments:', countCanceledRdv(rdv));

  return (
    <div className='all'>
        <div className="dashboard" >
            <div className="div-1">
              <Navbar />
              <div className='nav-file'>
                <p className=" p_text ">Dossier Patient</p>
                <Link to='/' className="btn-link">Adresser à un Confrère</Link>
              </div>
              <div className="container-boxe">
                  <div className="box-pat item1">
                    <div className='card-pat'>
                      <div className="name-id">
                      <h3 className='nom'>{patient?.nom_pat + ' '+ patient?.prenom_pat }</h3>
                      <div className="id"><span>ID: {patient?.id}</span></div>
                      </div>
                      <div className='infoo'>
                          <div className="ic1"></div> 
                          {patient?.adresse_pat ? patient?.adresse_pat : 'No data available'}
                      </div>
                      <div className='infoo'>
                          <div className="ic3"></div>
                          {patient?.patientTelephone ? patient?.patientTelephone : 'No data available'}
                      </div>
                      <div className='infoo'>
                          <div className="ic4"></div>
                          {patient?.patientEmail ? patient?.patientEmail : 'No data available'}
                       </div>
                    </div>
                  </div>
                  <div className="item2">
                        <div className="nested-item">
                          <img src={calendarOutline} alt="Image 1" />
                          <span>{rdv.length}</span>
                          <span>Total des RDV</span>
                        </div>
                        <div className="nested-item">
                          <img src={documentsoutline} alt="Image 2" />
                          <span>0</span>
                          <span>Total des documents</span>
                        </div>
                        <div className="nested-item">
                          <img src={fluent_calendar} alt="Image 3" />
                          <span>{numberdoctors.numberOfDoctors}</span>
                          <span>Médecins visités</span>
                        </div>
                        <div className="nested-item">
                          <img src={healthicons_doctor} alt="Image 4" />
                          <span>{countCanceledRdv(rdv)}</span>
                          <span>RDV Annulés</span>
                        </div>
                  </div>                  
                  <div className="item3">
                    <div className="histo">
                        <div className="text-wrapper-16">Historique des rendez-Vous</div>
                            <div className="frame-37">
                              <Link className="text-wrapper-22" to="/">Voir plus</Link>
                        </div>
                    </div>
                      {rdv.length > 0 ? (
                          <div className="cardinfo">
                            {rdv.map((appointment) => (
                              <Rdvcard
                                key={appointment.id}
                                name={`Dr ${appointment.medecin.nom_med}`}
                                specialty={appointment.medecin.specialite.libelle}
                                startDate={appointment.start}
                                endDate={appointment.end}
                                motive={appointment.motifConsultation.motif}
                                modeConsultation={appointment.modeConsultation.mode}
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="content">
                            <img src={frame} alt="Image 1" />
                            <p>Ce Patient n’a toujours pas eu de rendez-vous</p>
                          </div>
                      )}
                  </div>
                  <div className="item4">
                  <div className="histo">
                        <div className="text-wrapper-16">Historique des documents</div>
                            <div className="frame-37">
                              <Link className="text-wrapper-22" to="/">Voir plus</Link>
                           </div>
                        
                    </div>
                    <div className="content">
                          <img src={documentsoutline2} alt="Image 1" />
                          <p>Ce patient n’a pas encore reçu ou ajouté de documents.
                          </p>
                    </div>

                  </div>
                
                  <div className="item5">
                    <Antecedant/>
                  </div>
                  <div className="item6"> 
                      <div className="contt">
                        <h3>Autre</h3>
                        <div className='para'>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis accusamus in blanditiis distinctio dolor eius veniam aspernatur laudantium cum aperiam debitis, reiciendis eligendi voluptatem dolores perspiciatis sit id veritatis tenetur?

                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed natus recusandae deleniti nam a? Eligendi deleniti ipsum laboriosam, ut dicta quod neque enim aspernatur? Fuga quaerat deserunt fugiat. Ipsum, voluptates!


                        </p>
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis accusamus in blanditiis distinctio dolor eius veniam aspernatur laudantium cum aperiam debitis, reiciendis eligendi voluptatem dolores perspiciatis sit id veritatis tenetur?

                          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed natus recusandae deleniti nam a? Eligendi deleniti ipsum laboriosam, ut dicta quod neque enim aspernatur? Fuga quaerat deserunt fugiat. Ipsum, voluptates!


                        </p>
         
                        </div>
                        
                        
                      </div>
                      <div className="btnn">
                            <button className='annuler'>Annuler</button>

                            <button className='save'>Enregistrer</button>   
                      </div>
                  </div>

              </div>
              
            </div>
            
        </div>
      <MiniFooter />
    </div>
    
      




        
    
  )
}

export default PatientFile