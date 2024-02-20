import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://plovo-js-default-rtdb.europe-west1.firebasedatabase.app',
});

export default axiosApi;