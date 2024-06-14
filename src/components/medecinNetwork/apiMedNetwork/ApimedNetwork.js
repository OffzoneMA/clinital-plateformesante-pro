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
        return `med/medByVille?id_ville=${id_ville}`;
    },
    getMedbySpecOrName(search){
        return `med/medByNameOrSpec?search=${search}`;
    },
    getMedbyNameOrSpecAndCity(search,ville){
        return `med/medByNameOrSpecAndCity?search=${search}&ville=${ville}`;
    },
}  

