import { getScheduls } from "../../../action/Rdv";

export default{
    getProfileMed(id){
            return `med/medById/${id}`;
    },

    getSchedulsMed(id) {
        return `med/schedulesofMed/${id}`;
    }
}