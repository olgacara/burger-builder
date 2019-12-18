import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-fda4d.firebaseio.com/'
})

export default instance;