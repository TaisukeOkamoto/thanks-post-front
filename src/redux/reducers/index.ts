import { combineReducers } from 'redux';
import users from './usersReducer';
import { posts } from './postsReducer';
import sessions from './sessionReducer';

const rootReducer = combineReducers({ users, posts, sessions })

export default rootReducer;