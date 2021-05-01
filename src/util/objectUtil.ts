export /**
 *　オブジェクトが空かどうか
 * @param {Object} object
 * @returns
 */
    const isEmpty = (object: Object) => {
        return !Object.keys(object).length;
    }