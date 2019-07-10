import React from 'react';
import firebase from '../firebase/firebase';
import axios from 'axios';

const ROOT_ENDPOINT = 'http://localhost:3001';

const Form = ({ uid, image, changeImage, initializeForm }) => {
    const uploadImage = () => {
        if(!image) {
            return;
        }
        const name = image.name;
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`${uid}/${name}`);
        const reader = new FileReader();
        reader.readAsArrayBuffer(image);
        reader.onload = () => {
            const file = reader.result;
            imageRef.put(file).then(function(snapshot) {
                
            });
        }
    }
    return (
        <div>
            {/* <form onSubmit={uploadImage()}> */}
                <input type='file' onChange={e => changeImage(e.target.files[0])}></input>
                {console.log(image)}
                <button type="submit" accept='image/*' onClick={() => uploadImage()}>投稿</button>
            {/* </form> */}
        </div>
    );
}

export default Form;