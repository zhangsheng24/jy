<template>
  <div class="nav_list_wrap">
    <div class="nav_box" v-for="(item, index) in copyNav" :key="index">
      <div class="nav_title">{{ item.title }}</div>
      <div class="nav_content v-flex">
        <div
          v-for="(ele, i) in item.details"
          :key="i"
          class="nav_item v-flex .v-col-center"
          @click="goUrl(ele.url, ele.name)"
        >
          <img class="nav_img" :class="{'config-opacity':categoryId === 1 && index === 1 && !ele.isConfig}" :src="ele.img" alt="" />
          <img v-if="categoryId === 1 && index === 1 && !ele.isConfig" class="noConfig" src="../../../assets/images/home/icon_biaoqian.png" alt="">
          <span>{{ ele.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentOption: {
      type: Object,
      default: function () {
        return {
          published: false,
        };
      },
    },
    categoryId: {
      type: Number,
      default: 0,
    },
    gamesList:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  data() {
    return {
      activityList: [
        {
          title: "会议信息",
          details: [
            {
              name: "基础信息",
              url: "/activity/firstStep",
              img: require("@/assets/images/home/icon_jichuxinxi.png"),
            },
            {
              name: "报名设置",
              url: "/activity/secondStep",
              img: require("@/assets/images/home/icon_menpiaoguanli.png"),
            },
            {
              name: "详细信息",
              url: "/activity/thirdStep",
              img: require("@/assets/images/home/icon_xiangxixinxi.png"),
            },
          ],
        },
        {
          title: "会前",
          details: [
            {
              name: "网站设计",
              url: "",
              img: require("@/assets/images/home/icon_wangzhansheji.png"),
            },
            {
              name: "宣传海报",
              url: "",
              img: require("@/assets/images/home/icon_xuanchuanhaibao.png"),
            },
          ],
        },
        {
          title: "会中",
          details: [
            {
              name: "报名审核",
              url: "",
              img: require("@/assets/images/home/icon_wangzhansheji.png"),
            },
            {
              name: "验票签到",
              url: "",
              img: require("@/assets/images/home/icon_yanpiao.png"),
            },
            {
              name: "接待管理",
              url: "",
              img: require("@/assets/images/home/icon_jiedai.png"),
            },
            {
              name: "现场互动",
              url: "",
              img: require("@/assets/images/home/icon_xianchanghudong.png"),
            },
          ],
        },
        {
          title: "参会管理",
          details: [
            {
              name: "人员管理",
              url: "",
              img: require("@/assets/images/home/icon_renyuanguanli.png"),
            },
            {
              name: "订单管理",
              url: "",
              img: require("@/assets/images/home/icon_dingdanguanli.png"),
            },
          ],
        },
        {
          title: "数据统计",
          details: [
            {
              name: "参会统计",
              url: "",
              img: require("@/assets/images/home/icon_canhuitongji.png"),
            },
            {
              name: "互动统计",
              url: "",
              img: require("@/assets/images/home/icon_hudongtongji.png"),
            },
            {
              name: "流量统计",
              url: "",
              img: require("@/assets/images/home/icon_liuliangtongji.png"),
            },
          ],
        },
      ],
      interactiveList: [
        {
          title: "互动管理",
          details: [
            {
              name: "基础信息",
              url: "/interactive/index",
              img: require("@/assets/images/home/icon_jichuxinxi.png"),
            },
            {
              name: "主题设置",
              url: "",
              img: require("@/assets/images/home/icon_zhutishezhi.png"),
            },
            {
              name: "分享海报",
              url: "",
              img: require("@/assets/images/home/icom_fenxianghaibao.png"),
            },
          ],
        },
        {
          title:'我的游戏',
          details:[
            
          ]
        },
        {
          title:'数据统计',
          details:[
            {
              name:'互动统计',
              url:'',
              img: require("@/assets/images/home/icon_hudongtongji.png")
            },
            {
              name:'流量统计',
              url:'',
              img: require("@/assets/images/home/icon_liuliangtongji.png")
            }
          ]
        }
      ],
      copyNav: [],
      dataInfo: {},
    };
  },
  watch: {
    currentOption: {
      //n为新值,o为旧值;
      handler(n, o) {
        this.copyNav = [];
        if (this.categoryId === 0) {
          this.copyNav = JSON.parse(JSON.stringify(this.activityList));
          if (n.published) {
            this.copyNav[0].details.push({
              name: "分享海报",
              url: "/activity/preview",
              img: require("@/assets/images/home/icon_huodongyulan.png"),
            });
          } else {
            this.copyNav[0].details.push({
              name: "活动预览",
              url: "/activity/preview",
              img: require("@/assets/images/home/icon_huodongyulan.png"),
            });
          }
        } else {
          this.copyNav = JSON.parse(JSON.stringify(this.interactiveList));
          this.copyNav[1].details=[
            ...this.gamesList,
            {
              name:'添加游戏',
              url:'/interactive/games/gamesList',
              isConfig:true,
              img: require("@/assets/images/home/icon_tianjia.png")
            }
          ]
          console.log(this.copyNav)
        }
      },
      deep: true,
    },
  },
  mounted() {
    // this.copyNav = [];
    // this.copyNav = JSON.parse(JSON.stringify(this.navList));
    // if (this.currentOption.published) {
    //   this.copyNav[0].details.push({
    //     name: "分享海报",
    //     url: "/activity/preview",
    //     img: require("@/assets/images/home/icon_huodongyulan.png"),
    //   });
    // } else {
    //   this.copyNav[0].details.push({
    //     name: "活动预览",
    //     url: "/activity/preview",
    //     img: require("@/assets/images/home/icon_huodongyulan.png"),
    //   });
    // }
  },
  methods: {
    goUrl(url, title) {
      this.$emit("handleRouter", { url, title });
    },
    getGames(){

    }
  },
};
</script>
<style lang="scss" scoped>
.nav_list_wrap {
  .nav_box {
    margin-top: 10px;
    padding: 20px 0;
    background-color: #fff;
    border-radius: 4px;
    .nav_title {
      font-size: 15px;
      color: #444a4a;
      margin-left: 10px;
    }
    .nav_content {
      margin-top: 15px;
      .nav_item {
        width: 25%;
        flex-direction: column;
        position: relative;
        .noConfig{
          position: absolute;
          width: 30px;
          height: 11px;
          top: 0;
          right: 10px;
        }

        .nav_img {
          width: 44px;
          height: 44px;
        }
        .config-opacity{
          opacity: 0.2;
        }
        span {
          font-size: 13px;
          color: #666;
          margin-top: 12px;
        }
      }
    }
  }
}
.nav_list_wrap :first-child {
  margin-top: 0;
}
</style>