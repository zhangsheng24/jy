/**
    牛气冲天/数钱
 */
<template>
  <div class="moneyAndBull_wrap safe">
    <h3 class="title_wrap">游戏名称</h3>
    <van-cell-group :border="false">
      <van-field
        v-model="formData.name"
        label=""
        type="textarea"
        placeholder="请填写游戏名称（0/30）"
        clearable
        autosize
        rows="1"
        maxlength="30"
      />
    </van-cell-group>
    <h3 class="title_wrap">游戏时间</h3>
    <div class="tips">（活动有效期为24小时，结束日期根据购买数量默认生成）</div>
    <van-cell-group>
      <van-cell
        title="开始时间"
        is-link
        size="large"
        :value="
          formData.beginDate
            ? formatDate(formData.beginDate, 'YYYY-MM-DD HH:mm')
            : '请选择开始时间'
        "
        @click="handleShow('start')"
      />
      <van-cell
        title="结束时间"
        is-link
        size="large"
        :value="
          formData.endDate
            ? formatDate(formData.endDate, 'YYYY-MM-DD HH:mm')
            : '请选择结束时间'
        "
        @click="handleShow('end')"
      />
    </van-cell-group>
    <h3 class="title_wrap">游戏时长(秒)</h3>
    <div class="tips">（默认60秒，建议60秒以内）</div>
    <van-cell-group :border="false">
      <van-field
        v-model="formData.seconds"
        placeholder="请填写游戏时长"
        clearable
        size="large"
      />
    </van-cell-group>
    <h3 class="title_wrap">获奖限制</h3>
    <div class="tips">
      （每轮游戏的前X名,接下来的轮次中,不计算排名,不发送奖品）
    </div>
    <van-cell-group :border="false">
      <van-field
        v-model="formData.limit"
        placeholder="请输入限制的名次数"
        clearable
        size="large"
      />
    </van-cell-group>
    <h3 class="title_wrap">
      <div class="title-round">
        <span>轮次设置</span>
        <span class="copy">复制</span>
      </div>
    </h3>
    <van-cell-group :border="false">
      <van-swipe-cell v-for="(i, index) in 2" :key="index">
        <van-cell title="第一轮" value="去设置" is-link @click="handleGoto"></van-cell>
        <template #right>
          <div class="delete-button">删除</div>
        </template>
      </van-swipe-cell>
    </van-cell-group>
    <div class="add">
      <span>+添加轮次</span>
    </div>
    <van-popup v-model="popupShow" position="bottom">
      <date-range-picker
        :minDate="datePicker.minDate"
        :maxDate="datePicker.maxDate"
        @handleConfirm="handleConfirm"
        @handleCancel="handleCancel"
      />
    </van-popup>
    <footer-btn text="确认" @handleBtn="handleBtn" />
  </div>
</template>
<script>
import { formatDate } from "@/filter";
import dateRangePicker from "@/components/DateRangePicker";
import footerBtn from "@/components/FooterBtn";
export default {
  components: {
    dateRangePicker,
    footerBtn,
  },
  data() {
    return {
      formatDate,
      formData: {
        name: "",
        beginDate: 0,
        endDate: 0,
        seconds: 60,
        limit: "",
      },
      datePicker: {
        minDate: null,
        maxDate: null,
      },
      popupShow: false,
      dateType: "",
    };
  },
  created() {},
  methods: {
    handleConfirm(value) {
      console.log(value);
      const time = (new Date(value).getTime() / 1000).toFixed(0);
      if (this.dateType === "start") {
        this.formData.beginDate = time;
      } else {
        this.formData.endDate = time;
      }
      this.popupShow = false;
    },
    handleCancel() {
      this.popupShow = false;
    },
    handleShow(value) {
      this.dateType = value;
      this.datePicker.minDate = new Date(new Date().getTime());
      this.datePicker.maxDate = new Date(
        new Date().getTime() + 5 * 365 * 24 * 60 * 60 * 1000
      );
      this.popupShow = true;
    },
    handleGoto(){
        this.$router.push({
            path:'/interactive/setting/moneyAndBull/roundList'
        })
    },
    handleBtn(){
        console.log(111)
    }
  },
};
</script>
<style lang="scss" scoped>
.moneyAndBull_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  .tips {
    font-size: 12px;
    padding: 0 15px;
    color: $font_9_Color;
    margin-bottom: 10px;
  }
  .title-round {
    display: flex;
    justify-content: space-between;
    .copy {
      color: $themeColor;
    }
  }
  .add {
    color: #4070ff;
    font-size: 16px;
    margin-top: 15px;
    background-color: #fff;
    line-height: 40px;
    text-align: center;
  }
}
.delete-button {
  height: 100%;
  background-color: #ee0a24;
  color: #fff;
  font-size: 15px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>