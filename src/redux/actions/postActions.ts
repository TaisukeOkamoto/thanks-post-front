import { ActionTypes } from "../actionTypes"
import { CustomFormData, PostItem } from "../types"
import { Dispatch } from 'react';
import axios from 'axios';

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

export const fetchPost = (id: number) => {
    return async (dispatch: Dispatch<PostActions>) => {
        try {
            dispatch(startFetchPosts())
            const response = await axios
                .get(`http://localhost:5000/user/${id}/posts`)
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

const successUploadPost = (posts: PostItem[]): SuccessUploadPostAction => {
    return {
        type: ActionTypes.SUCCESSUPLOADPOST,
        payload: {
            isLoading: false,
            message: "記事を投稿しました",
            posts: posts
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
                .post('http://localhost:5000/posts', submitData, {
                    headers: {
                        "content-type": "multipart/form-data"
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
        id: number
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

const successDeletePost = (id: number): SuccessDeletePostAction => {
    return {
        type: ActionTypes.SUCCESSDELETEPOST,
        payload: {
            isLoading: false,
            message: "記事の削除に成功しました",
            id: id
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
                .delete(`http://localhost:5000/posts/${id}`)
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