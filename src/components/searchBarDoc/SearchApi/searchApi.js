export default {
    getMedbyCity(id_ville){
        return `med/medByVille?id_ville=${id_ville}`;
    },
    getMedbySpecOrName(search){
        return `med/medByNameOrSpec?search=${search}`;
    },
    getMedbyNameOrSpecAndCity(search,ville){
        return `med/medByNameOrSpecAndVille?search=${search}&ville=${ville}`;
    },
   getAllCities(){
        return 'ville/allvilles';
    },
    getAllSpec(){
        return 'med/getAllSpec';
    },
    
    medByCabinetName() {
        return 'med/medByCabinetName';
    }
}