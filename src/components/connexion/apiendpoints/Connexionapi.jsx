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
}

}