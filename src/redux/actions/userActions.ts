import axios from "axios";
import { Dispatch } from "react";
import { Action } from "redux";
import { ActionTypes } from "../actionTypes";
import { CustomFormData, CustomProfileFormData, UserItem } from "../types";
import firebase from '../../firebaseConfig';
import { apiUrlBase, getHeader, StatusCd } from "../../constants";
import { getStatusMsg } from "../../util/MessageUtil";
import { getIdToken } from "../../auth0";

//　ユーザー取得処理 

type FetchUserAction = {
    type: ActionTypes.FETCHUSERS;
    payload: {
        isLoading: boolean
    }
}

type SuccessFetchUserAction = {
    type: ActionTypes.SUCCESSFETCHUSERS;
    payload: {
        users: UserItem[],
        isLoading: boolean
    }
}

type FailureFetchUserAction = {
    type: ActionTypes.FAILUREFETCHUSERS;
    payload: {
        isLoading: boolean,
        message: string
    }
}

const StartSetUsers = (): FetchUserAction => ({
    type: ActionTypes.FETCHUSERS,
    payload: {
        isLoading: true
    }
})

const SuccessSetUsers = (users: UserItem[]): SuccessFetchUserAction => ({
    type: ActionTypes.SUCCESSFETCHUSERS,
    payload: {
        users,
        isLoading: false
    }
})

const FailureSetUsers = (): FailureFetchUserAction => ({
    type: ActionTypes.FAILUREFETCHUSERS,
    payload: {
        isLoading: false,
        message: "エラーが発生しました。"
    }
})

export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(StartSetUsers())
            const response = await axios
                .get(apiUrlBase + 'users')
            dispatch(SuccessSetUsers(response.data))
        } catch (error) {
            dispatch(FailureSetUsers());
        }
    }
}

//ユーザー作成処理

type CreateUser = {
    type: ActionTypes.CREATEUSER,
    payload: {
        isLoading: boolean
    }
}

type SuccessCreateUser = {
    type: ActionTypes.SUCCESSCREATEUSER,
    payload: {
        user: UserItem,
        isLoading: boolean,
        statusCd: string,
        statusMsg: string
    }
}

type FailureCreateUser = {
    type: ActionTypes.FAILURECREATEUSER,
    payload: {
        isLoading: boolean,
        statusCd: string,
        statusMsg: string
    }
}

const startCreateUser = (): CreateUser => {
    return {
        type: ActionTypes.CREATEUSER,
        payload: {
            isLoading: true
        }
    }
}

const successCreateUser = (user: UserItem, statusCd: string, statusMsg: string)
    : SuccessCreateUser => {

    return {
        type: ActionTypes.SUCCESSCREATEUSER,
        payload: {
            user: user,
            isLoading: false,
            statusCd,
            statusMsg
        }
    }
}

const failureCreateUser = (statusCd: string, statusMsg: string): FailureCreateUser => {
    return {
        type: ActionTypes.FAILURECREATEUSER,
        payload: {
            isLoading: false,
            statusCd,
            statusMsg
        }
    }
}

export const createUser = (name: string, email: string, password: string) => {
    return (dispatch: Dispatch<UserActions>) => {
        try {
        } catch (e) {
        }
    }
}

//ユーザー削除処理

type DeleteUserAction = {
    type: ActionTypes.DELETEUSERS,
    payload: { isLoading: boolean }
}

type SuccessDeleteUserAction = {
    type: ActionTypes.SUCCESSDELETEUSERS,
    payload: {
        isLoading: boolean,
        id: number
    }
}

type FailureDeleteUserAction = {
    type: ActionTypes.FAILUREDELETEUSERS,
    payload: {
        isLoading: boolean,
        message: string
    }
}

const startDeleteUser = (): DeleteUserAction => {
    return {
        type: ActionTypes.DELETEUSERS,
        payload: { isLoading: true }
    }
}

const successDeleteUser = (id: number): SuccessDeleteUserAction => {
    return {
        type: ActionTypes.SUCCESSDELETEUSERS,
        payload: {
            isLoading: false,
            id: id
        }
    }
}

const failureDeleteUser = (): FailureDeleteUserAction => {
    return {
        type: ActionTypes.FAILUREDELETEUSERS,
        payload: {
            isLoading: false,
            message: "ユーザーの削除に失敗しました"
        }
    }
}

export const deleteUser = (id: number) => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch(startDeleteUser());
        try {
            const response = await axios
                .delete(`${apiUrlBase}users/${id}`)
            dispatch(successDeleteUser(id));
        } catch (error) {
            dispatch(failureDeleteUser());
        }
    }
}

type ConfirmUser = {
    type: ActionTypes.CONFIRMUSER,
    payload: {
        isLoading: boolean
    }
}

type SuccessConfirmUser = {
    type: ActionTypes.SUCCESSCONFIRMUSER,
    payload: {
        isLoading: boolean,
        userItem: UserItem,
        statusCd: string,
        statusMsg: string
    }
}

type FailureConfirmUser = {
    type: ActionTypes.FAILEDCONFIRMUSER,
    payload: {
        isLoading: boolean,
        statusCd: string,
        statusMsg: string
    }
}

const startConfirmUser = (): ConfirmUser => {
    return {
        type: ActionTypes.CONFIRMUSER,
        payload: {
            isLoading: true
        }
    }
}

const successConfirmUser = (user: UserItem, statusCd: string, statusMsg: string): SuccessConfirmUser => {
    return {
        type: ActionTypes.SUCCESSCONFIRMUSER,
        payload: {
            isLoading: true,
            userItem: user,
            statusCd: statusCd,
            statusMsg: statusMsg
        }
    }
}

const failedConfirmUser = (statusCd: string, statusMsg: string): FailureConfirmUser => {
    return {
        type: ActionTypes.FAILEDCONFIRMUSER,
        payload: {
            isLoading: false,
            statusCd: statusCd,
            statusMsg: statusMsg
        }
    }
}

export const confirmUser = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        dispatch(startConfirmUser())
        // const response = await axios
    }
}

interface GetProfile {
    type: ActionTypes.GETPROFILE,
    payload: {
        isLoading: boolean
    }
}

interface SuccessGetProfile {
    type: ActionTypes.SUCCESSGETPROFILE,
    payload: {
        isLoading: boolean,
        user: UserItem
    }
}

interface FailureGetProfile {
    type: ActionTypes.FAILUREGETPROFILE,
    payload: {
        isLoading: boolean
    }
}

const startGetProfile = (): GetProfile => {
    return {
        type: ActionTypes.GETPROFILE,
        payload: {
            isLoading: true,
        }
    }
}

const successGetProfile = (user: UserItem): SuccessGetProfile => {
    return {
        type: ActionTypes.SUCCESSGETPROFILE,
        payload: {
            isLoading: false,
            user: user
        }
    }
}

const failureGetProfile = (): FailureGetProfile => {
    return {
        type: ActionTypes.FAILUREGETPROFILE,
        payload: {
            isLoading: false,
        }
    }
}

export const getProfile = (id: string) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(startGetProfile());
            const response = await axios
                .get(`${apiUrlBase}/users/${id}`)
            const user = {
                name: response.data.user.name,
                profileText: response.data.user.profile_text,
                imageUrl: response.data.user.image_url,
                listUrl: response.data.user.list_url
            }
            dispatch(successGetProfile(user));
        } catch (e) {
            dispatch(failureGetProfile());
        }
    }
}

type UpdateProfile = {
    type: ActionTypes.UPDATEPROFILE,
    payload: {
        isLoading: boolean
    }
}

type SuccessUpdateProfile = {
    type: ActionTypes.SUCCESSUPDATEPROFILE,
    payload: {
        isLoading: boolean,
        user: UserItem
    }
}

type FailureUpdateProfile = {
    type: ActionTypes.FAILUREUPDATEPROFILE,
    payload: {
        isLoading: boolean
    }
}

const startUpdateProfile = (): UpdateProfile => {
    return {
        type: ActionTypes.UPDATEPROFILE,
        payload: {
            isLoading: true
        }
    }
}

const successUpdateProfile = (user: UserItem): SuccessUpdateProfile => {
    return {
        type: ActionTypes.SUCCESSUPDATEPROFILE,
        payload: {
            isLoading: false,
            user: user
        }
    }
}

const failureUpdateProfile = (): FailureUpdateProfile => {
    return {
        type: ActionTypes.FAILUREUPDATEPROFILE,
        payload: {
            isLoading: true
        }
    }
}

export const updateProfile = (id: string, submitData: CustomProfileFormData) => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            dispatch(startUpdateProfile());
            const response = await axios
                .patch(`${apiUrlBase}/users/${id}`,
                    submitData, {
                    headers: {
                        "content-type": "multipart/form-data",
                        "Authorization": 'Bearer ' + getIdToken()
                    }
                })
            dispatch(successUpdateProfile(response.data.user))
        } catch (e) {
            dispatch(failureUpdateProfile());
        }
    }
}

export type UserActions =
    (
        | FetchUserAction | SuccessFetchUserAction | FailureFetchUserAction
        | DeleteUserAction | SuccessDeleteUserAction | FailureDeleteUserAction
        | CreateUser | SuccessCreateUser | FailureCreateUser
        | ConfirmUser | SuccessConfirmUser | FailureConfirmUser
        | GetProfile | SuccessGetProfile | FailureGetProfile
        | UpdateProfile | SuccessUpdateProfile | FailureUpdateProfile
    )