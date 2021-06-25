import { Dispatch } from "react";
import { ActionTypes } from "../actionTypes";
import { getIdToken, getUserId, getUserInfo, isAuthenticated } from '../../auth0';
import axios from "axios";
import { getApiUrlBase, getHeader, getOriginBase, prodUrl } from "../../constants";
import { logoutFromAuth0 } from "../../auth0"
import { lock } from '../../lock';
import { LoginUser } from "../types";

const apiUrlBase = getApiUrlBase();

type LogoutAction = {
    type: ActionTypes.LOGOUT,
    payload: {
        isLogin: boolean,
        isLoading: boolean
    }
}

type SuccessLogoutAction = {
    type: ActionTypes.SUCCESSLOGOUT,
    payload: {
        isLogin: boolean,
        isLoading: boolean,
        loginUser: LoginUser,
        userId: string,
    }
}

type FailureLogoutAction = {
    type: ActionTypes.FAILURELOGOUT,
    payload: {
        isLogin: boolean,
        isLoading: boolean
    }
}

const startLogout = (isLogin: boolean): LogoutAction => {
    return {
        type: ActionTypes.LOGOUT,
        payload: {
            isLogin: isLogin,
            isLoading: true
        }
    }
}

const successLogout = (userId: string): SuccessLogoutAction => {
    return {
        type: ActionTypes.SUCCESSLOGOUT,
        payload: {
            isLogin: false,
            isLoading: false,
            loginUser: {
                name: "",
                picture: ""
            },
            userId: userId
        }
    }
}

const failureLogout = (): FailureLogoutAction => {
    return {
        type: ActionTypes.FAILURELOGOUT,
        payload: {
            isLogin: false,
            isLoading: false,
        }
    }
}

export const logout = (redirectUrl: string, isLogin: boolean, userId: string) => {
    return async (dispatch: Dispatch<SessionActions>) => {
        try {
            if (isLogin) {
                dispatch(startLogout(isLogin));
                await logoutFromAuth0(redirectUrl);
                dispatch(successLogout(userId));
            }
        } catch (e) {
            dispatch(failureLogout());
        }
    }
}

type LoginAction = {
    type: ActionTypes.LOGIN,
    payload: {
        isLogin: boolean,
        isLoading: boolean
    }
}

type SuccessLoginAction = {
    type: ActionTypes.SUCCESSLOGIN,
    payload: {
        isLogin: boolean,
        userId: string,
        loginUser: LoginUser
        isLoading: boolean
    }
}

type FailureLoginAction = {
    type: ActionTypes.FAILURELOGIN,
    payload: {
        isLogin: boolean,
        isLoading: boolean
    }
}

const startLogin = (): LoginAction => {
    return {
        type: ActionTypes.LOGIN,
        payload: {
            isLogin: false,
            isLoading: true
        }
    }
}

const successLogin = (userId: string, loginUser: LoginUser): SuccessLoginAction => {
    return {
        type: ActionTypes.SUCCESSLOGIN,
        payload: {
            isLogin: true,
            isLoading: false,
            loginUser: loginUser,
            userId: userId
        }
    }
}

const failureLogin = (): FailureLoginAction => {
    return {
        type: ActionTypes.FAILURELOGIN,
        payload: {
            isLogin: false,
            isLoading: false,
        }
    }
}

export const login = () => {
    return async (dispatch: Dispatch<SessionActions>) => {
        try {
            dispatch(startLogin());
            const isLoggedIn = isAuthenticated()
            if (isLoggedIn) {
                const response: { data: { user_id: string } } = await axios
                    .get(`${apiUrlBase}/login`, getHeader(getIdToken))
                const loginUser = getUserInfo();

                if (loginUser.name == loginUser.email) {
                    const userMetaDataName: string = loginUser[prodUrl + '/user_metadata'].name

                    let formData = new FormData();
                    formData.append("name", userMetaDataName);

                    const updateUserRes = await axios
                        .patch(`${apiUrlBase}/users/${response.data.user_id}`,
                            formData, {
                            headers: {
                                "content-type": "multipart/form-data",
                                "Authorization": 'Bearer ' + getIdToken()
                            }
                        })
                }
                dispatch(successLogin(response.data.user_id, loginUser))
            } else {
                dispatch(failureLogin())
                lock.checkSession({}, function (err, authResult) {
                    if (authResult) {
                        logoutFromAuth0(getOriginBase());
                    }
                });
            }
        } catch (e) {
            dispatch(failureLogin())
            lock.checkSession({}, function (err, authResult) {
                if (authResult) {
                    logoutFromAuth0(getOriginBase());
                }
            });
        }
    }
}

export type SessionActions =
    (
        | LoginAction | SuccessLoginAction
        | FailureLoginAction | LogoutAction | SuccessLogoutAction
        | FailureLogoutAction
    )