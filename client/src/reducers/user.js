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
                ...state,
                uid: action.uid
            }
        case LOGOUT:
            return {
                ...state,
                uid: ''
            }
        default:
            return state;
    }
}