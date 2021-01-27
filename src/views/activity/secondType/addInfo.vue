<template>
  <div class="addInfo_wrap">
    <h3 class="title_wrap">名称：</h3>
    <van-field
      v-model="name"
      placeholder="请输入名称(0/6)"
      clearable
      size="large"
      label-class="field-label-text"
    />
    <h3 class="title_wrap">字段格式：</h3>
    <van-field
      readonly
      clickable
      name="picker"
      :value="title"
      right-icon="arrow-down"
      label=""
      label-width="0px"
      placeholder="请选择"
      @click="tradeListShowPicker = true"
    />
    <van-popup v-model="tradeListShowPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="tradeListShowPicker = false"
      />
    </van-popup>
    <footer-btn @handleBtn="handleSave" text="保存" />
  </div>
</template>
<script>
import footerBtn from "@/components/FooterBtn";
import api from "@/api";
import { LgetItem, LsetItem } from "@/utils/storage";
export default {
  components: {
    footerBtn,
  },
  data() {
    return {
      name: "",
      title: "",
      list: [],
      columns: [],
      tradeListShowPicker: false,
    };
  },
  created() {
    api("form.getCustomizeOptions").then((res) => {
      this.list = res;
      this.columns.push(res[0].Name);
    });
  },
  methods: {
    onConfirm(e) {
      console.log(e);
      this.title = e;
      this.tradeListShowPicker = false;
    },
    handleSave() {
      const commonList = LgetItem("commonList");
      const index = commonList.findIndex((item) => item.Name === this.name);
      if (index != -1) {
        this.$notify({
          type: "warning",
          message: "该名称已存在",
          duration: 1000,
        });
      } else {
        commonList.push({ Name: this.name, Type: this.list[0].Type });
        LsetItem("commonList", commonList);
        this.$router.go(-1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.addInfo_wrap {
  background-color: $bgColor;
  width: 100%;
  min-height: 100vh;
}
</style>