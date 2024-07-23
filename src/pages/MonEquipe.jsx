import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
// import { MedicalSquare } from "./MedicalSquare";
// import { Notif } from "./Notif";
// import { PlusCircle } from "./PlusCircle";
// import { Settings01 } from "./Settings01";
// import { UserEdit } from "./UserEdit";
import help from '../assets/icons/help.svg'
import plusCircle from '../assets/icons/plus-circle.svg'
import medicalSquare from '../assets/icons/medical-square.svg'
import stethoscope from '../assets/icons/Stethoscope.svg'
import userEdit from '../assets/icons/user-edit@2x.svg'
import vector from '../assets/icons/Vector 413.svg'
import mail02 from "../assets/icons/mail-02.svg";
import phone from '../assets/icons/phone.svg';
import "./MonEquipe.css";
import "../components/acceuil/monequipe.css"
import Navbar from "../components/navbar/Navbar";
import Myteam from "./MyTeam";

function MonEquipe () {
    const location = useLocation();
    const { equipe } = location.state || { equipe: { medecins: [], secretaires: [], assistants: [] } };
  
    // const [isClicked, setIsClicked] = useState(false);

    // const handleClick = () => {
    //   setIsClicked(!isClicked);
    // };
    const [selected, setSelected] = useState(0);
    const [type, setType] = useState();
    

  const handleClick = (index, tp) => {
    setSelected(index);
    setType(tp);
    console.log("selected"+selected+" type :"+tp);
  };
    return (
        <>
          <Navbar />
        <div className="mon-quipe-my-team">
            <div className="div">
                <div className="overlap">
                    <div className="overlap-group">
                        <div className="container">
                            <div className="heading">
                                <div className="mon-agenda">Mon équipe</div>
                            </div>
                        </div>
                        <img className="vector" alt="Vector" src={vector} />
                    </div>
                    <div className="framee">
                        <div className="mon-agenda">Mes Praticiens</div>
                  
                    </div>
                    
                    {/* <div className="setting-menu">
                        <div className="main-wrapper">
                            <div className="main">
                                <img className="icon-instance-node" alt="Stethoscope" src={stethoscope} />
                                <div className="text-wrapper">Praticiens</div>
                            </div>
                        </div>
                        <div className="main-wrapper" onClick={handleClick}>
                            <div className="main">
                                <img className="icon-instance-node" alt="user edit" src={userEdit}/>
                                <div className={isClicked ?'text-wrapper' : 'text-wrapper-2'}>Secrétaires</div>
                            </div>
                        </div>
                        <div className="main-wrapper">
                            <div className="main">
                            <img className="icon-instance-node" alt="medicale square" src={medicalSquare} />
                                <div className="text-wrapper-2">Assistant(e)s</div>
                            </div>
                        </div>
                    </div> */}
                    <div className="setting-menu">
                        <div
                            className="main-wrapper"
                            onClick={() => handleClick(0,"prat")}
                        >
                            <div className="main">
                            <img className="icon-instance-node" alt="Stethoscope" src={stethoscope} />
                            <div className={selected === 0 ? 'text-wrapper' : 'text-wrapper-2'}>Praticiens</div>
                            </div>
                        </div>
                        <div
                            className="main-wrapper"
                            onClick={() => handleClick(1,"sec")}
                        >
                            <div className="main">
                            <img className="icon-instance-node" alt="user edit" src={userEdit} />
                            <div className={selected === 1 ? 'text-wrapper' : 'text-wrapper-2'}>Secrétaires</div>
                            </div>
                        </div>
                        <div
                            className="main-wrapper"
                            onClick={() => handleClick(2,"ass")}
                        >
                            <div className="main">
                            <img className="icon-instance-node" alt="medicale square" src={medicalSquare} />
                            <div className={selected === 2 ? 'text-wrapper' : 'text-wrapper-2'}>Assistant(e)s</div>
                            </div>
                        </div>
                        </div>
                    {!equipe? (
                        <div className="frame-2">
                        <img className="help" alt="Help" src={help} />
                        <div className="frame-3">
                            <p className="vous-n-avez-aucun">Vous n&#39;avez aucun membre d&#39;équipe</p>
                            <div className="button">
                                <div className="button-2">
                                    <img className="plus-circle" alt="plus circle" src={plusCircle} />
                                    <div className="titre">Ajouter un membre d’équipe</div>
                                </div>
                            </div>
                        </div>
                        </div>
                    ):(
                    <div className="frame-22">
                        {/* jouer sur ce card pour affichage d'equipe dynamiquement */}
                    
                    <Myteam equipe={equipe} type={type}/>
                    </div>
                    )}
                    
                    
                    
                    
                </div>
              
                
            </div>
        </div>
        </>
      
    );
};

export default MonEquipe ;