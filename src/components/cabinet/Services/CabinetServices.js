import { toast } from "react-toastify";
import axiosInstance from "../../../services/Axios";
import Cabinetapi from "../Apicabinet/Cabinetapi";

class CabinetService {

  addCabinet = async (data) => {
    return await axiosInstance.post(Cabinetapi.AddCabinet(), data);
  };

  
}
export default new CabinetService();
