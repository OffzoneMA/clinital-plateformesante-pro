import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import ForgotPassword from "../../components/connexion/ForgotPassword";
import Reinitialize from "../../components/connexion/Reinitialize";
import Inscription from "../../components/connexion/Inscription";
import SucceReg from "../../components/connexion/SucceReg";
import Demande from "../../components/connexion/demande";
import Login from "../../components/connexion/Login";
import ProtectedReinitialize from "./rules/ProtectedReinitialize";
import SuccessForgotPwd from "../../components/connexion/SuccessForgotPwd";

function Connexion() {
  return (
    <div className="connexion">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reinitialize-password" element={<ProtectedReinitialize />} />
        <Route exact path="/inscription" element={<Inscription />} />
        <Route exact path="/succes" element={<SucceReg />} />
        <Route exact path="/demande" element={<Demande />} />
        <Route exact path="/successf" element={<SuccessForgotPwd />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default Connexion;
