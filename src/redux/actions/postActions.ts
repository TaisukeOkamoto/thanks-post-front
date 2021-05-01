import { ActionTypes } from "../actionTypes"
import { CustomFormData, PostItem } from "../types"
import { Dispatch } from 'react';
import axios from 'axios';
import { apiUrlBase, getHeader } from "../../constants";
import { getIdToken } from "../../auth0";

type FetchPostsAction = {
    type: ActionTypes.FETCHPOST,
    payload: {
        isLoading: boolean
    }
}

type SuccessFetchPostsAction = {
    type: ActionTypes.SUCCESSFETCHPOST,
    payload: {
        isLoading: boolean,
        posts: PostItem[],
    }
}

type FailureFetchPostsAction = {
    type: ActionTypes.FAILUREFETCHPOST,
    payload: {
        isLoading: false,
        message: string
    }
}

const startFetchPosts = (): FetchPostsAction => {
    return {
        type: ActionTypes.FETCHPOST,
        payload: {
            isLoading: true,
        }
    }
}

const successFetchPosts = (posts: PostItem[]): SuccessFetchPostsAction => {
    return {
        type: ActionTypes.SUCCESSFETCHPOST,
        payload: {
            isLoading: false,
            posts: posts
        }
    }
}

const failureFetchPosts = (): FailureFetchPostsAction => {
    return {
        type: ActionTypes.FAILUREFETCHPOST,
        payload: {
            isLoading: false,
            message: "記事の取得に失敗しました"
        }
    }
}

export const fetchPost = (id: string) => {
    return async (dispatch: Dispatch<PostActions>) => {
        try {
            dispatch(startFetchPosts())
            const response = await axios
                .get(`${apiUrlBase}/user/${id}/posts`, getHeader(getIdToken))
            dispatch(successFetchPosts(response.data))
        } catch (e) {
            dispatch(failureFetchPosts());
        }
    }
}

type UploadPostAction = {
    type: ActionTypes.UPLOADPOST,
    payload: {
        isLoading: boolean
    }
}

type SuccessUploadPostAction = {
    type: ActionTypes.SUCCESSUPLOADPOST,
    payload: {
        isLoading: false,
        message: string,
        posts: PostItem[]
    }
}

type FailureUploadPostAction = {
    type: ActionTypes.FAILUREUPLOADPOST,
    payload: {
        isLoading: false,
        message: string
    }
}

const startUploadPost = (): UploadPostAction => {
    return {
        type: ActionTypes.UPLOADPOST,
        payload: {
            isLoading: true
        }
    }
}

const successUploadPost = (data: { posts: PostItem[], message: string }): SuccessUploadPostAction => {
    return {
        type: ActionTypes.SUCCESSUPLOADPOST,
        payload: {
            isLoading: false,
            message: data.message,
            posts: data.posts
        }
    }
}

const failureUploadPost = (message: string): FailureUploadPostAction => {
    return {
        type: ActionTypes.FAILUREUPLOADPOST,
        payload: {
            isLoading: false,
            message: message
        }
    }
}

export const uploadPost = (submitData: CustomFormData) => {
    return async (dispatch: Dispatch<PostActions>) => {
        try {
            dispatch(startUploadPost())
            const response = await axios
                .post(`${apiUrlBase}/posts`, submitData, {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": 'Bearer ' + getIdToken()
                    }
                })
            dispatch(successUploadPost(response.data))
        } catch (e) {
            dispatch(failureUploadPost(e.reponse))
        }
    }
}

type DeletePostAction = {
    type: ActionTypes.DELETEPOST,
    payload: {
        isLoading: boolean
    }
}

type SuccessDeletePostAction = {
    type: ActionTypes.SUCCESSDELETEPOST,
    payload: {
        isLoading: boolean,
        message: string,
        posts: PostItem[]
    }
}
type FailureDeletePostAction = {
    type: ActionTypes.FAILUREDELETEPOST,
    payload: {
        isLoading: boolean,
        message: string
    }
}

const startDeletePost = (): DeletePostAction => {
    return {
        type: ActionTypes.DELETEPOST,
        payload: {
            isLoading: true,
        }
    }
}

const successDeletePost = (data: { message: string, posts: PostItem[] }): SuccessDeletePostAction => {
    return {
        type: ActionTypes.SUCCESSDELETEPOST,
        payload: {
            isLoading: false,
            message: data.message,
            posts: data.posts,
        }
    }
}

const failureDeletePost = (): FailureDeletePostAction => {
    return {
        type: ActionTypes.FAILUREDELETEPOST,
        payload: {
            isLoading: false,
            message: "記事の削除に失敗しました"
        }
    }
}

export const deletePost = (id: number) => {
    return async (dispatch: Dispatch<PostActions>) => {
        try {
            dispatch(startDeletePost());
            const response = await axios
                .delete(`${apiUrlBase}/posts/${id}`, getHeader(getIdToken))
            dispatch(successDeletePost(response.data));
        } catch (e) {
            dispatch(failureDeletePost());
        }
    }
}

export type PostActions =
    (
        | FetchPostsAction | SuccessFetchPostsAction | FailureFetchPostsAction
        | UploadPostAction | SuccessUploadPostAction | FailureUploadPostAction
        | DeletePostAction | SuccessDeletePostAction | FailureDeletePostAction
    )