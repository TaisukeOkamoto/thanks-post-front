
/**
 * @param {(string | null)} value
 * @returns string | null
 * nullを""に変換、nullでなければそのまま返却
 */
export const null2Void = (value: string | null) => {
    return value = value ? value : "";
}