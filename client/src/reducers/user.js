import {
    LOGIN_USER, LOGOUT
} from '../actions';

const initialState = {
    uid: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                uid: action.uid
            }
        case LOGOUT:
            return {
                uid: action.uid
            }
        default:
            return state;
    }
}