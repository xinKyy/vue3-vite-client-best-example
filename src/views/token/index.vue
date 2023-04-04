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
        <el-tab-pane label="Tokens" name="second" class="second fz16 container">
          <p class="fz30 b1 mt20 fw7" style="margin-left: 50px">Tokens</p>
          <div class="content p10 bsbb mt40 df fdc">
            <div class="list df fdc">
              <div class="item p10 bsbb df">
                <span class="b4" style="margin-right: 100px">AA(BB)</span>
                <span
                  class="hover"
                  style="color: #33a6dc"
                  @click="goTokenDetail"
                  >{{ tokens }}</span
                >
                <!-- <span></span> -->
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14"> </el-tab-pane>
      </el-tabs>
    </div>
    <footer-bar class="mt60"></footer-bar>
  </div>
</template>

<script>
import Token from "@/common/token.json";
import footerBar from "../../components/footer/index.vue";
export default {
  data() {
    return {
      input: "",
      activeName: "second",
      tokens: Token[0].address,
    };
  },
  components: {
    footerBar,
  },
  methods: {
    goTokenDetail() {
      this.$router.push({
        path: "/tokenDetail",
        query: {
          tokens: this.tokens,
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
  },
  created() {},
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
.home {
  font-family: "pingfang";
  height: 100%;
  .search {
    text-align: right !important;
    .el-input {
      width: 400px;
    }
  }
  .change {
    .second {
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