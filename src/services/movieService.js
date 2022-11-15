import http from './httpServices';
import config from '../config.json';

export function movies () {
    return http.get(config.apiMovieEndPoint);
};

export function addMovie (data) {
    return http.post(config.apiMovieEndPoint, data);
};

export function updateMovie (movieId, data) {
    return http.put(`${config.apiEndPoint}/${movieId}`, data)
};

export function getMovieById (movieId) {
    return http.get(`${config.apiMovieEndPoint}/${movieId}`);
};

export function deleteMovie (movieId) {
    return http.delete(`${config.apiMovieEndPoint}/${movieId}`)
};