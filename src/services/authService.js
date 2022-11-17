import http from './httpServices';
import config from '../config.json';
import jwt_decode from "jwt-decode";

const apiAuthEndPoint = `${config.apiEndPoint}/auth`;
const tokenKey = 'token';

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

export default {
    getCurrentUser,
    login,
    loginWithJWT,
    logout
};