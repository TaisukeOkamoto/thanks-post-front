import React, { useEffect, useState } from 'react';
import queryString from 'query-string'
import jwtDecode from 'jwt-decode';
import { Redirect, useHistory, withRouter } from 'react-router-dom';
import { RootState } from 'src/redux/types';
import { connect } from 'react-redux';
import { login } from '../redux/actions/sessionActions';
import { url } from '../constants';
import { isEmpty } from '../util/objectUtil';

interface Props {
    isLoggedIn: boolean,
    login: () => void,
    userId: string,
    isLoading: boolean
}

interface Params {
    access_token: "",
    id_token: "";
    expires_in: "";
}

const Callback: React.FC<Props> = ({ isLoggedIn, login, userId, isLoading }) => {

    let histroy = useHistory();

    const getQueryParams = (): any => {
        console.log("test2");
        const params = queryString.parse(location.hash)
        if (params.error_description?.toString().match(/0021/)) {
            alert(params.error_description);
            return false
        } else {
            return params
        }
    }

    const setToken = ({ access_token, id_token, expires_in }: Params) => {
        console.log("test1");
        console.log(access_token);
        console.log(id_token);
        console.log(expires_in);
        const numberExpiresIn = Number(expires_in);
        const expiresAtResult = numberExpiresIn * 1000 + new Date().getTime()
        const localStorage = window.localStorage
        localStorage.setItem('accessToken', access_token)
        localStorage.setItem('idToken', id_token)
        localStorage.setItem('expiresAt', expiresAtResult.toString())
        const user = JSON.parse(JSON.stringify((jwtDecode(id_token))));
        //twitterの場合、画像URLから_normalを取ると大きいサイズの画像が取得できる
        // if (user.sub.match(/twitter/)) {
        //     user.picture = user.picture.replace('_normal', '')
        // }
        const strUser = JSON.stringify(user);
        localStorage.setItem('user', strUser);
    }

    const setTokenByQuery = () => {
        console.log("test3");
        setToken(getQueryParams())
    }

    const setUserUid = () => {
        const localStorage = window.localStorage
        localStorage.setItem("userId", userId);
    }

    useEffect(() => {
        console.log("実行")
        if (isLoggedIn) {
            console.log("userId:" + userId)
            //マウント後にすぐに履歴を操作するとurlがcallbackに戻ることがあるため、setTimeout
            setTimeout(() => {
                histroy.push(url.profile + userId);
            }, 500)
        } else if (isEmpty(getQueryParams())) {
            console.log("実行2")
            histroy.push(url.about);
        } else {
            console.log("実行3")
            setTokenByQuery();
        }
    }, [isLoggedIn])

    useEffect(() => {
        setUserUid();
    }, [userId])



    return (
        <>
            {isLoading ? <div>ログイン中...</div> : ""}
        </>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoggedIn: state.sessions.isLoggedIn,
        userId: state.sessions.userId,
        isLoading: state.sessions.isLoading
    }
}

export default connect(mapStateToProps, { login })(Callback);