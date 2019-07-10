import { CHANGE_IMAGE } from '../actions';

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
        default:
            return state;
    }
}

