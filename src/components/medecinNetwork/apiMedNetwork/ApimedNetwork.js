export default {
   
    addMedToNetwork() {
        return `med/addNewNetwork/`;
    },

    getMedNetwork(id) {
        return `med/getMedNetwork/${id}`;
    },

    deleteMedFromNetwork(id) { 
        return `med/deleteNetwork/${id}`;
    },

    getAllMedNetworks() {
        return `med/getAllMedNetWork`;
    }
}  

