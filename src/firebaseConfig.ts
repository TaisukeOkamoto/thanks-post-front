import firebase from "firebase";

const firebaseConfig = () => {
    if (process.env.NODE_ENV == 'development') {
        return {
            firebase: {
                apiKey: process.env.API_KEY,
                authDomain: process.env.AUTH_DOMAIN,
                projectId: process.env.PROJECT_ID,
                storageBucket: process.env.STORAGE_BUCKET,
                messagingSenderId: process.env.MESSAGING_SENDER_ID,
                appId: process.env.APP_ID,
                measurementId: process.env.MEASUREMENT_ID
            }
        }
    }
    return { firebase: {} };
}

const config = firebaseConfig().firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase;