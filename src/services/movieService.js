import http from './httpServices';
import config from '../config.json';

export function movies () {
    return http.get(config.apiMovieEndPoint);
};

export function getMovieById (id) {
    return http.get(`${config.apiMovieEndPoint}/${id}`);
}