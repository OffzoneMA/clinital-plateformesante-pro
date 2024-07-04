import React from 'react';
import './Card.css'; // Import the CSS file


const Card = ({ name, birthDate, address }) => {
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
                <div className="card-info">{address ? address : 'Adress introuvable'}</div>
                <button className="card-button">Consulter le dossier</button>
            </div>


        </div>
     
    </div>
  );
};

export default Card;