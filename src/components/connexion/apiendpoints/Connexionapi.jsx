export default{
login(){
        return 'auth/signin';
    },
signup(){
    return 'auth/signup';
},

confirmAccount(){
   return 'auth/generateNewLink';
},

gettokenbyuserid(userId) {
   return `auth/confirmationtoken/${userId}`;
},
forgotpassword() {
    return 'auth/forgotpassword';
},
createrequest() {
    return 'demandes/create';
},
addSpecialite() {
    return 'specialites/ajouter';
},

}