import { lock } from "./lock";

export const isAuthenticated = () => {
    const expiresAt = Number(window.localStorage.getItem('expiresAt'));
    console.log(new Date().getTime() < expiresAt);
    return new Date().getTime() < expiresAt
}

export const getUserInfo = () => {
    const userInfo = window.localStorage.getItem('user')
    return userInfo ? JSON.parse(userInfo) : {};
}

export const getUserId = () => {
    const userId = window.localStorage.getItem('userId');
    return userId ? userId : "";
}

export const getIdToken = () => {
    return isAuthenticated() ? window.localStorage.getItem('idToken') : null
}

export const logoutFromAuth0 = (returnTo: string) => {
    lock.logout({ returnTo: returnTo });
    unsetToken();
}

const unsetToken = () => {
    const localStorage = window.localStorage
    localStorage.removeItem('accessToken')
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
}