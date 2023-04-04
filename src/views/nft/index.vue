<template>
  <div class="home">
    <div class="search df aic jcsb p10 bsbb container">
      <img src="../../assets/images/logo.jpg" style="width: 200px" />
      <div class="df aic">
        <input
          style="width: 350px; height: 45px; text-indent: 16px"
          type="text"
          class="mr20"
          v-model="input"
          placeholder="Search by Address/Txhash/BlockNum/BlockHash"
        />
        <el-icon size="26"><Search /></el-icon>
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
        <el-tab-pane label="NFT" name="third" class="third fz16 container">
          <p class="fz30 b1 mt20" style="margin-left: 50px">NFT</p>
          <div class="content p10 bsbb mt40 df fdc">
            <div class="list df fdc">
              <div class="item p10 bsbb df">
                <span class="b4" style="margin-right: 100px">A1(B1)</span>
                <span
                  class="hover"
                  style="color: #33a6dc"
                  @click="goNftDetail"
                  >{{ nft }}</span
                >
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <footer-bar class="mt60"></footer-bar>
  </div>
</template>

<script>
import NFT from "@/common/nft.json";
import { getBlock, getTransation } from "@/api/index";
import footerBar from "../../components/footer/index.vue";
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
  components: {
    footerBar,
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
  margin-right: 20%;
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