<template>
  <div class="home container">
    <div class="search df aic jcsb p20 bsbb">
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
      <el-tabs
        v-model="activeName"
        tabPosition="top"
        class="demo-tabs fz24"
        @tab-click="goHome"
      >
        <el-tab-pane label="Home" name="first" class="first"></el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"> </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz16">
          <p class="fz30 b1 mt20" style="margin-left: 50px">NFT</p>
          <div class="content p10 bsbb mt40 df fdc">
            <div class="list df fdc">
              <div class="item p10 bsbb df jcsb">
                <span class="b4">A1(B1)</span>
                <span
                  class="hover"
                  style="color: #33a6dc"
                  @click="goNftDetail"
                  >{{ nft }}</span
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
import NFT from "@/common/nft.json";
import { getBlock, getTransation } from "@/api/index";
export default {
  data() {
    return {
      input: "",
      activeName: "third",
      blockArr: [],
      transactionArr: [],
      nft: NFT[0].address,
    };
  },
  methods: {
    getBlockData() {
      getBlock().then((res) => {
        this.blockArr = res.data.result;
      });
    },
    getTransationData() {
      getTransation().then((res) => {
        this.transactionArr = res.data.result;
      });
    },
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
    goNftDetail() {
      this.$router.push({
        path: "/nftDetail",
        query: {
          nft: this.nft,
        },
      });
    },
  },
  created() {
    this.getBlockData();
    this.getTransationData();
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
.home {
  height: 100%;
  .search {
    text-align: right !important;
    .el-input {
      width: 400px;
    }
  }
  .change {
    .first {
      .topData {
        p {
          font-size: 16px;
          color: #6b778c;
          margin-top: 5px;
        }
      }
      .contentData {
        width: 100%;
        > div {
          width: 40%;
          height: 600px;
        }
        .left {
          .list {
            overflow-y: scroll;
            height: 400px;
            .item {
              background: #effbfb;
              width: 100%;
              height: 100px;
              border-left: 4px solid #3cc;
              color: #3cc;
            }
          }
        }
        .right {
          .list {
            overflow-y: scroll;
            height: 400px;
            .item {
              width: 100%;
              height: 90px;
              border-bottom: 1px solid #ddd;
              .a1 {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; /*加宽度width属来兼容部分浏览*/
              }
              .a2 {
                width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; /*加宽度width属来兼容部分浏览*/
              }
            }
          }
        }
      }
    }
    .second {
      .list {
        .item {
          border-top: 1px solid #999;
          .hover:hover {
            color: #666;
            text-decoration: underline;
          }
        }
      }
    }
    .third {
      .content {
        .list {
          .item {
            border-top: 1px solid #ddd;
            width: 80%;
            height: 100px;
            margin: 0 auto;
            .hover:hover {
              color: #666 !important;
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>