import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { connect } from 'react-redux';
import Form from './Form.js';
// import List from './List.js';
import {
    changeImage, initializeForm, loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed
} from '../actions'

class App extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
           console.log(user.uid);
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
                <div>
                {this.props.uid ? (
                    <button onClick={this.logout}>Google Logout</button>
                    ) : (
                    <button onClick={this.login}>Google Login</button>
                )}
                </div>
                <Form
                    image={this.props.image}
                    uid={this.props.uid}
                    changeImage={this.props.changeImage}
                    initializeForm={this.props.initializeForm}
                />
                {/* <List
                    requestData={this.props.requestData}
                    receiveDataSuccess={this.props.receiveDataSuccess}
                    receiveDataFailed={this.props.receiveDataFailed}
                /> */}
            </div>
        )
    }
}

const mapDispatchToProps = ({ changeImage, initializeForm, loginUser, logoutUser, requestData, receiveDataSuccess, receiveDataFailed });

const mapStateToProps = state => ({ uid: state.users.uid, image: state.form.image, images: state.request.images, isFetching: state.request.isFetching })

export default connect(mapStateToProps,mapDispatchToProps)(App)

// import React, { Component } from 'react';

// class App extends Component {
//     render() {
//         return(
//             <div></div>
//         )
//     }
// }

// export default App;