/*
 * @Author: your name
 * @Date: 2020-08-14 16:11:00
 * @LastEditTime: 2021-01-13 09:11:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \jyhdmain\src\config\status-code.js
 */

//tenant服务 100开头
const tenant = {
  10001: "名称重复",
  10002: "号码重复",
  10003: "邮箱重复",
  10004: "租户不存在",
  10005: "不能修改资料(审核中)",
  10006: "不能重复申请成为租户(已经申请过，并且非申请失败)"
};
//wallet服务 200开头
const wallet = {
  20001: "重复添加",
  20002: "未找到记录",
  20003: "审核未通过，不予以处理",
  20004: "账户被冻结，不予以处理",
  20005: "余额不足",
  20006: "订单编号无效",
  20007: "订单已支付",
  20008: "未找到活动信息",
  20009: "通知数据解析出错",
  20010: "验签出错",
  20011: "重复通知",
  20012: "金额无效",
  20013: "系统账户不可修改",
  20014: "支付参数不可为空",
  20015: "活动收款账号重复设置",
  20016: "当前活动未配置收款账号",
  20017: "用户收款账号重复添加",
  20018: "设置活动收款账号时，收款账号类型错误",
  20019: "当前收款账号有活动在使用",
  20020: "APPID不能为空",
  20021: "未配置收款账户",
  20022: "支付方式无效",
  20023: "未配置正确的账户名称",
  20024: "未配置正确的账号",
  20025: "未配置正确的银行名",
  20026: "未配置正确的营业执照",
  20027: "提款账号无效",
  20028: "审核状态无效",
  20029: "用户不存在",
  20030: "微信支付CLIENTIP必填",
  20031: "充值创建订单失败",
  20032: "微信发红包，相关参数不可为空",
  20033: "微信发红包失败",
  20034: "调用微信支付失败",
  20035: "调用支付宝支付失败",
  20036: "当前订单号重复发起支付",
  20037: "商户信息无效"
};
//user服务 300开头
const user = {
  30001: "用户名或密码错误",
  30002: "登录，短信验证码错误",
  30003: "登录，图形验证码错误",
  30004: "注册，图形验证码错误",
  30005: "注册，短信验证码错误",
  30006: "登录过期", //Token错误
  30007: "登录过期", //token过期
  30008: "用户不存在",
  30009: "主办方已存在",
  30010: "用户已注册过",
  30011: "用户加入了某个公司，但是公司将帐号禁用了",
  30012: "帐号已加入某公司，但未激活，请注册后激活",
  30013: "公司名重复"
};
//优惠服务 400开头
const discount = {
  40001: "优惠名称重复",
  40002: "优惠策略名称重复"
};
//活动服务 500开头
const activity = {
  50001: "日期无效",
  50002: "未找到记录",
  50003: "活动地址必填",
  50004: "活动进行中不可删除",
  50005: "默认会场不能删除",
  50006: "会场人数超限",
  50007: "会场名称重复",
  50008: "当前套餐权限不足，请升级套餐或购买单功能",
  50009: "活动名称已存在",
  50010: "微信分享url为空",
  50011: "会期已过，请修改会期后重试",
  50012: "活动票没有设置",
  50013: "当前状态不可编辑"
};
//门票服务 600开头
const ticket = {
  60001: "未找到记录",
  60002: "库存不足",
  60003: "门票名称重复",
  60004: "活动未配置收款账号",
  60005: "参数错误",
  60006: "当前套餐权限不足，请升级套餐或购买单功能"
};
//签到服务 700开头
const clock = {
  70001: "未找到记录",
  70002: "日期无效",
  70003: "参会者userid重复绑定",
  70004: "请求参数无效",
  70005: "签到过程中，签到人员不存在",
  70006: "重复报名",
  70007: "excel行数超限（最多1000行）",
  70008: "excel模板校验失败",
  70009: "JSON字符串解析错误",
  70010: "调用表单服务CREATEORUPDATE方法出错",
  70011: "调用表单服务GetForm方法出错",
  70012: "下订单失败",
  70013: "门票库存不足",
  70014: "导出excel数据为空",
  70015: "默认签到点不能设置状态",
  70016: "重复签到",
  70017: "不允许在当前签到点签到",
  70018: "签到点已关闭",
  70019: "参会者手机号非法",
  70020: "参会者邮箱地址非法",
  70021: "参会者审核状态异常",
  70022: "缓存已丢失，请重新上传文件"
};
//通知服务 800开头
const notice = {
  80001: "通知模板不存在",
  80002: "通知发送失败",
  80003: "通知模板当前不能修改",
  80004: "发送模板参数错误",
  80005: "购买短信金额与条数不匹配",
  80006: "不能修改短信签名"
};
//报名服务 900开头
const sign = {
  90001: "没活动id参数",
  90002: "没有找到配置模板",
  90003: "没填写唯一性字串",
  90004: "唯一性字串，重复。",
  90005: "该活动需要门票，用户却没带票",
  90006: "渠道名重复",
  90007: "渠道地址重复",
  90008: "渠道id错误",
  90009: "渠道地址不存在",
  90010: "重复报名 同一个UserId 报名同一个ActivityId",
  90011: "手机格式错误",
  90012: "邮箱格式错误",
  90013: "唯一性字段必须为必填项",
  90014: "报名还未开始",
  90015: "报名已经结束",
  90016: "请正确设置报名的开始与截止时间",
  90017: "当前活动暂未发布，请先去发布活动",
  90018: "已达当前套餐参会人员人数限制",
  90019: "已达当前套餐单场活动报名人数限制",
  90020: "没找到电子票"
};
//表单服务 1000开头
const form = {
  100001: "错误的表单id"
};
//游戏服务 1100开头
const game = {
  110001: "游戏不存在",
  110002: "游戏未开始",
  110003: "游戏已结束",
  110004: "参数错误",
  110005: "粉丝已完成游戏",
  110006: "奖品已用完",
  110007: "没有中奖",
  110008: "游戏已经开始",
  110009: "游戏奖品已经发放",
  110010: "不能参与游戏",
  110011: "消息存在敏感词",
  110012: "消息发送速度过快",
  110013: "消息已经存在",
  110014: "游戏存在奖品",
  110015: "游戏不存在题目",
  110016: "游戏没有足够用户",
  110017: "游戏没足够的奖品",
  110018: "游戏用户被重复选中",
  110020: "不能删除唯一轮次",
  110021: "游戏嘉宾已存在，请勿重复添加",
  110022: "嘉宾已参与投票，不可删除",
  110023: "假票数不合法，只能增不能减",
  110024: "用户投票数已用完",
  110025: "不能重复投票",
  110026: "奖品数量不能为0",
  110027: "奖品单人中奖不能为0",
  110028: "奖品名称不能为空",
  110029: "奖品总金额不能为0",
  110030: "单个红包平均金额不能小于1元",
  110031: "奖品发奖范围不能小于0",
  110032: "奖品发奖范围结束值不能小于开始值",
  110033: "奖品答对题数限制不能小于0",
  110034: "摇号奖品每轮只能保存一个"
};
//订单服务 1200开头
const order = {
  120001: "订单不存在",
  120002: "订单已经支付",
  120003: "订单不存在发票"
};
//开放平台服务 1300开头
const extra = {
  130001: "没有配置 活动发布方式",
  130002: "有收费票 没有配置收款账号",
  130003: "有收费票并发布到小程序,没设置小程序收款方式",
  130004: "有收费票并发布到公众号,没设置公众号收款方式",
  130005: "有收费票并发布到H5,没设置公众号收款方式或支付宝收款方式",
  130006: "获取授权账号信息出错",
  130007: "未认证账号",
  130008: "已达当前套餐活动发布场次限制",
  130009: "会议已过期"
};
const reception = {
  150001: "名称为空",
  150002: "名称重复"
};
const statusCode = {
  "2": "接口调用失败",
  "3": "资源发生变化需要刷新",
  ...tenant,
  ...wallet,
  ...user,
  ...discount,
  ...activity,
  ...ticket,
  ...clock,
  ...notice,
  ...sign,
  ...form,
  ...game,
  ...order,
  ...extra,
  ...reception
};
export default statusCode;
