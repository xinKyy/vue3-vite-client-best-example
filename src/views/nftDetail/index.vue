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
        <el-tab-pane label="Home" name="first" class="first"> </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"> </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14">
          <div class="topData fz16 df fdc mt20">
            <p class="mb60">
              <span class="fz24 mr10" style="color: #666">NFT</span>
              <span class="fz18" style="color: #999">{{ nft }}</span>
            </p>
          </div>
          <div class="change mt60">
            <div class="title df aic fz20 fw7">
              <p class="active">Transfer</p>
              <p>Get Balance</p>
              <p>Contract Transactions</p>
              <p>Contract Source</p>
            </div>
            <div class="contents">
              <div class="on transfer">
                <p class="mt30 fz28" style="color: #666">Transfer Token</p>
                <p class="fw7 mt20 fz26" style="color: #666">
                  Enter Your Address
                </p>
                <div class="posi df fdc fz20 fw7 mt20">
                  <div class="df aic">
                    <span
                      class="mr10 b1"
                      style="padding-top: 10px; display: inline-block"
                      >Address</span
                    >
                    <!-- @blur="getTokenId" -->
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
                      >TokenId</span
                    >
                    <el-form>
                      <el-form-item>
                        <el-select
                          v-model="tokenId"
                          placeholder="please select your tokenId"
                        >
                          <el-option
                            v-for="(v, i) in tokenidArr"
                            :key="i"
                            :label="v"
                            :value="v"
                          />
                        </el-select>
                      </el-form-item>
                    </el-form>
                    <!-- <el-input
                      class="mt20 ipt2"
                      v-model="input3"
                      placeholder="please input amount"
                    >
                    </el-input> -->
                  </div>
                  <button class="mt20" @click="getTransfer">Go!</button>
                </div>
              </div>
              <div class="balance">
                <p class="mt30 fz28" style="color: #666">Get Token Balance</p>
                <p class="fw7 mt20 fz28" style="color: #666">
                  Enter Your Address
                </p>
                <div class="posi">
                  <el-input class="mt20 ipt1" v-model="input1"> </el-input>
                  <button @click="getBalance">Go!</button>
                  <p id="tokens" class="fz24 mt40" style="color: #666">
                    You have
                    <span class="b2">{{ tokens }}</span>
                    tokens
                  </p>
                </div>
              </div>
              <div class="trans mt30">
                <table class="fw5">
                  <thead
                    class="b1 fz20"
                    style="height: 40px; text-indent: 10px"
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
                <p class="b1 mt20">Contract Source Code Unverified</p>
                <p class="b3 hover mt10" @click="goVertify">
                  Verify And Publish Source Code.
                </p>
                <div class="row">
                  <p class="mt40 mb10">Contract Bytecode</p>
                  <textarea
                    class="fz16"
                    style="background: #f5f5f5"
                    name="code"
                    id="1"
                    cols="160"
                    rows="10"
                  >
                  </textarea>
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
import Web3 from "web3";
import NFT from "@/common/nft.json";
import { getTransation, getAddr, getContract } from "@/api/index";
export default {
  data() {
    return {
      input: "",
      input1: "", //balance
      input2: "", //transfer
      input3: "", //transfer
      activeName: "third",
      tokens: null,
      token: null,
      nft: this.$route.query.nft,
      addrHash: "",
      detailData: [],
      contractData: "",
      abi: "",
      vertify: "",
      nftAbi: NFT[0].abi,
      transactionArr: [],
      tokenidArr: [],
      tokenId: "",
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
    goVertify() {
      this.$router.push({
        path: "/vertifyContract",
        query: {
          vertify: this.nft,
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
      const contractAbi = NFT[0].abi;
      const contractAddress = NFT[0].address;
      const myContract = new web3.eth.Contract(contractAbi, contractAddress);
      myContract.methods
        .balanceOf(this.input1)
        .call()
        .then((res) => {
          this.tokens = res;
          this.showTokens();
        });
    },
    async getTokenId() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = NFT[0].abi;
      const contractAddress = NFT[0].address;
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
      let fromAddress = await web3.eth.getAccounts();
      let account = fromAddress[0];
      myContract.methods
        .balanceOf(account)
        .call()
        .then((res) => {
          this.token = res;
          for (var i = 0; i < this.token; i++) {
            myContract.methods
              .tokenOfOwnerByIndex(fromAddress[0], i)
              .call()
              .then((res) => {
                this.tokenidArr.push(res);
              });
          }
        });
    },
    //ETH转账
    async getTransfer() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = NFT[0].abi;
      const contractAddress = NFT[0].address;
      const myContract = new web3.eth.Contract(contractAbi, contractAddress);
      let fromAddress = await web3.eth.getAccounts();
      myContract.methods
        .transferFrom(fromAddress[0], this.input2, this.tokenId)
        .send({ from: fromAddress[0] })
        .then((r) => {
          this.transactionArr.push(r);
        });
    },
    showTokens() {
      const tokens = document.querySelector("#tokens");
      if (this.tokens != null) {
        tokens.classList.add("on");
      }
    },
    // getAccount() {
    //   let web3 = window.ethereum && new Web3(window.ethereum);
    //   console.log(web3.eth.accounts.create(web3.utils.randomHex(32)));
    // },
  },
  created() {
    this.getTokenId();
  },
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
::v-deep .el-form-item__content {
  margin-top: 20px;
  height: 40px;
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
                bottom: 0;
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
            .ipt1,
            .ipt2 {
              height: 40px;
              width: 80%;
            }
            .posi {
              button {
                width: 100px;
                height: 40px;
                border: none;
                background: #578ebe;
                color: #fff;
                font-size: 24px;
              }
            }
          }
          .source {
            .hover:hover {
              text-decoration: underline;
              color: #666 !important;
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