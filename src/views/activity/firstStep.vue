<template>
  <div class="baseInfo_wrap safe">
    <h3 class="title_wrap">活动名称</h3>
    <van-cell-group>
      <van-field
        v-model="activitiesForm.name"
        label=""
        type="textarea"
        placeholder="请填写活动名称（0/30）"
        clearable
        autosize
        rows="1"
        maxlength="30"
      />
    </van-cell-group>
    <h3 class="title_wrap">活动封面</h3>
    <div class="uploader">
      <div class="uploader_title">
        <div class="uploader_tips">建议上传尺寸为750*350</div>
        <div class="right-box" v-if="activitiesForm.activeCover">
          <uploader
            custom="edit"
            :uploadConfig="uploadConfig"
            @doneUpload="handleDoneUpload"
            :previewImage='false'
          />
        </div>
      </div>
      <div class="upload_wrap">
        <uploader
          v-if="!activitiesForm.activeCover"
          custom="custom"
          :uploadConfig="uploadConfig"
          @doneUpload="handleDoneUpload"
        />
        <van-image
          v-else
          fit="contain"
          width="240px"
          :src="activitiesForm.activeCover"
        />
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
            activitiesForm.beginDate
              ? formatDate(activitiesForm.beginDate, 'YYYY-MM-DD HH:mm')
              : '请选择开始时间'
          "
          @click="handleShow('start')"
        />
        <van-cell
          title="结束时间"
          is-link
          size="large"
          :value="
            activitiesForm.endDate
              ? formatDate(activitiesForm.endDate, 'YYYY-MM-DD HH:mm')
              : '请选择结束时间'
          "
          @click="handleShow('end')"
        />
      </van-cell-group>
    </div>
    <div>
      <div class="title_wrap">活动地址</div>
      <van-cell-group>
        <van-field
          v-model="activitiesForm.address"
          label=""
          type="textarea"
          placeholder="请选择活动地址"
          autosize
          rows="1"
          readonly
          right-icon="arrow"
          @click="handleAddress"
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
      v-if="editTotalInfo.state !== 2 || editTotalInfo.state !== 3"
      :text="$route.query.id ? '保存' : '下一步'"
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
  name: "baseInfo",
  components: {
    uploader,
    dateRangePicker,
    footerBtn,
  },
  data() {
    return {
      activitiesForm: {
        activeCover: "",
        beginDate: 0,
        endDate: 0,
        address: "",
        lat: 39.915,
        lng: 116.404,
        name: "",
        province: "",
        area: "",
        city: "",
      },
      popupShow: false,
      datePicker: {
        minDate: null,
        maxDate: null,
      },
      dateType: "",
      uploadConfig: {},
      formatDate,
      editTotalInfo: {},
    };
  },
  created() {
    const data = this.$route.query;
    console.log(data);
    this.getUpload();
    if (data && data.id && data.module !== "locationPicker") {
      // 获取活动信息
      api("activities.info", {
        id: data.id,
      }).then((res) => {
        this.editTotalInfo = res;
        LsetItem("editTotalInfo", res);
        this.activitiesForm.name = res.name;
        this.activitiesForm.activeCover = res.activeCover;
        this.activitiesForm.beginDate = res.beginDate;
        this.activitiesForm.endDate = res.endDate;
        this.activitiesForm.address = res.address;
        this.activitiesForm.lat = res.lat;
        this.activitiesForm.lng = res.lng;
        this.activitiesForm.province = res.province;
        this.activitiesForm.city = res.city;
        this.activitiesForm.area = res.area;
      });
    } else if (data.module === "locationPicker") {
      if (LgetItem("addAddress")) {
        this.activitiesForm = LgetItem("addAddress");
        //获取区
        let index1 = data.addr.indexOf("区") + 1;
        let index2 = data.addr.indexOf("市") + 1;
        this.activitiesForm.area = data.addr.slice(index2, index1);
        if (data.addr && data.addr.indexOf("省") !== -1) {
          let index = data.addr.indexOf("省") + 1;
          this.activitiesForm.province = data.addr.slice(0, index);
        } else {
          this.activitiesForm.province = data.city;
        }
        let name =
          (Array.isArray(data.name)
            ? data.name[data.name.length - 1]
            : data.name) || "";
        this.activitiesForm.address = data.addr + name || "";
        this.activitiesForm.city = data.city;
        this.activitiesForm.lat = data.latng.split(",")[0] || "";
        this.activitiesForm.lng = data.latng.split(",")[1] || "";
      } else {
        if (LgetItem("activitiesForm")) {
          this.activitiesForm = LgetItem("activitiesForm");
        }
      }
    } else {
      this.$nextTick(() => {
        wxInit().then(() => {
          wx.getLocation({
            type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (res) => {
              console.log("getLocation", res);
              this.activitiesForm.lat = res.latitude;
              this.activitiesForm.lng = res.longitude;
            },
            fail: (err) => {
              console.log("getLocation", err);
            },
          });
        });
      });
      const activitiesForm = LgetItem("activitiesForm");
      if (activitiesForm) {
        this.activitiesForm = activitiesForm;
      }
    }
  },
  destroyed() {
    LreItem("addAddress");
    LreItem("editTotalInfo");
  },
  methods: {
    //删除封面
    handelDeleteActiveCover() {
      this.activitiesForm.activeCover = "";
    },
    getUpload() {
      api("common.upload").then((res) => {
        this.uploadConfig = res;
      });
    },
    handleDoneUpload(list) {
      this.activitiesForm.activeCover = list[0].url;
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
        this.activitiesForm.beginDate = time;
      } else {
        this.activitiesForm.endDate = time;
      }
      this.popupShow = false;
    },
    handleCancel() {
      this.popupShow = false;
    },
    handleAddress() {
      console.log("设置地址");
      LsetItem("addAddress", this.activitiesForm);
      const latitude = this.activitiesForm.lat;
      const longitude = this.activitiesForm.lng;
      const coord =
        latitude && longitude ? `&coord=${latitude},${longitude}` : "";
      window.location.replace(
        `https://apis.map.qq.com/tools/locpicker?search=1&type=0&backurl=${location.href}&policy=1${coord}&key=2JWBZ-4CTWF-F34JL-NEWOB-PRDJH-AXBI7&referer=鲸鱼轻会`
      );
    },
    handleBtn() {
      const {
        name,
        lat,
        lng,
        activeCover,
        beginDate,
        endDate,
      } = this.activitiesForm;
      if (name && lat && lng && activeCover && beginDate && endDate) {
        if (beginDate <= endDate) {
          if (this.$route.query.id) {
            console.log("编辑");
            api("activities.edit", {
              ...LgetItem("editTotalInfo"),
              ...this.activitiesForm,
            }).then((res) => {
              LreItem("editTotalInfo");
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
            LsetItem("activitiesForm", this.activitiesForm);
            this.$router.push({
              path: "/activity/secondStep",
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