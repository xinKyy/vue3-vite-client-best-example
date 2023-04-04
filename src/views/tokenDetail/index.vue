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
        <el-tab-pane label="Home" name="first" class="first"> </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second container">
          <div class="topData fz16 df fdc mt20">
            <p class="mb60">
              <span class="fz24 mr10" style="color: #666">{{
                contractData.tokenName
              }}</span>
              <span class="fz18" style="color: #999">{{ addr }}</span>
            </p>
            <div class="df aic">
              <div class="df fdc">
                <span class="b1 fz28">0.0000000000</span>
                <span class="b3 fw7 mt10"
                  >{{ contractData.tokenName }} Address Balance ({{
                    contractData.symbol
                  }})</span
                >
              </div>
              <div class="df fdc">
                <span class="b3 fz20 fw7">Contract Creator</span>
                <p class="b1 mt10 df fdc">
                  <span class="elli3"> {{ contractData.owner }}...</span>
                  <span style="margin: 5px 0">at txn</span>
                  <span class="elli3"
                    >{{ contractData.creationTransaction }}...</span
                  >
                </p>
              </div>
            </div>
            <div class="df aic jcsb mt30">
              <p>
                <span class="b1">{{ contractData.totalSupply }} &ensp;</span>
                <span class="b3 fw7"
                  >Total {{ contractData.symbol }} Tokens</span
                >
              </p>
              <div class="df fdc">
                <p class="b3 fw7">Contract Address</p>
                <p class="hover b1 mt10">
                  {{ addr }}
                </p>
              </div>
            </div>
            <div class="mt20 b3 fw7">Token Holders</div>
            <div class="mt30">1 <span class="b3 fw7">Transactions</span></div>
          </div>
          <div class="change mt60">
            <div class="title df aic fz20 fw7">
              <p class="active">Get Balance</p>
              <p>Transfer</p>
              <p>Contract Transactions</p>
              <p>Contract Source</p>
              <p>Upper Level</p>
            </div>
            <div class="contents">
              <div class="on balance">
                <p class="mt30" style="color: #666">
                  Get {{ contractData.tokenName }} Token Balance
                </p>
                <p class="fw7 mt20" style="color: #666">Enter Your Address</p>
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
                <p class="mt30 mb20" style="color: #666">Get Transfer</p>
                <div class="posi df fdc">
                  <div class="df aic">
                    <span
                      class="mr10 b1"
                      style="padding-top: 10px; display: inline-block"
                      >address</span
                    >
                    <el-input
                      class="mt20 ipt1"
                      v-model="input2"
                      label="address"
                      placeholder="0xf9f412bAdd9b4451670bdC605f5e4eaACcefbccE"
                    >
                    </el-input>
                  </div>
                  <div class="df aic">
                    <span
                      class="mr10 b1"
                      style="padding-top: 10px; display: inline-block"
                      >amount</span
                    >
                    <el-input
                      class="mt20 ipt2"
                      v-model="input3"
                      placeholder="please input amount"
                    >
                    </el-input>
                  </div>
                  <button class="mt20" @click="getTransfer">Go!</button>
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
                    <span style="margin-left: 13px" class="b2"
                      >transaction</span
                    >
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
                      height: 40px;
                      text-indent: 10px;
                      border-bottom: 1px solid #ddd;
                      background: #eef5f9;
                    "
                  >
                    <tr>
                      <td style="width: 220px">TxHash</td>
                      <td style="width: 165px">Block</td>
                      <td style="width: 220px">
                        <span style="margin-left: 40px">From</span>
                      </td>
                      <td style="width: 220px">
                        <span style="margin-left: 40px">To</span>
                      </td>
                      <td style="width: 165px">CHER</td>
                      <td class="tac" style="width: 165px">Age</td>
                      <td class="b1"></td>
                    </tr>
                  </thead>
                  <!-- <tbody class="fz14" style="text-indent: 3px">
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
                    </tbody> -->
                </table>
              </div>
              <div class="source fz18">
                <p class="mt30 b1 mb20">Contract Source Code Vertified</p>
                <p class="b3 hover fw7">Verify And Publish Source Code.</p>
                <!-- <p class="mt60">
                  <span class="b3">Contract Name :</span>
                  <span class="b1">&ensp;{{ contractData.contractName }}</span>
                </p>
                <p class="mt20">
                  <span class="b3">Compiler Version :</span>
                  <span class="b1"
                    >&ensp;{{ contractData.compilerVersion }}</span
                  >
                </p>
                <p class="mt20">
                  <span class="b3">Optimization Enabled :</span>
                  <span class="b1">&ensp;{{ contractData.optimization }}</span>
                </p> -->
                <!-- <div class="row mt20" ng-show="contract.valid">
                  <p class="mb10">Contract Source Code</p>
                  <textarea
                    class="fz16"
                    style="background: #f5f5f5"
                    name="code"
                    id="1"
                    cols="160"
                    rows="10"
                    v-model="contractData.sourceCode"
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
                    v-model="abi"
                  >
                  </textarea>
                  <br />
                </div> -->
                <div class="row">
                  <p class="mt40 mb10">Contract Bytecode</p>
                  <textarea
                    class="fz16"
                    style="background: #f5f5f5"
                    name="code"
                    id="1"
                    cols="160"
                    rows="10"
                    v-model="source.bytecode"
                  >
                  </textarea>
                </div>
              </div>
              <div class="level">
                <p class="fw7 mt20" style="color: #666">Enter Your Address</p>
                <div class="posi">
                  <el-input
                    class="mt20 ipt1"
                    v-model="input4"
                    placeholder="0xf9f412bAdd9b4451670bdC605f5e4eaACcefbccE"
                  >
                  </el-input>
                  <button @click="getLevel">Go!</button>
                </div>
                <p id="level" class="fz24 mt40" style="color: #666">
                  Your Upper Level
                  <span class="b2">{{ level }}</span>
                </p>
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
import Token from "@/common/token.json";
import Web3 from "web3";
import { getContract, getWebrelay } from "@/api/index";
export default {
  data() {
    return {
      input: "",
      input1: "", //balance
      input2: "", //transfer
      input3: "", //amount
      input4: "", //level
      activeName: "second",
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
    };
  },
  methods: {
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
        .then(function (r) {
          console.log(r);
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
  },
  created() {},
  async mounted() {
    const titles = document.querySelectorAll(".title>p");
    const contents = document.querySelectorAll(".contents>div");
    titles.forEach((p, i) => {
      p.addEventListener("click", () => {
        titles.forEach((value, index) => {
          value.classList.remove("active");
          contents[index].classList.remove("on");
        });
        p.classList.add("active");
        contents[i].classList.add("on");
      });
    });

    getContract({
      addr: this.addr,
      action: "find",
    }).then((res) => {
      this.contractData = res.data.result;
      this.abi = JSON.stringify(res.data.result.abi);
    });

    getWebrelay({
      addr: this.addr,
      options: ["balance", "count", "bytecode"],
    }).then((res) => {
      this.source = res.data;
    });
  },
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
.home {
  height: 100%;
  font-family: "pingfang";
  .search {
    text-align: right !important;
    .el-input {
      width: 400px;
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