<template>
  <div class="my">
    <div class="my-userInfo" v-if="userInfo" @click="show = true">
      <div class="v-flex">
        <van-image
          round
          fit="cover"
          width="64px"
          height="64px"
          :src="userInfo.avatar"
        />
        <div class="my-userInfo-content-info">
          <div class="v-margin-bottom-20">{{userInfo.name}}</div>
          <div>{{userInfo.phone | formatPhone}}</div>
        </div>
        <div  class="my-userInfo-change">
          <span>切换</span><van-icon name="arrow" />
        </div>
      </div>
    </div>
    <div class="my-account">
      <div class="v-flex v-row-center">
        <div class="my-account-item v-flex v-row-center v-flex-1">
          <van-image
            round
            fit="cover"
            width="42px"
            height="42px"
            :src="require('../../assets/images/icon_1.png')"
          />
          <div class="my-account-item-wrap">
            <div>账户余额</div>
            <div style="color: #fcae00;;margin-top:5px">￥{{userBalance[0] ? userBalance[0].balance / 100 : 0}}</div>
          </div>
        </div>
        <div class="my-account-item v-flex v-row-center v-flex-1">
          <van-image
            round
            fit="cover"
            width="42px"
            height="42px"
            :src="require('../../assets/images/icon_2.png')"
          />
          <div class="my-account-item-wrap">
            <div>短信余额</div>
            <div style="color: #06B4FD;margin-top:5px">{{balance}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 我的订单 -->
    <div class="my-order">
      <div class="my-order-title">
        我的订单
      </div>
      <div class="v-flex v-row-center">
        <div class="my-order-item v-flex-1" @click="goOrder('ORDER_WAITING_PAY')">
          <van-badge v-if="orderCount.waitPayCount > 0" :content="orderCount.waitPayCount">
            <van-image
              round
              fit="cover"
              width="32px"
              height="32px"
              :src="require('../../assets/images/home/icon_xiangxixinxi.png')"
            />
          </van-badge>
          <van-image
              v-else
              round
              fit="cover"
              width="32px"
              height="32px"
              :src="require('../../assets/images/home/icon_xiangxixinxi.png')"
            />
          <div>待支付</div>
        </div>
        <div class="my-order-item v-flex-1" @click="goOrder('ORDER_ALREADY_PAY')">
          <van-image
            round
            fit="cover"
            width="32px"
            height="32px"
            :src="require('../../assets/images/home/icon_xiangxixinxi.png')"
          />
          <div>已支付</div>
        </div>
        <div class="my-order-item v-flex-1" @click="goOrder('ORDER_WAITING_CANCEL')">
          <van-image
            round
            fit="cover"
            width="32px"
            height="32px"
            :src="require('../../assets/images/home/icon_xiangxixinxi.png')"
          />
          <div>已取消</div>
        </div>
        <div class="my-order-item v-flex-1" @click="goOrder('ORDER_OPS_GET_ALL')">
          <van-image
            round
            fit="cover"
            width="32px"
            height="32px"
            :src="require('../../assets/images/home/icon_xiangxixinxi.png')"
          />
          <div>全部</div>
        </div>
      </div>
    </div>
    <div class="my-cell">
      <!-- <van-cell-group>
        <van-cell is-link value="切换" size="large" @click="show = true">
          <template #title>
            <div class="v-flex">
              <van-image
                round
                fit="cover"
                width="20px"
                height="20px"
                :src="require('../../assets/images/icon_jingyu.png')"
              />
              <span class="my-cell-title">{{currentCompany.name}}</span>
            </div>
          </template>
        </van-cell>
        <van-cell is-link size="large">
          <template #title>
            <div class="v-flex">
              <van-image
                round
                fit="cover"
                width="20px"
                height="20px"
                :src="require('../../assets/images/icon_gerenxinxi.png')"
              />
              <span class="my-cell-title">个人信息</span>
            </div>
          </template> </van-cell
        ><van-cell is-link size="large">
          <template #title>
            <div class="v-flex">
              <van-image
                round
                fit="cover"
                width="20px"
                height="20px"
                :src="require('../../assets/images/icon_shouji.png')"
              />
              <span class="my-cell-title">手机号绑定</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group> -->
      <van-cell-group>
        <van-cell is-link size="large" @click="cellClick('/my/myActivities')">
          <template #title>
            <div class="v-flex">
              <van-image
                round
                fit="cover"
                width="20px"
                height="20px"
                :src="require('../../assets/images/icon_wodehuodong.png')"
              />
              <span class="my-cell-title">我的活动</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="show = false"
      @select="actionSelect"
    />
  </div>
</template>

<script>
import api from '@/api'
import { Notify } from 'vant'
import { mapGetters } from "vuex";
import { wx, wxInit } from "@/utils/jssdkInit.js";
export default {
  data() {
    return {
      show: false,
      actions: [],
      currentCompany:{},
      userBalance:[],
      balance: {},
      orderCount:{}
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted(){
    this.getCompanyList()
    this.getUserBalance()
    this.getBalance()
    this.countOrder()
  },
  methods: {
    // 获取账户余额
    getUserBalance(){
      api('my.getUserBalance').then(res=>{
        this.userBalance = res.list.filter((item) => {
          return item.accountType == "1"; 
        })
      })
    },
    //获取短信
    getBalance(){
      api('my.getBalance',{type:1,activityId:0}).then(res=>{
        this.balance = res.Balance
      })
    },
    //获取商户列表
    getCompanyList(){
      api('my.companyList').then(res=>{
        if(res.company.length == 0){
          this.currentCompany = {
            name: this.userInfo.name + '的鲸鱼活动',
            id: 999
          }
        }
        this.actions = res.company
        this.currentCompany = res.currentCompany
        this.$store.commit('user/SET_companyInfo', res.currentCompany)
        this.actions.forEach(element => {
          if(element.id == res.currentCompany.id){
            element.color = "#ee0a24"
          }
        });
      })
    },
    actionSelect(action) {
      api("my.updateCompany",{id:action.id}).then(() => {
        Notify({ type: 'success', message: '切换商户成功' })
        // 刷新token
        api("my.updateToken").then(res => {
          console.log(res.token)
          this.$store.dispatch('user/setToken', res.token)
          this.$store.dispatch('user/setUserInfo', res)
          this.$nextTick(() => {
            wxInit()
              .then(() => {
                setTimeout(() => {
                  // 传参给小程序
                  wx.miniProgram.postMessage({ 
                    data: {
                      updateToken:res.token     
                    }
                  });
                  wx.miniProgram.navigateBack({delta: 1})
                },2000)
              })
              .catch((err) => {
                console.log(err);
              });
            //   toast.clear();
          });
          this.getCompanyList()
        })
      })
    },
    cellClick(path) {
      this.$router.push(path);
    },
    // 跳转订单页
    goOrder(type){
      this.$router.push({
        path:'/my/order',
        query:{
          type
        }
      })
    },
    // 订单统计
    countOrder(){
      api("order.countOrder").then(res => {
        this.orderCount = res
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.my {
  background: $bgColor;
  height: 100vh;
  &-userInfo {
    padding: 25px 20px;
    background: #fff;
    background-image: url('../../assets/images/img_wode.png');
    &-change{
      position: absolute;
      right:20px;
      color: $colorWhite;
      font-size: 17px;
    }
    &-content {
      &-info {
        color: $colorWhite;
        font-size: 17px;
        text-align: left;
        padding-left: 20px;
      }
    }
  }
  &-account{
    background: $colorWhite;
    padding: 20px 0;
    &-item{
      .van-image{
        margin-right: 5px;
      }
      &-wrap{
        font-size: 15px;
        color: #444a4a
      }
    }
  }
  &-order{
    background: $colorWhite;
    padding: 10px 20px;
    margin-top: 10px;
    &-title{
      font-size: 14px;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid $bgColor;
    }
    &-item{
      text-align: center;
      div{
        font-size: 15px;
        color: #444a4a
      }
    }
  }
  &-cell {
    padding-top: 10px;
    &-title {
      padding-left: 10px;
      font-size: 14px;
      color:$baseFontColor;
    }
  }
}
</style>