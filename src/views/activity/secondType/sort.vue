<template>
  <div class="sort_wrap">
    <h3 class="title_wrap">
      点击右边箭头图标，可以上下调整排序
    </h3>
    <van-cell-group>
      <van-cell
        :title="item.IsRequired ? '*' + item.Name : item.Name"
        v-for="(item, index) in list"
        :key="index"
        size="large"
      >
        <div class="icon_wrap">
            <img src="../../../assets/images/up.png" alt="">
            <img src="../../../assets/images/down.png" alt="">
          <!-- <van-icon
            class="my-icon"
            size="20px"
            name="up"
            @click="handleUp(index)"
          />
          <van-icon
            class="my-icon"
            size="20px"
            name="down"
            @click="handleDown(index)"
          /> -->
        </div>
      </van-cell>
    </van-cell-group>
    <footer-btn @handleBtn="handleSave" text="保存" />
  </div>
</template>
<script>
import api from "@/api";
import footerBtn from "@/components/FooterBtn";
import { LgetItem, LsetItem } from "@/utils/storage";
export default {
  data() {
    return {
      list: [],
      ticketDetail: {},
      currentIndex: 0,
      nameList: [],
      ticketForm: {},
    };
  },
  components: {
    footerBtn,
  },
  created() {
    const data = this.$route.query;
    if (data.activityId && data.ticketId) {
      //请求接口，网络排序
      api("ticket.tempForm", {
        activityId: data.activityId,
        ticketId: data.ticketId,
      }).then((res) => {
        this.ticketForm = res.ticketForm;
        // this.list = JSON.parse(res.ticketForm.templateForm).Options;
        this.list = LgetItem("hasIdSortData");
      });
    } else if (data.name) {
      //获取本地list,修改本地list
      if (LgetItem("ticketMode") === 1) {
        this.nameList = LgetItem("noTicketList") || [];
      } else {
        this.nameList = LgetItem("hasTicketList") || [];
      }
      console.log(this.nameList);
      const index = this.nameList.findIndex(
        (ele) => ele.ticketDetail && ele.ticketDetail.ticketName == data.name
      );
      console.log(index);
      if (index != -1) {
        this.currentIndex = index;
        const selectedData = this.nameList[index].templateForm;

        this.list = JSON.parse(selectedData).Options;
        console.log(this.list);
      }
    } else {
      //修改sortData
      const data = LgetItem("sortData");
      this.ticketDetail = data[0].ticketDetail;
      this.list = JSON.parse(data[0].templateForm).Options;
    }
  },
  methods: {
    handleUp(index) {
      if (index == 0) {
        return;
      }

      this.swapItems(this.list, index, index - 1);
    },
    handleDown(index) {
      if (index == this.list.length - 1) {
        return;
      }
      this.swapItems(this.list, index, index + 1);
    },
    swapItems(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    handleSave() {
      const data = this.$route.query;
      if (data.activityId && data.ticketId) {
        //请求接口，网络排序
        api("ticket.edit", {
          activityId: Number(data.activityId),
          openReview: this.ticketForm.openReview,
          templateForm: `{"Options":${JSON.stringify(this.list)}}`,
          ticketDetail: this.ticketForm.ticketDetail,
          ticketId: data.ticketId,
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
      } else if (data.name) {
        //获取本地list,修改本地list
        this.nameList[
          this.currentIndex
        ].templateForm = `{"Options":${JSON.stringify(this.list)}}`;
        if (LgetItem("ticketMode") === 1) {
          LsetItem("noTicketList", [...this.nameList]);
        } else {
          LsetItem("hasTicketList", [...this.nameList]);
        }
      } else {
        LsetItem("sortData", [
          {
            templateForm: `{"Options":${JSON.stringify(this.list)}}`,
            ticketDetail: this.ticketDetail,
          },
        ]);
      }
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.sort_wrap {
    background-color: $bgColor;
  width: 100%;
  min-height: 100vh;
  .icon_wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    img{
        width: 20px;
        height: 20px;
        margin-right: 15px;
    }
  }
}
.my-icon {
  margin-right: 10px;
}
</style>