import http from './httpServices';
import config from '../config.json';

const apiAuthEndPoint = `${config.apiEndPoint}/auth`;

export function login(data) {
    return http.post(apiAuthEndPoint, {
        email: data.username,
        password: data.password
    });
};