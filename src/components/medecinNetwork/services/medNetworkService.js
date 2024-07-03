import axiosInstance from "../../../services/Axios";
import ApimedNetwork from "../apiMedNetwork/ApimedNetwork";

import { ORIGIN, TOKEN, USER_ID } from '../../../services/api';
const AUTHORIZATION = { headers: { Authorization: `Bearer ${TOKEN}` } }
class medNetworksService {

        async getMedNetwork(follower_id) {
            try {
           // console.log(AUTHORIZATION)
            const response = await axiosInstance.get(ApimedNetwork.getMedNetwork(follower_id),
             AUTHORIZATION
            );
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des détails du médecin ici: ${error.message}`);
        }
    }
    async addMedToNetwork(data) {
        try {
            const url = ApimedNetwork.addNewNetwork();
            const response = await axiosInstance.post(url,JSON.stringify(data), AUTHORIZATION);
            return response.data;
        } catch (error) {
            console.error("Erreur lors de l'ajout du médecin :", error);
            throw new Error(`Erreur lors de l'ajout du médecin : ${error.message}`);
        }
    }


    async deleteMedFromNetwork(id) {
        try {
             console.log(AUTHORIZATION)
            const response = await axiosInstance.delete(ApimedNetwork.deleteMedFromNetwork(id),
                AUTHORIZATION
            );
            return response.data;
            //return await axiosInstance.delete(ApimedNetwork.deleteMedFromNetwork(id));
        } catch (error) {
            throw new Error(`Erreur lors de la supression du médecin ici: ${error.message}`);
        }
    }
    

    async getAllMedNetworks() {
        return await axiosInstance.get(ApimedNetwork.getAllMedNetworks());
    }

       async getcheckIfInNetwork(followerId) {
            try {
           // console.log(AUTHORIZATION)
            const response = await axiosInstance.get(ApimedNetwork.getcheckIfInNetwork(followerId),
             AUTHORIZATION
            );
            return response.data;
        } catch (error) {
            throw new Error(`Erreur lord de la verfication: ${error.message}`);
        }
    }

    async getMedbyCity(id_ville) {
        return await axiosInstance.get(ApimedNetwork.getMedbyCity(id_ville));
    }
    async getMedbySpec(search) {
        return await axiosInstance.get(ApimedNetwork.getMedbySpecOrName(search));
    }

    async  getMedbyNameOrSpecAndCity(search,ville) {
        return await axiosInstance.get(ApimedNetwork.getMedbyNameOrSpecAndCity(search,ville));
    }

}

export default new medNetworksService();