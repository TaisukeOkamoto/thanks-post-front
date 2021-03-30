//ユーザー型定義
export type UserItem = {
    id: number,
    name: string,
    email: string,
    uid: string,
    providerId: string,
    isConfirmed: boolean
}
export type UserState = {
    userItem: UserItem,
    isLoading: boolean,
    isSignedIn: boolean,
    statusCd: string,
    statusMsg: string,
}

//記事型定義
type SubmitData = {
    id: string;
    image: string;
    content: string
}

export interface CustomFormData extends FormData {
    append(name: keyof SubmitData, value: string | Blob, fileName?: string): void
}

export type PostItem = {
    id: number,
    content: string,
    image_url: string
}

export type PostState = {
    postItems: Array<PostItem>,
    isLoading: boolean,
    message: string
}

export type RootState = {
    users: UserState,
    posts: PostState
}