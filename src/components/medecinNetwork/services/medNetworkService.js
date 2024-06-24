import axiosInstance from "../../../services/Axios";
import ApimedNetwork from "../apiMedNetwork/ApimedNetwork";

import { ORIGIN, TOKEN, USER_ID } from '../../../services/api';
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }
class medNetworksService {

        async getMedNetwork(follower_id) {
            try {
            console.log(AUTHORIZATION)
            const response = await axiosInstance.get(ApimedNetwork.getMedNetwork(follower_id),
             AUTHORIZATION
            );
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des détails du médecin ici: ${error.message}`);
        }
    }
    
     async addMedToNetwork(data) {
        return await axiosInstance.post(ApimedNetwork.addMedToNetwork(), data);
    }

    async deleteMedFromNetwork(id) {
        return await axiosInstance.delete(ApimedNetwork.deleteMedFromNetwork(id));
    }

    async getAllMedNetworks() {
        return await axiosInstance.get(ApimedNetwork.getAllMedNetworks());
    }

    async getMedbyCity(id_ville) {
        return await axiosInstance.get(ApimedNetwork.getMedbyCity(id_ville));
    }
    async getMedbySpec(search) {
        return await axiosInstance.get(ApimedNetwork.getMedbySpecOrName(search));
    }

    async  getMedbyNameOrSpecAndCity(search,ville) {
        return await axiosInstance.get(ApimedNetwork.getMedbySpecOrName(search,ville));
    }

}

export default new medNetworksService();