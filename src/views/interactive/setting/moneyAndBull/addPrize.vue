<template>
  <div class="addPrize_wrap safe">
    <h3 class="title_wrap">发奖名次(第x名-第x名)</h3>
    <div class="round_wrap">
      <div class="round_item">
        <van-field v-model="value" placeholder="请输入数字" />
      </div>
      <div class="line">-</div>
      <div class="round_item">
        <van-field v-model="value" placeholder="请输入数字" />
      </div>
    </div>
    <h3 class="title_wrap">奖品类型</h3>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="现金红包" clickable @click="radio = '1'">
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="实物奖励" clickable @click="radio = '2'">
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <template v-if="radio === '1'">
      <h3 class="title_wrap">现金红包将通过微信直接发放</h3>
      <van-cell-group>
        <van-cell
          title="当前红包账户可用金额0元"
          value="点击充值"
          value-class="cell-value-text"
        />
        <van-field
          v-model="value1"
          label="总金额（元）"
          input-align="right"
          placeholder="请输入发放红包总金额"
        />
        <van-field
          label="单个金额"
          readonly
          input-align="right"
          placeholder="根据总金额和发奖范围自动生成"
        />
      </van-cell-group>
      
    </template>
    <template v-else>
      <h3 class="title_wrap">
        <div class="title-round">
          <span>添加奖品</span>
          <span class="copy">奖品库添加</span>
        </div>
      </h3>
      <van-cell-group>
        <van-field
          v-model="value1"
          label="奖品名称"
          input-align="right"
          placeholder="请输入奖品名称"
        />
        <van-cell title="奖品图片">
           <uploader
            :uploadConfig="uploadConfig"
            @doneUpload="handleDoneUpload"
            :previewImage='true'
            @handleDelete='handleDelete'
          />
        </van-cell>
      </van-cell-group>
    </template>
    <h3 class="title_wrap">奖品说明</h3>
      <van-cell-group>
        <van-field
          v-model="message"
          type="textarea"
          autosize
          maxlength="50"
          show-word-limit
          clearable
          placeholder="请输入50字以内的奖品说明"
        />
      </van-cell-group>
    <footer-btn text="确认添加" @handleBtn="handleBtn" />
  </div>
</template>
<script>
import footerBtn from "@/components/FooterBtn";
import uploader from "@/components/Uploader";
import api from "@/api";
export default {
  components: {
    footerBtn,
    uploader
  },
  data() {
    return {
      value: "",
      radio: "2",
      value1: "",
      message: "",
      uploadConfig: {},
      activeCover:''
    };
  },
  created(){
    this.getUpload();
  },
  methods: {
    handleBtn() {
      console.log(this.activeCover)
    },
     getUpload() {
      api("common.upload").then((res) => {
        this.uploadConfig = res;
      });
    },
   handleDoneUpload(list) {
      this.activeCover = list[0].url;
      console.log(this.activeCover)
    },
    //删除已上传的图片
    handleDelete(){
      this.activeCover=''
    }
  },
};
</script>
<style lang="scss" scoped>
.addPrize_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  .title-round {
    display: flex;
    justify-content: space-between;
    .copy {
      color: $themeColor;
    }
  }
  .round_wrap {
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding: 0 15px;
    .round_item {
      flex: 1;
    }
    .line {
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 10px;
    }
  }
}
</style>