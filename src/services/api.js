/*const ORIGIN = 'https://apidb.clinital.io'*/
//const ORIGIN = 'https://api-test.clinital.io'
const ORIGIN = 'http://localhost:8080'
const TOKEN = JSON.parse(localStorage.getItem('user'))?.token;
const REFRESHTOKEN = JSON.parse(localStorage.getItem('user'))?.refreshToken;
const USER_ID = JSON.parse(localStorage.getItem('user'))?.id;

export { ORIGIN, TOKEN, REFRESHTOKEN, USER_ID }

export function getToken() {
    return TOKEN;
}

/*export function setToken(token) {
    TOKEN = token; // Mettre à jour la variable TOKEN
    localStorage.setItem('user', JSON.stringify({ ...getUserData(), token: token }));

}*/

export function getRefreshToken() {
    return REFRESHTOKEN;
}

/*export function setRefreshToken(refreshToken) {
    localStorage.setItem('user', JSON.stringify({ ...getUserData(), refreshToken: refreshToken }));
}*/

export function getUserData() {
    return JSON.parse(localStorage.getItem('user')) || {};
}


