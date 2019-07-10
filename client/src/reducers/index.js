import { combineReducers } from 'redux';
import users from './user';
import form from './form';
import request from './request';

export default combineReducers({ users, form, request })