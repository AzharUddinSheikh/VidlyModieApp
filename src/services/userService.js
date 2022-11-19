import http from './httpServices';

const apiUserEndPoint = `$/users`;

export function registerUser(data) {
    return http.post(apiUserEndPoint, {
            email : data.username,
            name : data.name,
            password : data.password
    })
};