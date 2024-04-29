import React, { useState, useEffect } from 'react';
import { navigate } from 'react-router-dom';
import Reinitialize from "../../../components/connexion/Reinitialize";
import axios from 'axios';
import { toast } from "react-toastify";

function ProtectedReinitialize() {
  const [tokenValid, setTokenValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get('reset');

    const url = `${process.env.BASE_URL}auth/passwordresettoken?resetToken=${resetToken}`;

    // Vérification du token 
    axios.get(url)
      .then(response => {
        setTokenValid(response.status === 200);
      })
      .catch(error => {
          console.error('Error fetching password reset token:', error);
          if (error.response && error.response.status === 404) {
              toast.error('Le lien de réinitialisation du mot de passe est invalide.');
          } else if (error.response && error.response.status === 400) {
              toast.error('Le lien de réinitialisation du mot de passe a expiré.');
          } else {
              toast.error('Une erreur est survenue.');
          }
      });

  }, []);

  // Si le token est valide, affiche la page de réinitialisation
  if (tokenValid) {
    return <Reinitialize />;
  } else {
  
    return null; // Retourne null pour éviter tout rendu supplémentaire
  }
}

export default ProtectedReinitialize;



/*import React, { useState, useEffect } from 'react';
import { navigate } from 'react-router-dom';
import Reinitialize from "../../../components/connexion/Reinitialize";
import axios from 'axios';
import { toast } from "react-toastify";

//Ce code contient d'une règle d'affichage pour le form reinitialize
function ProtectedReinitialize() {
  const [tokenValid, setTokenValid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get('reset');

    const url = `${process.env.BASE_URL}auth/passwordresettoken?resetToken=${resetToken}`;

    // Vérification du token 
    axios.get(url)
      .then(response => {
        setTokenValid(response.status === 200);
      })
      .catch(error => {
        console.error('Error fetching password reset token:', error);
      });
  }, []);

  // Si le token est valide, affiche lapage de reinitialisation
  if (tokenValid) {
    return <Reinitialize />;
  } else {
  
   return toast.error("response");
  
  }
}

export default ProtectedReinitialize;*/