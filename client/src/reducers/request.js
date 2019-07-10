import {
    REQUEST_DATA, RECEIVE_DATA_SUCCESS, RECEIVE_DATA_FAILED
} from '../actions';

const initialState = {
    isFetching: false,
    images: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true
            }
        case RECEIVE_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                users: action.images
            }
        case RECEIVE_DATA_FAILED:
            return {
                ...state,
                isFetching: false
            }
        default: 
            return state;
    }
}