import Auth0Lock from 'auth0-lock';
import { AiOutlineUser } from "react-icons/ai";
import userIcon from './assets/user.png'
import { useHistory } from 'react-router-dom';
import { devEnv, prodEnv, url } from './constants';


interface Auth0LockAdditionalTextSignUpField {
    type?: "text";
    icon?: string;
    name: string;
    options?: Auth0LockAdditionalSignUpFieldOption[] | Auth0LockAdditionalSignUpFieldOptionsFunction;
    placeholder: string;
    prefill?: string | Auth0LockAdditionalSignUpFieldPrefillFunction;
    validator?: (input: string) => { valid: boolean; hint?: string };
}

const nameInputValidator = (input: string) => {
    if (!input) {
        return {
            valid: false,
            hint: "この項目は必須です。"
        }
    } else {
        return {
            valid: true,
            hint: ""
        }
    }
}

const additionalSignUpFields: Auth0LockAdditionalTextSignUpField = {
    type: "text",
    name: "name",
    placeholder: "ユーザー名",
    validator: nameInputValidator,
    icon: userIcon
}

let callbackUrl = "http://localhost:3000/callback"

if (process.env.NODE_ENV == prodEnv) {
    callbackUrl = "https://thankspost.com/callback"
}

const options = {
    closable: true,
    language: 'ja',
    auth: {
        responseType: 'token id_token',
        redirectUrl: callbackUrl,
        params: {
            scope: 'openid profile email'
        }
    },
    theme: {
        primaryColor: '#45A8A8',
        foregroundColor: '#F2F5F7',
        logo: 'https://thankspost.com/logo.png'
    },
    additionalSignUpFields: [additionalSignUpFields],
    loginAfterSignUp: false,
    languageDictionary: {
        success: {
            signUp: '確認メールを送信しました。ご登録のアドレスから確認をお願いします。'
        },
    },
}

// export const lock = new Auth0Lock(
//     'bqj8OolSk95YguyP8zXLcKAwjGBQwbeT',
//     'thanks-post.jp.auth0.com',
//     options
// );

// interface Lock {
//     show: (options?: Auth0LockShowOptions) => void,
//     on(event: "show" | "hide", callback: () => void): void,
//     on(event: "unrecoverable_error" | "authorization_error", callback: (error: auth0.Auth0Error) => void): void,
//     on(event: "authenticated", callback: (authResult: AuthResult) => void): void,
//     on(event: string, callback: (...args: any[]) => void): void,
//     getUserInfo(token: string, callback: (error: auth0.Auth0Error, profile: auth0.Auth0UserProfile) => void): void
// }

// export const Auth = () => {

//     const wm = new WeakMap();
//     const privateStore = {};
//     let lock: Lock;

//     const Auth = () => {
//         lock = new Auth0Lock(
//             'bqj8OolSk95YguyP8zXLcKAwjGBQwbeT',
//             'thanks-post.jp.auth0.com',
//             options
//         );
//         wm.set(privateStore, {
//             appName: "Thanks Posts"
//         });
//     }

//     Auth.prototype.getProfile = () => {
//         return wm.get(privateStore).profile;
//     };

//     Auth.prototype.authn = () => {
//         // 認証されたイベントをリッスン
//         lock.on("authenticated", (authResult) => {

//             // authResultのトークンを使用してgetUserInfo（）を取得し、必要に応じて保存
//             lock.getUserInfo(authResult.accessToken, (error, profile) => {
//                 if (error) {
//                     // エラー処理
//                     return;
//                 }

//                 //どうしても必要な場合を除いて、アクセストークンを保存しないこと
//                 wm.set(privateStore, {
//                     accessToken: authResult.accessToken
//                 });

//                 wm.set(privateStore, {
//                     profile: profile
//                 });

//             });
//         });
//     };
//     return Auth;
// };

let clientId = "";
let domain = "";

if (process.env.NODE_ENV == devEnv) {
    clientId = process.env.AUTH_CLIENT_ID_DEV ? process.env.AUTH_CLIENT_ID_DEV : "";
    domain = process.env.AUTH_DOMAIN_DEV ? process.env.AUTH_DOMAIN_DEV : "";
} else if (process.env.NODE_ENV == prodEnv) {
    clientId = process.env.AUTH_CLIENT_ID_PRODUCTION ? process.env.AUTH_CLIENT_ID_PRODUCTION : "";
    domain = process.env.AUTH_DOMAIN_PRODUCTION ? process.env.AUTH_DOMAIN_PRODUCTION : "";
}


export const lock = new Auth0Lock(clientId, domain, options);
let accessToken = null;
let profile = null;

lock.on("authenticated", function (authResult) {
    lock.getUserInfo(authResult.accessToken, function (error, profileResult) {
        if (error) {
            // Handle error
            return;
        }

        console.log(authResult.accessToken);

        accessToken = authResult.accessToken;
        profile = profileResult;
        console.log(profile);

        // Update DOM
    });
});