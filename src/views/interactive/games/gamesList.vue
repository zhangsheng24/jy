<template>
  <div class="ganmesList_wrap safe">
    <div class="step_box" v-if="$route.query.showStep">
      <div class="step_wrap">
        <div class="step_title_wrap">
          <img src="../../../assets/images/icon_chenggong .png" alt="" />
          <span>互动创建成功</span>
        </div>
        <div class="van-hairline--top"></div>
        <div class="step_tips">接下来您还需要做一下操作才可以完成发布互动</div>
        <div class="step_content">
          <div class="step_item">
            <span class="num">1</span>
            <span class="name">添加游戏</span>
          </div>
          <div class="line"></div>
          <div class="step_item">
            <span class="num">2</span>
            <span class="name">添加游戏</span>
          </div>
          <div class="line"></div>
          <div class="step_item">
            <span class="num">3</span>
            <span class="name">添加游戏</span>
          </div>
        </div>
      </div>
    </div>
    <div class="list_box">
      <div
        v-for="(item, index) in features"
        :key="index"
        @click="handleDetails(item)"
        class="game_item van-hairline--top"
      >
        <div class="item_left">
          <div class="icon_wrap van-hairline--surround">
            <span :class="'iconfont ' + item.icon"></span>
          </div>
          <div class="game_info">
            <span class="name">{{ item.name }}</span>
            <span class="price">￥{{ item.price }}</span>
          </div>
        </div>
        <div
          class="item_right"
          :class="{ active: currentIndex === index && show }"
          @click.stop="shopCart(item, index)"
        >
          <span>+</span>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" round>
      <div class="product_detail_wrap">
        <div class="tips">购买成功，只能连续使用，不能分隔使用</div>
        <div class="detail_box">
          <div class="detail_left">
            <div class="img_wrap van-hairline--surround">
              <span :class="'iconfont ' + currentDetail.icon" />
            </div>
            <div class="info_wrap">
              <span class="name">{{ currentDetail.name }}</span>
              <span class="price">￥{{ currentDetail.price }}</span>
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
          <van-button class="btn" @click="handleBtn" type="info" block
            >加入购物车</van-button
          >
        </div>
      </div>
    </van-popup>
    <div class="cart_icon_wrap" @click="handelGoTo">
      <van-badge :content="totalItemAmount ? totalItemAmount : ''">
        <van-icon color="#fff" size="30px" name="cart-o" />
      </van-badge>
    </div>
  </div>
</template>
</template>
<script>
import api from "@/api";
import { LgetItem, LsetItem, LreItem } from "@/utils/storage";
export default {
  data() {
    return {
      features: [],
      totalItemAmount: 0,
      amount: 1,
      show: false,
      currentDetail: {},
      currentIndex: 0,
      activityId: LgetItem("currentOptionId"),
    };
  },
  created() {
    this.getGameslist();
    // this.getCount();
  },
  methods: {
    //获取当前购物车数量
    getCount() {
      api("cart.countCardItemByUserIdAndActivityId", {
        activityId: this.activityId,
      }).then((res) => {
        console.log(res);
        this.totalItemAmount = res.totalItemAmount;
      });
    },
    getGameslist() {
      api("Interactive.findGameList", {
        pageIndex: 1,
        pageSize: 100,
        search: "",
      }).then((res) => {
        this.features = res.features;
      });
    },
    //跳转至详情
    handleDetails(item) {
      console.log(item, "1");
      this.$router.push({
        path: "/interactive/games/gameDetail",
        query: {
          gameId: item.gameId,
          price: item.price,
          productId: item.id,
        },
      });
    },
    shopCart(item, index) {
      this.currentIndex = index;
      this.currentDetail = item;
      this.show = true;
    },
    handleBtn() {
      //加入购物车
      const data = this.$route.query;
      api("cart.addItem", {
        activityId: Number(data.id),
        amount: this.amount,
        productId: this.currentDetail.id,
      }).then((res) => {
        console.log(res);
        this.getCount();
        this.$notify({
          type: "success",
          message: "加入购物车成功",
          duration: 1000,
        });
      });
      this.show = false;
    },
    handelGoTo() {
      this.$router.push({
        path: "/interactive/cart/index",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.ganmesList_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  .step_box {
    padding-top: 10px;
    ::v-deep.van-hairline--top::after{
            border-style:dashed;
    }
    .step_wrap {
      background-color: #fff;
      box-sizing: border-box;
      padding: 0 15px 15px;
      .step_title_wrap {
        font-size: 17px;
        color: $baseFontColor;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 57px;
        img {
          width: 22px;
          height: 22px;
        }
        span {
          margin-left: 2px;
        }
      }
      .step_tips {
        font-size: 15px;
        color: $font_6_Color;
        text-align: center;
        line-height: 40px;
      }
      .step_content {
        display: flex;
       align-items: center;
        justify-content: center;
        .step_item {
          font-size: 15px;

          .num {
            display: inline-block;
            color: #fff;
            background-color: #acc9ff;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            line-height: 18px;
            text-align: center;
          }
          .name {
            margin-left: 5px;
          }
        }
        .line {
          flex:1;
          height: 1px;
          margin: 0 8px;
          background-color: #acc9ff;
          opacity: 0.3;
        }
      }
    }
  }

  .list_box {
    padding-top: 10px;
    .game_item {
      padding: 0 12px 0 10px;
      background-color: #fff;
      height: 80px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item_left {
        display: flex;
        .icon_wrap {
          width: 60px;
          height: 60px;
          text-align: center;
          line-height: 60px;
          span {
            font-size: 44px;
            color: #f59d2d;
          }
        }
        .game_info {
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
      .item_right {
        width: 76px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        border: 1px solid #b6b6ba;
        span {
          color: #b7b7b7;
          font-size: 30px;
        }
        &.active {
          background-color: $themeColor;
          span {
            color: #fff;
          }
        }
      }
    }
  }
  .cart_icon_wrap {
    width: 50px;
    height: 50px;
    background-color: #3c3f4f;
    border-radius: 50%;
    position: fixed;
    left: 15px;
    bottom: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
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
        span {
          font-size: 44px;
          color: #f59d2d;
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
  .btn_wrap {
    margin: 12px 32px 0 32px;
    .btn {
      border-radius: 22px;
      font-size: 16px;
    }
  }
}
</style>