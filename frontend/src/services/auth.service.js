import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'signin', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                console.log('response:', response);
                if (response.data.accessToken) {
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem('user');
        alert("Vous allez être déconnecté");
    }

    register(user) {
        return axios.post(API_URL + 'signup', {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        });
    }

    updateName(id, user) {
        return axios.put(API_URL + 'signupdate/' + id, {
            firstname: user.firstname,
            lastname: user.lastname,
        }, { headers: authHeader() });
    }

    deleteUser(id) {
        return axios.delete(API_URL + id, { headers: authHeader() });
    }
}

export default new AuthService();