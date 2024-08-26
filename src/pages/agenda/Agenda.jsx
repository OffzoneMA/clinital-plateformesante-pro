import React, { useEffect, useState } from "react";
import {getAllMedRdv} from "../../action/Rdv";
import Calendar from "../../components/agenda/Calendar";
import MyRdvs from "../../components/agenda/MyRdvs";
import MiniFooter from "../../components/footer/MiniFooter";
import Navbar from "../../components/navbar/Navbar";
import CONSTANTS from "../../constant/constant";
import "./agendaPage.scss";

function Agenda() {
    const [agendaIsChanging, setAgendaIsChanging] = useState();
    // const [allRdvs, setAllRdvs] = useState([]);
    const [rdvs, setRdvs] = useState([]);//"setRdvs" représente les rdv fetched

    useEffect(() => {// to get rdvs of the connected doctor

        getAllMedRdv(setRdvs);

    }, []);


    const [filter, setFilter] = useState("");
    /*const [filters, setFilters] = useState({
        motif: "",
        type: "",
        mode: "",
        statut: ""
    });*/

    /*const filtredRdvs = [...rdvs].filter((rdv) => {
        const today = new Date().getTime();
        const rdvStart = new Date(rdv.start).getTime();

        const matchMotif = filters.motif ? (
            filters.motif === "Premiere consultation" && rdv.motifConsultation.id_motif === 1 ||
            filters.motif === "Consultation de suivi" && rdv.motifConsultation.id_motif === 2 ||
            filters.motif === "Urgence" && rdv.motifConsultation.id_motif === 3
        ) : true;

        const matchType = filters.type ? (
            filters.type === "Cabinet" && rdv.modeConsultation.id_mode === 1 ||
            filters.type === "Video" && rdv.modeConsultation.id_mode === 2 ||
            filters.type === "Domicile" && rdv.modeConsultation.id_mode === 3
        ) : true;

        const matchStatut = filters.statut ? (
            filters.statut === "RdvAnnulee" && rdv.statut === CONSTANTS.RDV_STATE.ANNULE ||
            filters.statut === "Active" && rdv.statut !== CONSTANTS.RDV_STATE.ANNULE
        ) : true;

        return matchMotif && matchType && matchStatut;
    });*/

    /*const handleFilterChange = (filterType, value) => { first
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value
        }));
    };*/
    /*const handleFilterChange = (filterType, values) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: values
        }));
    };*/

    const filtredRdvs = [...rdvs].filter((rdv) => {
      const today = new Date().getTime();
      const rdvStart = new Date(rdv.start).getTime();

      if (filter === "") {
        return rdv.statut !== CONSTANTS.RDV_STATE.ANNULE;
      }
      //dans cet etape, pas encore parlé sur rdvs annulés et archivés
      if (filter === "Tout Motif") {
        return rdv.statut !== CONSTANTS.RDV_STATE.ANNULE;
      }
      if (filter === "Tout Type") {
        return rdv.statut !== CONSTANTS.RDV_STATE.ANNULE;
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
      if(filter === "RdvAnnulee"){
        return rdv.statut === CONSTANTS.RDV_STATE.ANNULE
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
    /*return (
        <div className="agenda-page">
            <Navbar />
            <div className="agenda">
                <MyRdvs handleFilterChange={handleFilterChange} />
                <Calendar rdvs={filtredRdvs} setAgendaIsChanging={setAgendaIsChanging} />
            </div>
            <MiniFooter />
        </div>
    );*/
}

export default Agenda;
