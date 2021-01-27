<template>
  <div class="custom_wrap">
    <h3 class="title_wrap">名称</h3>
    <van-cell-group :border="false">
      <van-field
        v-model="name"
        placeholder="请输入名称（0/6）"
        clearable
        maxlength="6"
        input-align="left"
      />
    </van-cell-group>
    <h3 class="title_wrap">文本格式</h3>
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      value1: 0,
      option1: [
        { text: '请选择', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.custom_wrap {
  width: 100%;
  min-height: 100vh;
  background-color: $bgColor;
}
</style>