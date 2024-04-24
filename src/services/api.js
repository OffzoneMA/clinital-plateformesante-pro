/*const ORIGIN = 'https://apidb.clinital.io'*/
const ORIGIN ='http://localhost:8080'
const TOKEN = JSON.parse(localStorage.getItem('user'))?.token;
const USER_ID = JSON.parse(localStorage.getItem('user'))?.id;

export { ORIGIN, TOKEN, USER_ID }