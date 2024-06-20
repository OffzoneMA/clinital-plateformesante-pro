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
    },

    getMedbyCity(id_ville){
        return `med/medNetByVille?id_ville=${id_ville}`;
    },
    getMedbySpecOrName(search){
        return `med/medNetByNameOrSpec?search=${search}`;
    },
    getMedbyNameOrSpecAndCity(search,ville){
        return `med/medNetByNameOrSpecAndVille?search=${search}&ville=${ville}`;
    },
}  

