<template>
  <div class="nftDetail">
    <search-for></search-for>
    <div class="btns df aic container">
      <div class="btn df aic jcc mr20" id="one" @click="$router.push('/Home')">
        <span class="iconfont icon-home fz28 mr10"></span>
        <span class="fz18 fw7">HOME</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/token')">
        <span class="iconfont icon-token fz28 mr10"></span>
        <span class="fz18 fw7">TOKENS</span>
      </div>
      <div class="btn df aic jcc mr20 active" @click="$router.push('/nft')">
        <span class="iconfont icon-Wallet fz28 mr10"></span>
        <span class="fz18 fw7">NFT</span>
      </div>
    </div>
    <div class="contents container mt60 mb60">
      <div class="item"></div>
      <div class="item"></div>
      <div class="on item third">
        <div class="topData fz16 df fdc mt20">
          <p class="mb60">
            <span class="fz30 mr10 fw7">NFT</span>
            <span class="fz18" style="color: #666">{{ nft }}</span>
          </p>
        </div>
        <div class="change mt40">
          <div class="title df aic fz20 fw7">
            <p class="active">Transfer</p>
            <p>Get Balance</p>
            <p>Contract Transactions</p>
            <p>Contract Source</p>
          </div>
          <div class="contentss">
            <div class="on transfer">
              <p class="mt30 fz28">Transfer Token</p>
              <p class="fw7 mt20 fz26">Enter Your Address</p>
              <div class="posi df fdc fz20 fw7 mt20">
                <div class="df aic">
                  <span class="mr10" style="padding-top: 10px; display: inline-block">Address</span>
                  <el-input class="mt20 ipt1" v-model="input2" label="address" :placeholder="nft">
                  </el-input>
                </div>
                <div class="df aic">
                  <span class="mr10" style="
                        padding-top: 10px;
                        display: inline-block;
                        margin-right: 15px;
                      ">TokenId</span>
                  <el-form>
                    <el-form-item>
                      <el-select v-model="tokenId" placeholder="please select your tokenId">
                        <el-option v-for="(v, i) in tokenidArr" :key="i" :label="v" :value="v" />
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <button class="mt40" @click="getTransfer">Go!</button>
              </div>
            </div>
            <div class="balance">
              <p class="mt30 fz28">Get Token Balance</p>
              <p class="fw7 mt20 fz28">Enter Your Address</p>
              <div class="posi">
                <el-input class="mt20 ipt1" v-model="input1"> </el-input>
                <button @click="getBalance">Go!</button>
                <p id="tokens" class="fz24 mt40" style="color: #666">
                  You have
                  <span>{{ tokens }}</span>
                  tokens
                </p>
              </div>
            </div>
            <div class="trans mt30">
              <table class="fw5">
                <thead class="fz20" style="height: 40px; text-indent: 10px; background: #02204e">
                  <tr>
                    <td style="width: 220px">TxHash</td>
                    <td style="width: 65px">Block</td>
                    <td style="width: 165px">
                      <span style="margin-left: 40px">From</span>
                    </td>
                    <td style="width: 165px">
                      <span style="margin-left: 40px">To</span>
                    </td>
                    <td style="width: 105px">{{ symbol }}</td>
                    <td style="width: 165px">gas</td>
                    <td class="tac" style="width: 165px">Age</td>
                  </tr>
                </thead>
                <tbody class="fz14" style="text-indent: 3px">
                  <tr v-for="(v, i) in transactionArr.value" :key="i">
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
                    <td class="tac" style="width: 165px">
                      {{ v.gas }}
                    </td>
                    <td style="width: 165px; text-align: right"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="source fz18">
              <p class="mt20">Contract Source Code Unverified</p>
              <p class="hover mt10">
                <!-- @click="goVertify" -->
                Verify And Publish Source Code.
              </p>
              <div class="row">
                <p class="mt40 mb10">Contract Bytecode</p>
                <div class="text p10 bsbb"></div>
                <!-- <textarea
                  class="fz16"
                  style="background: #f5f5f5"
                  name="code"
                  id="1"
                  cols="160"
                  rows="10"
                >
                </textarea> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script setup>
import Web3 from "web3";
import NFT from "@/common/nft.json";
import footerBar from "../../components/footer/index.vue";
import searchFor from "../../components/search/index.vue";
import { getContract, getWebrelay } from "@/api/index";
import { onMounted, reactive, ref } from "vue";

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const $router = useRouter();
const $route = useRoute();
const input1 = ref("");
const input2 = ref("");
const symbol = ref(localStorage.getItem("symbol"));
const tokens = ref(null);
const token = ref(null);
const nft = $route.query.nft;
const addr = NFT[0].address;
const contractData = ref("");
const abi = ref("");
const transactionArr = reactive([]);
const tokenidArr = reactive([]);
const tokenId = ref("");

const goVertify = () => {
  $router.push({
    path: "/vertifyContract",
    query: {
      vertify: nft,
    },
  });
};
const goHome = (pane) => {
  if (pane.props.label == "Home") {
    $router.push("/Home");
  } else if (pane.props.label == "Tokens") {
    $router.push("/token");
  } else if (pane.props.label == "NFT") {
    $router.push("/nft");
  }
};
const showTokens = () => {
  const tokens1 = document.querySelector("#tokens");
  if (tokens.value != null) {
    tokens1.classList.add("on");
  }
};
const getBalance = async () => {
  let web3 = window.ethereum && new Web3(window.ethereum);
  const contractAbi = NFT[0].abi;
  const contractAddress = NFT[0].address;
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  await myContract.methods
    .balanceOf(input1.value)
    .call()
    .then((res) => {
      tokens.value = res;
      console.log(tokens.value);
      showTokens();
    });
};

const getTokenId = () => {
  let web3 = window.ethereum && new Web3(window.ethereum);
  const contractAbi = NFT[0].abi;
  const contractAddress = NFT[0].address;
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  web3.eth.getAccounts().then((res) => {
    let account = res[0];
    myContract.methods
      .balanceOf(account)
      .call()
      .then((res) => {
        token.value = res;
        for (var i = 0; i < token.value; i++) {
          myContract.methods
            .tokenOfOwnerByIndex(account, i)
            .call()
            .then((res) => {
              tokenidArr.push(res);
            });
        }
      });
  });
};
getTokenId();
// ETH转账;
const getTransfer = () => {
  let web3 = window.ethereum && new Web3(window.ethereum);
  const contractAbi = NFT[0].abi;
  const contractAddress = NFT[0].address;
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  let fromAddress = web3.eth.getAccounts();
  myContract.methods
    .transferFrom(fromAddress[0], input2.value, tokenId.value)
    .send({ from: fromAddress[0] })
    .then((r) => {
      transactionArr.value.push(r);
    });
};
onMounted(() => {
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
    addr: addr,
    action: "find",
  }).then((res) => {
    contractData.value = res.data.result;
    abi.value = JSON.stringify(res.data.result.abi);
  });
  // getWebrelay({ addr: addr, options: ["balance", "count", "bytecode"] }).then(
  //   (res) => {
  //     console.log(res);
  //   }
  // );
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
});
</script>

<style lang="scss" scoped>
::v-deep .el-input__inner {
  width: 300px;
  height: 30px;
  font-size: 20px;
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

::v-deep .el-form-item__content {
  margin-top: 20px;
  height: 40px;
}

::v-deep .el-input__wrapper {
  padding: 5px 20px;
  height: 74px;
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.nftDetail {
  height: 100%;
  font-family: "pingfang";

  .btns {
    >div {
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
    .third {
      color: #02204e;

      .topData {
        .hover:hover {
          text-decoration: underline;
        }

        >div {
          >div {
            width: 50%;
          }
        }
      }

      .change {
        .title {
          border-bottom: 1px solid #02204e;

          >p {
            padding: 20px;
            box-sizing: border-box;
            height: 60px;
            text-align: center;

            &.active {
              border-bottom: 5px solid #02204e;
            }
          }

          >p:hover {
            border-bottom: 5px solid #2961b4;
          }
        }

        .contentss {
          >div {
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
                right: 0%;
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

          .source {
            .hover:hover {
              text-decoration: underline;
              color: #666 !important;
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
                tr:nth-child(odd) {
                  background: #3a5275;
                  color: #fff;
                  opacity: 0.7;
                }

                tr:nth-child(even) {
                  background: #2d5797;
                  color: #fff;
                  opacity: 0.7;
                }

                tr {
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
}</style>