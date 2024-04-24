import { toast } from "react-toastify";
import axiosInstance from "../../../services/Axios";
import Compteapi from "../Apiaccount/Compteapi";

class AccountService {
  async ResetPassword(data) {
    return await axiosInstance.post(Compteapi.ResetPassword(),JSON.stringify(data));
  }

  deleteProche = async (idproch) => {
    return await axiosInstance.delete(Compteapi.deletProch(idproch));
  };

  addProche = async (data) => {
    return await axiosInstance.post(Compteapi.AddPatient(), data);
  };

  modifierProche = async (id, data) => {
    return await axiosInstance.post(Compteapi.UpdatePatient(id), data);
  };
  getProchesOfCurrentUser = async () => {
    return await axiosInstance.get(Compteapi.getAllProch());
  };
  getPatientById=async (id)=>{
    return await axiosInstance.get(Compteapi.getPatientById(id));
  };
  getMainPatient=async ()=>{
    return await axiosInstance.get(Compteapi.getMainPatient());
  };
  UpdatePatient=async(id,data)=>{
    return await axiosInstance.post(Compteapi.UpdatePatient(id), data);
  }
  MedcinsRendezVous=async(id)=>{
    return await axiosInstance.get(Compteapi.MedcinsRendezVous(id));
  }
  SendConfirmationCode=async(data)=>{
    return await axiosInstance.post(Compteapi.SendConfirmationCode(),data);
  }
  SupprimerCompte=async(code)=>{
    return await axiosInstance.post(Compteapi.supprimerCompte(),code);
  }
  CheckPassword=async(password)=>{
    return await axiosInstance.post(Compteapi.checkPassword(),password);
  }
}
export default new AccountService();
