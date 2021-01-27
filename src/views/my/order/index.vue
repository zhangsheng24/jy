/** 
* 我的活动
*/
<template>
  <div class="order">
    <van-tabs v-model="active" sticky @click="onClick" line-width="60px">
      <van-tab v-for="(item, index) in tabsList" :key="index" :name="item.name">
        <template #title
          ><span style="padding-right: 3px">{{ item.title }}</span
          ><span v-if="item.title == '待支付' && orderCount.waitPayCount > 0" style="width:5px;height:5px;border-radius:50%;background:red;display:inline-block;position:relative;top:-10px"></span>
        </template>
        <van-pull-refresh
          v-model="list[index].refreshing"
          @refresh="onRefresh(index)"
        >
          <van-list
            v-model="list[index].loading"
            :finished="list[index].finished"
            finished-text="没有更多了"
            @load="onLoad(index)"
            class="order-wrap"
          >
            <div v-for="(ele, idx) in list[index].items" :key="idx">
              <div class="order-wrap-info" @click="goDetails(ele)">
                <div class="v-flex v-row-between order-wrap-info-title">
                  <div v-if="ele.activity">
                    {{ele.activity.name}}
                  </div>
                  <div :class="`order-wrap-info-title-${ele.payStatus}`">
                    {{ele.payStatus | filterStatus}}
                  </div>
                </div>
                <div v-for="(item,idx) in ele.products" :key="idx" class="v-flex v-row-between v-col-top order-wrap-info-products">
                  <div class="v-flex v-col-top">
                    <van-image
                      fit="cover"
                      width="60px"
                      height="60px"
                      :src="item.productImage"
                    />
                    <div class="order-wrap-info-products-title">
                      <div class="order-wrap-info-products-title-item">{{item.productName}}</div>
                      <div class="order-wrap-info-products-title-item">￥{{item.productPrice}}</div>
                    </div>
                  </div>
                  <div>x{{item.productQuantity}}</div>
                </div>
                <div class="v-flex order-wrap-info-count" :class="ele.payStatus == 'ORDER_WAITING_PAY' ? 'v-row-between' : 'v-row-right'">
                  <div class="v-flex">
                    <div class="order-wrap-info-count-length">共{{ele.products.length}}件</div>
                    <div class="order-wrap-info-count-orderAmountTotal"><span>￥</span>{{ele.orderAmountTotal}}</div>
                  </div>
                  <div v-if="ele.payStatus == 'ORDER_WAITING_PAY'">
                    <span class="order-wrap-info-count-cancelOrder" @click="cancelOrder(ele.orderId,index)">取消订单</span>
                    <span class="order-wrap-info-count-paylOrder">去支付</span>
                  </div>
                </div>
              </div>
            </div>
            <van-empty v-if="list[index].items.length == 0" />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import api from "@/api";
import { Toast } from 'vant'
export default {
  data() {
    return {
      tabsList: [
        {
          title: "全部",
          name: 'ORDER_OPS_GET_ALL',
          number: 1,
        },
        {
          title: "待支付",
          name: 'ORDER_WAITING_PAY',
          number: 1,
        },
        {
          title: "已支付",
          name: 'ORDER_ALREADY_PAY',
          number: 1,
        },
        {
          title: "已取消",
          name: 'ORDER_WAITING_CANCEL',
          number: 1,
        },
      ],
      active: 'ORDER_OPS_GET_ALL',
      list: [
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
          total: 0,
        },
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
          total: 0,
        },
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
          total: 0,
        },
        {
          items: [],
          refreshing: false,
          loading: false,
          error: false,
          finished: false,
          total: 0,
        },
      ],
      form: {
        payStatus: 'ORDER_OPS_GET_ALL', // ORDER_OPS_GET_ALL-全部 ORDER_WAITING_PAY-待支付 ORDER_ALREADY_PAY-已支付 ORDER_WAITING_CANCEL-已取消
        pageIndex: 1,
        pageSize: 10,
        orderType:'ORDER_OT_GET_ALL'
      },
      totalPage: 1,
      hasWaiting:false,
      orderCount:{}
    };
  },
  filters: {
    filterStatus(value) {
      let str = "";
      switch (value) {
        case 'ORDER_WAITING_PAY':
          str = "待支付";
          break;
        case 'ORDER_ALREADY_PAY':
          str = "已支付";
          break;
        case 'ORDER_WAITING_CANCEL':
          str = "已取消";
          break;
        case 'ORDER_ALREADY_CANCEL':
          str = "已取消"
          break;
        case 'ORDER_PAY_EXPIRE':
          str = "支付过期"
          break;
        default:
          str = "";
          break;
      }
      return str;
    },
  },
  mounted() {
    this.active = this.$route.query.type
    this.form.payStatus = this.$route.query.type
    this.countOrder()
  },
  methods: {
    onLoad(index) {
      api("order.orderList", this.form).then((res) => {
        this.form.pageIndex++
        this.totalPage = res.totalPage
        if (this.list[index].refreshing) {
          this.list[index].items = [];
          this.list[index].refreshing = false;
        }
        if (res.totalPage == this.form.pageIndex - 1) {
          this.list[index].finished = true;
        }
        if (res.list.length > 0 && res.totalPage >= this.form.pageIndex - 1) {
          this.list[index].items = this.list[index].items.concat(res.list);
        } else {
          this.list[index].finished = true;
          this.list[index].loading = false;
        }
        this.list[index].loading = false;
      });
    },
    onRefresh(index) {
      this.form.pageIndex = 1
      this.list[index].finished = false;
      this.list[index].loading = true;
      this.onLoad(index);
    },
    onClick(name) {
      this.form.pageIndex = 1
      this.form.payStatus = name;
    },
    goDetails(item) {
      this.$router.push({
        path: "/my/order/orderDetails",
        query: {
          orderNo: item.orderNo,
        },
      });
    },
    // 取消订单
    cancelOrder(orderId,idnex){
      Toast.loading({
        message: '取消中...',
        forbidClick: true,
        loadingType: 'spinner',
      })
      api("order.cancelOrder", {orderId:orderId}).then(() => {
        Toast.clear()
        this.onLoad(idnex)
      });
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
.order {
  background: $bgColor;
  height: 100vh;
  .van-nav-bar {
    position: absolute;
    top: -25px;
    z-index: 999;
  }
  ::v-deep .van-tab {
    color: $font_6_Color;
  }
  ::v-deep .van-tab--active {
    color: $baseFontColor;
  }
  ::v-deep .van-tabs__line {
    background-color: $themeColor;
  }
  &-wrap {
    margin-top: 10px;
    background: $bgColor;
    min-height: calc(100vh - 54px);
    &-info {
      margin-bottom: 10px;
      padding: 15px;
      background: $colorWhite;
      &-img {
        margin-right: 10px;
      }
      &-title {
        font-size: 15px;
        color: $baseFontColor;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 1px solid#EFEFF4;
        &-ORDER_ALREADY_PAY,&-ORDER_WAITING_CANCEL,&-ORDER_ALREADY_CANCEL,&-ORDER_PAY_EXPIRE{
          color: $font_9_Color;
        }
        &-ORDER_WAITING_PAY{
          color: #F93725 ;
        }
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
      &-count{
        font-size: 14px;
        color: $font_6_Color;
        vertical-align: center;
        &-orderAmountTotal{
          font-size:20px;
          color:#F93725;
          margin-left:10px;
          span{
            font-size: 14px;
          }
        }
        &-cancelOrder,&-paylOrder{
          display: inline-block;
          border: 1px solid #ADAEB0;
          border-radius: 30px;
          font-size: 13px;
          color: #242525;
          height: 26px;
          line-height: 26px;
          width: 76px;
          text-align: center;
        }
        &-paylOrder{
          color:#F93725;
          border: 1px solid #F93725;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>