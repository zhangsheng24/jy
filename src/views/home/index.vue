<template>
  <div class="home_wrap safe">
    <header class="header_box">
      <div v-if="!option1.length" class="noOptions">暂未创建活动</div>
      <van-dropdown-menu
        v-else
        class="header_left_wrap"
        active-color="#FF9917"
        :overlay="true"
        close-on-click-overlay
        ref="dropdown"
      >
        <van-dropdown-item class="drop_item_wrap">
          <div slot="title">
            <van-tag
              type="primary"
              color="#FF9917"
              style="margin-right: 10px"
              >{{ currentOption.categoryId == 1 ? "互动" : "活动" }}</van-tag
            >
            {{ currentOption.name }}
          </div>
          <div
            class="menu_item van-hairline--bottom"
            @click="onChange(item)"
            v-for="(item, index) in option1"
            :key="index"
          >
            <van-tag
              type="primary"
              :color="item.categoryId == 1 ? '#4171FF' : '#FF9917'"
              style="margin-right: 15px"
              >{{ item.categoryId == 1 ? "互动" : "活动" }}</van-tag
            >{{ item.name }}
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
      <div class="header_right_wrap">
        <div
          v-if="!option1.length"
          @click="handleMeeting('/activity/firstStep')"
          class="meeting_btn btn"
        >
          创建活动
        </div>
        <div
          v-if="!option1.length"
          @click="handleMeeting('/interactive/index')"
          class="custom_btn btn"
        >
          创建互动
        </div>
        <div
          v-if="currentOption.state === 1"
          class="custom_btn btn changeActive"
          @click="handlepublish"
        >
          {{
            currentOption.published
              ? "取消发布"
              : currentOption.categoryId === 0
              ? "发布活动"
              : "发布互动"
          }}
        </div>
        <div v-if="currentOption.state === 2" class="custom_btn btn active">
          进行中
        </div>
        <div
          v-if="currentOption.state === 3"
          class="custom_btn btn changeActive"
        >
          已结束
        </div>
      </div>
    </header>
    <section class="section_bgImg_box">
      <div class="bgImg">
        <img class="image" src="../../assets/images/home/banner.png" alt="" />
      </div>
      <van-notice-bar
        background="#fff"
        color="#666666"
        :left-icon="require('../../assets/images/home/icon_1.png')"
        :scrollable="false"
      >
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="2000"
          :show-indicators="false"
        >
          <van-swipe-item
            >2021年春节大放送，消息墙功能免费使用。</van-swipe-item
          >
          <van-swipe-item>内容 2</van-swipe-item>
          <van-swipe-item>内容 3</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </section>
    <db :activityInfo="activityInfo" :categoryId="currentOption.categoryId" />
    <section class="section_navList_box">
      <nav-box
        v-if="option1"
        @handleRouter="handleRouter"
        :currentOption="currentOption"
        :categoryId="currentOption.categoryId"
        :gamesList="gamesList"
      />
    </section>
    <!-- 分享卡 -->
    <sharePanel
      :dataInfo="currentOption"
      :showIcon="false"
      v-if="currentOption.show"
      @close="closePanel"
    ></sharePanel>
    <van-dialog
      v-model="interactiveShow"
      :show-confirm-button="false"
      :show-cancel-button="false"
    >
      <div class="interactive_box">
        <div class="title">确认发布</div>
        <div class="content">
          <div class="name">互动名称：2020年公司年会活动</div>
          <div class="time">时间：2021/01/18 08:30-2021/01/20 17:30</div>
        </div>
        <div class="game_box">
          <div class="gameTitle">配置游戏</div>
          <div class="gameList">
            <div class="item">
              <div class="item_image">
                <img
                  src="../../assets/images/home/icon_renyuanguanli.png"
                  alt=""
                />
              </div>
              <div class="item_detail">
                <div class="item_name">
                  <span>砸金蛋</span>
                  <span>1</span>
                </div>
                <div class="item_time">
                  <span>有效期：</span>
                  <span class="time">2021/01/19 08:30- 2021/01/20 17:30</span>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item_image">
                <img
                  src="../../assets/images/home/icon_renyuanguanli.png"
                  alt=""
                />
              </div>
              <div class="item_detail">
                <div class="item_name">
                  <span>砸金蛋</span>
                  <span>1</span>
                </div>
                <div class="item_time">
                  <span>有效期：</span>
                  <span class="time">2021/01/19 08:30- 2021/01/20 17:30</span>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item_image">
                <img
                  src="../../assets/images/home/icon_renyuanguanli.png"
                  alt=""
                />
              </div>
              <div class="item_detail">
                <div class="item_name">
                  <span>砸金蛋</span>
                  <span>1</span>
                </div>
                <div class="item_time">
                  <span>有效期：</span>
                  <span class="time">2021/01/19 08:30- 2021/01/20 17:30</span>
                </div>
              </div>
            </div>
            <div class="item">
              <div class="item_image">
                <img
                  src="../../assets/images/home/icon_renyuanguanli.png"
                  alt=""
                />
              </div>
              <div class="item_detail">
                <div class="item_name">
                  <span>砸金蛋</span>
                  <span>1</span>
                </div>
                <div class="item_time">
                  <span>有效期：</span>
                  <span class="time">2021/01/19 08:30- 2021/01/20 17:30</span>
                </div>
              </div>
            </div>
          </div>
          <div class="btn_box">
            <div class="cancel btn" @click="interactiveShow = false">取消</div>
            <div class="publish btn">确认发布</div>
          </div>
        </div>
      </div>
    </van-dialog>
    <van-dialog
      v-model="tipsShow"
      :show-confirm-button="false"
      :show-cancel-button="false"
    >
      <div class="tipsShow_box">
        <div class="header_wrap">
          <span
            >当前互动未发布，互动需要发布之后才可以生效。请确定完成一下步骤之后点击“发布互动”按钮进行发布哦。</span
          >
        </div>
        <div class="itemList">
          <div class="item">
            <van-icon name="checked" size="20px" color="#3579FE" />
            <span>互动基本信息</span>
          </div>
          <div class="item">
            <van-icon name="checked" size="20px" color="#3579FE" />
            <span>添加游戏</span>
          </div>
          <div class="item">
            <van-icon name="checked" size="20px" color="#3579FE" />
            <span>游戏设置</span>
          </div>
        </div>
        <div class="btn_box">
          <div class="cancel btn" @click="noTips">不再提示</div>
          <span>|</span>
          <div class="publish btn" @click="handlepublish">确认发布</div>
        </div>
      </div>
    </van-dialog>
    <van-dialog
      v-model="tipsShowPanel"
      :show-confirm-button="false"
      :show-cancel-button="false"
    >
      <div class="interactive_box">
        <div class="game_box"> 
          <div style="text-align:center;padding-top:20px">
            <span>发布互动之后才可以分享海报哦</span>
          </div>
          <div class="btn_box">
            <div class="cancel btn" @click="tipsShowPanel = false">取消</div>
            <div class="publish btn" @click="handlepublish">确认发布</div>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>
<script>
import navBox from "./component/navBox.vue";
import api from "@/api";
import { LgetItem, LsetItem } from "@/utils/storage";
import db from "./component/db";
import sharePanel from "@/components/showPanel";
import { mapGetters } from "vuex";
export default {
  components: {
    navBox,
    db,
    sharePanel
  },
  data() {
    return {
      value1: 0,
      actions: [{ text: "选项一" }, { text: "选项二" }, { text: "选项三" }],
      option1: [], //活动,互动列表
      currentOption: {},
      offset: [10, 20],
      meetForm: {
        publishStatus: 0, // 0 全部, 1 已发布, 2 未发布
        state: 0, //0 全部， 1 未开始， 2 进行中， 3 已结束， 4 未结束
        page: 1,
        pageSize: 100,
      },
      activityInfo: {},
      currentOptionId: LgetItem("currentOptionId") || 0,
      gamesList: [],
      interactiveShow: false,
      tipsShow: false,
      tipsShowPanel:false
    };
  },
  computed: {
    ...mapGetters(["isTips"]),
  },
  created() {
    this.getActivityList();
  },
  methods: {
    handleGoTo(link) {
      this.$router.push({
        path: link,
      });
    },
    handleMeeting(link) {
      this.$refs.dropdown.toggleItem();
      if (link) {
        this.$router.push({
          path: link,
        });
      } else {
        this.$notify({
          type: "success",
          message: "敬请期待",
          duration: 1000,
        });
      }
    },
    //获取活动列表
    getActivityList() {
      api("my.getActivityList", this.meetForm).then((res) => {
        const current = res.list.findIndex(
          (ele) => ele.id === this.currentOptionId
        );
        if (current !== -1) {
          this.currentOption = res.list[current];
        } else {
          this.currentOption = res.list[0];
        }
        //保存互动/活动的id
        LsetItem("currentOptionId", this.currentOption.id);
        // 保存活动的类型（活动还是互动）
        LsetItem("categoryId", this.currentOption.categoryId);
        this.currentOptionId = this.currentOption.id;
        this.option1 = res.list;
        this.getActivitySummary(this.currentOption.id);
        this.getGameList();
        this.judgeInteractive()
      });
    },
    // 获取活动统计
    getActivitySummary(id) {
      api("my.getActivitySummary", { activityId: id }).then((res) => {
        this.activityInfo = res;
      });
    },
    // 活动切换
    onChange(val) {
      console.log(val);
      this.currentOption = val;
      console.log(this.currentOption);
      this.currentOptionId = val.id;
      LsetItem("currentOptionId", val.id);
      LsetItem("categoryId", val.categoryId);
      this.getActivitySummary(val.id);
      this.$refs.dropdown.toggleItem();
    },
    handleActivities() {
      // 创建活动
      if (!this.option1.length) {
        console.log(111);
      }
    },
    //发布/取消活动
    handlepublish() {
      //判断是互动还是活动
      if (this.currentOption.categoryId === 0) {
        //活动
        if (this.currentOption.published) {
          api("activities.cancelPublish", {
            activityId: this.currentOption.id,
          }).then((res) => {
            this.$notify({
              type: "success",
              message: "已取消",
              duration: 1000,
              onClose: () => {
                this.currentOption.published = false;
              },
            });
          });
        } else {
          this.$router.push({
            path: "/activity/preview",
            query: {
              id: this.currentOption.id,
            },
          });
        }
      } else {
        //互动
        console.log(this.currentOption);
        this.tipsShow = false
        this.interactiveShow = true;
      }
    },
    handleRouter(obj) {
      if (this.currentOptionId !== 0) {
        if (obj.title == "分享海报") {
          if(this.currentOption.categoryId == 1 && !this.currentOption.published){
            // 互动且未发布
            this.tipsShowPanel = true
            return false;
          } else {
            this.currentOption.show = true;
            this.$forceUpdate();
            return false;
          }
        }
        if (obj.url) {
          this.$router.push({
            path: obj.url,
            query: {
              id: this.currentOptionId,
            },
          });
        } else {
          this.$notify({
            type: "primary",
            message: "敬请期待",
            duration: 1000,
          });
        }
      } else {
        this.$notify({
          type: "danger",
          message: "请先创建活动",
          duration: 1000,
        });
      }
    },
    closePanel(val) {
      this.currentOption.show = false;
      this.$forceUpdate();
    },
    //获取我的游戏列表
    getGameList() {
      // api('Interactive.getBoughtFeatures',{
      //   activityId:this.currentOption.id,
      //   type:0
      // }).then(res=>{
      //   console.log(res)
      // })
      this.gamesList = [
        {
          name: "数钱",
          isConfig: false,
          url: "/interactive/setting/moneyAndBull/index",
          img: require("@/assets/images/home/icon_jzajindan.png"),
        },
        {
          name: "数钱1",
          isConfig: true,
          url: "",
          img: require("@/assets/images/home/icon_jzajindan.png"),
        },
      ];
    },
    // 互动未发布弹框提示
    judgeInteractive(){
      if(this.currentOption.categoryId == 1 && !this.currentOption.published){
        // 互动且未发布且允许提示
        if(this.isTips){
          // 弹框
          this.tipsShow = true
        }
      }
    },
    // 不再提示
    noTips(){
      this.$store.commit('user/SET_isTips', false)
      this.tipsShow = false
    }
  },
};
</script>
<style lang="scss" scoped>
.home_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  position: relative;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .header_box {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    align-items: center;
    z-index: 999;
    height: 45px;
    padding: 0 7px 0 15px;
    ::v-deep.van-dropdown-item__content {
      max-height: 60%;
      .addBtnBox {
        display: flex;
        padding: 10px 0;
        .btn {
          font-size: 14px;
          width: 82px;
          height: 29px;
          line-height: 29px;
          border-radius: 18px;
          text-align: center;
          margin-left: 16px;
        }
        .meeting-btn {
          color: $themeColor01;
          border: 1px solid $themeColor01;
        }
        .custom-btn {
          color: $themeColor;
          border: 1px solid $themeColor;
        }
      }
    }
    .noOptions {
      font-size: 15px;
      color: $font_0_Color;
    }
    .header_left_wrap {
      max-width: 250px;
      height: 100%;
      .menu_item {
        font-size: 14px;
        padding: 10px 16px;
        line-height: 24px;
      }
      .add_item {
        font-size: 14px;
        padding: 10px 16px;
        line-height: 24px;
        color: blue;
      }
      ::v-deep.van-dropdown-menu__bar {
        box-shadow: none;
        height: 100%;
        .van-dropdown-menu__item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
    .header_right_wrap {
      // width: 94px;
      // background-color: #ff9917;
      // color: #fff;
      // font-size: 15px;
      // height: 30px;
      // display: flex;
      // justify-content: center;
      // align-items: center;
      // border-radius: 18px;
      display: flex;
      .btn {
        font-size: 15px;
        padding: 6px 10px;
        border-radius: 19px;
      }
      .meeting_btn {
        border: 1px solid $themeColor01;
        color: $themeColor01;
        margin-right: 10px;
      }
      .custom_btn {
        border: 1px solid $themeColor;
        color: $themeColor;
      }
      .changeActive {
        background: $themeColor;
        color: #fff;
        border: none;
      }
      .active {
        background: $themeColor01;
        color: #fff;
        border: none;
      }
    }
  }
  .section_bgImg_box {
    padding-top: 45px;
    .bgImg {
      font-size: 0;
      .image {
        width: 100%;
        height: auto;
      }
    }
    ::v-deep.van-notice-bar {
      height: 45px;
      .van-notice-bar__left-icon {
        font-size: 25px;
      }
    }
    .notice-swipe {
      height: 45px;
      line-height: 45px;
      margin-left: 9px;
      font-size: 14px;
    }
  }

  .section_navList_box {
    margin-top: 10px;
    padding: 0 10px;
  }
}
.activeChoose {
  padding: 20px 0;
  display: flex;
  width: 170px;
  justify-content: space-around;
  .create-item {
    position: relative;
    img {
      width: 45px;
      height: 45px;
    }
    .item {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      font-size: 12px;
      text-align: center;
      line-height: 45px;
      &.meeting {
        color: $themeColor01;
      }
      &.custom {
        color: $themeColor;
      }
    }
  }
}
.interactive_box {
  .title {
    font-size: 17px;
    color: $baseFontColor;
    text-align: center;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    box-shadow: 0 1px 2px 0 rgba(158, 171, 181, 0.2);
  }
  .content {
    padding: 0 15px;
    margin-top: 18px;
    .name {
      font-size: 14px;
      color: $baseFontColor;
      line-height: 25px;
    }
    .time {
      font-size: 14px;
      color: $baseFontColor;
      line-height: 25px;
    }
  }
  .game_box {
    padding: 0 15px;
    margin-top: 10px;
    .gameTitle {
      font-size: 15px;
      color: $baseFontColor;
      font-weight: bold;
      padding-bottom: 15px;
    }
    .gameList {
      box-sizing: border-box;
      height: 198px;
      overflow-y: auto;

      .item {
        margin-bottom: 12px;
        display: flex;
        background-color: #efeff4;
        padding: 0 8px;
        height: 87px;
        align-items: center;
        justify-content: space-between;
        .item_image {
          flex: 0 0 60px;
          height: 60px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0;
          img {
            width: 44px;
            height: 44px;
            vertical-align: middle;
          }
        }
        .item_detail {
          padding-left: 15px;
          font-size: 15px;
          .item_name {
            color: $baseFontColor;
            display: flex;
            justify-content: space-between;
          }
          .item_time {
            margin-top: 15px;
            color: $font_6_Color;
            display: flex;
            justify-content: space-between;
            .time {
              flex: 1;
            }
          }
        }
      }
    }
    .btn_box {
      margin: 35px 0 18px 0;
      display: flex;
      justify-content: space-between;
      .btn {
        width: 130px;
        height: 44px;
        border-radius: 22px;
        text-align: center;
        line-height: 44px;
      }
      .cancel {
        background: #eaf0ff;
        color: $themeColor;
      }
      .publish {
        background: #4171ff;
        color: #fff;
      }
    }
  }
}
.tipsShow_box{
  .header_wrap{
    background-color: #FBF5DD;
    padding: 19px 25px;
    font-size: 14px;
    line-height: 22px;
  }
  .itemList{
    padding-left: 90px;
    .item{
      margin-top: 20px;
      font-size: 14px;
      display: flex;
      align-items: center;
      span{
        margin-left: 10px;
      }
    }

  }
  .btn_box{
    margin-top: 20px;
    display: flex;
    height: 54px;
    background: #F5F6FA;
    align-items: center;
    .btn{
      flex:1;
      text-align: center;
      font-size: 15px;
    }
    span{
      color: #D1D3DD;
      font-size: 15px;
    }
    .cancel{
      color: $font_6_Color;
    }
    .publish{
      color: $themeColor;
    }
  }

}
</style>