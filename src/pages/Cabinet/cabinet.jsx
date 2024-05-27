import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./cabinet.scss";
import AddCabinet from "../../components/cabinet/AddCabinet";
import AddDocuments from "../../components/cabinet/AddDocuments";
import AddDocumentsUser from "../../components/cabinet/AddDocumentsUser";
import DocumentProcessing from "../../components/cabinet/DocumentProcessing";
import ChooseOffer from "../../components/cabinet/ChooseOffer";

// Function to get stored user
const getStoredUser = () => {
  const storedUserJSON = localStorage.getItem("user");
  return JSON.parse(storedUserJSON);
};

// Higher-order component for protected routes
const ProtectedRoute = ({ component: Component, allowedStates }) => {
  const storedUser = getStoredUser();

  if (!storedUser) {
    return <Navigate to="/login" />; // Redirect to a default route if no user is found
  }

  if (!allowedStates.includes(storedUser.state)) {
    // Redirect based on user state
    switch (storedUser.state) {
      case 1:
        return <Navigate to="/cabinet" />;
      case 2:
        return <Navigate to="/cabinet/mydocuments" />;
      case 3:
        return <Navigate to="/cabinet/chooseOffer" />;
      default:
        return <Navigate to="/cabinet" />;
    }
  }

  return <Component />;
};

function Cabinet() {
  return (
    <div className="cabinet">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={<ProtectedRoute component={AddCabinet} allowedStates={[1]} />}
        />
        <Route
          exact
          path="/mydocuments"
          element={<ProtectedRoute component={AddDocuments} allowedStates={[2]} />}
        />
        <Route
          exact
          path="/userdocuments"
          element={<ProtectedRoute component={AddDocumentsUser} allowedStates={[2]} />}
        />
        <Route
          exact
          path="/documentprocessing"
          element={<ProtectedRoute component={DocumentProcessing} allowedStates={[2]} />}
        />
        <Route
          exact
          path="/chooseOffer"
          element={<ProtectedRoute component={ChooseOffer} allowedStates={[3]} />}
        />
      </Routes>
    </div>
  );
}

export default Cabinet;
