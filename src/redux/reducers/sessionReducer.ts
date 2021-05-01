import { SessionActions } from "../actions/sessionActions";
import { ActionTypes } from "../actionTypes";
import { SessionState } from "../types";
import { getUserId, getUserInfo, isAuthenticated } from '../../auth0';

const initialState: SessionState = {
    isLoggedIn: isAuthenticated(),
    userId: getUserId(),
    loginUser: getUserInfo(),
    isLoading: false,
}

const sessions = (state = initialState, action: SessionActions) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLogin,
                isLoading: action.payload.isLoading
            })
        case ActionTypes.SUCCESSLOGIN:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLogin,
                userId: action.payload.userId,
                isLoading: action.payload.isLoading,
                loginUser: action.payload.loginUser
            })
        case ActionTypes.FAILURELOGIN:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLogin,
                isLoading: action.payload.isLoading,
            })
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLogin,
                isLoading: action.payload.isLoading
            })
        case ActionTypes.SUCCESSLOGOUT:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLogin,
                isLoading: action.payload.isLoading,
                userId: action.payload.userId
            })
        case ActionTypes.FAILURELOGOUT:
            return Object.assign({}, state, {
                isLoggedIn: action.payload.isLogin,
                isLoading: action.payload.isLoading
            })
        default:
            return state
    }
}

export default sessions;