<template>
  <van-dialog v-model="dataInfo.show" :show-confirm-button="false"  ref="dia">
    <div class="showPanel-publiosh" v-if="showIcon">
      <van-image
        class="showPanel-publiosh-img"
        width="2rem"
        height="2rem"
        fit="cover"
        :src="require('../assets/images/chenggong.png')"
      />
    </div>
    <van-image
        @click.stop="close"
        class="showPanel-close"
        width="25"
        height="25"
        fit="cover"
        :src="require('../assets/images/icon_guanbi.png')"
      />
    <div class="showPanel">
      <div class="showPanel-content">
        <div  v-if="showIcon" class="showPanel-content-title">发布成功</div>
        <div ref="showPanel" style="padding:10px" v-if="!finalImageSrc">
          <van-image
            width="100%"
            height="4rem"
            :src="dataInfo.activeCover"
          />
          <div class="showPanel-info">
            <div class="showPanel-info-title">{{dataInfo.name}}</div>
            <div class="showPanel-info-item">时间：{{dataInfo.beginDate | formatDate('YYYY/MM/DD')}}-{{ dataInfo.endDate | formatDate('YYYY/MM/DD') }}</div>
            <div class="showPanel-info-item" v-if="dataInfo.categoryId == 0">地点：{{dataInfo.city}}{{dataInfo.province}}{{dataInfo.address}}</div>
            <van-image
              width="4rem"
              height="4rem"
              fit="cover"
              :src="qrCode"
            />
          </div>
          <div class="showPanel-tips v-flex v-row-center">
            <span class="showPanel-tips-span"></span><span>长按或扫码报名</span>
          </div>
        </div>
        <van-image
          class="shareImg"
          v-if="finalImageSrc"
          radius="10"
          width="100%"
          fit="cover"
          :src="finalImageSrc"
        />
        <div class="showPanel-btn v-flex v-row-center">
          <van-image
            width="20"
            height="20"
            fit="cover"
            :src="require('../assets/images/icon_xiazai.png')"
          />
          <span>长按保存海报分享</span>
        </div>
      </div>
    </div>
    
  </van-dialog>
</template>

<script>
import api from '@/api'
import html2canvas from '@/utils/html2canvas'
export default {
  props: {
    dataInfo: {
      type: Object,
      default: function () {
        return {};
      },
    },
    showIcon:{
      type: Boolean,
      default: function () {
        return true;
      }
    }
  },
  data() {
    return {
      qrCode:'',
      finalImageSrc:''
    };
  },
  mounted(){
    console.log(this.dataInfo.show)
    this.getActivityQrCode()
  },
  methods: {
    // 获取二维码
    getActivityQrCode(){
      api("activities.getActivityQrCode",{activityId:this.dataInfo.id}).then(res => {
        this.qrCode = res.mergeMiniQRCodeData
        this.getCanvens()
      })
    },
    getCanvens(){
      const that = this
      that.finalImageSrc = ''
      setTimeout(() => {
        (window.html2canvas || html2canvas)(that.$refs.showPanel, {
          width: that.$refs.showPanel.offsetWidth,
          height: that.$refs.showPanel.offsetHeight,
          backgroundColor: "#ffffff",
          useCORS: true,
          scale: 2,
          allowTaint: true,  
          taintTest: false
        }).then(function (canvas) {
          var context = canvas.getContext("2d")
          // 【重要】关闭抗锯齿       
          context.mozImageSmoothingEnabled = false     
          context.webkitImageSmoothingEnabled = false       
          context.msImageSmoothingEnabled = false       
          context.imageSmoothingEnabled = false  
          const img = canvas.toDataURL("image/jpeg", 1.0).replace("data:image/jpeg;base64,", "")
          that.finalImageSrc = "data:image/jpeg;base64," + img
          console.log(that.finalImageSrc)
          that.$forceUpdate()
        })
      },500)
    },
    close(){
      this.$emit('close')
    }
  }
};
</script>

<style lang="scss" scoped>
.van-dialog{
  background: transparent;
  margin-top: 20px;
}
.showPanel{
  position: relative;
  margin-top: 40px;
  &-close{
    position: absolute;
    top: 5px;
    right: 15px;
  }
  &-btn{
    padding: 10px;
    border-top: 1px solid #DEDEDE;
    font-size: 14px;
    color: $font_6_Color;
    margin-top: 10px;
    span{
      margin-left: 20px;
    }
  }
  &-content{
    background: $colorWhite;
    border-radius: 10px;
    &-title{
      font-size: 20px;
      text-align: center;
      color: #022E8D;
      padding-top: 35px;
      padding-bottom: 10px;
    }
  }
  &-publiosh{
    text-align: center;
    position: absolute;
    top: 0px;
    z-index: 999;
    left: 50%;
    transform: translateX(-50%);
  }
  &-info{
    text-align: center;
    margin-top: 20px;
    &-title{
      font-size: 16px;
      color:$baseFontColor;
      font-weight: bold;
      margin-bottom: 10px;
    }
    &-item{
      margin-bottom: 10px;
      font-size: 14px;
      color: #2A2A2A;
    }
  }
  &-tips{
    text-align: center;
    font-size: 14px;
    color: $font_6_Color;
    &-span{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #5084FF ;
      margin-right: 10px;
    }
  }
}
.shareImg{
  border-radius: 10px;
  z-index:999
}
</style>