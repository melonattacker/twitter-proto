import React from 'react';
import firebase from '../firebase/firebase';
import axios from 'axios';

const ROOT_ENDPOINT = 'https://save-image-app.herokuapp.com';

const Form = ({ uid, text, image, isFetching, changeText, changeImage, initializeForm, requestData, receiveDataSuccess, receiveDataFailed }) => {
    const postTweetWithImage = () => {
        if(!uid) {
            alert('ログインしてください');
            return;
        }
        if(text.length === 0) {
            alert('テキストを入力してください');
            return;
        }
        if(text.length > 140) {
            alert('テキストは140文字以内です');
            return;
        }
        initializeForm();
        requestData();
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
                    receiveDataSuccess();
                    alert('投稿が完了しました');
                })
                .catch(err => {
                    receiveDataFailed();
                    alert('投稿に失敗しました')
                })
            } else {
                alert('アップロードは失敗しました')
            }
        }
    }

    const postTweetWithOutImage = () => {
        if(!uid) {
            alert('ログインしてください');
            return;
        }
        if(text.length === 0) {
            alert('テキストを入力してください');
            return;
        }
        if(text.length > 140) {
            alert('テキストは140文字以内です');
            return;
        }
        initializeForm();
        requestData();
        axios({
            method: 'post',
            url: ROOT_ENDPOINT + '/post/create',
            data: {
                created_by: uid,
                text: text,
                image_url: ''
            }
        })
        .then(res => {
            receiveDataSuccess();
            alert('投稿が完了しました');
        })
        .catch(err => {
            receiveDataFailed();
            alert('投稿に失敗しました')
        })
    }

    return (
        <div>
            <div>
                <input type='file' accept='image/*' onChange={e => changeImage(e.target.files[0])}></input>
            </div>
            <div>
                <textarea  value={text} rows='10' cols='60' type='text' onChange={e => changeText(e.target.value)}></textarea>
            </div>
            {image? (
                <button onClick={() => postTweetWithImage()}>投稿</button>
               ) : (
                <button onClick={() => postTweetWithOutImage()}>投稿</button>
               )
            }
            {isFetching
                ? <h2>Now Posting...</h2>
                : <p></p>
            }
        </div>
    );
}

export default Form;