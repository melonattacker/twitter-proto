import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import axios from 'axios';
import { connect } from 'react-redux';

import {
    loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed
} from '../actions'

import '../App.css';

const ROOT_ENDPOINT = 'https://save-image-app.herokuapp.com';

class MyList extends Component {
    async componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if(!user) {
                return;
            }
            this.props.loginUser(user.uid);
            this.fetchData();
        })
    }

    fetchData = () => {
        if(!this.props.uid) {
            alert('ログインしてください')
        }
        this.props.requestData();
        axios({
            method: 'post',
            url: ROOT_ENDPOINT + '/post/user',
            data: {
                created_by: this.props.uid,
            }
        })
        .then(res => {
            const my_posts = res.data;
            console.log(my_posts)
            this.props.receiveDataSuccess(my_posts);
        })
        .catch(err => {
            console.log(err);
            this.props.receiveDataFailed();
        })
    }

    deletePost = (id) => {
        this.props.requestData();
        axios({
            method: 'delete',
            url: ROOT_ENDPOINT + '/post/delete',
            data: {
                id: id,
                created_by: this.props.uid
            }
        })
        .then(res => {
            const my_posts = res.data;
            this.props.receiveDataSuccess(my_posts);
        })
        .catch(err => {
            console.log(err);
            alert('削除に失敗しました');
            this.props.receiveDataFailed();
        })
    }

    render() {
        return (
            <div className='App'>
                <p>UID: {this.props.uid}</p>
                <br/>
                <a href='./timeline'>タイムライン</a>
                <br/>
                <a href='./'>ツイートする</a>
                <br/>
                <br/>
                <h2>あなたのツイート</h2>
                {
                    this.props.isFetching
                        ? <h2>Now Loading...</h2>
                        : <div>
                                {this.props.posts.map(post => (
                                    <div 
                                    style={{border: '1px solid black'}}
                                    key={post.id}>
                                    <p>{post.text}</p>
                                    {post.image_url 
                                       ? <img src={post.image_url} width='300' height='200' />
                                       : <p></p>
                                    }
                                    <p>{post.time}</p>
                                    <button onClick={() => this.deletePost(post.id)}>削除</button>
                                    </div>
                                ))}
                          </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = ({ loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed })

const mapStateToProps = state => ({ uid: state.users.uid, posts: state.request.posts, isFetching: state.request.isFetching })

export default connect(mapStateToProps,mapDispatchToProps)(MyList)