import http from './httpServices';

const apiGenreEndPoint = `/genres`;

export function genres () {
    return http.get(apiGenreEndPoint);
};