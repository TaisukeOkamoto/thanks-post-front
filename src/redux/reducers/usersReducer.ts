import { getProfile, UserActions } from "../actions/userActions";
import { ActionTypes } from "../actionTypes";
import { UserState } from "../types";

const initialState: UserState = {
    userItem: {
        name: "",
        profileText: "",
        imageUrl: "",
        listUrl: ""
    },
    isLoading: false,
    isSignedIn: false,
    statusCd: "",
    statusMsg: "",
}

const users = (state = initialState, action: UserActions) => {
    switch (action.type) {
        // case ActionTypes.FETCHUSERS:
        //     return Object.assign({}, state, {
        //         isLoading: action.payload.isLoading
        //     })
        // case ActionTypes.SUCCESSFETCHUSERS:
        //     return Object.assign({}, state, {
        //         isLoading: action.payload.isLoading,
        //         userItems: action.payload.users
        //     })
        // case ActionTypes.FAILUREFETCHUSERS:
        //     return Object.assign({}, state, {
        //         isLoading: action.payload.isLoading,
        //         message: action.payload.message
        //     })
        case ActionTypes.CREATEUSER:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
            })
        case ActionTypes.SUCCESSCREATEUSER:
            return Object.assign({}, state, {
                userItem: action.payload.user,
                isLoading: action.payload.isLoading,
                statusCd: action.payload.statusCd,
                statusMsg: action.payload.statusMsg
            })
        case ActionTypes.FAILURECREATEUSER:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                statusCd: action.payload.statusCd,
                statusMsg: action.payload.statusMsg,
            })
        case ActionTypes.DELETEUSERS:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading
            })
        case ActionTypes.SUCCESSDELETEUSERS:
            const deleteId = action.payload.id
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                // userItems: state.userItems.filter((user) => {
                //     return user.id != deleteId
                // })
            })
        case ActionTypes.FAILUREDELETEUSERS:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                statusMsg: action.payload.message
            })
        case ActionTypes.GETPROFILE:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
            })
        case ActionTypes.SUCCESSGETPROFILE:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                userItem: action.payload.user
            })
        case ActionTypes.FAILUREGETPROFILE:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
            })
        default:
            return state
    }
}

export default users;