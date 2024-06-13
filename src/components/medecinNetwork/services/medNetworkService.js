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

}

export default new medNetworksService();