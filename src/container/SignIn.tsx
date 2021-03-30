import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrlBase, Url } from '../constants';
import firebase from '../firebaseConfig';
import { checkLogin, getCurrentUser } from '../util/firebaseUtil';
import axios from 'axios';

interface Props { }

const SignIn: React.FC<Props> = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((currentUser) => {
                if (currentUser.user) {
                    currentUser.user.getIdToken(/* forceRefresh */ true).then((idToken) => {
                        console.log(idToken);
                        axios.post(apiUrlBase + "users",
                            {
                                headers: {
                                    Authorization: `Bearer ${idToken}`
                                }
                            })
                            .then((data) => {
                                console.log("成功");
                            })
                            .catch((e) => {
                                console.log(e)
                            })



                    }).catch(function (error) {
                        // Handle error
                    });


                }

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error)
                if (error.code == "auth/invalid-email") {
                    alert("メールアドレスの形式が正しくありません");
                }
            });
    }


    const decodeJwt = (token: any) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    };


    return (
        <div>
            <div>メール：<input onChange={(e) => setEmail(e.target.value)} type="email" value={email} /></div>
            <div>パスワード：<input onChange={(e) => setPassword(e.target.value)} type="password" value={password} /></div>
            <div><button onClick={handleLogin}>ログイン</button></div>
        </div>
    );
}

export default SignIn;