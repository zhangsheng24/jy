<template>
  <section class="section_num_box">
    <div
      class="num_wrap v-flex v-row-between"
      :class="{ activityClass: categoryId === 0 }"
    >
      <div
        class="item v-flex-1 v-col-center v-flex"
        v-for="(item, index) in list"
        :key="index"
      >
        <template v-if="categoryId === 0">
          <div class="top v-flex">
            <img class="img" :src="item.img" alt="" />
            <div class="num v-flex v-row-center v-col-center">
              <count-to
                :start-val="0"
                :end-val="item.val"
                :duration="2000"
                class="card-panel-num look"
              />
            </div>
          </div>
          <div class="text">{{ item.title }}</div>
        </template>
        <template v-else>
          <div
            class="box v-flex"
            :style="{ backgroundImage: 'url(' + item.bgImg + ')' }"
          >
            <div class="img_box">
              <img class="img" :src="item.img" alt="" />
            </div>
            <div class="num_box">
              <count-to
                :start-val="0"
                :end-val="item.val"
                :duration="2000"
                class="card-panel-num"
              />
              <span class="name">{{ item.title }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
import CountTo from "vue-count-to";
import { LgetItem, LsetItem } from "@/utils/storage";
export default {
  props: {
    activityInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    categoryId: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    activityInfo: function (val) {
      this.info = val;
      if (this.categoryId === 0) {
        this.list = [
          {
            title: "浏览数",
            val: this.info.uvCount,
            img: require("@/assets/images/home/img_1.png"),
          },
          {
            title: "互动人数",
            val: this.info.playerCount,
            img: require("@/assets/images/home/img_2.png"),
          },
          {
            title: "报名人数",
            val: this.info.attenderCount,
            img: require("@/assets/images/home/img_3.png"),
          },
        ];
      } else {
        this.list = [
          {
            title: "互动人数",
            val: this.info.playerCount,
            bgImg: require("@/assets/images/home/img_4.png"),
            img: require("@/assets/images/home/icon_hudongrenshu.png"),
          },
          {
            title: "互动收入",
            val: this.info.incomeCount,
            bgImg: require("@/assets/images/home/img_5.png"),
            img: require("@/assets/images/home/icon_hudongshouru.png"),
          },
        ];
      }
    },
  },
  components: {
    CountTo,
  },
  data() {
    return {
      info: {},
      list: [],
    };
  },
  created() {
    console.log(this.categoryId);
  },
};
</script>
<style lang="scss" scoped>
.section_num_box {
  margin-top: 10px;
  padding: 0 10px;
  .activityClass {
    background-color: #fff;
    padding: 12px 0;
    border-radius: 4px;
  }
  .num_wrap {
    .item {
      flex-direction: column;
      .text {
        font-size: 13px;
        color: #666;
        margin-top: 12px;
      }
      .top {
        position: relative;
        .img {
          width: 80px;
          height: 80px;
        }
        .num {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;

          .card-panel-num {
            font-size: 16px;
            &.look {
              color: #358aff;
            }
            &.active {
              color: #f59d2d;
            }
            &.signUp {
              color: #fa7e27;
            }
          }
        }
      }
      .box {
        width: 172px;
        border-radius: 8px;
        height: 80px;
        display: flex;
        padding: 0 10px;
        box-sizing: border-box;
        .img_box {
          width: 50px;
          height: 50px;
          font-size: 0;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        .num_box {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #fff;
          align-items: center;
          .card-panel-num {
            font-size: 19px;
          }
          .name {
            font-size: 13px;
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>