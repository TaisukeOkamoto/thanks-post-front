import { combineReducers } from 'redux';
import users from './usersReducer';
import { posts } from './postsReducer';

const rootReducer = combineReducers({ users, posts })

export default rootReducer;