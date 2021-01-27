<template>
  <div class="orderDetails">
    <div class="orderDetails-status">订单状态：{{ dataInfo.order.statusRemark }}</div>
    <div class="orderDetails-info">
      <div class="v-flex orderDetails-info-item">
        <div class="title">订单创建时间：</div>
        <div class="des v-flex-1">{{dataInfo.order.createdAt | formatDate('YYYY/MM/DD HH:mm:ss')}}</div>
      </div>
      <div class="v-flex orderDetails-info-item">
        <div class="title">订单编号：</div>
        <div class="des v-flex-1">{{ dataInfo.order.orderNo }}</div>
      </div>
      <div v-if="dataInfo.order.payStatus == '2'" class="v-flex orderDetails-info-item">
        <div class="title">付款时间：</div>
        <div class="des v-flex-1">{{dataInfo.order.payAt | formatDate('YYYY/MM/DD HH:mm:ss')}}</div>
      </div>
      <div v-if="dataInfo.order.payStatus == '2'" class="v-flex orderDetails-info-item">
        <div class="title">交易号：</div>
        <div class="des v-flex-1">{{dataInfo.serialNo}}</div>
      </div>
    </div>
    <div style="padding:10px 20px;font-size:15px;color:#444A4A">购买详情</div>
    <div class="orderDetails-orderInfo">
      <div class="v-flex v-row-between orderDetails-orderInfo-title">
        <div v-if="dataInfo.activity">{{ dataInfo.activity.name }}</div>
      </div>
      <div
        v-for="(item, idx) in dataInfo.order.productList"
        :key="idx"
        class="v-flex v-row-between orderDetails-orderInfo-products"
      >
        <div class="v-flex v-col-top">
          <van-image
            fit="cover"
            width="60px"
            height="60px"
            :src="item.productImage"
          />
          <div class="orderDetails-orderInfo-products-title">
            <div class="orderDetails-orderInfo-products-title-item">{{item.productName}}</div>
            <div class="orderDetails-orderInfo-products-title-item">￥{{item.productPrice}}</div>
          </div>
        </div>
        <div>x{{item.productQuantity}}</div>
      </div>
      <div class="orderDetails-orderInfo-totle">
        <div class="v-flex v-row-right orderDetails-orderInfo-totle-item">
          <div>游戏总额：</div>
          <div>￥{{dataInfo.order.productAmountTotal}}</div>
        </div>
        <div v-if="dataInfo.order.payStatus != '1'" class="v-flex v-row-right orderDetails-orderInfo-totle-item">
          <div>实付款：</div>
          <div style="color:#F93725">￥{{dataInfo.order.orderAmountTotal}}</div>
        </div>
      </div>
    </div>
    <div style="height:60px" v-if="dataInfo.order.payStatus == '1'">
      <div class="v-flex orderDetails-count v-row-between">
        <div class="v-flex">
          <div class="orderDetails-count-length">共{{dataInfo.order.products.length}}件</div>
          <div class="orderDetails-count-orderAmountTotal"><span>合计：</span>￥{{dataInfo.order.orderAmountTotal}}</div>
        </div>
        <div>
          <span class="orderDetails-count-cancelOrder" @click="cancelOrder(dataInfo.order.orderId)">取消订单</span>
          <span class="orderDetails-count-paylOrder">去支付</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { Toast } from 'vant'
export default {
  data() {
    return {
      dataInfo: {},
    };
  },
  mounted() {
    this.getOrderInfo()
  },
  methods:{
    getOrderInfo(){
      api("order.getOrderInfo",{orderNo:this.$route.query.orderNo}).then(res => {
        this.dataInfo = res
      })
    },
    // 取消订单
    cancelOrder(orderId){
      Toast.loading({
        message: '取消中...',
        forbidClick: true,
        loadingType: 'spinner',
      })
      api("order.cancelOrder", {orderId:orderId}).then(() => {
        Toast.clear()
        // this.onLoad(idnex)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.orderDetails {
  min-height: 100vh;
  background: $bgColor;
  &-status,
  &-info,
  &-orderInfo {
    padding: 10px 20px;
    background: $colorWhite;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.10);
    font-size: 15px;
    color: $font_6_Color;
  }
  &-orderInfo{
    margin-bottom: 20px;
  }
  &-status{
    background: #FBF5DD;
    color: $baseFontColor;
  }
  &-info {
    &-item {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  &-orderInfo{
    &-title{
      font-size: 15px;
      color: $baseFontColor;
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid#EFEFF4;
    }
    &-products {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #EFEFF4;
      font-size: 15px;
      color: $baseFontColor;
      &-title{
        margin-left: 10px;
        &-item{
          font-size: 15px;
          margin-bottom: 20px;
          color: $baseFontColor;
          &:last-child{
            margin-bottom: 0;
            color: #F93725;
          }
        }
      }
    }
    &-totle{
      font-size: 14px;
      color: $font_6_Color;
      &-item{
        margin-bottom: 10px;
      }
    }
  }
  &-count{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #FFFFFF;
    box-shadow: 0 -1px 0 0 rgba(0,0,0,0.10);
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 14px;
    &-orderAmountTotal{
      margin-left: 10px;
      color: #F93725;
      span{
        color: $font_6_Color;
      }
    }
    &-cancelOrder,&-paylOrder{
      border: 1px solid #ADAEB0;
      border-radius: 30px;
      height: 30px;
      line-height: 30px;
      width: 76px;
      text-align: center;
      display: inline-block;
    }
    &-paylOrder{
      border: 1px solid #F93725;
      color: #F93725;
      margin-left: 10px;
    }
  }
}
</style>