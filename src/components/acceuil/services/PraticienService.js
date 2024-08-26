import axios from '../../../services/Axios';
import { ORIGIN, TOKEN, USER_ID } from '../../../services/api'

const EQUIPE_URL = ORIGIN + '/api/med/equipe'
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }

class PraticienService {
   
   
async getEquipeMedecin(){
    try {
        const response = await axios.get(EQUIPE_URL,AUTHORIZATION);
        return response;
    } catch (error) {
        throw error;
    }
}
}


export default new PraticienService();