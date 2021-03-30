import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getParameterByName } from '../util/urlUtil';
import firebase from '../firebaseConfig';
import { null2Void } from '../util/stringUtil';

interface Props { }

const MailLinkedTemplate: React.FC<Props> = (props) => {

    useEffect(() => {
        const mode = getParameterByName('mode');
        const actionCode = null2Void(getParameterByName('oobCode'));
        const continueUrl = null2Void(getParameterByName('continueUrl'));
        const lang = getParameterByName('lang') || 'en';
        const auth = firebase.auth();

        switch (mode) {
            case 'verifyEmail':
                handleVerifyEmail(auth, actionCode, continueUrl, lang);
            default:
        }
    }, [])

    const handleVerifyEmail = (auth: firebase.auth.Auth, actionCode: string, continueUrl: string, lang: string) => {
        auth.applyActionCode(actionCode).then((res) => {

        }).catch((e) => {

        })
    }

    return (
        <>
            <div>メールアドレスの確認が完了しました。</div>
            <div><Link to="/signup">ログイン画面へ</Link></div>
        </>
    );
}

export default MailLinkedTemplate;