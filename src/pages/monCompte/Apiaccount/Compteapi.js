export default {
    ResetPassword(){
        return 'users/respw';
    },
    deletProch(idProche){
        return `patient/delete/${idProche}`;
    },
    AddPatient(){
        return 'patient/addpatient';
    },
    getAllProch(){
        return 'patient/getallproch';
    },
    getPatientById(id){
        return `patient/getPatientById/${id}`;
    },
    getMainPatient(){
        return 'patient/getmypatientaccount'
    },
    UpdatePatient(id){
        return `patient/updatepatient/${id}`;
    },
    MedcinsRendezVous(id){
        return `rdv/medcin/patientId/${id}`;
    },
    SendConfirmationCode(){
        return 'users/sendconfirmationcode';
    },
    supprimerCompte(){
        return 'users/supprimercompte';
    },
    checkPassword(){
        return 'auth/checkPassword';
    },
    
}