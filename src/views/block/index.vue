<template>
  <div class="transactions">
    <div class="search df aic jcsb p10 bsbb container">
      <img src="../../assets/images/logo.jpg" style="width: 200px" />
      <div class="df">
        <el-input
          class="mr20"
          v-model="input"
          placeholder="Search by Address/Txhash/BlockNum/BlockHash"
        />
        <el-button>搜索</el-button>
      </div>
    </div>
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
              this.pickOne.blockTime
            }}</span>
          </p>
          <div class="detail df fdc">
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Block Height :</p>
              <h4>{{ deltaT(pickOne.timestamp * 1000) }}</h4>
              <p></p>
            </div>
            <!-- <div class="item bsbb df jcsb">
              <p style="width: 300px">TimeStamp :</p>
              <h4 :class="transactionArr.status == 1 ? 'green' : 'red'">
                {{ this.stat }}
              </h4>
              <p></p>
            </div> -->
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Hash :</p>
              <h4>
                <span class="b3 mr20">{{ pickOne.hash }}</span>
                <span>-14 block confirmations</span>
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Parent Hash :</p>
              <h4>
                {{ pickOne.parentHash }}
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Sha3Uncles :</p>
              <h4 class="b3">
                {{ pickOne.sha3Uncles }}
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Mined by :</p>
              <h4 class="b3">{{ pickOne.miner }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Difficulty :</p>
              <h4>
                <span> {{ pickOne.difficulty }}</span>
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Total Difficulty :</p>
              <h4>{{ pickOne.totalDifficulty }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Gas Limit :</p>
              <h4>{{ pickOne.gasLimit }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Gas Used :</p>
              <h4>{{ pickOne.gasUsed }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Gas Price:</p>
              <h4>
                <span>{{ pickOne.gasPriceEther }}</span> CHER (
                <span>{{ pickOne.gasPriceGwei }}</span> Gwei)
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Nonce :</p>
              <h4>{{ pickOne.nonce }}</h4>
              <p></p>
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
                rows="10"
                v-model="pickOne.extraData"
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

<script>
import footerBar from "../../components/footer/index.vue";
import { getBlock } from "@/api/index";
export default {
  data() {
    return {
      input: "",
      activeName: "first",
      from: this.$route.query.from,
      blockData: [],
      pickOne: [],
    };
  },
  components: {
    footerBar,
  },
  methods: {
    // 获取详情
    deltaT(faultDat) {
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
      var time = days + " " + "days" + "," + hours + " " + "hours ago";
      return time;
    },
    goHome(pane) {
      if (pane.props.label == "Home") {
        this.$router.push("/Home");
      } else if (pane.props.label == "Tokens") {
        this.$router.push("/token");
      } else if (pane.props.label == "NFT") {
        this.$router.push("/nft");
      }
    },
  },
  created() {},
  async mounted() {
    getBlock().then(async (res) => {
      this.blockData = res.data.result;
      this.blockData.forEach((v) => {
        if (v.hash == this.from) {
          this.pickOne.push(v);
        }
      });
    });
  },
};
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
  .search {
    text-align: right !important;
    .el-input {
      width: 400px;
    }
  }
  .change {
    .first {
      .detail {
        .item {
          border-top: 1px solid #ddd;
          padding: 15px 10px;
          p {
            width: 30%;
          }
          h4 {
            text-align: left;
            width: 30%;
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