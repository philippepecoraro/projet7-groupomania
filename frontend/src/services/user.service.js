import http from '../http-common';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/articles/';
const API_URL_COMMENT = 'http://localhost:8080/api/comment/';

class UserService {
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
        return http.delete(API_URL, { headers: authHeader() });
    }

    findByTitle(title) {
        return http.get(API_URL + `?title=${title}`);
    }

    getAllComment(postId) {
        return http.get(API_URL_COMMENT + "all/" + postId);
    }
    createComment(data) {
        return http.post(API_URL_COMMENT, data);
    }

    getCommentId(id) {
        return http.get(API_URL_COMMENT + id);
    }

    updateComment(id, data) {
        return http.put(API_URL_COMMENT + id, data);
    }

    getAllCommentSignal(signal) {
        return http.get(API_URL_COMMENT + "signal/" + signal);
    }

    getAllArticleSignal(signal) {
        return http.get(API_URL + "signal/" + signal);
    }

}

export default new UserService();