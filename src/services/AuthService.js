import axios from "./Axios"

const AUTH_URL = '/auth'

class AuthService {
    async verifyToken(token) {

        const URL = AUTH_URL + '/checkToken/' + token;
        try {
            const response = await axios.get(URL);
            console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }

    /*async logIn(payload) {
        const URL = AUTH_URL + '/signin';
        try {
            const response = await axios.get(URL, payload);
            return response;
        } catch (error) {
            throw error;
        }
    }
    */
    async logIn(payload) {
      const URL = `${AUTH_URL}/signin`;
      try {
        const response = await axios.post(URL, payload); 
        return response.data; 
      } catch (error) {
        throw error; 
      }
    }
    

 /* async seConnecter(payload) {
    const URL = `${AUTH_URL}/signin`;
    try {
      const réponse = await axios.post(URL, payload); // Utiliser POST pour les requêtes de connexion (pratique courante)
      return réponse.data; // Renvoyer uniquement les données de la réponse
    } catch (erreur) {
      throw erreur; // Relancer l'erreur pour une gestion appropriée
    }
  }
  */
}


export default new AuthService();