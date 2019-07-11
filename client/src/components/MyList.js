import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import axios from 'axios';
import { connect } from 'react-redux';

import {
    loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed
} from '../actions'

const ROOT_ENDPOINT = 'http://localhost:3001';

class MyList extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                return;
            }
            this.props.loginUser(user.uid);
        })
        this.logout = this.logout.bind(this);
        this.fetchData();
    }

    login() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
        })
    }

    logout() {
        firebase.auth().signOut()
        .then(() => {
            this.props.logoutUser();
        })
    }


    fetchData = () => {
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
            this.props.receiveDataSuccess(my_posts);
        })
        .catch(err => {
            console.log(err);
            this.props.receiveDataFailed();
        })
    }

    render() {
        return (
            <div>
                <p>UID: {this.props.uid}</p>
                
                {this.props.uid ? (
                    <button onClick={this.logout}>Google Logout</button>
                    ) : (
                    <button onClick={this.login}>Google Login</button>
                )}
            </div>
        );
    }
}

const mapDispatchToProps = ({ loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed })

const mapStateToProps = state => ({ uid: state.users.uid, posts: state.request.posts, isFetching: state.request.isFetching })

export default connect(mapStateToProps,mapDispatchToProps)(MyList)