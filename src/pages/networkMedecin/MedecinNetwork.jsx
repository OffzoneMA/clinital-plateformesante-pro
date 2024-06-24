import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./medecinNetwork.scss";
import MyNetwork from "../../components/medecinNetwork/MyNetwork";
import MedFollower from "../../components/medecinNetwork/MedFollower";

function MedecinNetwork() {
  return (
    <div className="medecinnetwork">
      <Navbar />
      <Routes>
        <Route exact path="/*" element={<MyNetwork />} />
       
      </Routes>

    </div>
  );
}

export default MedecinNetwork;
