import { StatusCd } from "../constants"

export const getStatusMsg = (stcd: string): string => {
    console.log("aaa");
    switch (stcd) {
        case StatusCd.ok:
            console.log("vvv");
            return "正常"
        case StatusCd.mu00001:
            return "ユーザーの作成に成功しました。"
        case StatusCd.mu00002:
            return "ユーザーの作成に失敗しました。"
        case StatusCd.fc00001:
            return "メールアドレスの形式に誤りがあります。"
        default:
            return "";
    }
}