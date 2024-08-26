import React from 'react';
import './card.css'; // Import the CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import mail02 from "../../assets/icons/mail-02.svg";
import phone from '../../assets/icons/phone.svg';

const Card = ({ team, type }) => {
  console.log(type);
  return (
<div className="card" key={team.id}>
    {type==="ass" && (
      
          <div className='card-into'>
              <div className="card-title">{team.nom} {team.prenom}</div>
              <div className="cardinfo1">
              <div className="card-info-row">
                  <div className="card-info medical">Medical</div>
                  <div className="card-button">Assistant(e)</div>
                </div>
                  <div className="card-info adress"> Service : {team.service?team.service:"Dermathologie"}</div>
                  <div className="card-info-row">
                    <div className="card-info adress"><img className="icon-instance-node" alt="Frame" src={phone} />{team.user?.telephone}</div>
                    <div className="card-info email"><img className="icon-instance-node" alt="Frame" src={mail02} /> {team.user?.email}</div>
                  </div>
                </div>
  
  
          </div>
       
     
    )}
     {type==="sec" && (
      
      <div className='card-intoP'>
       <div className="card-titleP">{team.nom} {team.prenom}</div>
         <div className="cardinfo1">
         <div className="card-info-row">
             <div className="card-info medical">Administratif</div>
             <div className="card-buttonP">Secrétaire</div>
           </div>
             <div className="card-info adress"> Service : {team.service?team.service:"Dermathologie"}</div>
             <div className="card-info-row">
               <div className="card-info adress"><img className="icon-instance-node" alt="Frame" src={phone} /> {team.user?.telephone}</div>
               <div className="card-info email"><img className="icon-instance-node" alt="Frame" src={mail02} />{team.user?.email}</div>
             </div>
           </div>


     </div>
   
 
)}
   {type==="prat" && (
      
    //   <div className='card-into'>
    //    <div className="card-title">{team.nom} {team.prenom}</div>
    //      <div className="cardinfo1">
    //      <div className="card-info-row">
    //          <div className="card-info medical">Administratif</div>
    //          <div className="card-button">Doctor</div>
    //        </div>
    //          <div className="card-info adress"> Service : Dermatologie</div>
    //          <div className="card-info-row">
    //            <div className="card-info adress"><img className="icon-instance-node" alt="Frame" src={phone} /> 0789492503</div>
    //            <div className="card-info email"><img className="icon-instance-node" alt="Frame" src={mail02} /> regougzakia@gmail.com</div>
    //          </div>
    //        </div>


    //  </div>
    <Link to={`medecinfollower/?id=${team.id}`}
    className="card" key={team.id}
          >
          <div className="image-container">
          <img className="profile-img" src="/images/photoMed.png" alt="Profil médical" />
          {/* <img className="profile-img" src={`${photoUrlBase}${team.photo_med ? team.photo_med : "defaultprofil.png"}`} alt="Profil médical" /> */}
          <img className="icon-img" src="cnetwork/Gastroentérologue.png" alt="Gastroentérologue" />
          </div>
          <div className="text-container">
          <div className="name">Dr REGOUG Zakia</div>

              <div className="specialty">Generaliste</div>
          </div>

          </Link>
)}
     </div>
    // <div className="card">
    //     <div className='card-into'>
    //         <div className="card-title">{name}</div>
    //         <div className="cardinfo1">
    //         <div className="card-info-row">
    //             <div className="card-info medical">Medical</div>
    //             <div className="card-button">Assistant(e)</div>
    //           </div>
    //             <div className="card-info adress"> Service : Dermatologie</div>
    //             <div className="card-info-row">
    //               <div className="card-info adress"><img className="icon-instance-node" alt="Frame" src={phone} /> 0789492503</div>
    //               <div className="card-info email"><img className="icon-instance-node" alt="Frame" src={mail02} /> regougzakia@gmail.com</div>
    //             </div>
    //           </div>


    //     </div>
     
    // </div>
//     <div className="card">
//     <div className='card-intoP'>
//         <div className="card-titleP">{name}</div>
//         <div className="cardinfo1">
//         <div className="card-info-row">
//             <div className="card-info medical">Administratif</div>
//             <div className="card-buttonP">Secrétaire</div>
//           </div>
//             <div className="card-info adress"> Service : Dermatologie</div>
//             <div className="card-info-row">
//               <div className="card-info adress"><img className="icon-instance-node" alt="Frame" src={phone} /> 0789492503</div>
//               <div className="card-info email"><img className="icon-instance-node" alt="Frame" src={mail02} /> regougzakia@gmail.com</div>
//             </div>
//           </div>


//     </div>
 
// </div>
  );
};

export default Card;