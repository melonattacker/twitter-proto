import React from 'react';
import firebase from '../firebase/firebase';
import axios from 'axios';

const ROOT_ENDPOINT = 'mysql://b6f26e95edb042:04f7ce59@us-cdbr-iron-east-02.cleardb.net/heroku_06f4641160041ce?reconnect=true';

const Form = ({ uid, text, image, changeText, changeImage, initializeForm }) => {
    const postTweet = () => {
        if(!image) {
            return;
        } else if(!uid){
            alert('ログインしてください');
        } else if(text.length > 140) {
            alert('テキストは140文字までです');
        }
        const name = image.name;
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`${uid}/${name}`);
        const reader = new FileReader();
        reader.readAsArrayBuffer(image);
        reader.onload = async() => {
            const file = reader.result;
            const uploadTask = await imageRef.put(file);
            if(uploadTask.state === 'success') {
                const downloadURL = await uploadTask.ref.getDownloadURL()
                axios({
                    method: 'post',
                    url: ROOT_ENDPOINT + '/post/create',
                    data: {
                        created_by: uid,
                        text: text,
                        image_url: downloadURL
                    }
                })
                .then(res => {
                    console.log(res);
                    initializeForm();
                    alert('投稿が完了しました');
                })
                .catch(err => {
                    alert('投稿に失敗しました')
                })
            } else {
                alert('アップロードは失敗しました')
            }
        }
    }

    return (
        <div>
            <div>
                <input type='file' accept='image/*' onChange={e => changeImage(e.target.files[0])}></input>
            </div>
            <div>
                <textarea rows='10' cols='60' type='text' onChange={e => changeText(e.target.value)}></textarea>
            </div>
            <button onClick={() => postTweet()}>投稿</button>
        </div>
    );
}

export default Form;