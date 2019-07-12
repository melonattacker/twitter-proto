import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import axios from 'axios';
import { connect } from 'react-redux';

import {
    loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed
} from '../actions'

import '../App.css'

const ROOT_ENDPOINT = 'http://localhost:3001';

class AllList extends Component {
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
        this.props.requestData();
        axios.get(ROOT_ENDPOINT + '/post')
        .then(res => {
            const posts = res.data;
            console.log(posts)
            this.props.receiveDataSuccess(posts);
        })
        .catch(err => {
            console.log(err);
            this.props.receiveDataFailed();
        })
    }

    render() {
        return (
            <div className='App'>
                <p>UID: {this.props.uid}</p>
                <br/>
                <a href='./mylist'>マイページ</a>
                <br/>
                <a href='./'>ツイートする</a>
                <br/>
                <br/>
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

export default connect(mapStateToProps,mapDispatchToProps)(AllList)