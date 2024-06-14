import axiosInstance from "../../../services/Axios";
import ApimedNetwork from "../apiMedNetwork/ApimedNetwork";

class medNetworksService {

 async getMedNetWork(id){
        return await axiosInstance.get(ApimedNetwork.getMedNetWork(id));
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