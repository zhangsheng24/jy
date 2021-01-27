
export function isIos() {
    return (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase()))
}

export function isWeiXin() {
    return /micromessenger/.test(window.navigator.userAgent.toLowerCase())
}
export function GetQueryString(name) {
    var url = decodeURI(window.location.search)
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = url.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/**
 * @param {String}
 * @description 生成独立的Id
 */
export function gengerateID(str) {
    let nonstr =
      `${str}_` +
      Math.random()
        .toString(36)
        .substring(3, 8);
    return nonstr;
  }