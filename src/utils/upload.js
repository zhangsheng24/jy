import { Crypto, Base64} from "./crypyo.js"
const uploadUtil = {
  aliOssParams(aid, aky) {
    var policyText = {
      "expiration": "2030-01-01T12:00:00.000Z",//上传的文件失效日期自己定义
      "conditions": [
        ["content-length-range", 0, 10485760000]//上传的内容大小，自己定义
      ]
    };

    let policy = Base64.encode(JSON.stringify(policyText));//生成的加密策略
    let bytes = Crypto.util.HMAC(Crypto.util.SHA1, policy, aky, { asBytes: true });
    let signature = Crypto.util.bytesToBase64(bytes);//生成的签名


    return {
      policy: policy,
      signature: signature
    }
  }
}

export { uploadUtil }