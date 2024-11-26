import axios from 'axios';

export const axiosApi = axios.create({
    baseURL: 'https://akylbek-js25-default-rtdb.europe-west1.firebasedatabase.app/',
})