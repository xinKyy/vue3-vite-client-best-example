<template>
  <div class="to">
    <div class="search df aic jcsb p20 bsbb container">
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
        @tab-click="goHome"
        v-model="activeName"
        tabPosition="top"
        class="demo-tabs fz24"
      >
        <el-tab-pane label="Home" name="first" class="first container">
          <div class="container">
            <div class="top">OverView</div>
            <div class="content">
              <div class="data df aic jcsb mt20 fz14">
                <div class="df fdc">
                  <p class="b1"><span>49999986.5180</span> CHER</p>
                  <P class="b3 fw7">CHER Balance ?</P>
                </div>
              </div>
              <div class="mt20">
                <span>1 &nbsp;</span>
                <span class="b3 fw7">Transactions</span>
              </div>
              <div class="change mt60">
                <el-tabs v-model="activeName" class="demo-tabs">
                  <el-tab-pane
                    label="Transaction"
                    name="first"
                    class="first df fdc"
                  >
                    <div class="df aic jcsb mb20">
                      <div class="df aic" style="height: 42px">
                        <el-form
                          :inline="true"
                          :model="formInline"
                          class="demo-form-inline"
                          style="width: 60px"
                        >
                          <el-form-item>
                            <el-select v-model="formInline.region">
                              <el-option label="10" value="10" />
                              <el-option label="20" value="20" />
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
                            <el-input v-model="searchForm.search" />
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                    <table class="fw5">
                      <thead
                        class="b1"
                        style="
                          background: #eef5f9;
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
                          <td style="width: 65px">CHER</td>
                          <td class="tac" style="width: 165px">Age</td>
                        </tr>
                      </thead>
                      <tbody class="fz14" style="text-indent: 3px">
                        <tr v-for="(v, i) in 8" :key="i">
                          <td class="b3">
                            <span class="elli22">
                              0x0d5548465323626541121564646541654564126846
                            </span>
                          </td>
                          <td class="b3 tac" style="width: 65px">13</td>
                          <td class="b1" style="width: 165px">
                            <span class="elli22" style="margin-left: 40px"
                              >0x0d554846532362654112123454</span
                            >
                          </td>
                          <td class="b3" style="width: 165px">
                            <span class="elli22" style="margin-left: 40px"
                              >0x0d554846532362654112123454</span
                            >
                          </td>
                          <td class="b1 tac" style="width: 65px">0</td>
                          <td
                            class="b1"
                            style="width: 165px; text-align: right"
                          >
                            3 days,23 hours
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="df aic jcsb mt10">
                      <p class="fw7 b1 fz14">Showing 1 to 1 of 1entries</p>
                      <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="10"
                      />
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"> </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14"> </el-tab-pane>
      </el-tabs>
    </div>
    <footer-bar class="mt60"></footer-bar>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getAddr } from "@/api/index";
import { useRouter } from "vue-router";
import footerBar from "../../components/footer/index.vue";
const $router = useRouter();
const activeName = ref("first");
const formInline = reactive({
  region: "20",
});
const from = useRouter().from;
console.log(from);
const searchForm = reactive({
  search: "",
});
const getData = () => {
  getAddr({
    addr: "",
    colums: [],
    count: 17,
    draw: 1,
    length: 20,
    order: [],
    search: {},
    start: 0,
  }).then((res) => {
    console.log(res);
  });
};
getData();
const goHome = (pane) => {
  if (pane.props.label == "Home") {
    $router.push("/Home");
  } else if (pane.props.label == "Tokens") {
    $router.push("/token");
  } else if (pane.props.label == "NFT") {
    $router.push("/nft");
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin: 0 auto;
}
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
  margin-right: 350px;
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
  .top {
    color: slategray;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .content {
    .change {
      .first {
        table {
          border: 1px solid #d6e5e9;
          border-collapse: collapse;
          tr {
            border: 1px solid #d6e5e9;
          }
          tbody {
            tr:nth-child(odd) {
              background: #eef5f9;
            }
            tr:nth-child(even) {
              background: #fafcfd;
            }
            tr {
              height: 30px;
            }
          }
        }
      }
    }
  }
}
</style>