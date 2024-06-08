import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {getAllMedRdv, getAllRdv, getAllRdvByTooMonth} from "../../action/Rdv";
import { rdvAnnuleFromDoc } from "../../assets/data/data";
import Calendar from "../../components/agenda/Calendar";
import MyRdvs from "../../components/agenda/MyRdvs";
import MiniFooter from "../../components/footer/MiniFooter";
import Navbar from "../../components/navbar/Navbar";
import RdvPopup from "../../components/RdvPopup";
import CONSTANTS from "../../constant/constant";
// import Rdv from "../../components/rdv/Rdv";
import "./agenda.scss";

function Agenda() {
  const [agendaIsChanging, setAgendaIsChanging] = useState();
  // const [allRdvs, setAllRdvs] = useState([]);
  const [rdvs, setRdvs] = useState([]);//"setRdvs" représente les rdv fetched

  useEffect(() => {// to get rdvs of the connected doctor

      getAllMedRdv(setRdvs);

  }, []);


  const [filter, setFilter] = useState("");
  
  const filtredRdvs = [...rdvs].filter((rdv) => {
    const today = new Date().getTime();
    const rdvStart = new Date(rdv.start).getTime();

    if (filter === "") {
      return rdv.statut !== CONSTANTS.RDV_STATE.ANNULE && rdv.statut !== CONSTANTS.RDV_STATE.ARCHIVED;
    }
    //dans cet etape, pas encore parlé sur rdvs annulés et archivés
    if (filter === "Tout Motif") {
      return rdv.statut !== CONSTANTS.RDV_STATE.ANNULE && rdv.statut !== CONSTANTS.RDV_STATE.ARCHIVED;
    }
    if (filter === "Tout Type") {
      return rdv.statut !== CONSTANTS.RDV_STATE.ANNULE && rdv.statut !== CONSTANTS.RDV_STATE.ARCHIVED;
    }
    if (filter === "Premiere consultation") {
      return rdv.motifConsultation.id_motif===1;
    }
    if (filter === "Consultation de suivi") {
      return rdv.motifConsultation.id_motif===2;
    }
    if (filter === "Urgence") {
      return rdv.motifConsultation.id_motif===3;
    }
    if (filter === "Cabinet") {
      return rdv.modeConsultation.id_mode===1;
    }
    if (filter === "Video") {
      return rdv.modeConsultation.id_mode===2;
    }
    if (filter === "Domicile") {
      return rdv.modeConsultation.id_mode===3;
    }
    else {
      return true;
    }
  });


  return (
    <div className="agenda-page">
      <Navbar />
      <div className="agenda">
        <MyRdvs setFilter={setFilter}  />
        <Calendar rdvs={filtredRdvs} setAgendaIsChanging={setAgendaIsChanging} />
      </div>
      <MiniFooter />
    </div>
  );
}

export default Agenda;
