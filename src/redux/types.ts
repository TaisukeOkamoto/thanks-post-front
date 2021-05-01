//ユーザー型定義
export type UserItem = {
    // id: number,
    // name: string,
    // email: string,
    // uid: string,
    // providerId: string,
    name: string,
    profileText: string
    imageUrl: string,
    listUrl: string
}
export type UserState = {
    userItem: UserItem,
    isLoading: boolean,
    isSignedIn: boolean,
    statusCd: string,
    statusMsg: string,
}

//////////記事投稿用型定義/////////////////
type SubmitData = {
    id: string;
    image: string;
    content: string;
    title: string;
    date: string;
    person: string
}
export interface CustomFormData extends FormData {
    append(name: keyof SubmitData, value: string | Blob, fileName?: string): void
}
////////////////////////////////////////

//////////プロフィール更新用型定義//////////
type ProfileSubmitData = {
    avatar: string;
    name: string;
    profile_text: string;
    list_url: string;
}
export interface CustomProfileFormData extends FormData {
    append(name: keyof ProfileSubmitData, value: string | Blob, fileName?: string): void
}
/////////////////////////////////////////


export type PostItem = {
    id: number,
    content: string,
    image_url: string,
    title: string,
    date: string,
    person: string
}

export type PostState = {
    postItems: Array<PostItem>,
    isLoading: boolean,
    message: string
}

export type LoginUser = {
    name: string,
    picture: string
}

export type SessionState = {
    isLoggedIn: boolean,
    userId: string, //rails側で作成したユーザーを識別するランダムなuid
    loginUser: LoginUser,
    isLoading: boolean
}

export type RootState = {
    users: UserState,
    posts: PostState
    sessions: SessionState
}