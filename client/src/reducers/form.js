import { CHANGE_IMAGE, INITIALIZE_FORM } from '../actions';

const initialState = {
    image: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_IMAGE:
            return {
                ...state,
                image: action.image
            }
        case INITIALIZE_FORM:
            return initialState.image
        default:
            return state;
    }
}

