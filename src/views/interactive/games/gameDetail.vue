<template>
  <div class="ganmeDetail_wrap">
    <div>
      <img :src="details.cover" alt="" />
    </div>
    <van-goods-action>
      <van-goods-action-icon
        to="/interactive/cart/index"
        icon="cart-o"
        text="购物车"
        :badge="totalItemAmount ? totalItemAmount : ''"
      />
      <van-goods-action-button
        @click="handleAdd('cart')"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button
        @click="handleAdd('buy')"
        type="danger"
        text="立即购买"
      />
    </van-goods-action>
    <van-popup v-model="show" position="bottom" round>
      <div class="product_detail_wrap">
        <div class="tips">购买成功，只能连续使用，不能分隔使用</div>
        <div class="detail_box">
          <div class="detail_left">
            <div class="img_wrap van-hairline--surround">
              <img :src="details.gameIcon" alt="" />
            </div>
            <div class="info_wrap">
              <span class="name">砸金蛋</span>
              <span class="price">￥500</span>
            </div>
          </div>
          <div class="detail_right">
            <span class="days">使用天数</span>
            <van-stepper
              v-model="amount"
              theme="round"
              button-size="22"
              disable-input
            />
          </div>
        </div>

        <div class="btn_wrap">
          <van-button class="btn" @click="handleBtn" type="info" block>{{
            type === "cart" ? "加入购物车" : "立即购买"
          }}</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import api from "@/api";
import { LgetItem, LsetItem } from "@/utils/storage";
export default {
  data() {
    return {
      details: {},
      show: false,
      amount: 1,
      //加购物车or立即购买
      type: "",
      activityId: LgetItem("currentOptionId"),
      totalItemAmount: 0, //购物车数量
    };
  },
  created() {
    this.getGameDetail();
    this.getCount();
  },
  methods: {
    getGameDetail() {
      api("Interactive.getGameInfo", {
        activityId: this.activityId,
        gameId: Number(this.$route.query.gameId),
      }).then((res) => {
        console.log(res);
        this.details = res;
      });
    },
    handleAdd(val) {
      this.type = val;
      this.show = true;
    },
    handleBtn() {
      //加入购物车
      const {price,productId,gameId}=this.$route.query
      if (this.type === "cart") {
        api("cart.addItem", {
          activityId: this.activityId,
          amount: this.amount,
          productId: Number(productId),
        }).then((res) => {
          console.log(res);
          this.getCount();
          this.$notify({
            type: "success",
            message: "加入购物车成功",
            duration: 1000,
          });
        });
      }else{
          this.$router.push({
              path:'/interactive/order/submit',
              query:{
                  price,
                  amount:this.amount,
                  gameId,
                 productId:productId 
              }
          })
      }
      this.show = false;
    },
    //获取当前购物车数量
    getCount() {
      api("cart.countCardItemByUserIdAndActivityId", {
        activityId: this.activityId,
      }).then((res) => {
        console.log(res);
        this.totalItemAmount = res.totalItemAmount;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ganmeDetail_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  .product_detail_wrap {
    .tips {
      font-size: 14px;
      height: 42px;
      line-height: 42px;
      background-color: #fbf5dd;
      text-align: center;
      color: $font_6_Color;
    }
    .detail_box {
      display: flex;
      justify-content: space-between;
      padding: 22px 15px;
      .detail_left {
        display: flex;
        .img_wrap {
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 44px;
            height: 44px;
          }
        }
        .info_wrap {
          margin-left: 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .name {
            font-size: 15px;
            color: $baseFontColor;
          }
          .price {
            font-size: 15px;
            color: #f93725;
          }
        }
      }
      .detail_right {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        .days {
          font-size: 15px;
          color: $baseFontColor;
        }
        ::v-deep.van-stepper__minus {
          border-color: $themeColor;
        }
        ::v-deep.van-stepper__plus {
          background-color: $themeColor;
        }
      }
    }
    .btn_wrap{
       margin: 12px 32px 0 32px; 
       .btn{
           border-radius: 22px;
           font-size: 16px;
       }
    }
  }
}
</style>