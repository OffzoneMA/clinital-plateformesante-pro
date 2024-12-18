import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Profil from "./pages/profil/Profil";
import Result from "./pages/result/Result";
import Contact from "./pages/connection/Contact";
import RdvPage from "./pages/rdvPage/RdvPage";
import HomePage from "./pages/homePage/HomePage";
import Document from "./pages/document/Document";
import Connexion from "./pages/connection/Connexion";
import MonCompte from "./pages/monCompte/MonCompte";
import Agenda from "./pages/agenda/Agenda";
import Acceuil from "./pages/acceuil/Acceuil";
import RdvPopup from "./components/RdvPopup";
// import AgendaWorkDays_ from "./components/result/AgendaWorkDays_";
import RdvDejaPrise from "./components/RdvDejaPrise";
import { verifyAuth } from "./action/Auth";
import LoginModal from "./components/Modals/LoginModal";
import ErrorBoundary from "./components/errors/ErrorBoundery";
import { useDispatch, useSelector } from "react-redux";
import { setLoginToggle } from "./utils/redux/GlobalSlice";
import Cabinet from "./pages/Cabinet/cabinet";

import Myteam from "./pages/MyTeam";
import MonEquipe from "./pages/MonEquipe";
import CardPage from "./pages/acceuil/CardPage";

import SettingsAgenda from "./pages/SettingsAgenda/SettingsAgenda";
import ÉvénementExceptionnel from "./pages/Événementexceptionnel/ÉvénementExceptionnel";

//import Acceuil2 from "./pages/acceuil/Acceuil2";

export const Log = React.createContext();

function App() {
  const [isValidToken, setIsValidToken] = useState(false)
  //const value = JSON.parse(localStorage.getItem("user"));
 
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || []
  });
  const [test, setTest] = useState(false);

  // Token Verification
  useEffect(() => {
    console.log(value.length)
    verifyAuth(setIsValidToken);
  }, []);


  return (

    <div className="App">

      

      <BrowserRouter>
        <Log.Provider value={value}>
        <ErrorBoundary>
          <Routes>
          
            <Route index path="/" element={<HomePage />} />
            <Route exact path="/login/*" element={<Connexion />} />
            <Route exact path="/SettingsAgenda/*" element={<SettingsAgenda />} />
            <Route exact path="/ÉvénementExceptionnel/*" element={<ÉvénementExceptionnel />} />
            <Route exact path="/result//*" element={<Result />} />
            <Route exact path="/cabinet//*" element={<Cabinet />} />
            <Route exact path="/cardpage" element={<CardPage />} />
            <Route exact path="/profil/:id" element={<Profil />} />
           
            {console.log(isValidToken)}
            {isValidToken &&
              <>
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/agenda" element={<Agenda />} />
                <Route exact path="/acceuil//*" element={<Acceuil />} />
                <Route exact path="/myteam" element={<MonEquipe />} />
                <Route exact path="/document" element={<Document />} />
                <Route exact path="/monCompte" element={<MonCompte />} />
                <Route exact path="/rdv/:id" element={<RdvPage />} />
                <Route exact path="/rdv-popup" element={<RdvPopup />} />
                <Route exact path="/rdvdejapris" element={<RdvDejaPrise />} />
              </>
            }
          </Routes>
          </ErrorBoundary>
        </Log.Provider>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}


export default App;
