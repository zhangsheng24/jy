<template>
  <div>
    <van-tabbar
      class="tabbar"
      v-model="activeIndex"
      v-if="isTabUrl"
      active-color="#000"
      inactive-color="#7F8389"
    >
      <van-tabbar-item
        v-for="(item, index) in navs"
        :key="index"
        @click="navClick(index)"
      >
        <template #icon v-if="item.link !== '/activity'">
          <img
            class="icon"
            :src="
              index === activeIndex && createIndex !== 1
                ? item.activeUrl
                : item.baseUrl
            "
          />
        </template>
        <div class="item" v-if="item.link === '/activity'">
          <van-popover
            v-model="showPopover"
            trigger="click"
            theme="light"
            placement="top"
            :offset="offset"
          >
            <div class="activeChoose">
              <div
                class="create-item"
                @click="handleMeeting('/activity/firstStep')"
              >
                <img src="../../assets/images/home/img_2.png" alt="" />
                <div class="item meeting">活动</div>
              </div>
              <div class="create-item" @click="handleMeeting('/interactive/index')">
                <img src="../../assets/images/home/img_1.png" alt="" />
                <div class="item custom">互动</div>
              </div>
            </div>
            <template #reference>
              <div class="creat_wrap">
                <img
                  class="create_icon"
                  :src="index === createIndex ? item.activeUrl : item.baseUrl"
                />
                <span type="primary">{{ item.title }}</span>
              </div>
            </template>
          </van-popover>
        </div>
        <div class="item" v-else>
          <span type="primary">{{ item.title }}</span>
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPopover: false,
      offset: [0, 10],
      //记录是都点击创建活动
      createIndex: 0,
      navs: [
        {
          title: "首页",
          link: "/home",
          baseUrl: require("@/assets/images/tabIcons/icon_home_1.png"),
          activeUrl: require("@/assets/images/tabIcons/icon_home_2.png"),
        },
        {
          title: "创建活动",
          link: "/activity",
          baseUrl: require("@/assets/images/tabIcons/icon_chuangjian_1.png"),
          activeUrl: require("@/assets/images/tabIcons/icon_chuangjian_2.png"),
        },
        {
          title: "我的",
          link: "/my",
          baseUrl: require("@/assets/images/tabIcons/icon_my_1.png"),
          activeUrl: require("@/assets/images/tabIcons/icon_my_2.png"),
        },
      ],
      linkArr: ["/home", "/activity", "/my"],
    };
  },
  computed: {
    isTabUrl() {
      return this.linkArr.indexOf(this.$route.path) !== -1;
    },
    activeIndex: {
      get() {
        return this.linkArr.findIndex((s) => s === this.$route.path);
      },
      set(val) {
        return val;
      },
    },
  },
  methods: {
    navClick(index) {
      this.activeIndex = index;
      this.createIndex = index;
      if (this.navs[index].link !== "/activity") {
        this.$router.push(this.navs[index].link);
      }
    },
    handleMeeting(link) {
      this.showPopover = false;
      this.$router.push({
        path: link,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/commons/css/mixin.scss";

.tabbar {
  @include border-1px(rgba(0, 0, 0, 0.1), top, 0, solid);
  ::v-deep .van-tabbar-item {
    .van-tabbar-item__icon {
      margin-bottom: 3px;
      .icon {
        height: 27px;
        width: 27px;
      }
    }
    .van-tabbar-item__text {
      font-size: 10px;
      letter-spacing: 0.15px;
      line-height: 14px;
      color: #333;
    }
  }
}

.creat_wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  .create_icon {
    width: 27px;
    height: 27px;
    margin-bottom: 3px;
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
</style>