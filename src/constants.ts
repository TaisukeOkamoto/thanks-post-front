import { getIdToken } from "./auth0"

export const devEnv = 'development'
export const prodEnv = 'production'

export enum StatusCd {
    ok = "ok",
    mu00001 = "mu00001",
    mu00002 = "mu00002",
    fc00001 = "fc00001",
}

export const url = {
    singIn: "/signin",
    mailLinkedTemplate: "/maillinkedtemplate",
    signup: "/signup",
    about: "/",
    profile: "/profile/",// /profile/:id"　利用時
    profileEdit: "/profile_edit/", // /profile/:id"　利用時
    post: "/post/",// /post/:id"　利用時
    callback: "/callback",
    postDetail: "/post/detail/",// /post/detail/:id"　利用時
    emailSubmitted: '/email_submitted'
}

export const getOriginBase = () => {
    if (process.env.NODE_ENV == devEnv) {
        return "http://localhost:3000"
    } else if (process.env.NODE_ENV == prodEnv) {
        return 'https://thankspost.com'
    } else {
        return ""
    }
}

export const prodUrl = 'https://thankspost.com';

export const getApiUrlBase = () => {
    if (process.env.NODE_ENV == devEnv) {
        return "http://localhost:5000"
    } else if (process.env.NODE_ENV == prodEnv) {
        return 'https://api.thankspost.com'
    } else {
        return ""
    }
}

export const getHeader = (extractIdToken: typeof getIdToken) =>
    ({ headers: { Authorization: 'Bearer ' + extractIdToken() } })
