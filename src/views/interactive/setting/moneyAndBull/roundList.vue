<template>
  <div class="roundList_wrap safe">
    <h3 class="title_wrap">游戏名称</h3>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="发奖名次(第1名-第3名)" value='奖品：iphone12' name="1">
          <div class="content">
              <div class="img_box">
                  <img src="../../../../assets/images/icon_xiazai.png" alt="">
                  <span>奖品：iphone12</span>
              </div>
              <div class="tips">说明：请找行政拉取</div>
          </div>
      </van-collapse-item>
          <van-collapse-item title="发奖名次(第1名-第3名)" value='奖品：iphone12' name="2">
          <div class="content">
              <p class="item_box">
                  <span>金额</span>
                  <span>100</span>
              </p>
              <p class="item_box">
                  <span>金额</span>
                  <span>100</span>
              </p>
          </div>
      </van-collapse-item>
    </van-collapse>
    <div class="add" @click="handleAdd">
      <span>+添加轮次</span>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            activeNames:[]
        }
    },
    methods:{
        handleAdd(){
            this.$router.push({
                path:'/interactive/setting/moneyAndBull/addPrize'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.roundList_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  ::v-deep .van-collapse-item:not(:first-child){
      margin-top: 15px;
  }
  .add {
    color: #4070ff;
    font-size: 16px;
    margin-top: 15px;
    background-color: #fff;
    line-height: 40px;
    text-align: center;
  }
  .content{
      .item_box{
          font-size: 15px;
          color: $baseFontColor;
          display: flex;
          justify-content: space-between;
      }
      .img_box{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0;
          img{
              width: 180px;
              height: 180px;
          }
          span{
              margin-top: 10px;
              font-size: 15px;
              color: $baseFontColor;
          }
      }
      .tips{
          font-size: 15px;
          color: $baseFontColor;
      }
  }
}
</style>