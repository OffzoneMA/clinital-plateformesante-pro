import { toast } from "react-toastify";
import {getToken} from "../services/api";

import AuthService from "../services/AuthService";

export const verifyAuth = async (state) => {
  try {
    const TOKEN = getToken();
   
    if (TOKEN) {
      const res = await AuthService.verifyToken(TOKEN);
      if (res.data === true) {
        // Le token est valide
        state(true);
        //toast.success("Authentification réussie");
      } else {
        // Le token est invalide ou expiré
        logOut();
        state(false);
      }
    } else {
      state(false);
    }
  } catch (error) {
    //toast.error(error.message);
   // console.log("Une erreur est survenue lors de la vérification du token :", error);
    state(false);
  }
}

export const logOut = async () => {
  localStorage.removeItem("user");
  window.location = "/login";
};

export const logIn = async (payload, error, loading) => {
  try {
    loading(true);
    const res = await AuthService.logIn(payload);
    const user = res.data

    if (user.role === "ROLE_PATIENT") {
      localStorage.setItem("user", JSON.stringify(res.data));
      loading(false);
      error(false);
    } else {
      loading(false);
      toast.error("Ouups! You're not 'patient'");
      return false;
    }
  } catch (err) {
    toast.error(err.message);
    error(err.message);
    loading(false);
  }
};


//AVEC UN REFRESH----------------------------------------------------------------

/*export const verifyAuth = async (state) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
   let token = getToken();
    const REFRESHTOKEN = getRefreshToken();
 console.log("the token : " + token);
    if (token) {
     
      const res = await AuthService.verifyToken(token);
      console.log("verify token boolean true or false :", res.data);

      if (res.data === true) {
        // Le token est valide
        state(true);
        toast.success("Authentification réussie");
      } else if (res.data === false) {
        // Le token est invalide ou expiré, essayez de rafraîchir le token
        
        try {
          const newToken = await AuthService.refreshToken(token, REFRESHTOKEN); 
          console.log("new token recuperer", newToken);
          setToken(newToken); 
          updateToken(newToken);
          token = setToken(newToken);
          await AuthService.verifyToken(token);
         
          state(true);
          toast.success("Token mis à jour avec succès");
        } catch (refreshError) {
          // Gérer les erreurs de rafraîchissement du token
           console.log("verify token boolean true or false :", res.data);
          console.error("Erreur lors du rafraîchissement du token :", refreshError);
          toast.error("Erreur lors du rafraîchissement du token: " + refreshError.message);
          state(false);
        }
      }
    } else {
      state(false);
    }
  } catch (error) {
    toast.error(error.message);
    console.log("Une erreur est survenue lors de la vérification du token :", error);
    state(false);
  }
}
*/