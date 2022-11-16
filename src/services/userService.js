import http from './httpServices';
import config from '../config.json';

const apiUserEndPoint = `${config.apiEndPoint}/users`;

export function registerUser (data) {
    return http.post(apiUserEndPoint, {
            email : data.username,
            name : data.name,
            password : data.password
    })
};