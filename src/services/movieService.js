import http from './httpServices';

const apiMovieEndPoint = `/movies`;

export function movies () {
    return http.get(apiMovieEndPoint);
};

export function addMovie (data) {
    return http.post(apiMovieEndPoint, data);
};

export function updateMovie (movieId, data) {
    return http.put(`${apiMovieEndPoint}/${movieId}`, data)
};

export function getMovieById (movieId) {
    return http.get(`${apiMovieEndPoint}/${movieId}`);
};

export function deleteMovie (movieId) {
    return http.delete(`${apiMovieEndPoint}/${movieId}`)
};