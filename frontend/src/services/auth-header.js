export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
        //  return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}
