
export default {
    createSchedule(){
        return 'medecinSchedule/create';
    },
    updateSchedule(id){
        return `medecinSchedule/update/${id}`;
    },
    GetSchedulesByConectedMed(){
        return 'medecinSchedule/shedulebyMed';
    },
    
}