import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyATzIaTkrNIPkh5k9hRTTK0YH1qwo4PB5A",
    authDomain: "save-image-app.firebaseapp.com",
    databaseURL: "https://save-image-app.firebaseio.com",
    projectId: "save-image-app",
    storageBucket: "save-image-app.appspot.com",
    messagingSenderId: "326981613708",
    appId: "1:326981613708:web:0bb722ec39025734"
}

firebase.initializeApp(config);

export default firebase;