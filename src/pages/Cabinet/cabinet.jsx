import React from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./cabinet.scss";
import AddCabinet from "../../components/cabinet/AddCabinet";
import AddDocuments from "../../components/cabinet/AddDocuments";
import AddDocumentsUser from "../../components/cabinet/AddDocumentsUser";
import DocumentProcessing from "../../components/cabinet/DocumentProcessing";
import ChooseOffer from "../../components/cabinet/ChooseOffer";

function Cabinet() {
  return (
    <div className="cabinet">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<AddCabinet />} />
        <Route exact path="/mydocuments" element={<AddDocuments />} />
        <Route exact path="/userdocuments" element={<AddDocumentsUser />} />
       <Route exact path="/documentprocessing" element={<DocumentProcessing />} />
       <Route exact path="/chooseOffer" element={<ChooseOffer />} />
      </Routes>

    </div>
  );
}

export default Cabinet;
