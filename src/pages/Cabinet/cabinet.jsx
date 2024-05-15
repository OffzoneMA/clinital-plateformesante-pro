import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./cabinet.scss";
import AddCabinet from "../../components/cabinet/AddCabinet";
import AddDocuments from "../../components/cabinet/AddDocuments";

function Cabinet() {
  return (
    <div className="cabinet">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AddCabinet />} />
        <Route exact path="/mydocuments" element={<AddDocuments />} />
      </Routes>

    </div>
  );
}

export default Cabinet;
