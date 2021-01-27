1## 请求封装

关于请求，使用`import api from '@/api'`：
api(url || modulesObjString, data, other)
* url || modulesObjString(String) `必传`
  - url可为正常完整的http接口链接，其余参数在other进行设置，比如阿里云oss上传
  ```
  api('http://xxx.com/api1', {}, {
    cache: 'no-cache',
    method: 'post',
    withCredentials: false,
    headers: {
      noToken: true,
    }
  })
  ```
  - modulesObjString，modulesObjString为api2 modules里的josn，比如`api2/modules/user.js`里面有个getActivityList，调用为
  ```
  api('user.getActivityList', {})
  ```

* data(Object)`必传`
  1. 使用不同请求方式都做了处理，如果为get，那么data里的参数会自动转为params，为post会自动转为data，如：
  ```
  api('user.getActivityList', { bbb: xxxx }) get params为{ bbb: xxxx }
  api('user.postSub', { aaa: xxxx }) post data为{ bbb: xxxx }
  api('user.info.getUserInfo', { aaa: xxxx }) post data为{ bbb: xxxx } 注：可多层级
  ```
  2. 当post请求需url后面带参数，请将params放在other里，如`api('user.postSub', { aaa: xxxx }, { params: { id: data.id }})`

* other
  other为axios的请求配置，是把other里面的内容合并到前面参数的
  ```
  const params = {
    method: options.method,
    url: options.url,
    data: options.params,
    requestMessage: true,
    ...options.other
  }
  ```
  所以可以在other里面添加axios的所有请求配置，这边有一个自定义参数requestMessage，主要作用于请求返回的Message是否显示，这个默认为true，当请求错误的Message想自己处理时可设置为false。
  ```
  api('user.getActivityList', { bbb: xxxx }, { requestMessage: false })
  ```

* 请求返回
  对请求返回进行了处理，只有`code === 1`时才会走then(resolve)，其他情况都走catch(reject)，且返回结果进行了处理
  ```
  api('user.getActivityList', { bbb: xxxx }).then(res => {
    这里一定是code === 1
    这里 res 就直接是接口返回的data，可以直接使用
    this.list = res
  }).catch(err => {
    这里的err如果是接口报错，那么err是全部的返回信息，通过err.code获取报错code
    如果是网络等原因报错，那么会返回err.message
  })
  ```

* other.requestSame，请求取消
  - throttle（默认）：当一个请求发出且没有返回时，又发起一个相同的请求（url,method,data,params一样），此时会把前一个请求取消（只是前端层面不处理返回结果，服务器那边还是会有对应请求）
  - debounce：当一个请求发出且没有返回时，后面相同的请求（url,method,data,params一样）不会发出（不会发出请求）
  - none：请求都会发出