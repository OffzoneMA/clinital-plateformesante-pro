import React from 'react';
import "./Rdvcard.css";
import ConsultationImg  from "./image/Vector.svg";
import DomicileImg  from "./image/domicile.svg";
import OnlineImg  from "./image/online.svg";



const Rdvcard = ({ name, specialty, startDate, motive, modeConsultation,endDate }) => {
  const formattedDate = new Date(startDate).toLocaleDateString("fr-FR", {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = new Date(startDate).toLocaleTimeString("fr-FR", {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formattedTimeend = new Date(endDate).toLocaleTimeString("fr-FR", {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Determine image source based on modeConsultation
  let bgColor;
  let modeImage;
  switch (modeConsultation) {
    case 'CABINET':
      modeImage = ConsultationImg;
      bgColor = 'var(--Purple-2, #BB6BD9)';
      break;
    case 'DOMICILE':
      modeImage = DomicileImg;
      bgColor = '#6DC0F9';

      break;
    case 'VIDEO':
      modeImage = OnlineImg;
      bgColor = '#FCB769';

      break;
    default:
      modeImage = ConsultationImg; // Default image if mode is not recognized
      break;
  }

  const avatarStyle = {
    backgroundColor: bgColor
  };

  let motifText;
  switch (motive) {
    case 'CONSULTATION':
      motifText = '1ère Consultation';
      break;
    case 'CONSULTATIONSUIVIE':
      motifText = 'Consultation de suivi';
      break;
    case 'URGENCE':
      motifText = 'Urgence';
      break;
    default:
      motifText = 'Consultation'; // Default text if motif is not recognized
      break;
  } 

  return (
    <div className="card">
      <div className="date-time">
        <span className="date">{formattedDate}</span>
        <span className="time">{formattedTime} - {formattedTimeend}</span>
      </div>
      <div className="doctor-info">
        <div className="avatar">
          <img style={avatarStyle} src={modeImage} alt="Consultation Mode" />
        </div>
        <div className="info">
          <div className='n-s'>
            <span className="name">{name}</span>
            <span className="specialty">{specialty}</span>
          </div>
          <span className="consultation">{motifText}</span>
        </div>
      </div>
    </div>
  );
};

export default Rdvcard;