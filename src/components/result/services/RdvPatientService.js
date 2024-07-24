import axiosInstance from "../../../services/Axios";
import { TOKEN } from '../../../services/api';
import apiPatientRdv from "../apiRdv/apiPatientRdv";

const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }

class RdvPatient {
    async getAllPatient() {
        try {
            const response = await axiosInstance.get(apiPatientRdv.getAllPatient, AUTHORIZATION);
            console.log(response.data);
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la vérification: ${error.message}`);
        }
    }
}

export default new RdvPatient();
