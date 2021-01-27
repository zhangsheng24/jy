<template>
  <div class="baseInfo_wrap safe">
    <h3 class="title_wrap">互动名称</h3>
    <van-cell-group :border="false">
      <van-field
        v-model="formData.name"
        label=""
        type="textarea"
        placeholder="请填写活动名称（0/30）"
        clearable
        autosize
        rows="1"
        maxlength="30"
      />
    </van-cell-group>
    <h3 class="title_wrap">互动类型</h3>
    <van-cell-group :border="false">
      <van-field
        v-model="type"
        label=""
        type="textarea"
        placeholder="请选择活动互动类型"
        autosize
        rows="1"
        readonly
        right-icon="arrow"
        @click="typeListShowPicker = true"
      />
      <van-popup v-model="typeListShowPicker" position="bottom">
        <van-picker
          show-toolbar
          :default-index='defaultIndex'
          :columns="columns"
          @confirm="onConfirm"
          @cancel="typeListShowPicker = false"
        />
      </van-popup>
    </van-cell-group>
    <h3 class="title_wrap">互动封面</h3>
    <div class="uploader">
      <div class="uploader_title">
        <div class="uploader_tips">建议上传尺寸为750*350</div>
      </div>
      <div class="upload_wrap">
        <uploader
            custom="custom"
          :uploadConfig="uploadConfig"
          @doneUpload="handleDoneUpload"
          :activeCover='formData.activeCover'
          :previewImage="true"
          previewSize='240px'
        />
        <!-- <van-image
          v-if="$route.query.id && formData.activeCover"
          fit="contain"
          width="240px"
          :src="formData.activeCover"
        /> -->
      </div>
    </div>
    <div class="time_wrap">
      <h3 class="title_wrap">活动时间</h3>
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
    </div>
    <van-popup v-model="popupShow" position="bottom">
      <date-range-picker
        :minDate="datePicker.minDate"
        :maxDate="datePicker.maxDate"
        @handleConfirm="handleConfirm"
        @handleCancel="handleCancel"
      />
    </van-popup>
    <footer-btn
      :text="$route.query.id ? '保存' : '确认创建'"
      @handleBtn="handleBtn"
    />
  </div>
</template>
<script>
import { formatDate } from "@/filter";
import uploader from "@/components/Uploader";
import dateRangePicker from "@/components/DateRangePicker";
import footerBtn from "@/components/FooterBtn";
import api from "@/api";
import { LgetItem, LsetItem, LreItem } from "@/utils/storage";
import { wxInit, wx } from "@/utils/jssdkInit";

export default {
  components: {
    uploader,
    dateRangePicker,
    footerBtn,
  },
  data() {
    return {
      formData: {
        name: "",
        type: "",
        beginDate: "",
        endDate: "",
        id: 0,
        activityId: 0,
        activeCover: "",
      },
      activeCover:'',
      datePicker: {
        minDate: null,
        maxDate: null,
      },
      uploadConfig: {},
      formatDate,
      popupShow: false,
      typeListShowPicker: false,
      typeList: [],
      type: "",
      columns: [],
      editTotalInfo: {},
      defaultIndex:0
    };
  },
  created() {
    this.getUpload();
    
    const data = this.$route.query;
    if (data.id) {
      api("activities.info", {
        id: data.id,
      }).then((res) => {
        this.editTotalInfo = res;
        this.formData.name = res.name;
        this.formData.beginDate = res.beginDate;
        this.formData.endDate = res.endDate;
        this.formData.id = res.id;
        this.formData.type = res.type;
        this.formData.activeCover = res.activeCover;
        this.activeCover=res.activeCover
        this.getTypeList();
      });
    }else{
        this.getTypeList();
    }
  },
  methods: {
    //获取互动类型
    getTypeList() {
      api("Interactive.getCategories").then((res) => {
        console.log(res);
        res.forEach((item,index) => {
          this.columns.push(item.name);
          if(item.id == this.formData.type){
              this.type=item.name
              this.defaultIndex=index
          }
        });
        this.typeList = res;
        
      });
    },
    onConfirm(e, index) {
      this.type = e;
      this.formData.type = this.typeList[index].id;
      this.typeListShowPicker = false;
    },
    handleBtn() {
      const { name, type, beginDate, endDate, activeCover } = this.formData;
      if (name && type && activeCover && beginDate && endDate) {
        if (beginDate <= endDate) {
          if (this.$route.query.id) {
            api("Interactive.update", {
              ...this.formData,
            }).then((res) => {
              this.$notify({
                type: "success",
                message: "编辑成功",
                duration: 1000,
                onClose: () => {
                  this.$router.replace({
                    path: "/home",
                  });
                },
              });
            });
          } else {
            api("Interactive.create", this.formData).then((res) => {
              LsetItem("currentOptionId", res.id);
              LsetItem("categoryId", res.categoryId);
              this.$notify({
                type: "success",
                message: "创建成功",
                duration: 1000,
                onClose: () => {
                  this.$router.replace({
                    path: "/interactive/games/gamesList",
                    query: {
                      showStep: true,
                    },
                  });
                },
              });
            });
          }
        } else {
          this.$notify({
            type: "danger",
            message: "开始时间不能大于结束时间",
            duration: 1000,
          });
        }
      } else {
        this.$notify({
          type: "danger",
          message: "请填写完整信息",
          duration: 1000,
        });
      }
    },
    getUpload() {
      api("common.upload").then((res) => {
        this.uploadConfig = res;
      });
    },
    handleDoneUpload(list) {
        console.log(list,'list')
      this.formData.activeCover = list[0].url;
    },
    handleShow(value) {
      this.dateType = value;
      this.datePicker.minDate = new Date(new Date().getTime());
      this.datePicker.maxDate = new Date(
        new Date().getTime() + 5 * 365 * 24 * 60 * 60 * 1000
      );
      this.popupShow = true;
    },
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
    }
  },
};
</script>
<style lang="scss" scoped>
.baseInfo_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;

  .uploader {
    background-color: #fff;
    padding: 15px;
    .uploader_title {
      font-size: 15px;
      color: #666;
      display: flex;
      justify-content: space-between;
      .left-title {
      }
      .right-box {
          color: $themeColor;
      }
    }
    .uploader_tips {
      font-size: 14px;
      color: #999;
    }
    .upload_wrap {
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .time_wrap {
  }
}
</style>