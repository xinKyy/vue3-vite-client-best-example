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
        <el-tab-pane label="Home" name="first" class="first"> </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second">
          <div class="topData fz16 df fdc mt20">
            <p class="mb60">
              <span class="fz24 mr10" style="color: #666">AA</span>
              <span class="fz18" style="color: #999">{{ addr }}</span>
            </p>
            <div class="df aic">
              <div class="df fdc">
                <span class="b1 fz28">0.0000000000</span>
                <span class="b3 fw7 mt10">AA Address Balance (CHER)</span>
              </div>
              <div class="df fdc">
                <span class="b3 fz20 fw7">Contract Creator</span>
                <span class="b1 mt10">... at txn ...</span>
              </div>
            </div>
            <div class="df aic jcsb mt30">
              <p>
                <span class="b1">1000000000000.0 &ensp;</span>
                <span class="b3 fw7">Total BB Tokens</span>
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
                <p class="mt30" style="color: #666">Get AA Balance</p>
                <p class="fw7 mt20" style="color: #666">Enter Your Address</p>
                <div class="posi">
                  <el-input
                    class="mt20 ipt1"
                    v-model="input1"
                    placeholder="0xf9f412bAdd9b4451670bdC605f5e4eaACcefbccE"
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
                <table class="fw5">
                  <thead
                    class="b1"
                    style="
                      height: 40px;
                      text-indent: 10px;
                      border-bottom: 1px solid #ddd;
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
                      <td style="width: 105px">CHER</td>
                      <td style="width: 165px">gas</td>
                      <td class="tac" style="width: 165px">Age</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="source fz18">
                <p class="mt30 b1 mb20">Contract Source Code Vertified</p>
                <p class="mt60">
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
                </p>
                <div class="row mt20" ng-show="contract.valid">
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
                    v-model="contractData.byteCode"
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
import Web3 from "web3";
import { getContract } from "@/api/index";
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
      detailData: [],
      contractData: "",
      abi: "",
      tokenAbi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_initialSupply",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "string",
              name: "_symbol",
              type: "string",
            },
            {
              internalType: "uint8",
              name: "_decimal",
              type: "uint8",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "AddedBlackList",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "_user",
              type: "address",
            },
          ],
          name: "RemovedBlackList",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_addr",
              type: "address",
            },
            {
              internalType: "bool",
              name: "_admin",
              type: "bool",
            },
          ],
          name: "addAdmin",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_evilUser",
              type: "address",
            },
          ],
          name: "addBlackList",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "blackListed",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "subtractedValue",
              type: "uint256",
            },
          ],
          name: "decreaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_maker",
              type: "address",
            },
          ],
          name: "getBlackListStatus",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_addr",
              type: "address",
            },
          ],
          name: "getLowerLevel",
          outputs: [
            {
              internalType: "address[]",
              name: "",
              type: "address[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_addr",
              type: "address",
            },
          ],
          name: "getUpperLevel",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "addedValue",
              type: "uint256",
            },
          ],
          name: "increaseAllowance",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_addr",
              type: "address",
            },
          ],
          name: "isUser",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "lowerLevel",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "mapAdmin",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "_clearedUser",
              type: "address",
            },
          ],
          name: "removeBlackList",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "transferRelation",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "upperLevel",
          outputs: [
            {
              internalType: "address",
              name: "addr",
              type: "address",
            },
            {
              internalType: "bool",
              name: "valid",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ],
      level: null,
    };
  },
  methods: {
    goDetail(n) {
      this.$router.push({
        path: "/transactions",
        query: {
          blockNumber: n.blockNumber,
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
      const contractAbi = this.tokenAbi;
      const contractAddress = "0x86C827222356C4F4af5851a4B4C3Cc9fCaE60e46"; //查询用户地址
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
      await myContract.methods
        .balanceOf(this.input1)
        .call()
        .then((res) => {
          this.tokens = res;
          console.log(res);
          this.showTokens();
        });
    },
    //ETH转账
    async getTransfer() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = this.tokenAbi;
      const contractAddress = "0x86C827222356C4F4af5851a4B4C3Cc9fCaE60e46"; //查询用户地址
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
      const contractAbi = this.tokenAbi;
      const contractAddress = "0xF75fBB9273D50cc14a0DB178bf4b823f02c9F5e5"; //查询用户地址
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
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