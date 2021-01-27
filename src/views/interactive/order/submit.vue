<template>
  <div class="submit_wrap">
    <div>购买商户：成都开心科技有限公司</div>
    <h3 class="title_wrap">购买详情</h3>
    <div v-for="(item, index) in gameList" :key="index">
      <span>{{ item.name }}</span>
      <span>-{{ item.price }}</span>
      <span>-{{ item.amount }}</span>
    </div>
    <div>购买金额1500</div>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
import api from "@/api";
import { LgetItem, LsetItem, LreItem } from "@/utils/storage";
import { wx, wxInit } from "@/utils/jssdkInit.js";
export default {
  data() {
    return {
      activityId: LgetItem("currentOptionId"),
      gameList: [],
      payAmount: 0,
    };
  },
  created() {
    const { gameId, price, amount } = this.$route.query;
    if (gameId && price && amount) {
      this.getGameInfo();
    } else {
      this.getCartList();
    }
  },
  methods: {
    //获取游戏信息
    getGameInfo() {
      const { gameId, amount, price, productId } = this.$route.query;
      api("Interactive.getGameInfo", {
        activityId: this.activityId,
        gameId: Number(gameId),
      }).then((res) => {
        console.log(res);
        this.gameList.push({
          amount: 3,
          cover: res.cover,
          name: res.name,
          price:Number(price),
          productId:Number(productId)
        });
      });
    },
    //获取购物车列表
    getCartList() {
      api("cart.listAll", {
        activityId: this.activityId,
      }).then((res) => {
        console.log(res);
      });
    },
    onSubmit() {
      const items = [];
      this.gameList.forEach((item) => {
        this.payAmount += item.amount * item.price;
        items.push({
          amount: item.amount,
          cover: item.cover,
          id: item.productId,
          price: item.price,
        });
      });
      const params = {
        activityId: this.activityId,
        items,
        payAmount: this.payAmount,
        payType: 1,
        paymentScene: "WX_MINI",
      };
      console.log(params);
      this.$nextTick(() => {
        wxInit()
          .then(() => {
            
            wx.miniProgram.postMessage({
              data: {
                params,
              },
            });
            wx.miniProgram.navigateBack({delta: 1})
          })
          .catch((err) => {
            console.log(err);
          });
        //   toast.clear();
      });
    },
  },
};
</script>