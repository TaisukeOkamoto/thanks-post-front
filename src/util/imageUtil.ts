// base64データをblobに変換
export const base64toBlob = (base64: string) => {
    var bin = atob(base64.replace(/^.*,/, ''));
    var buffer = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) {
        buffer[i] = bin.charCodeAt(i);
    }
    try {
        var blob = new Blob([buffer.buffer], {
            type: 'image/jpeg'
        });
    } catch (e) {
        return false;
    }
    return blob;
}