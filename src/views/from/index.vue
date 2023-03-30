<template>
  <div class="to">
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
        @tab-click="goHome"
        v-model="activeName"
        tabPosition="top"
        class="demo-tabs fz24"
      >
        <el-tab-pane label="Home" name="first" class="first container">
          <div class="container data">
            <p class="fz30 mb40 mt20">
              <span class="b1 mr10"> Address</span>
              <span class="fz16" style="color: #999">{{ from }}</span>
            </p>
            <div class="p10 bsbb">
              <div class="top">OverView</div>
              <div class="content">
                <div class="df aic jcsb mt20">
                  <div class="df fdc">
                    <p class="b1 fz18"><span>210.1571</span> CHER</p>
                    <p class="b3 fw7 fz16">CHER Balance ?</p>
                  </div>
                </div>
                <div class="mt20 fz16">
                  <span>18 &nbsp;</span>
                  <span class="b3 fw7">Transactions</span>
                </div>
                <div class="mt60 table">
                  <div style="border-bottom: 1px solid #ddd">
                    <span
                      class="p15 bsbb fz20"
                      style="border-bottom: 5px solid #36c6d3"
                      >Transacions</span
                    >
                  </div>
                  <div class="df aic jcsb mt20 mb20">
                    <div class="df aic" style="height: 42px">
                      <el-form
                        :inline="true"
                        :model="formInline"
                        class="demo-form-inline"
                        style="width: 60px"
                      >
                        <el-form-item>
                          <el-select v-model="formInline.num">
                            <el-option label="10" value="10" />
                            <el-option label="20" value="20" />
                            <el-option label="50" value="50" />
                            <el-option label="100" value="100" />
                            <el-option label="500" value="500" />
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
                        <td class="b1"></td>
                      </tr>
                    </thead>
                    <tbody class="fz14" style="text-indent: 3px">
                      <tr v-for="(v, i) in tableData.value" :key="i">
                        <td class="b3">
                          <span class="elli22" @click="goTransaction(v)">
                            {{ v[0] }}
                          </span>
                        </td>
                        <td class="b3 tac" style="width: 65px">{{ v[1] }}</td>
                        <td class="b1" style="width: 165px">
                          <span class="elli22" style="margin-left: 40px">{{
                            v[2]
                          }}</span>
                        </td>
                        <td class="b3" style="width: 165px">
                          <span class="elli22" style="margin-left: 40px">{{
                            v[3]
                          }}</span>
                        </td>
                        <td class="b1 tac" style="width: 65px">{{ v[4] }}</td>
                        <td class="b1" style="width: 165px; text-align: right">
                          {{ deltaT(v[6] * 1000) }}
                        </td>
                        <td class="b1"></td>
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
                </div>
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
import { useRoute } from "vue-router";
import footerBar from "../../components/footer/index.vue";
const $router = useRouter();
const $route = useRoute();
const activeName = ref("first");
const input = ref("");
const formInline = reactive({
  num: 20,
});
const from = $route.query.from;
const searchForm = reactive({
  search: "",
});
const tableData = reactive([]);
const getData = () => {
  getAddr({
    addr: from,
    colums: [],
    count: 17,
    draw: 1,
    length: formInline.num,
    order: [],
    search: {},
    start: 0,
  }).then((res) => {
    tableData.value = res.data.result.data;
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
// 处理时间函数
const deltaT = (faultDat) => {
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
  var second = Math.floor(leave3 / (60 * 1000));
  var time = days + " " + "days" + "," + minutes + " " + "mins ago";
  return time;
};
const goTransaction = (n) => {
  console.log(n[0]);
  $router.push({
    path: "/transactions",
    query: {
      hash: n[0],
    },
  });
};
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin: 0 auto;
}
::v-deep .el-input__inner {
  width: 30px;
  height: 30px;
}
::v-deep .el-tabs__item {
  font-size: 20px;
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
  .change {
    .first {
      .data {
        table {
          border: 1px solid #d6e5e9;
          border-collapse: collapse;
          width: 100%;
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