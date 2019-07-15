import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { connect } from 'react-redux';
import Form from './Form.js';
import {
    changeText, changeImage, initializeForm, loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed
} from '../actions'

import '../App.css'

class App extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
           if(!user) {
               return;
           }
           this.props.loginUser(user.uid);
        })
        this.logout = this.logout.bind(this);
    }

    login() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
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

    render() {
        return(
            <div className='App'>
                <p>UID: {this.props.uid}</p>
                {this.props.uid ? (
                    <button onClick={this.logout}>Google Logout</button>
                    ) : (
                    <button onClick={this.login}>Google Login</button>
                )}
                <br/>
                <br/>
                <div>
                    <a href='./timeline'>タイムライン</a>
                    <br/>
                    <a href='./mylist'>マイページ</a>
                </div>
                <br/>
                <p>ツイート</p>
                <Form
                    text={this.props.text}
                    image={this.props.image}
                    uid={this.props.uid}
                    isFetching={this.props.isFetching}
                    changeText={this.props.changeText}
                    changeImage={this.props.changeImage}
                    initializeForm={this.props.initializeForm}
                    requestData={this.props.requestData}
                    receiveDataSuccess={this.props.receiveDataSuccess}
                    receiveDataFailed={this.props.receiveDataFailed}
                />
            </div>
        )
    }
}

const mapDispatchToProps = ({ changeText, changeImage, initializeForm, loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed });

const mapStateToProps = state => ({ uid: state.users.uid, text: state.form.text, image: state.form.image, isFetching: state.request.isFetching })

export default connect(mapStateToProps,mapDispatchToProps)(App)

