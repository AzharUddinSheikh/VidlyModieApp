import http from './httpServices';
import config from '../config.json';

const apiGenreEndPoint = `${config.apiEndPoint}/genres`;

export function genres () {
    return http.get(apiGenreEndPoint);
};