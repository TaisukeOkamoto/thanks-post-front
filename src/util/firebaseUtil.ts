import firebase from '../firebaseConfig';

/**
* @returns boolean
ユーザーがfirebaseにログインしているかどうか
*/
export const checkLogin = (): boolean => {
    const user = firebase.auth().currentUser;
    if (user) {
        return true
    } else {
        return false
    }
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser;
}

