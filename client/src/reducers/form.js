import { CHANGE_TEXT, CHANGE_IMAGE, INITIALIZE_FORM } from '../actions';

const initialState = {
    text: '',
    image: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text
            }
        case CHANGE_IMAGE:
            return {
                ...state,
                image: action.image
            }
        case INITIALIZE_FORM:
            return {
                ...state,
                text: ''
            }
        default:
            return state;
    }
}

