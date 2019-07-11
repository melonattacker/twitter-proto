import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { connect } from 'react-redux';
import Form from './Form.js';
import {
    changeText, changeImage, initializeForm, loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed
} from '../actions'

class App extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
           if(!user) {
               return;
           }
           this.props.loginUser(user.uid);
        })
    }

    login() {
        firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    logout() {
        firebase.auth().signOut();
        this.props.logoutUser();
    }

    render() {
        return(
            <div>
                <p>UID: {this.props.uid}</p>
                
                {this.props.uid ? (
                    <button onClick={this.logout}>Google Logout</button>
                    ) : (
                    <button onClick={this.login}>Google Login</button>
                )}

                <Form
                    text={this.props.text}
                    image={this.props.image}
                    uid={this.props.uid}
                    changeText={this.props.changeText}
                    changeImage={this.props.changeImage}
                    initializeForm={this.props.initializeForm}
                />
            </div>
        )
    }
}

const mapDispatchToProps = ({ changeText, changeImage, initializeForm, loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed });

const mapStateToProps = state => ({ uid: state.users.uid, text: state.form.text, image: state.form.image, images: state.request.images, isFetching: state.request.isFetching })

export default connect(mapStateToProps,mapDispatchToProps)(App)

