/** 
* 我的活动
*/
<template>
  <div class="myActivities">
    <van-tabs v-model="active" sticky @click="onClick" line-width="60px">
      <van-tab v-for="(item, index) in tabsList" :key="index" :name="item.name">
        <template #title
          ><span style="padding-right:3px">{{ item.title }}</span
          ><span v-if="item.title != '全部'"
            >{{ list[index].total }}</span
          ></template
        >
        <van-pull-refresh
          v-model="list[index].refreshing"
          @refresh="onRefresh(index)"
        >
          <van-list
            v-model="list[index].loading"
            :finished="list[index].finished"
            finished-text="没有更多了"
            @load="onLoad(index)"
            class="myActivities-wrap"
          >
            <div v-for="(ele, idx) in list[index].items" :key="idx">
              <div class="v-flex v-col-top myActivities-wrap-info">
                <!-- <van-image
                  class="myActivities-wrap-info-img"
                  fit="cover"
                  width="115px"
                  height="80px"
                  radius="5px"
                  :src="ele.activeCover"
                /> -->
                <div :class="`myActivities-wrap-info-tag${ele.categoryId}`">{{ ele.categoryId == 1 ? "互动" : "活动" }}</div>
                <div style="position:relative">
                  <van-image
                    class="myActivities-wrap-info-img"
                    fit="cover"
                    width="115px"
                    height="80px"
                    radius="5px"
                    :src="ele.activeCover"
                  >
                    <template v-slot:error>
                      <van-image
                        class="myActivities-wrap-info-img"
                        fit="cover"
                        width="126px"
                        height="80px"
                        radius="5px"
                        :src="require('../../assets/images/lADPD2sQuNyGrqTMis0BBA_260_138.jpg')"
                      />
                    </template>
                  </van-image>
                  <!-- <van-image
                    v-else
                    class="myActivities-wrap-info-img"
                    fit="cover"
                    width="115px"
                    height="80px"
                    radius="5px"
                    :src="ele.categoryId === 0?require('../../assets/images/lADPD2sQuNyGrqTMis0BBA_260_138.jpg'):require('../../assets/images/lADPD4d8rgKz9vnMis0BBA_260_138.jpg')"
                  /> -->
                  <!-- <van-tag
                    type="primary"
                    :color="ele.categoryId == 1 ? '#4171FF' : '#FF9917'"
                    style="position:absolute;top:0px;right:10px"
                    >{{ ele.categoryId == 1 ? "互动" : "活动" }}
                  </van-tag> -->
                </div>
                <div class="v-flex-1" style="width:calc(100vw - 300px)">
                  <div class="myActivities-wrap-info-title v-flex v-row-left">
                    <div class="v-flex-1 ellipsis" style="line-height:25px">{{ ele.name }}</div>
                    <span :class="`tag${ele.state}`" v-show="ele.published">
                      {{ ele.state | filterState }}
                    </span>
                    <span class="tag4" v-show="!ele.published">
                      未发布
                    </span>
                  </div>
                  <div class="myActivities-wrap-info-item">
                    <van-icon name="clock-o" />{{
                      ele.beginDate | formatDate('YYYY/MM/DD')
                    }}-{{ ele.endDate | formatDate('YYYY/MM/DD') }}
                  </div>
                  <!-- <div class="myActivities-wrap-info-item">
                    <van-icon name="home-o" />{{ companyInfo.name }}
                  </div> -->
                  <div
                    class="myActivities-wrap-info-item v-flex v-row-left"
                    v-if="ele.categoryId != 1"
                  >
                    <div class="v-flex-1 ellipsis" >
                      <van-icon name="location-o" />{{ ele.address }}
                    </div>
                    <!-- <van-button v-show="!ele.published" style="margin-left:10px" color="#4171FF" size="small" @click="publish(ele)">发布活动</van-button> -->
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tabsList: [
        {
          title: "全部",
          name: 4,
          number: 0,
        },
        {
          title: "活动中",
          name: 1,
          number: 1,
        },
        {
          title: "待发布",
          name: 2,
          number: 1,
        },
        {
          title: "已结束",
          name: 3,
          number: 1,
        }
      ],
      active: 4,
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
      meetForm: {
        // pageIndex:1,
        // pageSize:10,
        activityCategory: "GENERAL",
        publishStatus: 0, // 0 全部, 1 已发布, 2 未发布
        state: 0, //0 全部， 1 未开始， 2 进行中， 3 已结束， 4 未结束
      },
    };
  },
  filters: {
    filterState(value) {
      let str = "未知";
      switch (value) {
        case 1:
          str = "未开始";
          break;
        case 2:
          str = "进行中";
          break;
        case 3:
          str = "已结束";
          break;
        default:
          break;
      }
      return str;
    },
  },
  computed: {
    ...mapGetters(["companyInfo"]),
  },
  mounted() {
    this.getSummary();
  },
  methods: {
    getSummary() {
      api("my.getSummary", { categoryId: "GENERAL" }).then((res) => {
        this.list[0].total = res.data.totalCount;
        this.list[1].total = res.data.underwayCount;
        this.list[2].total = res.data.unpublishedCount;
        this.list[3].total = res.data.overCount;
      });
    },
    onLoad(index) {
      console.log(index);
      api("my.getActivityList", this.meetForm).then((res) => {
        if (this.list[index].refreshing) {
          this.list[index].items = [];
          this.list[index].refreshing = false;
        }
        if (res.list) {
          // this.list[index].items = this.list[index].items.concat(res.list).filter(item => {return item.categoryId == 0})
          this.list[index].items = this.list[index].items.concat(res.list);
        }
        if (res.last) {
          this.list[index].finished = true;
        }
      })
    },
    onRefresh(index) {
      this.list[index].finished = false;
      this.list[index].loading = true;
      this.onLoad(index);
    },
    onClick(name) {
      if (name == 1) {
        this.meetForm.state = 2;
        this.meetForm.publishStatus = 0;
      }
      if (name == 2) {
        this.meetForm.state = 0;
        this.meetForm.publishStatus = 2;
      }
      if (name == 3) {
        this.meetForm.state = 3;
        this.meetForm.publishStatus = 0;
      }
      if (name == 4) {
        this.meetForm.state = 0;
        this.meetForm.publishStatus = 0;
      }
    },
    // 发布活动
    publish( item ){
      this.$router.push({
        path:'/activity/preview',
        query:{
          id: item.id
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.myActivities {
  background: $bgColor;
  height: 100vh;
  .van-nav-bar{
    position: absolute;
    top: -25px;
    z-index: 999;
  }
  ::v-deep .van-tab{
    color: $font_6_Color;
  }
  ::v-deep .van-tab--active{
    color: $baseFontColor;
  }
  ::v-deep .van-tabs__line{
    background-color: $themeColor;
  }
  &-wrap {
    margin-top: 10px;
    background: $colorWhite;
    min-height: calc(100vh - 54px);
    &-info {
      border-bottom: 1px solid #f2f2f2;
      padding: 15px;
      &-tag0,&-tag1{
        background-image: linear-gradient(163deg, #6FC3FF 0%, #4D98FF 100%);
        border-radius: 1px 100px 100px 1px;
        color:$colorWhite;
        font-size: 14px;
        padding: 5px;
        position: absolute;
        left: 0;
        z-index: 9;
      }
      &-tag1{
        background-image: linear-gradient(153deg, #FFCE56 0%, #FF960F 100%);
      }
      &-img {
        margin-right: 10px;
      }
      &-title {
        font-size: 16px;
        font-weight: bold;
        color: $baseFontColor;
        margin-bottom: 10px;
        span {
          width: 56px;
          line-height: 19px;
          border-radius: 2px;
          text-align: center;
          margin-left: 10px;
          font-size: 12px;
          display: inline-block;
          &.tag1 {
            color: #387bf6;
            background: #e5ecfb;
            border-radius: 20px;
          }
          &.tag2 {
            color: #42cc8b;
            background: rgba(66, 204, 139, 0.1);
            border-radius: 20px;
          }
          &.tag3 {
            color: #ff5a5a;
            background: rgba(255, 90, 90, 0.1);
            border-radius: 20px;
          }
          &.tag4 {
            color: #f7b500;
            background: rgba(247, 181, 0, 0.1);
            border-radius: 20px;
          }
        }
      }
      &-item {
        font-size: 14px;
        color: $font_6_Color;
        margin-top: 10px;
        .van-icon {
          vertical-align: bottom;
          padding-right: 5px;
        }
      }
    }
  }
}
</style>