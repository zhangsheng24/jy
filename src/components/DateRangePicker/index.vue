<template>
  <van-datetime-picker
    v-model="currentDate"
    :type="type"
    :formatter='formatter'
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="confirm"
    @cancel='cancel'
  />
</template>
<script>
export default {
  name: "DateRangePicker",
  data() {
    return {
      currentDate: "",
      formatter(type, value) {
        if (type === "year") {
          return `${value}年`;
        }
        if (type === "month") {
          return `${value}月`;
        }
        if (type === "day") {
          return `${value}日`;
        }
        if (type === "hour") {
          return `${value}时`;
        }
        if (type === "minute") {
          return `${value}分`;
        }
      },
    };
  },
  props: {
    type: {
      type: String,
      default: "datetime",
    },
    minDate: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
    maxDate: {
      type: Date,
      default: function () {
        return new Date();
      },
    },
  },
  methods: {
    confirm(value) {
      console.log(value);
      this.$emit('handleConfirm',value)
    },
    cancel(){
        this.$emit('handleCancel')
    }
  },
};
</script>