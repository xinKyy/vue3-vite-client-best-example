<template>
  <div class="transactions">
    <search-for></search-for>
    <div class="btns df aic container">
      <div class="btn df aic jcc mr20" id="one" @click="$router.push('/Home')">
        <span class="iconfont icon-home fz28 mr10"></span>
        <span class="fz18 fw7">HOME</span>
      </div>
      <div class="btn df aic jcc mr20 active" @click="$router.push('/token')">
        <span class="iconfont icon-token fz28 mr10"></span>
        <span class="fz18 fw7">TOKENS</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/nft')">
        <span class="iconfont icon-Wallet fz28 mr10"></span>
        <span class="fz18 fw7">NFT</span>
      </div>
    </div>
    <div class="contents container mt60 mb60">
      <div class="item"></div>
      <div class="item second on">
        <p class="fz30 mb40 mt40">
          Block
          <span class="fz16" style="color: #999">{{ Num }}</span>
        </p>
        <div class="detail df fdc">
          <div class="item bsbb df jcsb">
            <p>Block Height :</p>
            <h4 class="df aic">
              <span class="df aic btne jcc" @click="Prev" v-if="Num != 0">
                <el-icon>
                  <ArrowLeft />
                </el-icon>
                Prev</span>
              <span style="margin: 0 20px">{{ one.number }}</span>
              <span class="df aic btne jcc" @click="Next">Next <el-icon>
                  <ArrowRight />
                </el-icon>
              </span>
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>TimeStamp :</p>
            <h4>{{ one.timestamp }}</h4>
            <!-- <h4>{{ deltaTS(one.timestamp * 1000) }} block confirmations</h4> -->
          </div>
          <div class="item bsbb df jcsb">
            <p>Hash :</p>
            <h4>{{ one.hash }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Parent Hash :</p>
            <h4 class="b3 hovers">
              {{ one.parentHash }}
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Sha3Uncles :</p>
            <h4>
              {{ one.sha3Uncles }}
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Mined by :</p>
            <h4 class="b3 hovers" @click="goAddr(one.miner)">
              {{ one.miner }}
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Difficulty :</p>
            <h4>
              <span> {{ one.difficulty }}</span>
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Total Difficulty :</p>
            <h4>{{ one.totalDifficulty }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Gas Limit :</p>
            <h4>{{ one.gasLimit }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Gas Used :</p>
            <h4>{{ one.gasUsed }}</h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Gas Price:</p>
            <h4>
              <span>{{ one.gasPriceEther }}</span> {{ symbol }} (
              <span>{{ one.gasPriceGwei }}</span> Gwei)
            </h4>
          </div>
          <div class="item bsbb df jcsb">
            <p>Nonce :</p>
            <h4>{{ one.nonce }}</h4>
          </div>
          <div class="item bsbb df">
            <p style="width: 450px">Extra Data:</p>
            <!-- <textarea
              class="fz16 wrap"
              style="
                background: #f5f5f5;
                border-radius: 10px;
                overflow-y: scroll;
              "
              name="code"
              id="1"
              cols="105"
              rows="5"
              v-model="one.extraData"
            ></textarea> -->
            <div class="text p10 bsbb">{{ one.extraData }}</div>
          </div>
        </div>
      </div>
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
          MSK
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import searchFor from "../../components/search/index.vue";
import { getBlock } from "@/api/index";
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
const $router = useRouter();
const $route = useRoute();
const blockData = reactive({});
const pickOne = reactive({});
const one = reactive({
  blockTime: "",
  difficulty: "0.00H",
  extraData: "(Hex:)",
  gasLimit: "",
  gasUsed: "",
  hash: "",
  logsBloom: "",
  miner: "",
  nonce: "",
  number: "",
  parentHash: "",
  receiptRoot: "",
  sha3Uncles: "",
  size: "",
  stateRoot: "",
  timestamp: "ago(null)",
  totalDifficulty: "0.00H",
  transactionsRoot: "",
  txn: "",
  uncles: [],
});
const symbol = ref(localStorage.getItem("symbol"));
const n = $route.query.n;
const Num = ref(1);
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
const Prev = () => {
  if (one.number == 0) {
    ElMessage.error("Oops, don't have any more data.");
  } else {
    getBlock({ block: Num.value - 1 + "" }).then(async (res) => {
      blockData.value = res.data.result;
      one.blockTime = res.data.result.blockTime;
      one.difficulty = res.data.result.difficulty;
      one.extraData = res.data.result.extraData;
      one.gasLimit = res.data.result.gasLimit;
      one.gasUsed = res.data.result.gasUsed;
      one.hash = res.data.result.hash;
      one.logsBloom = res.data.result.logsBloom;
      one.miner = res.data.result.miner;
      one.nonce = res.data.result.nonce;
      one.number = res.data.result.number;
      one.parentHash = res.data.result.parentHash;
      one.receiptRoot = res.data.result.receiptRoot;
      one.sha3Uncles = res.data.result.sha3Uncles;
      one.size = res.data.result.size;
      one.stateRoot = res.data.result.stateRoot;
      one.timestamp = res.data.result.timestamp;
      one.totalDifficulty = res.data.result.totalDifficulty;
      one.transactionsRoot = res.data.result.transactionsRoot;
      one.txn = res.data.result.txn;
      one.uncles = res.data.result.uncles;
      Num.value = res.data.result.number;
    });
  }
};
const Next = () => {
  getBlock({ block: Num.value + 1 + "" }).then(async (res) => {
    blockData.value = res.data.result;
    one.blockTime = res.data.result.blockTime;
    one.difficulty = res.data.result.difficulty;
    one.extraData = res.data.result.extraData;
    one.gasLimit = res.data.result.gasLimit;
    one.gasUsed = res.data.result.gasUsed;
    one.hash = res.data.result.hash;
    one.logsBloom = res.data.result.logsBloom;
    one.miner = res.data.result.miner;
    one.nonce = res.data.result.nonce;
    one.number = res.data.result.number;
    one.parentHash = res.data.result.parentHash;
    one.receiptRoot = res.data.result.receiptRoot;
    one.sha3Uncles = res.data.result.sha3Uncles;
    one.size = res.data.result.size;
    one.stateRoot = res.data.result.stateRoot;
    one.timestamp = res.data.result.timestamp;
    one.totalDifficulty = res.data.result.totalDifficulty;
    one.transactionsRoot = res.data.result.transactionsRoot;
    one.txn = res.data.result.txn;
    one.uncles = res.data.result.uncles;
    Num.value = res.data.result.number;
  });
};
const goAddr = (n) => {
  $router.push({
    path: "/from",
    query: {
      from: n,
    },
  });
};
onMounted(() => {
  getBlock({ block: n }).then(async (res) => {
    blockData.value = res.data.result;
    one.blockTime = res.data.result.blockTime;
    one.difficulty = res.data.result.difficulty;
    one.extraData = res.data.result.extraData;
    one.gasLimit = res.data.result.gasLimit;
    one.gasUsed = res.data.result.gasUsed;
    one.hash = res.data.result.hash;
    one.logsBloom = res.data.result.logsBloom;
    one.miner = res.data.result.miner;
    one.nonce = res.data.result.nonce;
    one.number = res.data.result.number;
    one.parentHash = res.data.result.parentHash;
    one.receiptRoot = res.data.result.receiptRoot;
    one.sha3Uncles = res.data.result.sha3Uncles;
    one.size = res.data.result.size;
    one.stateRoot = res.data.result.stateRoot;
    one.timestamp = res.data.result.timestamp;
    one.totalDifficulty = res.data.result.totalDifficulty;
    one.transactionsRoot = res.data.result.transactionsRoot;
    one.txn = res.data.result.txn;
    one.uncles = res.data.result.uncles;
    Num.value = res.data.result.number;
    console.log(Num.value);
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
    color: #02204e;

    .second {
      .detail {
        .item {
          border-top: 1px solid #ddd;
          padding: 15px 10px;

          p {
            width: 33%;
          }

          h4 {
            text-align: left;
            width: 67%;
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
          }

          .btne {
            width: 80px;
            height: 40px;
            background: #659be0;
            color: #fff;
            font-family: "ding";
          }

          .btne:hover {
            background: #3a80d7;
          }

          .hovers:hover {
            text-decoration: underline;
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
}</style>