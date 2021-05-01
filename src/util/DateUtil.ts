/**
 * yyyyMMddHHmmss な文字列を Date オブジェクトに変換
 * @param {string} strDate
 */
export const stringToDate = (strDate: string) => {
    const year = parseInt(strDate.substring(0, 4))
    const month = parseInt(strDate.substring(4, 6))
    const date = parseInt(strDate.substring(6, 8))
    const hour = parseInt(strDate.substring(8, 10))
    const min = parseInt(strDate.substring(10, 12))
    const sec = parseInt(strDate.substring(12, 14))
    return new Date(year, month, date, hour, min, sec)
}