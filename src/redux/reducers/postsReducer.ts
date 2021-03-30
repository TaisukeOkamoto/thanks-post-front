import { PostActions } from "../actions/postActions";
import { ActionTypes } from "../actionTypes";
import { PostState } from "../types";

const initialState: PostState = {
    postItems: [],
    isLoading: false,
    message: ""
}

export const posts = (state = initialState, action: PostActions) => {
    switch (action.type) {
        case ActionTypes.FETCHPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading
            })
        case ActionTypes.SUCCESSFETCHPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                postItems: action.payload.posts,
            })
        case ActionTypes.FAILUREFETCHPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                message: action.payload.message
            })
        case ActionTypes.UPLOADPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
            })
        case ActionTypes.SUCCESSUPLOADPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                message: action.payload.message,
                postItems: action.payload.posts
            })
        case ActionTypes.FAILUREUPLOADPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                message: action.payload.message
            })
        case ActionTypes.DELETEPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading
            })
        case ActionTypes.SUCCESSDELETEPOST:
            const deletedPostsId = action.payload.id
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                message: action.payload.message,
                postItems: state.postItems.filter((post) => {
                    deletedPostsId != post.id
                })
            })
        case ActionTypes.FAILUREDELETEPOST:
            return Object.assign({}, state, {
                isLoading: action.payload.isLoading,
                message: action.payload.message
            })
        default:
            return state
    }
}