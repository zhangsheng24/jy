/** 
* 第三步
*/
<template>
  <div class="thirdStep safe">
    <div class="thirdStep-title">
      <span>详细信息</span>
      <span class="tip" v-if="from != 'home'"
        >（以下信息为非必填项，可在创建成功后再完善）</span
      >
    </div>
    <div class="thirdStep-step">
      <div class="thirdStep-step-wrap">
        <div class="thirdStep-step-wrap-title">所属行业</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="activitiesForm.industry"
          right-icon="arrow-down"
          label=""
          label-width="0px"
          placeholder="请选择"
          @click="tradeListShowPicker = true"
        />
        <van-popup v-model="tradeListShowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="statusConfig.tradeList"
            @confirm="onConfirm"
            @cancel="tradeListShowPicker = false"
          />
        </van-popup>
      </div>
    </div>
    <div class="thirdStep-step">
      <div class="thirdStep-step-wrap">
        <div class="thirdStep-step-wrap-title">活动组织</div>
        <div class="v-flex">
          <div style="width: 140px">
            <van-field
              readonly
              clickable
              right-icon="arrow-down"
              name="picker"
              :value="organizerValue"
              label=""
              label-width="0px"
              placeholder="请选择"
              @click="organizerShowPicker = true"
            />
            <van-popup v-model="organizerShowPicker" position="bottom">
              <van-picker
                show-toolbar
                :columns="organizerList"
                @confirm="organizerConfirm"
                @cancel="organizerShowPicker = false"
              />
            </van-popup>
          </div>
          <div class="v-flex-1">
            <van-field
              readonly
              clickable
              name="picker"
              right-icon="arrow-down"
              :value="companyValue"
              label=""
              label-width="0px"
              placeholder="请选择"
              @click="companyShowPicker = true"
            />
            <van-popup v-model="companyShowPicker" position="bottom">
              <van-picker
                show-toolbar
                :default-index="defaultIndex"
                :columns="companyList"
                @confirm="companyConfirm"
                @cancel="companyShowPicker = false"
              />
              <div slots="columns-bottom">
                <van-button
                  @click="companyAddShow = true"
                  type="info"
                  style="width: 100%"
                  >新增</van-button
                >
              </div>
            </van-popup>
            <van-dialog
              v-model="companyAddShow"
              title="新增活动组织"
              show-cancel-button
              @confirm="companyAddConfirm"
            >
              <van-field
                clearable
                v-model="companyAddValue"
                label="请输入名称"
                placeholder="请输入名称"
                maxlength="30"
                show-word-limit
              />
            </van-dialog>
          </div>
        </div>
        <div class="thirdStep-step-wrap-add">
          <van-icon name="plus" />添加组织机构
        </div>
      </div>
    </div>
    <div class="thirdStep-step">
      <div class="thirdStep-step-wrap">
        <div class="thirdStep-step-wrap-title">联系方式</div>
        <div v-for="(item, index) in contactList" :key="index">
          <div class="v-flex">
            <div style="width: 140px">
              <van-field
                readonly
                clickable
                right-icon="arrow-down"
                name="picker"
                :value="item.contactValue"
                label=""
                label-width="0px"
                placeholder="请选择"
                @click="contactShow(index)"
              />
              <van-popup v-model="item.contactShowPicker" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="statusConfig.contact"
                  @confirm="(value) => contactConfirm(value, index)"
                  @cancel="item.contactShowPicker = false"
                />
              </van-popup>
            </div>
            <div class="v-flex-1">
              <van-field
                clearable
                name="picker"
                v-model="item.contactTextValue"
                label=""
                label-width="0px"
                placeholder="请输入"
                :right-icon="index != 0 ? 'delete-o' : ''"
                @click-right-icon="deleteContact(index)"
              />
            </div>
          </div>
        </div>

        <div class="thirdStep-step-wrap-add" @click="contactAdd">
          <van-icon name="plus" />添加联系方式
        </div>
      </div>
    </div>
    <!-- <div class="thirdStep-step">
      <div class="thirdStep-step-wrap">
        <div class="thirdStep-step-wrap-title">活动类型</div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="activityTypeValue"
          right-icon="arrow-down"
          label=""
          label-width="0px"
          placeholder="请选择"
          @click="activityTypeShowPicker = true"
        />
        <van-popup v-model="activityTypeShowPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="activityTypeList"
            @confirm="activityTypeConfirm"
            @cancel="activityTypeShowPicker = false"
          />
        </van-popup>
      </div>
    </div> -->
    <div class="thirdStep-step">
      <div class="thirdStep-step-wrap">
        <div class="thirdStep-step-wrap-title">活动详情</div>
        <van-field
          clearable
          autosize
          rows="2"
          type="textarea"
          show-word-limit
          name="picker"
          v-model="activitiesForm.intro"
          label=""
          label-width="0px"
          maxlength="300"
          placeholder="请填写活动详情"
        />
      </div>
    </div>
    <footer-btn
      v-if="editTotalInfo.state !== 2 || editTotalInfo.state !== 3"
      :text="this.$route.query.id ? '保存' : '确认创建'"
      @handleBtn="handleBtn"
    />
  </div>
</template>

<script>
import statusConfig from "@/utils/statusConfig";
import footerBtn from "@/components/FooterBtn";
import { LgetItem, LreItem, LsetItem } from "@/utils/storage";
import api from "@/api";
export default {
  components: {
    footerBtn,
  },
  data() {
    return {
      disable: false,
      from: "",
      tradeListShowPicker: false,
      tradeListValue: "",
      statusConfig: statusConfig,
      organizerList: [],
      activitiesForm: {
        industry: "",
        unitIds: [],
        service: "",
        intro: "",
      },
      organizerShowPicker: false,
      organizerValue: "主办方",
      companyValue: "",
      companyShowPicker: false,
      companyList: [],
      defaultIndex: 0,
      companyAddShow: false,
      companyAddValue: "",
      contactList: [
        {
          contactValue: "",
          contactTextValue: "",
          contactShowPicker: false,
        },
      ],
      // activityTypeList: [
      //   {
      //     text: "企业会议",
      //   },
      //   {
      //     text: "商业会议",
      //   },
      // ],
      // activityTypeValue: "",
      // activityTypeShowPicker: false,
      activityDesValue: "",
      list: [],
      setting: {},
      editTotalInfo: {},
    };
  },
  created() {
    if (this.$route.query.id) {
      api("activities.info", {
        id: this.$route.query.id,
      }).then((res) => {
        this.editTotalInfo = res;
        this.activitiesForm.industry = res.industry;
        this.activitiesForm.intro = res.intro;
        this.activitiesForm.unitIds = res.unitIds;
        this.contactList = res.service
          ? JSON.parse(res.service)
          : this.contactList;
        this.getOrganizer();
      });
    } else {
      this.getOrganizer();
      if (LgetItem("ticketMode") === 1) {
        this.list = LgetItem("noTicketList") || [];
        this.setting = LgetItem("notifySetting") || {};
      } else {
        this.list = LgetItem("hasTicketList") || [];
        this.setting = LgetItem("hastifySetting") || {};
      }
    }
  },
  mounted() {
    this.from = this.$route.query.from;
  },
  methods: {
    //获取主办方
    getOrganizer() {
      this.organizerList = [];
      this.companyList = [];
      api("organizer.getOptions").then((res) => {
        this.organizerList.push({
          id: 0,
          text: res[0].name,
        });
        res[0].options.forEach((item) => {
          this.companyList.push({
            id: item.id,
            text: item.name,
          });
        });
        const index = this.companyList.findIndex(
          (ele) => ele.id === this.activitiesForm.unitIds[0]
        );
        if (index !== -1) {
          this.companyValue = this.companyList[index].text;
          this.defaultIndex = index;
        } else {
          this.companyValue = "";
        }
      });
    },
    // 创建活动提交基础信息
    handleBtn() {
      //过滤contactList
      let filterArr = this.contactList.filter(
        (ele) => ele.contactTextValue && ele.contactValue
      );
      console.log(filterArr);
      this.activitiesForm.service = filterArr.length
        ? JSON.stringify(filterArr)
        : "";
      if (this.$route.query.id) {
        console.log("编辑");
        api("activities.edit", {
          ...this.editTotalInfo,
          ...this.activitiesForm,
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
      } else {
        //创建
        const activitiesForm = LgetItem("activitiesForm");
        if (JSON.stringify(activitiesForm) !== "{}") {
          api("activities.create", {
            ...activitiesForm,
            ...this.activitiesForm,
            ticketMode: LgetItem("ticketMode"),
          }).then((res) => {
            console.log(res);
            LsetItem("currentOptionId", res.id);
            LsetItem("categoryId", res.categoryId);
            LreItem("activitiesForm");
            // 创建createFromTemplate模板
            this.createFromTemplate(res.id);
            this.pushForm(res.id);
          });
        }
      }
    },
    createFromTemplate(id) {
      api("activities.createFromTemplate", {
        activityId: id,
        ids: this.activitiesForm.unitIds,
      }).then((res) => {
        consoel.log(res);
      });
    },
    // 创建活动提交表单信息
    pushForm(id) {
      this.list.forEach((ele, i) => {
        ele.activityId = id;
        ele.openReview = ele.openReview;
        ele.ticketDetail.ticketMode = LgetItem("ticketMode");
        ele.ticketId = 0;
      });
      const obj = {
        activityId: id,
        notifySetting: { ...this.setting },
        tflist: this.list,
      };
      api("form.create", obj).then((res) => {
        console.log(res);
        LreItem("ticketMode");
        LreItem("noTicketList");
        LreItem("hasTicketList");
        LreItem("notifySetting");
        LreItem("hastifySetting");
        this.$notify({
          type: "success",
          message: "创建成功",
          duration: 1000,
          onClose: () => {
            this.$router.replace({
              path: "/activity/preview",
              query: {
                id: id,
              },
            });
          },
        });
      });
    },
    onConfirm(e) {
      console.log(e);
      this.activitiesForm.industry = e;
      this.tradeListShowPicker = false;
    },
    // 主办方
    organizerConfirm(e) {
      this.organizerValue = e.text;
      this.organizerShowPicker = false;
    },
    // 主办方对应组织
    companyConfirm(e) {
      console.log(e);
      this.activitiesForm.unitIds = [Number(e.id)];
      this.companyValue = e.text;
      this.companyShowPicker = false;
    },
    // 新增活动组织机构
    companyAddConfirm() {
      if (this.companyAddValue) {
        api("organizer.create", {
          category: "",
          contact: "",
          id: 0,
          name: this.companyAddValue,
          phone: "",
          remark: "",
        }).then((res) => {
          console.log(res);
          this.$notify({
            type: "success",
            message: "新增成功",
            duration: 1000,
          });
        });
        let id = this.companyList[this.companyList.length - 1].id;
        this.companyList.unshift({
          id: id + 1,
          text: this.companyAddValue,
        });
        console.log(this.companyList);
        this.defaultIndex = 0;
        this.companyAddShow = false;
      }
    },
    // 联系方式选择
    contactConfirm(e, index) {
      this.contactList[index].contactValue = e.text;
      this.contactList[index].contactShowPicker = false;
    },
    // 添加联系方式
    contactAdd() {
      this.contactList.push({
        contactValue: "",
        contactTextValue: "",
        contactShowPicker: false,
      });
    },
    // 删除联系方式
    deleteContact(index) {
      this.contactList.splice(1, index);
    },
    // 显示联系方式下拉
    contactShow(index) {
      let contact = JSON.parse(JSON.stringify(this.statusConfig.contact));
      contact.forEach((item) => {
        item.disabled = false;
        this.contactList.forEach((ele) => {
          if (item.text == ele.contactValue) {
            item.disabled = true;
          }
        });
      });
      this.statusConfig.contact = JSON.parse(JSON.stringify(contact));
      this.contactList[index].contactShowPicker = true;
    },
    // 活动类型
    // activityTypeConfirm(e) {
    //   this.activityTypeValue = e.text;
    //   this.activityTypeShowPicker = false;
    // },
  },
};
</script>

<style lang="scss" scoped>
.thirdStep {
  min-height: 100vh;
  background: $bgColor;
  &-title {
    padding: 20px 20px 10px;
    font-size: 16px;
    color: $baseFontColor;
    font-weight: bold;
    .tip {
      font-size: 12px;
      color: #ff976a;
      font-weight: normal;
    }
  }
  &-step {
    margin: 10px 0;
    &-wrap {
      &-title {
        font-size: 14px;
        color: $baseFontColor;
        padding: 0 0 10px 20px;
      }
      &-add {
        font-size: 14px;
        color: $baseFontColor;
        padding: 10px 20px;
        color: #ff976a;
      }
    }
  }
  &-btn {
    padding: 10px;
    .van-button {
      width: 100%;
    }
  }
}
</style>