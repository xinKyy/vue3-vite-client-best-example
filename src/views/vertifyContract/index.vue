<template>
  <div class="home container">
    <div class="search df aic jcsb p20 bsbb">
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
    <div class="change">
      <el-tabs
        v-model="activeName"
        tabPosition="top"
        class="demo-tabs fz24"
        @tab-click="goHome"
      >
        <el-tab-pane label="Home" name="first" class="first"></el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"> </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14">
          <p class="mt20">
            <span class="fw7 b1 fz24">Vertify Contract</span>
            <span class="b1">&ensp;{{ nft }}</span>
          </p>
          <div class="tit mt40 fz24 b1 bsbb">
            <span class="p20 bsbb">Source Code</span>
          </div>
          <div class="content mt40">
            <p class="fz24" style="color: #999">
              Verify and Publish Contract Source Code
            </p>
            <div class="left mt20 fz18 p20 bsbb">
              <p>Enter Contract Source Code below.</p>
              <p class="mt10">
                If the compiled bytecode matches the
                <span class="fw7" style="color: #666">Creation Address</span>
                bytecode, the contract is then
                <span class="fw7" style="color: #666">Verified</span> and will
                be published online.
              </p>
            </div>
            <div class="three df aic jcsb" style="border-top: 1px solid #ddd">
              <div class="df fdc mt10">
                <p>Contract Address</p>
                <div class="mt10">
                  <input type="text" style="width: 300px; height: 40px" />
                </div>
              </div>
              <div class="df fdc mt10">
                <p>Contract Name</p>
                <div class="mt10">
                  <input type="text" style="width: 200px; height: 40px" />
                </div>
              </div>
              <div class="df fdc mt10">
                <p>Compiler</p>
                <div class="mt10">
                  <input type="text" style="width: 200px; height: 40px" />
                </div>
              </div>
              <div class="df fdc mt10">
                <p>Optimization Enabled</p>
                <div class="mt10">
                  <input type="text" style="width: 200px; height: 40px" />
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      activeName: "third",
      nft: this.$route.query.vertify,
      input3: "",
      select: "",
    };
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
    .third {
      .tit {
        width: 100%;
        border-bottom: 1px solid #ddd;
        > span {
          border-bottom: 5px solid #36c6d3;
        }
      }
      .content {
        .left {
          border-left: 5px solid #eeeeee;
        }
        .three {
          > div {
            width: 22%;
            > p {
              color: #666;
              font-weight: 700;
              font-size: 20px;
            }
          }
        }
      }
    }
  }
}
</style>