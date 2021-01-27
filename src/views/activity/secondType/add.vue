<template>
  <div class="add_wrap safe">
    <h3 class="title_wrap">
      {{ ticketMode == 1 ? "报名表单设置" : "门票设置" }}
    </h3>
    <van-cell-group :border="false">
      <van-field
        v-model="ticketForm.ticketName"
        :label="ticketMode == 1 ? '报名表单名称' : '门票名称'"
        :placeholder="ticketMode == 1 ? '请输入表单名称' : '请输入门票名称'"
        clearable
        size="large"
        input-align="right"
        label-class="field-label-text"
      />
      <van-field
        v-if="ticketMode == 2"
        v-model="ticketForm.price"
        label="门票价格"
        placeholder="请输入门票价格"
        type="number"
        clearable
        size="large"
        input-align="right"
        label-class="field-label-text"
      />
      <van-field
        type="number"
        v-model="ticketForm.totalStock"
        :label="ticketMode == 1 ? '报名数量' : '门票数量'"
        :placeholder="ticketMode == 1 ? '请输入报名数量' : '请输入门票数量'"
        clearable
        size="large"
        input-align="right"
        label-class="field-label-text"
      />
      <van-field
        type="number"
        v-if="ticketMode == 2"
        v-model="ticketForm.limitCount"
        label="购买限制"
        placeholder="请输入限制购买数量"
        clearable
        size="large"
        input-align="right"
        label-class="field-label-text"
      />
    </van-cell-group>
    <h3 class="title_wrap">报名时间</h3>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell
          title-style="margin-right:60px;"
          title-class="field-label-text"
          title="默认报名时间：活动开始时间前24小时默认报名结束时间：活动结束时间"
          size="large"
          clickable
          @click="handleSelectTime('default')"
        >
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell
          title-class="field-label-text"
          title="自定义"
          clickable
          size="large"
          @click="handleSelectTime('custom')"
        >
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="isShowTime">
        <van-cell
          title="开始时间"
          is-link
          size="large"
          :value="
            ticketForm.saleBegin
              ? formatDate(ticketForm.saleBegin, 'YYYY-MM-DD HH:mm')
              : '请选择开始时间'
          "
          @click="handleShow('start')"
        />
        <van-cell
          title="结束时间"
          is-link
          size="large"
          :value="
            ticketForm.saleEnd
              ? formatDate(ticketForm.saleEnd, 'YYYY-MM-DD HH:mm')
              : '请选择结束时间'
          "
          @click="handleShow('end')"
        />
      </van-cell-group>
    </van-radio-group>
    <h3 class="title_wrap">开启审核</h3>
    <van-cell-group :border="false">
      <van-cell
        title-class="field-label-text"
        title="开启后需要主办方审核参会者报名信息"
        size="large"
      >
        <template #right-icon>
          <van-switch v-model="ticketForm.openReview" size="20px" />
        </template>
      </van-cell>
    </van-cell-group>
    <h3 class="title_wrap">报名信息设置（*代表必填）</h3>
    <van-cell-group>
      <van-cell :title="showSelectedStr" size="large" center>
        <div class="sort" @click="handleSort">点击排序</div>
      </van-cell>
    </van-cell-group>
    <h3 class="title_wrap">点击选择需要填写的信息</h3>
    <div class="check_items">
      <div
        class="item"
        :class="{ active: item.selected }"
        @click="handleChoose(item, index)"
        v-for="(item, index) in commonList"
        :key="index"
      >
        <span>{{ item.Name }}</span>
        <img
          v-if="item.selected"
          src="../../../assets/images/icon_xuanzhong2.png"
          alt=""
        />
      </div>
      <div class="item" @click="handleAdd">
        <span>+添加字段</span>
      </div>
    </div>
    <h3 class="title_wrap">报名表说明</h3>
    <van-cell-group :border="false">
      <van-field
        v-model="ticketForm.ticketDesc"
        rows="3"
        autosize
        type="textarea"
        maxlength="300"
        placeholder="请输入报名表说明（选填）"
        show-word-limit
      />
    </van-cell-group>

    <footer-btn @handleBtn="handleSave" text="保存" />
    <van-popup v-model="popupShow" position="bottom">
      <date-range-picker
        :minDate="datePicker.minDate"
        :maxDate="datePicker.maxDate"
        @handleConfirm="handleConfirm"
        @handleCancel="handleCancel"
      />
    </van-popup>
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @cancel="onCancel"
      @select="handleSelect"
    />
  </div>
</template>
<script>
import { gengerateID } from "@/utils/index";
import footerBtn from "@/components/FooterBtn";
import dateRangePicker from "@/components/DateRangePicker";
import api from "@/api";
import { LgetItem, LsetItem, LreItem } from "@/utils/storage";
import { formatDate } from "@/filter";
export default {
  data() {
    return {
      gengerateID: gengerateID,
      formatDate,
      ticketMode: LgetItem("ticketMode"),
      ticketForm: {
        ticketName: "",
        totalStock: "",
        limitCount: 1,
        openReview: true,
        price: 0,
        saleBegin: 0,
        saleEnd: 0,
        saleTimeType: 1,
        ticketDesc: "",
      },
      templateForm: { Options: [] },
      selectedData: [],
      message: "",
      actions: [
        { name: "作为必填项" },
        { name: "作为选填项" },
        { name: "编辑该字段" },
      ],
      show: false,
      radio: "1",
      commonList: [],
      current: {},
      isShowTime: false,
      popupShow: false,
      datePicker: {
        minDate: null,
        maxDate: null,
      },
      dateType: "",
      showSelectedStr: "",
      list: [],
      notifySetting: {},
    };
  },
  created() {
    if (this.ticketMode === 1) {
      this.list = LgetItem("noTicketList") || [];
    } else {
      this.list = LgetItem("hasTicketList") || [];
    }
    //分为3种，1新建，2接口编辑，3,本地编辑
    //新增的时候又分为本地新增和接口新增，接口新增的时候只传活动id
    const data = this.$route.query;
    if (data.activityId && data.ticketId) {
      api("ticket.tempForm", {
        activityId: data.activityId,
        ticketId: data.ticketId,
      }).then((res) => {
        console.log(res);
        this.ticketForm = res.ticketForm.ticketDetail;
        if (this.ticketForm.saleTimeType === 2) {
          this.isShowTime = true;
          this.radio = "2";
        } else {
          this.isShowTime = false;
          this.radio = "1";
        }
        if (LgetItem("hasIdSortData")) {
          this.selectedData = LgetItem("hasIdSortData");
        } else {
          this.selectedData = JSON.parse(res.ticketForm.templateForm).Options;
        }

        this.getCommonOptions();
      });
    } else if (data.name) {
      this.getCommonOptions();
      const index = this.list.findIndex(
        (ele) => ele.ticketDetail.ticketName === data.name
      );
      this.ticketForm = {
        ...this.list[index].ticketDetail,
      };
      if (this.ticketForm.saleTimeType === 2) {
        this.isShowTime = true;
        this.radio = "2";
      } else {
        this.isShowTime = false;
        this.radio = "1";
        const activitiesForm = LgetItem("activitiesForm");
        if (activitiesForm) {
          this.ticketForm.saleBegin = activitiesForm.beginDate;
          this.ticketForm.saleEnd = (
            new Date(
              activitiesForm.beginDate * 1000 + 24 * 60 * 60 * 1000
            ).getTime() / 1000
          ).toFixed(0);
        }
      }
    } else if (data.activityId && !data.ticketId) {
      this.getNotify();
      this.getCommonOptions();
    } else {
      this.getCommonOptions();
    }
  },
  components: {
    footerBtn,
    dateRangePicker,
  },
  methods: {
    //添加字段
    handleAdd() {
      const data = this.$route.query;
      if (data.activityId && data.ticketId) {
        LsetItem("hasIdSortData", this.selectedData);
      } else {
        LsetItem("sortData", [
          {
            templateForm: `{"Options":${JSON.stringify(this.selectedData)}}`,
            ticketDetail: this.ticketForm,
          },
        ]);
      }

      this.$router.push({
        path: "/activity/secondStep/addInfo",
      });
    },
    //点击排序
    handleSort() {
      const data = this.$route.query;
      if (data.activityId && data.ticketId) {
        LsetItem("hasIdSortData", this.selectedData);
        this.$router.push({
          path: "/activity/secondStep/sort",
          query: {
            activityId: data.activityId,
            ticketId: data.ticketId,
          },
        });
      } else if (data.name) {
        this.$router.push({
          path: "/activity/secondStep/sort",
          query: {
            name: data.name,
          },
        });
      } else {
        LsetItem("sortData", [
          {
            templateForm: `{"Options":${JSON.stringify(this.selectedData)}}`,
            ticketDetail: this.ticketForm,
          },
        ]);
        this.$router.push({
          path: "/activity/secondStep/sort",
        });
      }
    },
    handleSelectTime(val) {
      if (val === "default") {
        this.isShowTime = false;
        this.ticketForm.saleTimeType = 1;
        this.radio = "1";
      } else {
        this.isShowTime = true;
        this.ticketForm.saleTimeType = 2;
        this.radio = "2";
      }
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
        this.ticketForm.saleBegin = time;
      } else {
        this.ticketForm.saleEnd = time;
      }
      this.popupShow = false;
    },
    handleCancel() {
      this.popupShow = false;
    },
    handleChoose(item, index) {
      this.current = item;
      if (item.Name === "姓名" && index === 0) {
        console.log("提示不可改变");
        return;
      } else {
        if (item.selected) {
          this.actions[0].name = "不作为填写项";
          this.actions[1].name = item.IsRequired ? "作为选填项" : "作为必填项";
        } else {
          this.actions[0].name = "作为必填项";
          this.actions[1].name = "作为选填项";
        }
        this.show = true;
      }
    },
    // 处理表单项,有可能是通用的时候传的，有可能是自定义的时候穿的
    creat(item, val) {
      const { Type, CType } = item;
      let obj = {
        Id: item.Id,
        refName: this.gengerateID("ref_des"),
        Name: item.Name, // 选项名
        Type: 0, // 选项类型(OptionType)
        IsRequired: val, // 是否是必填项
        IsDelete: true, // 是否可以删除
        CommonInfo: {},
        Seq: 1, // 组件的排序
        ValueList: [
          {
            Content: "",
            Placeholder: `请输入${item.Name}`,
            Seq: 1,
            //是否选中，单选/多选/下拉选择 时使
            Select: false,
          },
        ],
      };
      // 说明是通用传的
      if (CType) {
        // 常用项目
        obj.Type = 1;
        obj.CommonInfo = {
          //常用项信息
          Name: item.Name,
          CType: item.CType, //常用项类型枚举
          // 是否有提示验证信息
          IsValidateRequired: true,
          // 是否验证-IsValidateRequired为true才有
          ValidateRequired: 0,
        };
      } else {
        // 自定义项
        obj.Type = Type;
        obj.CommonInfo = {};
        if (Type == 12) {
          // 多级下拉
          obj.ValueList = [
            {
              Placeholder: "",
              Seq: 1,
              Select: false, //是否选中一级
              Content: {
                Name: "选项", // 选项名
                Type: 6, // 选项类型
                IsRequired: false, // 是否是必填项
                IsDelete: true, // 是否可以删除
                CommonInfo: {},
                Seq: 1, // 组件的排序
                Select: false, //是否有二级
                ValueList: [
                  {
                    Content: "子选项",
                    Placeholder: "",
                    Seq: 1,
                    Select: false, //是否选中
                  },
                  {
                    Content: "子选项",
                    Placeholder: "",
                    Seq: 2,
                    Select: false, //是否选中
                  },
                ],
              },
            },
          ];
        } else if (Type == 8) {
          // 日期范围
          obj.ValueList = [
            {
              Content: {
                Begin: new Date().getTime() / 1000,
                End: new Date().getTime() / 1000,
              },
              Placeholder: "",
              Seq: 1,
              Select: false, //是否选中，单选/多选/下拉选择 时使用
            },
          ];
        } else if (Type == 1 || Type == 3 || Type == 5) {
          // 单选、多选、普通下拉
          obj.ValueList = [
            {
              Content: "选项",
              Placeholder: "",
              Seq: 1,
              Select: true, //是否选中，单选/多选/下拉选择 时使用
            },
            {
              Content: "选项",
              Placeholder: "",
              Seq: 1,
              Select: false, //是否选中，单选/多选/下拉选择 时使用
            },
          ];
        } else if (Type == 11) {
          // 性别
          obj.ValueList = [
            {
              Content: "男",
              Placeholder: "",
              Seq: 1,
              Select: true, //是否选中，单选/多选/下拉选择 时使用
            },
            {
              Content: "女",
              Placeholder: "",
              Seq: 1,
              Select: false, //是否选中，单选/多选/下拉选择 时使用
            },
          ];
        }
      }

      return obj;
    },
    //获取短信通知-接口新增表单的时候
    getNotify() {
      // 获取短信通知
      api("form.getTicketAdvancedConfig", {
        activityId: this.$route.query.activityId,
      }).then((res) => {
        console.log(res);
        this.notifySetting = res.notifySetting;
      });
    },
    // 获取常用项
    getCommonOptions() {
      const commonList = LgetItem("commonList");
      if (commonList) {
        if (this.$route.query.name) {
          const index = this.list.findIndex(
            (ele) =>
              ele.ticketDetail &&
              ele.ticketDetail.ticketName == this.$route.query.name
          );
          console.log(index);
          if (index != -1) {
            const selectedData = this.list[index].templateForm;
            this.selectedData = JSON.parse(selectedData).Options;
          }
        } else if (this.$route.query.activityId && this.$route.query.ticketId) {
          console.log("已经设置了selectedData");
        } else {
          if (LgetItem("sortData")) {
            const dataArr = LgetItem("sortData");
            this.ticketForm = dataArr[0].ticketDetail;
            const selectedData = dataArr[0].templateForm;
            this.selectedData = JSON.parse(selectedData).Options;
          } else {
            this.selectedData = [
              this.creat(commonList[0], true),
              this.creat(commonList[1], true),
            ];
          }
        }
        commonList.forEach((ele, i) => {
          const index = this.selectedData.findIndex(
            (item) =>
              //  自定义的时候Name可能相同，所以还需要判断
              item.Name === ele.Name && (!ele.Type || ele.Type === item.Type)
          );
          if (index != -1) {
            ele.IsRequired = this.selectedData[index].IsRequired;
            ele.selected = true;
            ele.Id = this.selectedData[index].Id;
          } else {
            ele.Id = this.gengerateID("design");
            ele.IsRequired = false;
            ele.selected = false;
          }
        });
        console.log(commonList);
        this.commonList = commonList;
        this.reShowStr();
      } else {
        api("common.commonOptions").then((res) => {
          LsetItem("commonList", [...res]);
          if (this.$route.query.name) {
            const index = this.list.findIndex(
              (ele) =>
                ele.ticketDetail &&
                ele.ticketDetail.ticketName == decodeURI(this.$route.query.name)
            );
            if (index != -1) {
              const selectedData = this.list[index].templateForm;
              this.selectedData = JSON.parse(selectedData).Options;
            }
          } else if (
            this.$route.query.activityId &&
            this.$route.query.ticketId
          ) {
            console.log("已经设置了selectedData");
          } else {
            if (LgetItem("sortData")) {
              const dataArr = LgetItem("sortData");
              this.ticketForm = dataArr[0].ticketDetail;
              const selectedData = dataArr[0].templateForm;
              this.selectedData = JSON.parse(selectedData).Options;
            } else {
              this.selectedData = [
                this.creat(res[0], true),
                this.creat(res[1], true),
              ];
            }
          }

          res.forEach((ele, i) => {
            const index = this.selectedData.findIndex(
              (item) => item.Name === ele.Name
            );
            if (index != -1) {
              ele.IsRequired = this.selectedData[index].IsRequired;
              ele.selected = true;
              ele.Id = this.selectedData[index].Id;
            } else {
              ele.Id = this.gengerateID("design");
              ele.IsRequired = false;
              ele.selected = false;
            }
          });
          this.commonList = res;
          this.reShowStr();
        });
      }
    },
    onConfirm(e) {
      console.log(e);
    },
    onCancel(e) {
      console.log(e);
    },
    handleSelect(val) {
      const strArr = [];
      const index1 = this.selectedData.findIndex(
        (ele) => ele.Id === this.current.Id
      );
      const index2 = this.commonList.findIndex(
        (ele) => ele.Id === this.current.Id
      );
      const { name } = val;
      switch (name) {
        case "作为必填项": // 1.已经选中 2.未选择】中
          if (index1 != -1) {
            // 找得到，已经选择了，此时是修改选中项为必选项
            this.selectedData[index1].IsRequired = true;
          } else {
            //找不到,将当前元素添加到选中列表，并且修改list的属性
            this.selectedData.push(this.creat(this.current, true));
            this.commonList[index2].selected = true;
          }
          this.commonList[index2].IsRequired = true; // 因为需要他去动态修改actions的name值
          break;
        case "作为选填项": // 1.已经选中 2.未选择】中
          if (index1 != -1) {
            // 找得到，已经选择了，此时是修改选中项为必选项
            this.selectedData[index1].IsRequired = false;
          } else {
            //找不到,将当前元素添加到选中列表，并且修改list的属性
            this.selectedData.push(this.creat(this.current, false));
            this.commonList[index2].selected = true;
          }
          this.commonList[index2].IsRequired = false;
          break;
        case "不作为填写项":
          this.selectedData.splice(index1, 1);
          this.commonList[index2].selected = false;
          this.commonList[index2].IsRequired = false;
          break;
        case "编辑该字段":
          console.log("编辑该字段");
          break;
        default: {
          console.log(11);
        }
      }
      this.reShowStr();
    },
    reShowStr() {
      const strArr = [];
      this.selectedData.forEach((ele) =>
        ele.IsRequired
          ? strArr.push(`*${ele.Name}`)
          : strArr.push(`${ele.Name}`)
      );
      this.showSelectedStr = strArr.join();
      console.log(this.showSelectedStr);
    },
    handleSave() {
      LreItem("sortData");
      LreItem("hasIdSortData");
      const { saleBegin, saleEnd, ticketName, totalStock } = this.ticketForm;
      if (ticketName && totalStock) {
        if (saleBegin <= saleEnd) {
          //区分编辑和新增
          //编辑：本地编辑和接口编辑
          //新增：本地新增和接口新增
          if (this.$route.query.ticketId && this.$route.query.activityId) {
            // 接口编辑
            api("ticket.edit", {
              activityId: Number(this.$route.query.activityId),
              openReview: this.ticketForm.openReview,
              templateForm: `{"Options":${JSON.stringify(this.selectedData)}}`,
              ticketDetail: this.ticketForm,
              ticketId: this.$route.query.ticketId,
            }).then((res) => {
              this.$notify({
                type: "success",
                message: "编辑成功",
                duration: 1000,
                onClose: () => {
                  this.$router.go(-1);
                },
              });
            });
          } else if (this.$route.query.name) {
            //本地编辑
            if (this.list.length) {
              const index = this.list.findIndex(
                (ele) => ele.ticketDetail.ticketName === this.$route.query.name
              );
              if (index != -1) {
                this.list[index].ticketDetail = { ...this.ticketForm };
                this.list[index].templateForm = `{"Options":${JSON.stringify(
                  this.selectedData
                )}}`;
                if (this.ticketMode === 1) {
                  LsetItem("noTicketList", [...this.list]);
                } else {
                  LsetItem("hasTicketList", [...this.list]);
                }
              }
            }
            this.$notify({
              type: "success",
              message: "编辑成功",
              duration: 1000,
              onClose: () => {
                this.$router.go(-1);
              },
            });
          } else if (
            this.$route.query.activityId &&
            !this.$route.query.ticketId
          ) {
            //接口新增
            api("form.create", {
              activityId: Number(this.$route.query.activityId),
              notifySetting: this.notifySetting,
              tflist: [
                {
                  activityId: Number(this.$route.query.activityId),
                  openReview: this.ticketForm.openReview,
                  ticketDetail: this.ticketForm,
                  ticketId: 0,
                  templateForm: `{"Options":${JSON.stringify(
                    this.selectedData
                  )}}`,
                },
              ],
            }).then((res) => {
              LreItem("ticketMode");
              this.$notify({
                type: "success",
                message: "新增成功",
                duration: 1000,
                onClose: () => {
                  this.$router.go(-1);
                },
              });
            });
          } else {
            //本地新增
            if (this.ticketMode === 1) {
              LsetItem("noTicketList", [
                ...this.list,
                {
                  templateForm: `{"Options":${JSON.stringify(
                    this.selectedData
                  )}}`,
                  ticketDetail: this.ticketForm,
                },
              ]);
            } else {
              LsetItem("hasTicketList", [
                ...this.list,
                {
                  templateForm: `{"Options":${JSON.stringify(
                    this.selectedData
                  )}}`,
                  ticketDetail: this.ticketForm,
                },
              ]);
            }
            this.$notify({
              type: "success",
              message: "新增成功",
              duration: 1000,
              onClose: () => {
                this.$router.go(-1);
              },
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
.add_wrap {
  background-color: $bgColor;
  width: 100%;
  min-height: 100vh;
  .check_items {
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px 10px 5px;
    .item {
      border: 1px solid #e1e2e3;
      height: 35px;
      border-radius: 4px;
      padding: 0 18px;
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: 15px;
        color: #444a4a;
      }
      &:last-child {
        span {
          color: $themeColor;
        }
      }
    }

    .active {
      position: relative;
      border-color: $themeColor;
      img {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 17px;
        height: 16px;
      }
      span {
        color: $themeColor;
      }
    }
  }
  .sort {
    font-size: 15px;
    color: $themeColor;
  }
}
</style>