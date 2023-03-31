<template>
  <div class="home">
    <div class="search df aic jcsb p20 bsbb container">
      <img src="../../assets/images/explorer-logo.png" style="width: 200px" />
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
        <el-tab-pane label="Tokens" name="second" class="second container">
          <p class="fz30 b1 mt20" style="margin-left: 50px">Tokens</p>
          <div class="content p10 bsbb mt40 df fdc">
            <div class="list df fdc fz16">
              <div class="item p10 bsbb df jcsb">
                <span class="b3" style="margin-right: 120px">AA(BB)</span>
                <span class="b2 hover" @click="goTokenDetail">{{
                  tokens
                }}</span>
                <span></span>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      activeName: "second",
      tokens: "0x86C827222356C4F4af5851a4B4C3Cc9fCaE60e46",
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