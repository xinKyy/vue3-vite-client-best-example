<template>
  <div class="transactions">
    <search-for></search-for>
    <div class="btns df aic container">
      <div class="btn df aic jcc mr20 active" id="one" @click="$router.push('/Home')">
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
      <div class="item on first bsbb">
        <p class="fz30 mb40 mt20 fw7">
          Transaction
          <span class="fz16">{{ transactionArr.hash }}</span>
        </p>
        <div class="detail df fdc">
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Transaction Hash :</p>
            <h4>{{ transactionArr.hash }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Status :</p>
            <h4 :class="transactionArr.status == 1 ? 'green' : 'red'">
              {{ stat }}
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Block :</p>
            <h4 class="df aic">
              <span class="mr10">{{ transactionArr.blockNumber }}</span>
              <el-icon :size="20" class="mr10">
                <CircleCheck />
              </el-icon>
              <span> {{ confirmations }}</span>
            </h4>
          </div>
          <div class="item bsbb df jcsb times">
            <p style="width: 300px">TimeStamp :</p>
            <h4 class="df aic">
              <el-icon :size="20" class="mr10">
                <Clock />
              </el-icon>
              {{ deltaTS(transactionArr.timestamp * 1000) }}
              ({{ now }})
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">From :</p>
            <h4 @click="goFromAddr(transactionArr.from)">
              {{ transactionArr.from }}
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">To :</p>
            <h4 @click="goTo(v)">{{ transactionArr.to }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Transaction fee :</p>
            <h4>
              <span>{{ new Number(transactionArr.txFee).toFixed(6) }}</span>
              {{ symbol }}
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Gas Limit :</p>
            <h4>{{ toThousands(transactionArr.gasUsed) }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Gas Used by Transaction :</p>
            <h4>{{ toThousands(transactionArr.gasUsed) }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Gas Price :</p>
            <h4>
              <span>{{ transactionArr.gasPriceEther }}</span> {{ symbol }} (
              <span>{{ toThousands(transactionArr.gasPriceGwei) }}</span>
              Gwei)
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">None :</p>
            <h4>{{ transactionArr.nonce }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p style="width: 300px">Input Data :</p>
            <div class="text p10 bsbb">{{ transactionArr.input }}</div>
          </div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="footer">
      <div class="container shallow bsbb df">
        <div class="df fdc mr-5">
          <p class="mb20 fz18 fw7" style="color: #44b6ae">ABOUT</p>
          <p style="color: #a2abb7" class="fz16 mb10">
            This is an open source Blockchain Explorer.
          </p>
          <img src="../../assets/images/powered-by-etcexplorer-w.png" style="width: 157px; height: 51px" />
        </div>
        <div class="df fdc">
          <p class="mb20 fz18 fw7" style="color: #44b6ae">FOLLOW US ON</p>
        </div>
      </div>
      <div class="deep mt40 df aic">
        <div class="container" style="color: #a2abb7">
          2019 © Ethereum Classic.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getTransactionDetail } from "@/api/index";
import searchFor from "../../components/search/index.vue";
import footerBar from "../../components/footer/index.vue";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const hash = $route.query.hash;
const transactionArr = reactive({
  blockHash: "",
  blockNumber: "",
  confirmations: null,
  creates: "",
  from: "",
  gas: "",
  gasPrice: "",
  gasPriceEther: "",
  gasPriceGwei: "",
  gasUsed: "",
  hash: "",
  input: "",
  nonce: "",
  status: "",
  timestamp: "",
  to: "",
  transactionIndex: "",
  txFee: "",
  txFeeUSD: "",
  value: "",
  valueUSD: null,
});
const activeName = ref("first");
const detailData = reactive({});
const stat = ref("");
const symbol = localStorage.getItem("symbol");
const now = ref("");
const confirmations = ref("");
// 处理时间函数
const deltaTS = (faultDat) => {
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
  // 计算相差秒数
  var second = Math.floor(leave3 / (60 * 1000));
  var time = minutes + " " + "mins" + "," + second + " " + "seconds ago";
  return time;
};
const getNowTime = () => {
  now.value = new Date();
};
getNowTime();
const goTo = (n) => {
  $router.push({
    path: "/to",
    query: {
      blockNumber: n.blockNumber,
    },
  });
};
const goFromAddr = (n) => {
  $router.push({
    path: "/from",
    query: {
      from: n,
    },
  });
};
const toThousands = (num = 0) => {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
};
const txFee = ref("");
onMounted(() => {
  getTransactionDetail({ tx: hash }).then((res) => {
    transactionArr.value = res.data.result;
    transactionArr.blockHash = res.data.result.blockHash;
    transactionArr.blockNumber = res.data.result.blockNumber;
    transactionArr.confirmations = res.data.result.confirmations;
    transactionArr.creates = res.data.result.creates;
    transactionArr.from = res.data.result.from;
    transactionArr.gas = res.data.result.gas;
    transactionArr.gasPrice = res.data.result.gasPrice;
    transactionArr.gasPriceEther = res.data.result.gasPriceEther;
    transactionArr.gasPriceGwei = res.data.result.gasPriceGwei;
    transactionArr.gasUsed = res.data.result.gasUsed;
    transactionArr.hash = res.data.result.hash;
    transactionArr.input = res.data.result.input;
    transactionArr.nonce = res.data.result.nonce;
    transactionArr.status = res.data.result.status;
    transactionArr.timestamp = res.data.result.timestamp;
    transactionArr.to = res.data.result.to;
    transactionArr.transactionIndex = res.data.result.transactionIndex;
    transactionArr.txFee = res.data.result.txFee;
    transactionArr.txFeeUSD = res.data.result.txFeeUSD;
    transactionArr.value = res.data.result.value;
    transactionArr.valueUSD = res.data.result.valueUSD;

    if (transactionArr.status == 1) {
      stat.value = "Success";
    } else if (transactionArr.status == 0) {
      stat.value = " Failed (Error encountered during transaction !)";
    }
    if (transactionArr.confirmations == 0) {
      confirmations.value = "Pending confirmation";
    } else if (transactionArr.confirmations == "one") {
      confirmations.value = "1 block confirmation";
    } else {
      confirmations.value = "{} block confirmations";
    }
  });

  const btns = document.querySelectorAll(".btns >.btn");
  const contents = document.querySelectorAll(".contents >.item");
  btns.forEach((btn, ind) => {
    btn.addEventListener("click", () => {
      btns.forEach((value, index) => {
        value.classList.remove("active");
        contents[index].classList.remove("on");
      });
      btn.classList.add("active");
      contents[ind].classList.add("on");
    });
  });
});
// export default {
//   data() {
//     return {
//       input: "",
//       activeName: "first",
//       hash: this.$route.query.hash,
//       transactionArr: [],
//       detailData: {},
//       stat: "",
//       symbol: localStorage.getItem("symbol"),
//       now: "",
//       confirmations: "",
//     };
//   },
//   components: {
//     footerBar,
//     searchFor,
//   },
//   methods: {
//     deltaTS(faultDat) {
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
//       // 计算分钟数侯剩余毫秒数
//       var leave3 = leave2 % (3600 * 1000);
//       // 计算相差秒数
//       var second = Math.floor(leave3 / (60 * 1000));
//       var time = minutes + " " + "mins" + "," + second + " " + "seconds ago";
//       return time;
//     },
//     getNowTime() {
//       this.now = new Date();
//       console.log(this.now);
//     },
//     goTo(n) {
//       this.$router.push({
//         path: "/to",
//         query: {
//           blockNumber: n.blockNumber,
//         },
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
//     goFromAddr(n) {
//       this.$router.push({
//         path: "/from",
//         query: {
//           from: n,
//         },
//       });
//     },
//     toThousands(num = 0) {
//       return num.toString().replace(/\d+/, function (n) {
//         return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
//       });
//     },
//   },
//   created() {
//     this.getNowTime();
//   },
//   async mounted() {
//     getTransactionDetail({ tx: this.hash }).then((res) => {
//       this.transactionArr = res.data.result;
//       if (this.transactionArr.status == 1) {
//         this.stat = "Success";
//       } else if (this.transactionArr.status == 0) {
//         this.stat = " Failed (Error encountered during transaction !)";
//       }
//       if (this.transactionArr.confirmations == 0) {
//         this.confirmations = "Pending confirmation";
//       } else if (this.transactionArr.confirmations == "one") {
//         this.confirmations = "1 block confirmation";
//       } else if (this.transactionArr.confirmations == "other") {
//         this.confirmations = "{} block confirmations";
//       }
//     });
//   },
// };
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 300px;
  height: 30px;
}

::v-deep .el-button {
  width: 60px;
  height: 30px;
  background: #efefef;
}

::v-deep .el-tabs__nav-scroll {
  margin-top: 30px;
  margin-right: 20%;
  float: right;
  font-size: 24px !important;
}

::v-deep .el-tabs__item {
  font-size: 20px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.transactions {
  height: 100%;
  font-family: "pingfang";

  .btns {
    >div {
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
    .first {
      background: #fff;
      border-radius: 20px;
      padding: 20px 50px;
      color: #02204e;

      .detail {
        .item {
          border-top: 1px solid #ddd;
          padding: 15px 10px;

          p {
            width: 32%;
            font-weight: 700;
          }

          h4 {
            text-align: left;
            width: 67%;
            font-weight: 600;
          }

          .wrap {
            word-wrap: break-word;
          }

          .text {
            width: 67%;
            height: 106px;
            background: #e2e2e2;
            border-radius: 12px;
            word-wrap: break-word;
            overflow-y: scroll;
          }

          .text::-webkit-scrollbar-track-piece {
            background-color: rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(0, 0, 0, 0);
          }

          .text::-webkit-scrollbar {
            width: 5px;
            height: 13px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }

          .text::-webkit-scrollbar-thumb {
            background-color: gray;
            background-clip: padding-box;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            min-height: 28px;
          }

          .text::-webkit-scrollbar-thumb:hover {
            background-color: gray;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
        }

        .item:hover {
          background: #eef1f5;
        }
      }
    }
  }
}

.footer {
  height: 240px;
  width: 100%;
  background: #1c2437;

  .shallow {
    height: 160px;
    padding: 40px 0 30px 0;
  }

  .deep {
    background: #384053;
    width: 100%;
    height: 80px;
  }
}
</style>