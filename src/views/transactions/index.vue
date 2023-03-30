<template>
  <div class="transactions">
    <div class="search df aic jcsb p10 bsbb container">
      <img src="../../assets/images/explorer-logo.png" style="width: 200px" />
      <div class="df">
        <el-input
          class="mr20"
          v-model="input"
          placeholder="Search by Address/Txhash/BlockNum/BlockHash"
        />
        <el-button>搜索</el-button>
      </div>
    </div>
    <div class="change">
      <el-tabs v-model="activeName" tabPosition="top" class="demo-tabs fz24">
        <el-tab-pane
          label="Home"
          name="first"
          class="first fz18 container"
          @tab-click="goHome"
        >
          <p class="fz30 mb40 mt40">
            Transaction
            <span class="fz16" style="color: #999">{{
              this.transactionArr.hash
            }}</span>
          </p>
          <div class="detail df fdc">
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Transaction Hash:</p>
              <h4>{{ transactionArr.hash }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Status:</p>
              <h4 :class="transactionArr.status == 1 ? 'green' : 'red'">
                {{ this.stat }}
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Block:</p>
              <h4>
                <span class="b3 mr20">{{ transactionArr.blockNumber }}</span>
                <span>-14 block confirmations</span>
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">TimeStamp:</p>
              <h4>
                {{ deltaT(transactionArr.timestamp * 1000) }}
                (2013-03-16 14:19:49 +0800)
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">From:</p>
              <h4 class="b3" @click="goFromAddr(transactionArr.from)">
                {{ transactionArr.from }}
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">To:</p>
              <h4 class="b3" @click="goTo(v)">{{ transactionArr.to }}</h4>
              <p></p>
            </div>
            <!-- <div class="item bsbb df jcsb">
              <p style="width: 300px">Value:</p>
              <h4 class="b3"></h4>
              <p></p>
            </div> -->
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Transaction fee:</p>
              <h4>
                <span>{{ transactionArr.txFee }}</span> CHER
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Gas Limit:</p>
              <h4>{{ transactionArr.gasUsed }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Gas Used by Transaction:</p>
              <h4>{{ transactionArr.gasUsed }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">Gas Price:</p>
              <h4>
                <span>{{ transactionArr.gasPriceEther }}</span> CHER (
                <span>{{ transactionArr.gasPriceGwei }}</span> Gwei)
              </h4>
              <p></p>
            </div>
            <div class="item bsbb df jcsb">
              <p style="width: 300px">None:</p>
              <h4>{{ transactionArr.nonce }}</h4>
              <p></p>
            </div>
            <div class="item bsbb df">
              <p style="width: 450px">Input Data:</p>
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
                v-model="transactionArr.input"
              ></textarea>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"
          >Tokens</el-tab-pane
        >
        <el-tab-pane label="NFT" name="third" class="third fz14">
          <div class="content p10 bsbb mt40">
            <div class="list df fdc">
              <div class="item p10 bsbb df jcsb">
                <span style="color: #69a1b3">A1(B1)</span>
                <span style="color: #09c"
                  >0x6d3a5e7080e8e6bf841c8315674645854654654</span
                >
                <span></span>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getTransactionDetail } from "@/api/index";
export default {
  data() {
    return {
      input: "",
      activeName: "first",
      hash: this.$route.query.hash,
      transactionArr: [],
      detailData: {},
      stat: "",
      // hash: "",
    };
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
    goTo(n) {
      this.$router.push({
        path: "/to",
        query: {
          blockNumber: n.blockNumber,
        },
      });
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
    goFromAddr(n) {
      this.$router.push({
        path: "/from",
        query: {
          from: n,
        },
      });
    },
  },
  created() {},
  async mounted() {
    getTransactionDetail({ tx: this.hash }).then((res) => {
      this.transactionArr = res.data.result;
      if (this.transactionArr.status == 1) {
        this.stat = "Success";
      } else if (this.transactionArr.status == 0) {
        this.stat = "Fail";
      }
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
    .second {
    }
    .third {
      .content {
        .list {
          .item {
            border-top: 1px solid #ddd;
            width: 80%;
            height: 100px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>