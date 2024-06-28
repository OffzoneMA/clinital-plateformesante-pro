export default {
   
    addNewNetwork() {
        return `med/addNewNetwork`;
    },

    getMedNetwork(follower_id) {
        return `med/getMedNetWork/${follower_id}`;
    },

    deleteMedFromNetwork(id) { 
        return `med/deleteNetwork/${id}`;
    },

    getAllMedNetworks() {
        return `med/getAllMedNetWork`;
    },

    getcheckIfInNetwork(followerId) {
        return `med/checkIfInNetwork/${followerId}`;
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

