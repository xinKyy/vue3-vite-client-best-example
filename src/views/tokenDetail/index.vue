<template>
  <div class="tokenDetail">
    <search-for></search-for>
    <div class="btns df aic container">
      <div class="btn df aic jcc mr20" id="one" @click="$router.push('/Home')">
        <span class="iconfont icon-home fz28 mr10"></span>
        <span class="fz18 fw7">HOME</span>
      </div>
      <div class="btn df aic jcc mr20 active" @click="$router.push('/token')">
        <span class="iconfont icon-token fz28 mr10"></span>
        <span class="fz18 fw7">TOKENS</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/nft')">
        <span class="iconfont icon-Wallet fz28 mr10"></span>
        <span class="fz18 fw7">NFT</span>
      </div>
    </div>
    <div class="contents container mt60 mb60">
      <div class="item"></div>
      <div class="item on second">
        <div class="topData fz16 df fdc mt20">
          <p class="mb60">
            <span class="fz30 mr10 fw7">{{ contractData.tokenName }}</span>
            <span class="fz18" style="color: #666">{{ addr }}</span>
          </p>
          <div class="df">
            <div class="df fdc fz26">
              <span class="fw7 mt10"
                >{{ contractData.tokenName }} Address Balance ({{
                  contractData.symbol
                }})</span
              >
            </div>
            <div class="df fdc">
              <span class="fz20 fw7">Contract Creator</span>
              <p class="mt10 df fdc" style="color: #666">
                <span
                  class="elli3 contrahover1"
                  @click="goTotalAddr(contractData.owner)"
                >
                  {{ contractData.owner }}...</span
                >
                <span style="margin: 5px 0">at txn</span>
                <span
                  class="elli3 contrahover2"
                  @click="goBlock(contractData.creationTransaction)"
                  >{{ contractData.creationTransaction }}...</span
                >
              </p>
            </div>
          </div>
          <div class="df aic jcsb mt30 fz24">
            <p>
              <span>{{ contractData.totalSupply }} &ensp;</span>
              <span class="fw7">Total {{ contractData.symbol }} Tokens</span>
            </p>
            <div class="df fdc">
              <p class="fw7">Contract Address</p>
              <p class="hover mt10 fz20" style="color: #666">
                {{ addr }}
              </p>
            </div>
          </div>
          <div class="mt20 fw7 fz24">Token Holders</div>
          <div class="mt30 fz24">1 <span class="fw7">Transactions</span></div>
        </div>
        <div class="change mt60">
          <div class="title df aic fz20 fw7">
            <p class="active">Get Balance</p>
            <p>Transfer</p>
            <p>Contract Transactions</p>
            <p>Contract Source</p>
            <p>Upper Level</p>
          </div>
          <div class="contentss">
            <div class="on balance">
              <p class="mt30 fz24">
                Get {{ contractData.tokenName }} Token Balance
              </p>
              <p class="fw7 mt20 fz20">Enter Your Address</p>
              <div class="posi">
                <el-input
                  class="mt20 ipt1"
                  v-model="input1"
                  :placeholder="contractData.address"
                >
                </el-input>
                <button @click="getBalance">Go!</button>
                <p id="tokens" class="fz24 mt40" style="color: #666">
                  You have
                  <span class="b2">{{ tokens }}</span>
                  BB tokens
                </p>
              </div>
            </div>
            <div class="transfer">
              <p class="mt30 mb20 fz30">Get Transfer</p>
              <div class="posi df fdc">
                <div class="df aic fz24">
                  <span
                    class="mr10 b1"
                    style="padding-top: 10px; display: inline-block"
                    >ADDRESS</span
                  >
                  <el-input
                    class="mt20 ipt1"
                    v-model="input2"
                    label="address"
                    :placeholder="addr"
                  >
                  </el-input>
                </div>
                <div class="df aic fz24">
                  <span
                    class="mr10 b1"
                    style="
                      padding-top: 10px;
                      display: inline-block;
                      margin-right: 15px;
                    "
                  >
                    AMOUNT
                  </span>
                  <el-input
                    class="mt20 ipt2"
                    v-model="input3"
                    placeholder="please input amount"
                  >
                  </el-input>
                </div>
                <button class="mt40" @click="getTransfer">Go!</button>
              </div>
            </div>
            <div class="trans mt30">
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
                  <span style="margin-left: 13px" class="b2">transaction</span>
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
                  style="height: 40px; text-indent: 10px; background: #02204e"
                >
                  <tr>
                    <td style="width: 280px">TxHash</td>
                    <td style="width: 100px">Block</td>
                    <td style="width: 220px">
                      <span style="margin-left: 40px">From</span>
                    </td>
                    <td style="width: 220px">
                      <span style="margin-left: 40px">To</span>
                    </td>
                    <td style="width: 165px">{{ contractData.symbol }}</td>
                    <td class="tac" style="width: 220px">Age</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody class="fz14" style="text-indent: 3px">
                  <tr v-for="(v, i) in localTransactionData" :key="i">
                    <td>
                      <span class="elli22" @click="goTransaction(v)">
                        {{ v.transactionHash }}
                      </span>
                    </td>
                    <td class="tac" style="width: 100px">
                      {{ v.blockNumber }}
                    </td>
                    <td style="width: 220px">
                      <span class="elli22" style="margin-left: 40px">{{
                        v.from
                      }}</span>
                    </td>
                    <td style="width: 165px">
                      <span class="elli22" style="margin-left: 40px">{{
                        v.to
                      }}</span>
                    </td>
                    <td class="tac" style="width: 165px">
                      {{ v.cumulativeGasUsed }}
                    </td>
                    <td style="width: 165px; text-align: right">
                      <!-- {{ deltaT(v[6] * 1000) }} -->
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="source fz18">
              <p class="mt30 mb20">Contract Source Code Vertified</p>
              <p class="hover fw7">Verify And Publish Source Code.</p>
              <div class="row">
                <p class="mt40 mb10">Contract Bytecode</p>
                <div class="text p10 bsbb">{{ source.bytecode }}</div>
              </div>
            </div>
            <div class="level">
              <p class="fw7 mt20 fz30">Enter Your Address</p>
              <div class="posi">
                <el-input
                  class="mt20 ipt1"
                  v-model="input4"
                  placeholder="0xf9f412bAdd9b4451670bdC605f5e4eaACcefbccE"
                >
                </el-input>
                <button @click="getLevel">Go!</button>
              </div>
              <p id="level" class="fz24 mt40">
                Your Upper Level
                <span class="b2">{{ level }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="item"></div>
    </div>
  </div>
</template>

<script>
import Token from "@/common/token.json";
import footerBar from "../../components/footer/index.vue";
import searchFor from "../../components/search/index.vue";
import Web3 from "web3";
import { getContract, getWebrelay } from "@/api/index";
export default {
  data() {
    return {
      input1: "", //balance
      input2: "", //transfer
      input3: "", //amount
      input4: "", //level
      tokens: null,
      addr: this.$route.query.tokens,
      addrHash: "",
      contractData: "",
      abi: "",
      level: null,
      source: {},
      formInline: {
        num: 20,
      },
      searchForm: {
        search: "",
      },
      transactionList: [],
      localTransactionData: JSON.parse(localStorage.getItem("transactionList")),
      symbol: "",
    };
  },
  components: {
    footerBar,
    searchFor,
  },
  methods: {
    goTotalAddr(n) {
      this.$router.push({
        path: "/from",
        query: {
          from: n,
        },
      });
    },
    goBlock(n) {
      this.$router.push({
        path: "/block",
        query: {
          from: n,
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
    async getBalance() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = Token[0].abi;
      const contractAddress = Token[0].address; //查询用户地址
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
      await myContract.methods
        .balanceOf(this.input1)
        .call()
        .then((res) => {
          this.tokens = res;
          this.showTokens();
        });
    },
    //ETH转账
    async getTransfer() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = Token[0].abi;
      const contractAddress = Token[0].address; //查询用户地址
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
      let fromAddress = await web3.eth.getAccounts();
      myContract.methods
        .transfer(this.input2, this.input3)
        .send({ from: fromAddress[0] })
        .then((r) => {
          this.transactionList.push(r);
          localStorage.setItem(
            "transactionList",
            JSON.stringify(this.transactionList)
          );
          console.log(this.transactionList);
        });
    },
    showTokens() {
      const tokens = document.querySelector("#tokens");
      if (this.tokens != null) {
        tokens.classList.add("on");
      }
    },
    showLevel() {
      const level = document.querySelector("#level");
      if (this.level != null) {
        level.classList.add("on");
      }
    },
    async getLevel() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = Token[0].abi;
      const contractAddress = Token[0].address;
      const myContract = new web3.eth.Contract(contractAbi, contractAddress);
      await myContract.methods
        .getUpperLevel(this.input4)
        .call()
        .then((res) => {
          this.level = res;
          this.showLevel();
        });
    },
    // 向后补零
    getZeroB(n) {
      let a = 1;
    },
  },
  created() {
    this.getZeroB(4);
  },
  async mounted() {
    const titles = document.querySelectorAll(".title>p");
    const contentss = document.querySelectorAll(".contentss>div");
    titles.forEach((p, i) => {
      p.addEventListener("click", () => {
        titles.forEach((value, index) => {
          value.classList.remove("active");
          contentss[index].classList.remove("on");
        });
        p.classList.add("active");
        contentss[i].classList.add("on");
      });
    });

    getContract({
      addr: this.addr,
      action: "find",
    }).then((res) => {
      this.contractData = res.data.result;
      this.abi = JSON.stringify(res.data.result.abi);
      this.symbol = res.data.result.symbol;
      localStorage.setItem("symbol", this.symbol);
    });

    getWebrelay({
      addr: this.addr,
      options: ["balance", "count", "bytecode"],
    }).then((res) => {
      this.source = res.data;
    });

    const btns = document.querySelectorAll(".btns >.btn");
    const contents = document.querySelectorAll(".contents >.item");
    btns.forEach((btn, ind) => {
      btn.addEventListener("click", () => {
        btns.forEach((value, index) => {
          value.classList.remove("active");
          contents[index].classList.remove("on");
        });
        btn.classList.add("active");
        contents[ind].classList.add("on");
      });
    });
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-input__wrapper {
  padding: 5px 20px;
}
::v-deep .el-form-item {
  margin: 0 auto;
}
::v-deep .el-input__inner {
  width: 30px;
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
::v-deep .el-input-group__append {
  background: #578ebe;
  color: #fff;
  font-size: 20px;
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.tokenDetail {
  height: 100%;
  font-family: "pingfang";
  .btns {
    > div {
      width: 180px;
      height: 57px;
      border-radius: 29px;
      background: #fff;
      color: #02204e;
      &.active {
        background: #02204e;
        color: #fff;
      }
    }
  }
  .contents {
    .second {
      color: #02204e;
      .topData {
        .hover:hover {
          text-decoration: underline;
        }
        > div {
          > div {
            width: 50%;
          }
        }
        .contrahover1:hover {
          text-decoration: underline;
        }
        .contrahover2:hover {
          text-decoration: underline;
        }
      }
      .change {
        .title {
          border-bottom: 1px solid #02204e;
          > p {
            padding: 20px;
            box-sizing: border-box;
            height: 60px;
            color: #02204e;
            font-weight: 700;
            text-align: center;
            &.active {
              border-bottom: 5px solid #02204e;
            }
          }
          > p:hover {
            border-bottom: 5px solid #2961b4;
          }
        }
        .contentss {
          > div {
            display: none;
            &.on {
              display: block;
            }
          }
          .balance {
            .ipt1 {
              height: 40px;
              width: 80%;
            }

            .posi {
              position: relative;
              width: 1200px;
              button {
                position: absolute;
                right: 0;
                top: 20px;
                width: 130px;
                height: 73px;
                background: #02204e;
                border-radius: 4px;
                border: none;
                color: #fff;
                font-size: 24px;
              }
              .el-input {
                width: 1070px;
                height: 73px;
                background: #fff;
              }
            }
            #tokens {
              display: none;
              &.on {
                display: block;
              }
            }
          }
          .transfer {
            .ipt1 {
              height: 40px;
              width: 60%;
            }
            .ipt2 {
              height: 40px;
              width: 60%;
            }
            .posi {
              width: 1200px;
              button {
                width: 130px;
                height: 73px;
                border: none;
                background: #02204e;
                color: #fff;
                font-size: 24px;
              }
              .el-input {
                width: 1070px;
                height: 73px;
                background: #fff;
              }
            }
          }
          .level {
            .ipt1 {
              height: 40px;
              width: 80%;
            }

            .posi {
              position: relative;
              width: 1200px;
              button {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 130px;
                height: 73px;
                border: none;
                background: #02204e;
                color: #fff;
                font-size: 24px;
              }
              .el-input {
                width: 1070px;
                height: 73px;
                background: #fff;
              }
            }
            #level {
              display: none;
              &.on {
                display: block;
              }
            }
          }
          .source {
            .hover:hover {
              text-decoration: underline;
            }
            .text {
              width: 100%;
              height: 240px;
              overflow-y: scroll;
              background: #e2e2e2;
              border-radius: 12px;
              word-wrap: break-word;
            }
          }
          .trans {
            table {
              color: #fff;
              border: 1px solid #fff;
              border-collapse: collapse;
              width: 100%;
              tr {
                color: #fff;
                border: 1px solid #fff;
              }
              tbody {
                color: #fff;
                tr:nth-child(odd) {
                  background: #02204e;
                }
                tr:nth-child(even) {
                  background: #02204e;
                }
                tr {
                  color: #fff;
                  height: 40px;
                }
              }
            }
          }
        }
      }
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
  }
  .change {
    .second {
      .topData {
        .hover:hover {
          text-decoration: underline;
        }
        > div {
          > div {
            width: 50%;
          }
        }
        .contrahover1:hover {
          text-decoration: underline;
        }
        .contrahover2:hover {
          text-decoration: underline;
        }
      }
      .change {
        .title {
          border-bottom: 1px solid #ddd;
          > p {
            padding: 20px;
            box-sizing: border-box;
            height: 60px;
            color: #999;
            text-align: center;
            &.active {
              border-bottom: 5px solid #36c6d3;
            }
          }
          > p:hover {
            border-bottom: 5px solid #9fe4ea;
          }
        }
        .contents {
          > div {
            display: none;
            &.on {
              display: block;
            }
          }
          .balance {
            .ipt1 {
              height: 40px;
              width: 80%;
            }

            .posi {
              position: relative;
              button {
                position: absolute;
                right: 20%;
                top: 20px;
                width: 100px;
                height: 40px;
                border: none;
                background: #578ebe;
                color: #fff;
                font-size: 24px;
              }
            }
            #tokens {
              display: none;
              &.on {
                display: block;
              }
            }
          }
          .transfer {
            .ipt1 {
              height: 40px;
              width: 60%;
            }
            .ipt2 {
              height: 40px;
              width: 60%;
            }
            .posi {
              // position: relative;
              button {
                // position: absolute;
                // right: 20%;
                // bottom: 0;
                width: 100px;
                height: 40px;
                border: none;
                background: #578ebe;
                color: #fff;
                font-size: 24px;
              }
            }
          }
          .level {
            .ipt1 {
              height: 40px;
              width: 80%;
            }

            .posi {
              position: relative;
              button {
                position: absolute;
                right: 20%;
                bottom: 0;
                width: 100px;
                height: 40px;
                border: none;
                background: #578ebe;
                color: #fff;
                font-size: 24px;
              }
            }
            #level {
              display: none;
              &.on {
                display: block;
              }
            }
          }
          .source {
            .hover:hover {
              text-decoration: underline;
            }
          }
          .trans {
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
  }
}
</style>