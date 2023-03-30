<template>
  <div class="to container">
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
          <p class="fz30 mb40 mt20">
            <span class="b1 mr10"> Address</span>
            <span class="fz16" style="color: #999">{{ to }}</span>
          </p>
          <div class="top">Overview</div>
          <div class="content">
            <div class="data df aic jcsb mt20 fz14">
              <div class="df fdc">
                <p class="b1 fz28">0.0000 CHER</p>
                <p class="b3 fw7 fz18 mt10">CHER Balance ?</p>
              </div>
            </div>
            <div class="mt20">
              <span class="b1">0 &nbsp;</span>
              <span class="b3 fw7 fz16">Transactions</span>
            </div>
            <div class="change mt60">
              <div style="border-bottom: 1px solid #ddd">
                <span
                  class="p15 bsbb fz20"
                  style="border-bottom: 5px solid #36c6d3"
                  >Transacions</span
                >
              </div>
              <div class="df aic jcsb mb20 fz18 mt20">
                <div class="df aic" style="height: 42px">
                  <el-form
                    :inline="true"
                    :model="formInline"
                    class="demo-form-inline"
                    style="width: 60px"
                  >
                    <el-form-item>
                      <el-select v-model="option">
                        <el-option label="10" value="10" />
                        <el-option label="20" value="20" />
                        <el-option label="50" value="50" />
                        <el-option label="100" value="100" />
                        <el-option label="500" value="500" />
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <span style="margin-left: 13px">transactions</span>
                </div>
                <div>
                  <el-form
                    :inline="true"
                    :model="searchForm"
                    class="demo-form-inline"
                  >
                    <el-form-item label="Search :" style="width: 300px">
                      <el-input v-model="searchForm.search" />
                    </el-form-item>
                  </el-form>
                </div>
              </div>
              <table class="fw5">
                <thead
                  class="b1"
                  style="background: #fbfcfd; height: 40px; text-indent: 10px"
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
                  <tr v-for="(v, i) in detailData" :key="i">
                    <td class="b3">
                      <span class="elli22">
                        {{ v.blockHash }}
                      </span>
                    </td>
                    <td class="b3 tac" style="width: 65px">
                      {{ v.blockNumber }}
                    </td>
                    <td class="b1" style="width: 165px">
                      <span class="elli22" style="margin-left: 40px">{{
                        v.from
                      }}</span>
                    </td>
                    <td class="b3" style="width: 165px">
                      <span class="elli22" style="margin-left: 40px">{{
                        v.to
                      }}</span>
                    </td>
                    <td class="b1 tac" style="width: 65px">0</td>
                    <td class="b1" style="width: 165px; text-align: right">
                      {{ deltaT(v.timestamp * 1000) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <el-tabs v-model="activeName" class="demo-tabs">
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
                        <el-form-item label="Search :" style="width: 300px">
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
                      <tr v-for="(v, i) in detailData" :key="i">
                        <td class="b3">
                          <span class="elli22">
                            {{ v.blockHash }}
                          </span>
                        </td>
                        <td class="b3 tac" style="width: 65px">
                          {{ v.blockNumber }}
                        </td>
                        <td class="b1" style="width: 165px">
                          <span class="elli22" style="margin-left: 40px">{{
                            v.from
                          }}</span>
                        </td>
                        <td class="b3" style="width: 165px">
                          <span class="elli22" style="margin-left: 40px">{{
                            v.to
                          }}</span>
                        </td>
                        <td class="b1 tac" style="width: 65px">0</td>
                        <td class="b1" style="width: 165px; text-align: right">
                          {{ deltaT(v.timestamp * 1000) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="df aic jcsb mt20">
                    <p>Showing 1 to 1 of 1entries</p>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="10"
                    />
                  </div>
                </el-tab-pane>
                <el-tab-pane label="Contract Source" name="second">
                  <div class="content">
                    <p class="stat mt10">
                      <i style="color: green" class="fa fa-check-circle-o"></i>
                      Contract Source Code Verified
                    </p>
                    <div style="margin-left: 20px" class="fw7 mt60">
                      <div class="mt20">
                        <span class="b3 mr10">Contract Name : </span>
                        <span class="b1 fw7">{{
                          this.contractData.contractName
                        }}</span>
                      </div>
                      <div class="mt20">
                        <span class="b3 mr10">Compiler Version : </span>
                        <span class="b1 fw7">{{
                          this.contractData.compilerVersion
                        }}</span>
                      </div>
                      <div class="mt20">
                        <span class="b3 mr10">Optimization Enabled: </span>
                        <span class="b1 fw7">{{
                          this.contractData.optimization
                        }}</span>
                      </div>
                    </div>
                    <div class="row mt20" ng-show="contract.valid">
                      <p class="mb10">Contract Source Code</p>
                      <textarea
                        class="fz16"
                        style="background: #f5f5f5"
                        name="code"
                        id="1"
                        cols="160"
                        rows="10"
                        v-model="this.contractData.sourceCode"
                      >
                      </textarea>
                      <br />
                      <p class="mt40 mb10">Contract ABI</p>
                      <textarea
                        class="fz16"
                        style="background: #f5f5f5"
                        name="code"
                        id="1"
                        cols="160"
                        rows="10"
                        v-model="this.abi"
                      >
                      </textarea>
                      <br />
                    </div>
                    <div class="row">
                      <p class="mt40 mb10">Contract Bytecode</p>
                      <textarea
                        class="fz16"
                        style="background: #f5f5f5"
                        name="code"
                        id="1"
                        cols="160"
                        rows="10"
                        v-model="this.contractData.byteCode"
                      >
                      </textarea>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs> -->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"> </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14"> </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getTransation, getAddr, getContract } from "@/api/index";
export default {
  data() {
    return {
      activeName: "first",
      option: "",
      searchForm: {
        search: "",
      },
      data: this.$route.query.blockNumber,
      detailData: [],
      addrHash: "",
      contractData: {},
      abi: [],
      to: this.$route.query.to,
    };
  },
  methods: {
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
    getAddrData() {
      getAddr().then((res) => {
        // console.log(res);
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
  async mounted() {
    await getTransation().then((res) => {
      res.data.result.filter((v) => {
        if (v.blockNumber === this.data) {
          this.detailData.push(v);
        }
      });
      this.addrHash = this.detailData[0].to;
    });

    getContract({
      addr: this.addrHash,
      action: "find",
    }).then((res) => {
      this.contractData = res.data.result;
      this.abi = JSON.stringify(res.data.result.abi);
    });
  },
  created() {
    this.getAddrData();
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin: 0 auto;
}
::v-deep .el-button {
  width: 60px;
  height: 30px;
  background: #efefef;
}
::v-deep .el-tabs__nav-scroll {
  margin-top: 30px;
  margin-right: 15%;
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
.to {
  font-family: "pingfang";
  .top {
    color: slategray;
    width: 100%;
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .content {
    .change {
      .first {
      }
      table {
        width: 1200px;
        text-indent: 10px;
        border: 1px solid #d6e5e9;
        border-collapse: collapse;
        tr {
          border: 1px solid #d6e5e9;
          padding: 10px;
        }
      }
    }
  }
}
</style>