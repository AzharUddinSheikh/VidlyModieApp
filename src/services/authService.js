import http from './httpServices';
import jwt_decode from "jwt-decode";

const apiAuthEndPoint = '/auth';
const tokenKey = 'token';

http.setJWT(getJWT());

export async function login(data) {
    const {data: jwt}  = await http.post(apiAuthEndPoint, {
        email: data.username,
        password: data.password
    });
    localStorage.setItem(tokenKey, jwt);
};

export function loginWithJWT(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
};

export function getCurrentUser() {
     try {
      const jwtToken = localStorage.getItem(tokenKey);
      return jwt_decode(jwtToken);
    } catch {
      return null;
    }
};

export function getJWT() {
    return localStorage.getItem(tokenKey);
};

const auth = {
    getCurrentUser,
    login,
    loginWithJWT,
    getJWT,
    logout
};

export default auth;