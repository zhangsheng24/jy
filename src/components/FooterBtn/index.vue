<template>
    <div class="order">
      <van-button type="info" :disabled='disabled' @click="handleBtn" class="orderBtn" block>{{text}}</van-button>
    </div>
</template>
<script>
export default {
    props:{
        text:{
            type:String,
            default:''
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        handleBtn(){
            this.$emit('handleBtn')
        }
    }
}
</script>
<style lang="scss" scoped>
.order {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: #fff;
    z-index: 99;
    border-top: 1px solid #f1f1f1;
    padding-top: 8px;
    font-size: 0;
    padding-bottom: calc(8px + constant(safe-area-inset-bottom));
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
    .orderBtn {
      font-size: 18px;
      background: $themeColor;
      border-color: $themeColor;
      color: #fff;
      display: inline-block;
      width: 335px;
      border-radius: 5px;
      height: 47px;
    }
  }
</style>