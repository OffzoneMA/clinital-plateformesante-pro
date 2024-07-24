import React from 'react';
import './Card.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Card = ({ name, birthDate, address,patientId  }) => {
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

  return (
    <div className="card">
        <div className='card-into'>
            <div className="card-title">{name}</div>
            <div className="cardinfo1">
                <div className="card-info">{birthDate ? `${birthDate.split('T')[0] } - ${age}`+` - ans`: 'Date de nassaise Introuvable'} </div>
                <div className="card-info adress"> <img  src='./icons/marker-pin-01 copy.svg' alt=''/> {address ? address : 'Adress introuvable'}</div>
                <Link to={`/patientfile/${patientId}`} className="card-button">Consulter le dossier</Link>
              </div>


        </div>
     
    </div>
  );
};

export default Card;