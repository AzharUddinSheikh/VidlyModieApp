import axios from 'axios';
import logService from './logService';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, error => {
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

    if (!expectedError) {
        alert('something went wrong');
        logService.log(error);
    }
    return Promise.reject(error);
});

function setJWT(jwt) {
    axios.defaults.headers.common['x-auth-token'] = jwt;
};

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJWT
};

export default http;