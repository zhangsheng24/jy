/** 
* 活动预览
*/
<template>
  <div class="preview">
    <div style="height:calc(100vh - 50px);overflow-y:auto">
      <van-image
        width="100%"
        height="200"
        fit="cover"
        :src="dataInfo.activeCover"
      />
      <div class="preview-info">
        <div class="v-flex">
          <div class="preview-info-title v-flex-1">
            <div>
              <span v-show="dataInfo.published">【{{ dataInfo.state | filterState }}】</span>
              <span v-show="!dataInfo.published">【未发布】</span>
              {{ dataInfo.name }}</div>
            <div class="preview-info-title-sub">
              <span>浏览{{ activityInfo.uvCount }}</span>
              <span>已报名{{ activityInfo.attenderCount }}</span>
            </div>
          </div>
          <!-- <van-icon name="share-o" @click="share"/> -->
        </div>
      </div>
      <van-cell-group>
        <van-cell
          icon="clock-o"
        >
          <template #title>
            <span class="custom-title">{{dataInfo.beginDate | formatDate('YYYY/MM/DD')}}-{{ dataInfo.beginDate | formatDate('YYYY/MM/DD')}}</span>
          </template>
        </van-cell>
        <van-cell icon="location-o">
          <template #title>
            <span class="custom-title">{{dataInfo.city}}{{dataInfo.area}}{{dataInfo.address}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="preview-panel" v-if="dataInfo.intro">
        <div class="preview-panel-title">活动详情</div>
        <div class="preview-panel-content">{{dataInfo.intro}}</div>
      </div>
      <div class="preview-panel" v-if="organizers.length > 0">
        <div class="preview-panel-title">活动组织</div>
        <div class="preview-panel-content" v-for="(item,index) in organizers" :key="index">
          <div class="v-flex v-col-top">
            <div class="organizers-title">{{item.name}}</div>
            <div class="organizers-item" v-for="(ele,idx) in item.list" :key="idx">
              <div class=" v-flex-1">{{ele.name}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="preview-panel" v-if="dataInfo.service">
        <div class="preview-panel-title">联系我们</div>
        <div class="preview-panel-content">
          <div class="preview-panel-content" v-for="(item,index) in dataInfo.service" :key="index">
            <div class="v-flex v-col-top">
              <div class="organizers-title">{{item.contactValue}}</div>
              <div class=" v-flex-1">{{item.contactTextValue}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-btn">
      <div class="v-flex" v-if="!dataInfo.published">
        <div class="preview-btn-management" @click="goHome">活动管理</div>
        <div class="v-flex-1 preview-btn-publish" @click="publish">发布活动</div>
      </div>
      <div class="v-flex" v-else>
        <div class="preview-btn-management">我要报名</div>
        <div class="v-flex-1 preview-btn-publish">我的门票</div>
      </div>
    </div>
    <!-- 分享卡 -->
    <sharePanel :dataInfo="dataInfo" :showIcon="true" v-if="dataInfo.show" @close="closePanel"></sharePanel>
  </div>
</template>

<script>
import api from '@/api'
import sharePanel from '@/components/showPanel'
export default {
  components:{
    sharePanel
  },
  data() {
    return {
      dataInfo: {},
      activityInfo:{},
      unitInfo:[],
      show:false,
      organizers:[]
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
  mounted(){
    if(this.$route.query.id){
      this.getInfo(this.$route.query.id)
      this.getActivitySummary(this.$route.query.id)
    }
  },
  methods:{
    // 获取活动基本信息
    getInfo(id){
      api("activities.getActivityOrganizationInfo", {
        id: id,
      }).then((res) => {
        console.log(res)
        this.dataInfo = res.activity;
        this.dataInfo.service = this.dataInfo.service ? JSON.parse(res.activity.service) : ''
        this.dataInfo.show = false
        let list = JSON.parse(JSON.stringify(res.organizations))
        const formatList = []
        list.map((item) => {
          const obj = {
            name: item.category,
            list: [item]
          }
          const itemObj = formatList.find((value) => { return value && value.name == item.category });
          if (itemObj) {
            itemObj.list.push(item)
          } else {
            formatList.push(obj)
          }
          this.organizers = formatList
          console.log(this.organizers)
        })
      })
    },
    // 获取活动统计
    getActivitySummary(id) {
      api("my.getActivitySummary", { activityId: id }).then((res) => {
        this.activityInfo = res;
      });
    },
    share(){
      let data = JSON.parse(JSON.stringify(this.dataInfo))
      data.show = true
      this.dataInfo = data
      console.log(this.dataInfo.show)
    },
    goHome(){
      this.$router.push({
        path:'/home'
      })
    },
    // 发布活动
    publish(){
      api("activities.publish", {
          activityId: this.$route.query.id,
        }).then((res) => {
          this.dataInfo.show = true
          this.$forceUpdate()
        });
    },
    closePanel(){
      // this.dataInfo.show = false
      // this.$forceUpdate()
      // this.getInfo(this.$route.query.id)
      this.$router.replace('/home')
    }
  }
};
</script>

<style lang="scss" scoped>
.preview {
  background: $bgColor;
  height: 100vh;
  &-info {
    padding: 10px;
    color: $baseFontColor;
    &-title {
      font-size: 16px;
      font-weight: bold;
      // border-right: 1px solid #999;
      color: $baseFontColor;
      &-sub {
        font-weight: normal;
        font-size: 14px;
        margin-top: 15px;
        span {
          padding-right: 10px;
          margin-right: 10px;
          border-right: 1px solid #999;
          &:last-child {
            border-right: none;
          }
        }
      }
    }
    .van-icon {
      padding-left: 10px;
    }
  }
  .van-progress {
    margin-top: 15px;
  }
  &-panel {
    background: $colorWhite;
    padding: 20px;
    margin: 10px 0;
    &-title {
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: $baseFontColor;
    }
    &-content{
      font-size: 14px;
      padding: 10px 20px 0;
      .organizers-title{
        padding-right: 15px;
      }
    }
  }
  &-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    border-top: 1px solid #f1f1f1;
    font-size: 0;
    &-management {
      color: $themeColor;
      background: $bgColor;
      font-size: 16px;
      padding: 0 20px;
      height: 50px;
      line-height: 50px;
    }
    &-publish {
      color: $colorWhite;
      font-size: 16px;
      text-align: center;
      background: $themeColor;
      height: 50px;
      line-height: 50px;
    }
  }
}
</style>