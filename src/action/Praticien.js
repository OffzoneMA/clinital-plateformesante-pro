import { toast } from "react-toastify";
import PraticienService from "../components/acceuil/services/PraticienService";


export const getEquipe = async (state) => {
  try {
      const res = await PraticienService.getEquipeMedecin()
      state(res.data)
  } catch (error) {
      toast.error(error.message)
  }
}

