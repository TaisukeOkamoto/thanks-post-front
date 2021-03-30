export enum StatusCd {
    ok = "ok",
    mu00001 = "mu00001",
    mu00002 = "mu00002",
    fc00001 = "fc00001",
}

export enum Url {
    singIn = "/signin",
    mailLinkedTemplate = "/maillinkedtemplate",
    signup = "/signup",
    about = "/about",
    profile = "/profile/", // /profile/:id"　利用時
    post = "/post/",// /post/:id"　利用時
    postDetail = "/post/detail/",// /post/detail/:id"　利用時
}

export const apiUrlBase = "http://localhost:5000/"