import http from './httpServices';
import config from '../config.json';

export function genres () {
    return http.get(config.apiGenreEndPoint);
};