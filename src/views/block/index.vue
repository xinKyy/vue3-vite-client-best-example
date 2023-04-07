<template>
  <div class="transactions">
    <search-for></search-for>
    <div class="change mb60">
      <el-tabs
        v-model="activeName"
        @tab-click="goHome"
        tabPosition="top"
        class="demo-tabs fz24"
      >
        <el-tab-pane label="Home" name="first" class="first fz18 container">
          <p class="fz30 mb40 mt40">
            Block
            <span class="fz16" style="color: #999">{{
              pickOne.blockTime
            }}</span>
          </p>
          <div class="detail df fdc">
            <div class="item bsbb df jcsb">
              <p>Block Height :</p>
              <h4>{{ one.number }}</h4>
            </div>
            <div class="item bsbb df jcsb">
              <p>TimeStamp :</p>
              <h4>{{ deltaTS(one.timestamp * 1000) }} block confirmations</h4>
            </div>
            <div class="item bsbb df jcsb">
              <p>Hash :</p>
              <h4>{{ one.hash }}</h4>
            </div>
            <div class="item bsbb df jcsb">
              <p>Parent Hash :</p>
              <h4>
                {{ one.parentHash }}
              </h4>
            </div>
            <div class="item bsbb df jcsb">
              <p>Sha3Uncles :</p>
              <h4 class="b3">
                {{ one.sha3Uncles }}
              </h4>
            </div>
            <div class="item bsbb df jcsb">
              <p>Mined by :</p>
              <h4 class="b3">{{ one.miner }}</h4>
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
              <textarea
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
              ></textarea>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"></el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14"> </el-tab-pane>
      </el-tabs>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script setup>
import footerBar from "../../components/footer/index.vue";
import searchFor from "../../components/search/index.vue";
import { getBlock } from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const activeName = ref("first");
const from = $route.query.from;
const blockData = reactive([]);
const pickOne = reactive({});
const one = reactive({
  blockTime: "",
  difficulty: "",
  extraData: "",
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
  timestamp: "",
  totalDifficulty: "",
  transactionsRoot: "",
  txn: "",
  uncles: [],
});
const symbol = ref(localStorage.getItem("symbol"));
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
const goHome = (pane) => {
  if (pane.props.label == "Home") {
    $router.push("/Home");
  } else if (pane.props.label == "Tokens") {
    $router.push("/token");
  } else if (pane.props.label == "NFT") {
    $router.push("/nft");
  }
};
onMounted(() => {
  getBlock().then(async (res) => {
    blockData.value = res.data.result;
    pickOne.value = blockData.value.splice(0, 1);
    pickOne.value.forEach((v) => {
      one.blockTime = v.blockTime;
      one.difficulty = v.difficulty;
      one.extraData = v.extraData;
      one.gasLimit = v.gasLimit;
      one.gasUsed = v.gasUsed;
      one.hash = v.hash;
      one.logsBloom = v.logsBloom;
      one.miner = v.miner;
      one.nonce = v.nonce;
      one.number = v.number;
      one.parentHash = v.parentHash;
      one.receiptRoot = v.receiptRoot;
      one.sha3Uncles = v.sha3Uncles;
      one.size = v.size;
      one.stateRoot = v.stateRoot;
      one.timestamp = v.timestamp;
      one.totalDifficulty = v.totalDifficulty;
      one.transactionsRoot = v.transactionsRoot;
      one.txn = v.txn;
      one.uncles = v.uncles;
    });
    // blockData.value.forEach((v) => {
    //   if (v.hash == from.value) {
    //     pickOne.push(v);
    //   }
    // });
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
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.transactions {
  height: 100%;
  font-family: "pingfang";
  .change {
    .first {
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
        }
        .item:hover {
          background: #eef1f5;
        }
      }
    }
  }
}
</style>