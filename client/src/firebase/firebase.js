import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyATzIaTkrNIPkh5k9hRTTK0YH1qwo4PB5A",
    authDomain: "save-image-app.firebaseapp.com",
    databaseURL: "https://save-image-app.firebaseio.com",
    projectId: "save-image-app",
    storageBucket: "",
    messagingSenderId: "326981613708",
    appId: "1:326981613708:web:b80c6cf4416f2552"
}

firebase.initializeApp(config);

export const db = firebase.firestore();
export const functions = firebase.functions();

export default firebase;