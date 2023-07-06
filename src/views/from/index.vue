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
        <div class="container data">
          <p class="fz30 mb40 mt20">
            <span class="mr10 fz30 fw7"> Address</span>
            <span class="fz20">{{ from }}</span>
          </p>
          <div class="p10 bsbb">
            <div class="top fz20">OverView</div>
            <div class="content">
              <div class="df aic jcsb mt20">
                <div class="df fdc">
                  <p class="fz24">
                    <!-- <span>{{ toThousands(balance) }}</span> {{ symbol }} -->
                  </p>
                  <p class="fw7 fz20 mt20">{{ symbol }} Balance ?</p>
                </div>
              </div>
              <div class="mt20 fz20">
                <span>{{ web3relay.count }} &nbsp;</span>
                <span class="fw7">Transactions</span>
              </div>
              <div class="mt60 table">
                <div style="border-bottom: 1px solid #02204e">
                  <span
                    class="p15 bsbb fz20 fw7"
                    style="border-bottom: 5px solid #02204e"
                    >Transacions</span
                  >
                </div>
                <div style="height: 100%">
                  <div class="df aic jcsb mt20 mb20">
                    <div class="df aic" style="height: 42px">
                      <el-form
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                        style="width: 60px"
                      >
                        <el-form-item>
                          <el-select v-model="formInline.num">
                            <el-option label="10" value="10" />
                            <el-option label="20" value="20" />
                            <el-option label="50" value="50" />
                            <el-option label="100" value="100" />
                            <el-option label="500" value="500" />
                          </el-select>
                        </el-form-item>
                      </el-form>
                      <span style="margin-left: 13px">transaction</span>
                    </div>
                    <div>
                      <el-form
                        :inline="true"
                        :model="searchForm"
                        class="demo-form-inline"
                      >
                        <el-form-item
                          label="Search :"
                          style="width: 300px"
                          class="fw7"
                        >
                          <el-input
                            v-model="searchForm.search"
                            @blur="goSearch"
                          />
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                  <div style="width: 100%">
                    <table class="fw5">
                      <thead
                        class=" "
                        style="
                          color: #fff;
                          background: #02204e;
                          height: 40px;
                          text-indent: 10px;
                        "
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
                          <td style="width: 65px">{{ symbol }}</td>
                          <td class="tac" style="width: 165px">Age</td>
                          <td class=" "></td>
                        </tr>
                      </thead>
                      <tbody
                        class="fz14"
                        v-show="tableData.value"
                        style="text-indent: 3px; position: relative"
                      >
                        <!-- <div
                          style="width: 100% !important"
                          id="center"
                          class="df aic jcc"
                        >
                          No transactions found
                        </div> -->
                        <tr v-for="(v, i) in tableData.value" :key="i">
                          <td>
                            <span class="elli22" @click="goTransaction(v)">
                              {{ v[0] }}
                            </span>
                          </td>
                          <td
                            class="tac"
                            style="width: 65px"
                            @click="goBlock(v[1])"
                          >
                            {{ v[1] }}
                          </td>
                          <td style="width: 165px">
                            <span class="elli22" style="margin-left: 40px">{{
                              v[2]
                            }}</span>
                          </td>
                          <td style="width: 165px">
                            <span class="elli22" style="margin-left: 40px">{{
                              v[3]
                            }}</span>
                          </td>
                          <td class="tac" style="width: 65px">
                            {{ v[4] }}
                          </td>
                          <td style="width: 165px; text-align: right">
                            {{ deltaT(v[6] * 1000) }}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="df aic jcsb mt60">
                    <p class="fw7 fz14">Showing 1 to 1 of 1entries</p>
                    <el-pagination
                      background
                      @current-change="changeDraw"
                      layout="prev, pager, next"
                      :total="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="footer mt60">
      <div class="container shallow bsbb df">
        <div class="df fdc mr-5">
          <p class="mb20 fz18 fw7" style="color: #44b6ae">ABOUT</p>
          <p style="color: #a2abb7" class="fz16 mb10">
            This is an open source Blockchain Explorer.
          </p>
          <img
            src="../../assets/images/powered-by-etcexplorer-w.png"
            style="width: 157px; height: 51px"
          />
        </div>
        <div class="df fdc">
          <p class="mb20 fz18 fw7" style="color: #44b6ae">FOLLOW US ON</p>
        </div>
      </div>
      <div class="deep mt40 df aic">
        <div class="container" style="color: #a2abb7">
          MSK
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { getAddr, getWebrelay, getContract } from "@/api/index";
import searchFor from "../../components/search/index.vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const formInline = reactive({
  num: 20,
  draw: 1,
  start: 0,
});
const from = $route.query.from;
const searchForm = reactive({
  search: "",
});
const tableData = reactive([]);
const web3relay = reactive({
  balance: "",
  count: "",
  bytecode: "",
  isContract: "",
});
const balance = ref(null);
const totalCount = ref(null);
const symbol = ref(localStorage.getItem("symbol"));
const getWeb = () => {
  getWebrelay({ addr: from, options: ["balance", "count", "bytecode"] }).then(
    (res) => {
      web3relay.value = res.data;
      web3relay.balance = res.data.balance;
      localStorage.setItem("balance", web3relay.balance);
      web3relay.bytecode = res.data.bytecode;
      balance.value = Number(res.data.balance).toFixed(3);
      web3relay.count = res.data.count;
      web3relay.isContract = res.data.isContract;
      totalCount.value = res.data.count;
    }
  );
};
getWeb();
const len = ref(0);
const goSearch = () => {
  getAddr({
    addr: from,
    colums: [],
    count: 17,
    draw: formInline.draw,
    length: formInline.num,
    order: [],
    search: {
      regex: false,
      value: searchForm.search,
    },
    start: formInline.start,
  }).then((res) => {
    tableData.value = res.data.result.data;
    len.value = res.data.result.data.length;
  });
};
const getData = () => {
  getAddr({
    addr: from,
    colums: [],
    count: 17,
    draw: formInline.draw,
    length: formInline.num,
    order: [],
    search: {},
    start: formInline.start,
  }).then((res) => {
    tableData.value = res.data.result.data;
  });
};
getData();
const changeDraw = (n) => {
  formInline.draw = n;
  formInline.start = (formInline.draw - 1) * formInline.num;
};
watch(formInline, () => {
  getAddr({
    addr: from,
    colums: [],
    count: 17,
    draw: formInline.draw,
    length: formInline.num * 1,
    order: [],
    search: {},
    start: formInline.start,
  }).then((res) => {
    tableData.value = res.data.result.data;
    len.value = res.data.result.data.length;
  });
});
// const toThousands = (num = 0) => {
//   return num.toString().replace(/\d+/, function (n) {
//     return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
//   });
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
  if (days == 0 && hours == 0) {
    var time = minutes + " " + "mins" + "," + second + " " + "seconds";
  } else {
    var time = days + " " + "days" + "," + hours + " " + "hours";
  }
  return time;
};
const goTransaction = (n) => {
  console.log(n[0]);
  $router.push({
    path: "/transactions",
    query: {
      hash: n[0],
    },
  });
};
const fromDetail = reactive({
  ERC: "",
  abi: null,
  address: "",
  blockNumber: "",
  byteCode: "",
  compilerVersion: "",
  contractName: "",
  decimals: 0,
  optimization: "",
  owner: "",
  sourceCode: "",
  symbol: "",
  tokenName: "",
  totalSupply: null,
  valid: false,
});
const getFromDetail = () => {
  getContract({ action: "find", addr: from.value }).then((res) => {
    fromDetail.value = res.data.result;
    fromDetail.ERC = res.data.result.ERC;
    fromDetail.abi = res.data.result.abi;
    fromDetail.address = res.data.result.address;
    fromDetail.byteCode = res.data.result.byteCode;
    fromDetail.compilerVersion = res.data.result.compilerVersion;
    fromDetail.contractName = res.data.result.contractName;
    fromDetail.decimals = res.data.result.decimals;
    fromDetail.optimization = res.data.result.optimization;
    fromDetail.owner = res.data.result.owner;
    fromDetail.sourceCode = res.data.result.sourceCode;
    fromDetail.symbol = res.data.result.symbol;
    fromDetail.tokenName = res.data.result.tokenName;
    fromDetail.totalSupply = res.data.result.totalSupply;
    fromDetail.valid = res.data.result.valid;
  });
};
getFromDetail();
const goBlock = (n) => {
  $router.push({
    path: "/block",
    query: {
      n: n,
    },
  });
};
onMounted(() => {
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
</script>

<style lang="scss" scoped>
::v-deep #center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  border: 1px solid #02204e;
  height: 40px;
}
::v-deep .el-form-item {
  margin: 0 auto;
}
::v-deep .el-input__inner {
  width: 30px;
  height: 30px;
}
::v-deep .el-tabs__item {
  font-size: 20px;
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.to {
  font-family: "pingfang";
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
  .top {
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .contents {
    color: #02204e;
    .first {
      .data {
        table {
          border: 1px solid #02204e;
          border-collapse: collapse;
          width: 100%;
          tr {
            border: 1px solid #02204e;
          }
          tbody {
            tr:nth-child(odd) {
              background: #3a5275;
              color: #fff;
              opacity: 0.7;
            }
            tr:nth-child(even) {
              background: #2d5797;
              color: #fff;
              opacity: 0.7;
            }
            tr {
              height: 40px;
            }
          }
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