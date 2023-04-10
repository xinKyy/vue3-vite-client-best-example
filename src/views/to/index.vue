<template>
  <div class="to">
    <search-for></search-for>
    <div class="btns df aic container">
      <div
        class="btn df aic jcc mr20 active"
        id="one"
        @click="$router.push('/Home')"
      >
        <span class="iconfont icon-home fz28 mr10"></span>
        <span class="fz18 fw7">HOME</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/token')">
        <span class="iconfont icon-token fz28 mr10"></span>
        <span class="fz18 fw7">TOKENS</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/nft')">
        <span class="iconfont icon-Wallet fz28 mr10"></span>
        <span class="fz18 fw7">NFT</span>
      </div>
    </div>
    <div class="contents container mt60 mb60">
      <div class="on item first">
        <p class="fz30 mb40 mt20">
          <span class="mr10 fz30 fw7"> Address</span>
          <span class="fz16">{{ to }}</span>
        </p>
        <div class="top fz24">Overview</div>
        <div class="content">
          <div class="data df aic jcsb mt20 fz14">
            <div class="df fdc">
              <p class="fz28">0.0000 {{ symbol }}</p>
              <p class="fw7 fz18 mt10">{{ symbol }} Balance ?</p>
            </div>
          </div>
          <div class="mt20 fz24">
            <span>0 &nbsp;</span>
            <span class="fw7 fz20">Transactions</span>
          </div>
          <div class="change mt60">
            <div style="border-bottom: 1px solid #02204e">
              <span
                class="p15 bsbb fz20"
                style="border-bottom: 5px solid #02204e"
                >Transacions</span
              >
            </div>
            <div class="df aic jcsb mb20 fz18 mt20">
              <div class="df aic" style="height: 42px">
                <el-form
                  :inline="true"
                  :model="formInline"
                  class="demo-form-inline"
                  style="width: 60px"
                >
                  <el-form-item>
                    <el-select v-model="option">
                      <el-option label="10" value="10" />
                      <el-option label="20" value="20" />
                      <el-option label="50" value="50" />
                      <el-option label="100" value="100" />
                      <el-option label="500" value="500" />
                    </el-select>
                  </el-form-item>
                </el-form>
                <span style="margin-left: 13px">transactions</span>
              </div>
              <div>
                <el-form
                  :inline="true"
                  :model="searchForm"
                  class="demo-form-inline"
                >
                  <el-form-item label="Search :" style="width: 300px">
                    <el-input v-model="searchForm.search" />
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <table class="fw5">
              <thead
                style="background: #fbfcfd; height: 40px; text-indent: 10px"
              >
                <tr>
                  <td style="width: 220px">TxHash</td>
                  <td style="width: 65px">Block</td>
                  <td style="width: 165px">
                    <span style="margin-left: 40px">From</span>
                  </td>
                  <td style="width: 165px">
                    <span style="margin-left: 40px">To</span>
                  </td>
                  <td style="width: 65px">CHER</td>
                  <td class="tac" style="width: 165px">Age</td>
                </tr>
              </thead>
              <tbody class="fz14" style="text-indent: 3px">
                <tr v-for="(v, i) in detailData" :key="i">
                  <td>
                    <span class="elli22">
                      {{ v.blockHash }}
                    </span>
                  </td>
                  <td class="tac" style="width: 65px">
                    {{ v.blockNumber }}
                  </td>
                  <td style="width: 165px">
                    <span class="elli22" style="margin-left: 40px">{{
                      v.from
                    }}</span>
                  </td>
                  <td style="width: 165px">
                    <span class="elli22" style="margin-left: 40px">{{
                      v.to
                    }}</span>
                  </td>
                  <td class="tac" style="width: 65px">0</td>
                  <td style="width: 165px; text-align: right">
                    {{ deltaT(v.timestamp * 1000) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script setup>
import { getTransation, getWebrelay, getContract } from "@/api/index";
import searchFor from "../../components/search/index.vue";
import footerBar from "../../components/footer/index.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const option = ref("");
const searchForm = reactive({
  search: "",
});
const formInline = reactive({
  option: "",
});
const blockNumber = $route.query.blockNumber;
const detailData = reactive([]);
const addrHash = ref("");
const contractData = reactive({});
const abi = ref("");
const to = $route.query.to;
const symbol = ref(localStorage.getItem("symbol"));
// const source = reactive(JSON.parse(localStorage.getItem(source)));

// const goHome = (pane) => {
//   if (pane.props.label == "Home") {
//     $router.push("/Home");
//   } else if (pane.props.label == "Tokens") {
//     $router.push("/token");
//   } else if (pane.props.label == "NFT") {
//     $router.push("/nft");
//   }
// };
// 处理时间函数
const deltaT = (faultDat) => {
  var stime = Date.parse(new Date(faultDat));
  var etime = Date.parse(new Date());
  // 两个时间戳相差的毫秒数
  var usedTime = etime - stime;
  // 计算相差的天数
  const days = Math.floor(usedTime / (24 * 3600 * 1000));
  // 计算天数后剩余的毫秒数
  var leave1 = usedTime % (24 * 3600 * 1000);
  // 计算出小时数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算小时数后剩余的毫秒数
  var leave2 = leave1 % (3600 * 1000);
  // 计算相差分钟数
  var minutes = Math.floor(leave2 / (60 * 1000));
  // 计算分钟数侯剩余毫秒数
  var leave3 = leave2 % (3600 * 1000);
  var second = Math.floor(leave3 / (60 * 1000));
  var time = days + " " + "days" + "," + minutes + " " + "mins ago";
  return time;
};
onMounted(async () => {
  await getTransation().then((res) => {
    res.data.result.filter((v) => {
      if (v.blockNumber === blockNumber) {
        detailData.push(v);
      }
    });
    addrHash.value = detailData[0].to;
  });

  getContract({
    addr: addrHash.value,
    action: "find",
  }).then((res) => {
    contractData.value = res.data.result;
    abi.value = JSON.stringify(res.data.result.abi);
  });

  getWebrelay({
    addr: addrHash.value,
    options: ["balance"],
  }).then((res) => {
    console.log(res);
  });
});
// export default {
//   data() {
//     return {
//       activeName: "first",
//       option: "",
//       searchForm: {
//         search: "",
//       },
//       data: this.$route.query.blockNumber,
//       detailData: [],
//       addrHash: "",
//       contractData: {},
//       abi: [],
//       to: this.$route.query.to,
//     };
//   },
//   components: {
//     footerBar,
//     searchFor,
//   },
//   methods: {
//     deltaT(faultDat) {
//       var stime = Date.parse(new Date(faultDat));
//       var etime = Date.parse(new Date());
//       // 两个时间戳相差的毫秒数
//       var usedTime = etime - stime;
//       // 计算相差的天数
//       const days = Math.floor(usedTime / (24 * 3600 * 1000));
//       // 计算天数后剩余的毫秒数
//       var leave1 = usedTime % (24 * 3600 * 1000);
//       // 计算出小时数
//       const hours = Math.floor(leave1 / (3600 * 1000));
//       // 计算小时数后剩余的毫秒数
//       var leave2 = leave1 % (3600 * 1000);
//       // 计算相差分钟数
//       var minutes = Math.floor(leave2 / (60 * 1000));
//       var time = days + " " + "days" + "," + hours + " " + "hours ago";
//       return time;
//     },
//     getAddrData() {
//       getAddr().then((res) => {
//         // console.log(res);
//       });
//     },
//     goHome(pane) {
//       if (pane.props.label == "Home") {
//         this.$router.push("/Home");
//       } else if (pane.props.label == "Tokens") {
//         this.$router.push("/token");
//       } else if (pane.props.label == "NFT") {
//         this.$router.push("/nft");
//       }
//     },
//   },
//   async mounted() {
//     await getTransation().then((res) => {
//       res.data.result.filter((v) => {
//         if (v.blockNumber === this.data) {
//           this.detailData.push(v);
//         }
//       });
//       this.addrHash = this.detailData[0].to;
//     });

//     getContract({
//       addr: this.addrHash,
//       action: "find",
//     }).then((res) => {
//       this.contractData = res.data.result;
//       this.abi = JSON.stringify(res.data.result.abi);
//     });
//   },
//   created() {
//     this.getAddrData();
//   },
// };
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin: 0 auto;
}
::v-deep .el-button {
  width: 60px;
  height: 30px;
  background: #efefef;
}
::v-deep .el-tabs__nav-scroll {
  margin-top: 30px;
  margin-right: 15%;
  float: right;
  font-size: 24px !important;
}
::v-deep .el-tabs__item {
  font-size: 20px;
  color: #6b778c;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.to {
  font-family: "pingfang";
  .top {
    color: slategray;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .btns {
    > div {
      width: 180px;
      height: 57px;
      border-radius: 29px;
      background: #fff;
      color: #02204e;
      &.active {
        background: #02204e;
        color: #fff;
      }
    }
  }
  .contents {
    color: #02204e;
    .first {
    }
    table {
      width: 1200px;
      text-indent: 10px;
      border: 1px solid #d6e5e9;
      border-collapse: collapse;
      tr {
        border: 1px solid #d6e5e9;
        padding: 10px;
      }
    }
  }
}
</style>