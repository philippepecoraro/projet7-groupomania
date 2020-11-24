/*import axios from 'axios';*/
import http from '../http-common';
import authHeader from './auth-header';


const API_URL_T = 'http://localhost:8080/api/test/';
const API_URL = 'http://localhost:8080/api/articles/';


class UserService {
    getPublicContent() {
        return http.get(API_URL_T + 'all');
    }

    getUserBoard() {
        return http.get(API_URL_T + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return http.get(API_URL_T + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return http.get(API_URL_T + 'admin', { headers: authHeader() });
    }

    //Correspond à ArticleDataService.js (sans authentification)

    getAll() {
        return http.get(API_URL, { headers: authHeader() });
    }

    get(id) {
        return http.get(API_URL + ` ${id}`, { headers: authHeader() });
    }

    create(data) {
        return http.post(API_URL, data);
    }

    update(id, data) {
        return http.put(API_URL + `${id}`, data);
    }

    delete(id) {
        return http.delete(API_URL + `${id}`, { headers: authHeader() });
    }

    deleteAll() {
        //return axios.delete(`/articles`);
        return http.delete(API_URL, { headers: authHeader() });
    }

    findByTitle(title) {
        // return axios.get(`/articles?title=${title}`);
        return http.get(API_URL + `?title=${title}`);
    }
}

export default new UserService();