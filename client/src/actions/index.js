export const CHANGE_IMAGE = 'CHANGE_IMAGE';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT = 'LOGOUT';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS';
export const RECEIVE_DATA_FAILED = 'RECEIVE_DATA_FAILED';

export const changeImage = (image) => ({
    type: CHANGE_IMAGE,
    image
})

export const loginUser = (uid) => ({
    type: LOGIN_USER,
    uid
})

export const logoutUser = () => ({
    type: LOGOUT
})

export const requestData = () => ({
    type: REQUEST_DATA
})

export const receiveDataSuccess = (images) => ({
    type: RECEIVE_DATA_SUCCESS,
    images
})

export const receiveDataFailed = () => ({
    type: RECEIVE_DATA_FAILED
})
