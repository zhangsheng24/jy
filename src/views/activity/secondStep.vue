<template>
  <div class="secondStep_wrap safe">
    <h3 class="title_wrap">报名设置</h3>
    <div class="type_content">
      <div
        class="type_item"
        :class="{ active: ticketMode == 1 }"
        @click="handleSelect(1)"
      >
        <img
          v-if="ticketMode == 1"
          class="checkedImg"
          src="../../assets/images/icon_xuanzhong .png"
          alt=""
        />
        <span class="type_title">无门票模式</span>
        <span class="type_tips">（参会者报名参加）</span>
      </div>
      <div
        class="type_item"
        :class="{ active: ticketMode == 2 }"
        @click="handleSelect(2)"
      >
        <img
          v-if="ticketMode == 2"
          class="checkedImg"
          src="../../assets/images/icon_xuanzhong .png"
          alt=""
        />
        <span class="type_title">门票模式</span>
        <span class="type_tips">（参会者购门票）</span>
      </div>
    </div>
    <div class="type_details" v-if="ticketMode != 0">
      <div class="title_wrap">
        {{ ticketMode == 1 ? "表单报名设置" : "门票设置" }}
      </div>
      <van-cell-group>
        <van-cell
          :title="`短信剩余条数：${balance}`"
          size="large"
          value="充值"
          value-class="cell-value-text"
        />
        <van-cell title="购票成功短信通知" size="large">
          <van-switch size="20px" v-model="message.buySucNotify" />
        </van-cell>
        <van-cell title="待审核短信通知" size="large">
          <van-switch size="20px" v-model="message.waitReviewNotify" />
        </van-cell>
      </van-cell-group>
      <div class="type_info" v-if="ticketList.length === 0">
        <div class="info_wrap">
          <img src="../../assets/images/img_02.png" alt="" />
          <div class="no_tips">暂未添加报名表单，请添加报名表单</div>
          <div class="outCircle">
            <span class="left"></span>
            <div class="line_box">
              <div class="line"></div>
            </div>
            <span class="right"></span>
          </div>
          <div class="addTickets" @click="goTo">
            +{{ ticketMode === 1 ? "添加报名表单" : "添加门票" }}
          </div>
        </div>
      </div>
      <div class="ticketDetail" v-else>
        <div
          class="ticketItem"
          v-for="(item, index) in ticketList"
          :key="index"
        >
          <van-swipe-cell>
            <van-cell is-link center @click="handleEdit(item)">
              <template #title>
                <span>{{ item.ticketName ? item.ticketName : item.name }}</span>
                <van-tag v-if="$route.query.id && !item.allowSale" type="danger"
                  >禁用</van-tag
                >
              </template>
              <template #label>
                <div>
                  {{ ticketMode === 1 ? "数量" : "票种数量" }}:{{
                    item.totalStock
                  }}
                </div>
                <div v-if="ticketMode === 2">票种价格:{{ item.price }}</div>
                <div v-if="ticketMode === 2">
                  单次购买限制:{{ item.limitCount }}
                </div>
                <div>
                  {{ ticketMode === 1 ? "说明" : "门票说明" }}:{{
                    item.ticketDesc ? item.ticketDesc : item.intro
                  }}
                </div>
              </template>
            </van-cell>
            <template #right>
              <van-button
                v-if="$route.query.id"
                square
                :text="!item.allowSale ? '解禁' : '禁用'"
                type="danger"
                class="delete-button"
                @click="forbidden(item)"
              />
              <van-button
                v-else
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="handleDelete(item, index)"
              />
            </template>
          </van-swipe-cell>
        </div>
        <div class="addTickets" @click="goTo">
          +{{ ticketMode === 1 ? "添加报名表单" : "添加门票" }}
        </div>
      </div>
    </div>
    <footer-btn
      v-if="editTotalInfo.state !== 2 || editTotalInfo.state !== 3"
      :disabled="ticketList.length === 0 || ticketMode === 0"
      :text="$route.query.id ? '保存' : '下一步'"
      @handleBtn="handleBtn"
    />
  </div>
</template>
<script>
import footerBtn from "@/components/FooterBtn";
import { LgetItem, LsetItem } from "@/utils/storage";
import api from "@/api";
import { Dialog } from "vant";
export default {
  data() {
    return {
      ticketMode: LgetItem("ticketMode") || 0,
      balance: 0,
      list: [],
      ticketList: [],
      //短信通知
      message: {
        buySucNotify: false,
        refundNotify: false,
        waitReviewNotify: false,
      },
      editTotalInfo: {},
    };
  },
  components: {
    footerBtn,
  },
  created() {
    this.getBalance();
    if (this.$route.query.id) {
      // 获取活动信息
      api("activities.info", {
        id: this.$route.query.id,
      }).then((res) => {
        this.editTotalInfo = res;
        this.ticketMode = res.ticketMode;
      });
      // 获取短信通知
      api("form.getTicketAdvancedConfig", {
        activityId: this.$route.query.id,
      }).then((res) => {
        console.log(res);
        this.message = res.notifySetting;
      });
      this.getList();
    } else {
      if (this.ticketMode === 1) {
        this.list = LgetItem("noTicketList");
        const notifySetting = LgetItem("notifySetting");
        if (notifySetting) {
          this.message = {
            ...notifySetting,
          };
        }
      }
      if (this.ticketMode === 2) {
        this.list = LgetItem("hasTicketList");
        const hastifySetting = LgetItem("hastifySetting");
        if (hastifySetting) {
          this.message = {
            ...hastifySetting,
          };
        }
      }
      if (this.list.length) {
        this.list.forEach((item) => {
          this.ticketList.push(item.ticketDetail);
        });
      } else {
        this.ticketList = [];
      }
    }
  },
  methods: {
    //获取模板列表
    getList() {
      // 获取门票列表哦
      api("ticket.list", {
        activityId: this.$route.query.id,
      }).then((res) => {
        this.ticketList = res.list;
      });
    },
    handleBtn() {
      if (this.$route.query.id) {
        //编辑表单
        //调取设置短信通知
        api("form.setTicketAdvancedConfig", {
          activityId: this.editTotalInfo.id,
          notifySetting: this.message,
        }).then((res) => {
          console.log(res);
          this.$notify({
            type: "success",
            message: "修改成功",
            duration: 1000,
            onClose: () => {
              this.$router.replace({
                path: "/home",
              });
            },
          });
        });
      } else {
        if (this.ticketMode === 1) {
          LsetItem("notifySetting", this.message);
        } else {
          LsetItem("hastifySetting", this.message);
        }
        this.$router.push({
          path: "/activity/thirdStep",
        });
      }
    },
    handleSelect(val) {
      this.ticketMode = val;
      LsetItem("ticketMode", val);
      if (this.$route.query.id) {
        //接口切换
        api("activities.switchTicketMode", {
          id: this.editTotalInfo.id,
          ticketMode: this.ticketMode,
        }).then((res) => {
          console.log(res);
          this.getList();
        });
      } else {
        //本地切换
        let ticketList = [];
        this.ticketList=[]
        if (val === 1) {
          ticketList = LgetItem("noTicketList");
        } else {
          ticketList = LgetItem("hasTicketList");
        }
        if (ticketList) {
          ticketList.forEach((item) => {
            this.ticketList.push(item.ticketDetail);
          });
        } else {
          this.ticketList = [];
        }
      }
    },
    handleEdit(item) {
      if (item.id) {
        this.$router.push({
          path: "/activity/secondStep/add",
          query: {
            activityId: this.$route.query.id,
            ticketId: item.id,
          },
        });
      } else {
        this.$router.push({
          path: "/activity/secondStep/add",
          query: {
            name: item.ticketName ? item.ticketName : item.name,
          },
        });
      }
    },
    goTo() {
      if (this.$route.query.id) {
        //已有活动新增表单
        this.$router.push({
          path: "/activity/secondStep/add",
          query: {
            activityId: this.$route.query.id,
          },
        });
      } else {
        //无活动，本地创建新增表单
        this.$router.push({
          path: "/activity/secondStep/add",
        });
      }
    },
    // 获取余额
    getBalance() {
      api("notify.balance", {
        type: 1,
        activityId: 0,
      }).then((res) => {
        console.log(res);
        this.balance = res.Balance;
      });
    },
    //禁用表单
    forbidden(item) {
      console.log(item);
      Dialog.confirm({
        title: "提示",
        message: "禁用之后，参会端用户就看不到该报名入口，确定禁用吗？",
      })
        .then(() => {
          api("form.forbidden", {
            id: item.id,
          }).then((res) => {
            this.$notify({
              type: "success",
              message: "禁用成功",
              duration: 1000,
              onClose: () => {
                this.getList();
              },
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    //删除本地创建好的表单
    handleDelete(item, index) {
      Dialog.confirm({
        title: "提示",
        message: "是否删除？",
      })
        .then(() => {
          this.list.splice(index, 1);
          this.ticketMode === 1
            ? LsetItem("noTicketList", this.list)
            : LsetItem("hasTicketList", this.list);
          this.ticketList.splice(index,1)
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.secondStep_wrap {
  width: 100%;
  min-height: 100vh;
  background: $bgColor;
  .type_content {
    display: flex;
    justify-content: space-around;
    .type_item {
      flex: 0 0 45%;
      background: #fff;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      height: 98px;
      position: relative;
      .checkedImg {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 9px;
        top: 9px;
      }
      .type_title {
        font-size: 16px;
      }
      .type_tips {
        font-size: 15px;
        margin-top: 12px;
        color: #999;
      }
    }
    .active {
      border: 1px solid #4070ef;
      .type_title {
        color: #4070ff;
      }
    }
    .has_no_tickets {
    }
    .has_tickets {
    }
  }
  .type_details {
    .type_info {
      margin-top: 10px;
      padding: 0 10px;
      .info_wrap {
        background: #fff;
        text-align: center;
        padding: 12px 0 15px;
        img {
          width: 99px;
          height: 66px;
        }
        .no_tips {
          font-size: 14px;
          color: #999;
          margin-top: 5px;
        }
        .outCircle {
          position: relative;
          height: 16px;
          margin-top: 2px;
          .line_box {
            position: absolute;
            left: 8px;
            right: 8px;
            height: 16px;
            display: flex;
            align-items: center;
            .line {
              flex: 1;
              height: 1px;
              background: #e3e3e3;
              opacity: 0.4;
            }
          }
          span {
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: $bgColor;
          }
          .left {
            left: -8px;
          }
          .right {
            right: -8px;
          }
        }
        .addTickets {
          color: #4070ff;
          font-size: 16px;
          margin-top: 15px;
        }
      }
    }
    .ticketDetail {
      margin-top: 10px;
      .ticketItem {
        margin-top: 10px;
      }
      .addTickets {
        color: #4070ff;
        font-size: 16px;
        margin-top: 15px;
        background-color: #fff;
        line-height: 40px;
        text-align: center;
      }
    }
  }
}
.delete-button {
  height: 100%;
}
</style>