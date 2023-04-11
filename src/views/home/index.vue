<template>
  <div class="home">
    <search-for></search-for>
    <div class="btns df aic container">
      <div
        class="btn df aic jcc mr20 active"
        id="one"
        @click="$router.push('/Home')"
      >
        <span class="iconfont icon-home fz28 mr10"></span>
        <span class="fz18 fw7">HOME</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/token')">
        <span class="iconfont icon-token fz28 mr10"></span>
        <span class="fz18 fw7">TOKENS</span>
      </div>
      <div class="btn df aic jcc mr20" @click="$router.push('/nft')">
        <span class="iconfont icon-Wallet fz28 mr10"></span>
        <span class="fz18 fw7">NFT</span>
      </div>
    </div>
    <div class="contents container mt60 mb60">
      <div class="on item first">
        <div class="topData mt20 df aic jcsb">
          <div class="df fdc aic">
            <h3># {{ topData.blockHeight }}</h3>
            <p>BLOCK HEIGHT</p>
          </div>
          <div class="df fdc aic">
            <h3>{{ toThousands(topData.blockTime) }}S</h3>
            <p>BLOCK TIME</p>
          </div>
          <div class="df fdc aic">
            <h3>{{ topData.hashrate }}H/s</h3>
            <p>NETWORK HASHHRATE</p>
          </div>
          <div class="df fdc aic">
            <h3>{{ topData.difficulty }}H</h3>
            <p>DIFFICULTY</p>
          </div>
        </div>
        <div class="contentData df aic jcsb">
          <div class="left p20 bsbb">
            <div class="df aic jcsb mb20" style="padding-bottom: 10px">
              <div class="df" style="align-items: end">
                <img
                  class="mr20"
                  src="../../assets/images/list.png"
                  style="width: 41px; height: 38px"
                />
                <p class="fz16 fw7" style="color: #fff">BLOCKS</p>
              </div>
              <p class="fz16 blue" @click="$router.go(0)">
                <el-icon color="#fff" size="26"><RefreshRight /></el-icon>
              </p>
            </div>
            <div class="list df fdc p10 bsbb">
              <div
                class="one df aic jcsb ffdin"
                v-for="(v, i) in blockArr.value"
                :key="i"
              >
                <p class="fz48 fw5 mr20" style="width: 10%">{{ v.number }}</p>
                <div class="ri df aic jcsa">
                  <p>{{ deltaT(v.timestamp * 1000) }}</p>
                  <div class="df fdc">
                    <p class="mt10 elli2 hovers" @click="goAddr(v.logsBloom)">
                      {{ v.logsBloom }}
                    </p>
                    <p class="mt10 df aic">
                      <span>by &ensp;</span>
                      <span class="elli17 hovere" @click="goAddr(v.miner)">{{
                        v.miner
                      }}</span>
                    </p>
                    <p class="mt10">
                      <span>{{ v.txn }}</span> txns
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right fz16 p20 bsbb">
            <div class="df aic jcsb mb20" style="padding-bottom: 20px">
              <div class="df" style="align-items: end">
                <img
                  class="mr20"
                  src="../../assets/images/list.png"
                  style="width: 41px; height: 38px"
                />
                <p class="fz16 fw7" style="color: #fff">Transacions</p>
              </div>
              <p class="fz16 blue" @click="$router.go(0)">
                <el-icon color="#fff" size="26"><RefreshRight /></el-icon>
              </p>
            </div>
            <div class="list df fdc bsbb" style="padding: 0 10px">
              <div
                class="item mb20 df fdc p20 bsbb"
                style="color: #fff"
                v-for="(v, i) in transactionArr.value"
                :key="i"
              >
                <div style="text-align: right" class="mb10">
                  {{ v.value }} {{ symbol }}
                </div>
                <div class="df aic jcsb mb10" style="width: 100%">
                  <p class="elli df aic" style="width: 300px">
                    <span class="mr10">TX &ensp;</span>
                    <span
                      class="a1 hover"
                      style="display: inline-block"
                      @click="goDetail(v)"
                      >{{ v.hash }}</span
                    >
                  </p>
                  <p style="text-align: right">
                    {{ deltaT(v.timestamp * 1000) }}
                  </p>
                </div>
                <div class="df aic elli bsbb jcsb" style="padding-bottom: 10px">
                  <p style="width: 45%" class="df aic mr20">
                    <span>From &ensp;</span>
                    <span class="elli3 a2" @click="goFromAddr(v)">{{
                      v.from
                    }}</span>
                  </p>
                  <p style="width: 45%" class="df aic">
                    <span>To &ensp;</span>
                    <span class="elli3 a2" @click="goToAddr(v)">{{
                      v.to
                    }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item"></div>
      <div class="item"></div>
    </div>
    <div class="footer">
      <div class="container shallow bsbb df">
        <div class="df fdc mr-5">
          <p class="mb20 fz18 fw7" style="color: #44b6ae">ABOUT</p>
          <p style="color: #a2abb7" class="fz16 mb10">
            This is an open source Blockchain Explorer.
          </p>
          <img
            src="../../assets/images/powered-by-etcexplorer-w.png"
            style="width: 157px; height: 51px"
          />
        </div>
        <div class="df fdc">
          <p class="mb20 fz18 fw7" style="color: #44b6ae">FOLLOW US ON</p>
        </div>
      </div>
      <div class="deep mt40 df aic">
        <div class="container" style="color: #a2abb7">
          2019 © Ethereum Classic.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getBlock, getTransation, getWebrelay } from "@/api/index";
import { onMounted, reactive, ref } from "vue";
import Web3 from "web3";
import searchFor from "../../components/search/index.vue";
import { useRouter } from "vue-router";
const $router = useRouter();
const blockArr = reactive([]);
const transactionArr = reactive([]);
const topData = reactive({
  blockHeight: "",
  blockTime: "",
  difficulty: "",
  hashrate: "",
});
const symbol = ref(localStorage.getItem("symbol"));
const goAddr = (n) => {
  let nto = n.slice(0, 42);
  $router.push({
    path: "/from",
    query: {
      from: nto,
    },
  });
};
const goToAddr = (n) => {
  $router.push({
    path: "/to",
    query: {
      to: n.to,
      blockNumber: n.blockNumber,
    },
  });
};
const goFromAddr = (n) => {
  $router.push({
    path: "/from",
    query: {
      from: n.from,
    },
  });
};
const getBlockData = () => {
  getBlock().then((res) => {
    blockArr.value = res.data.result;
    blockArr.forEach((v) => {
      v.timestamp = v.timestamp.toString(10);
    });
  });
};
getBlockData();
const getTransationData = () => {
  getTransation().then((res) => {
    transactionArr.value = res.data.result;
  });
};
getTransationData();
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
  var time = days + " " + "days" + "," + hours + " " + "hours ago";
  return time;
};
const goDetail = (n) => {
  $router.push({
    path: "/transactions",
    query: {
      hash: n.hash,
    },
  });
};
const send = () => {
  let web3 = window.ethereum && new Web3(window.ethereum);
  const contractAbi = JSON.parse(
    '[{"inputs": [],"name": "retrieve","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "num","type": "uint256"}],"name": "store","outputs": [],"stateMutability": "nonpayable","type":"function"}]'
  );
  const contractAddress = "0x6e65a1e833698f00573b9106427596c8bb349cb2";
  const myContract = new web3.eth.Contract(contractAbi, contractAddress);
  let fromAddress = web3.eth.getAccounts();
  myContract.methods.store(1).send({ from: fromAddress[0] }, function () {
    if (window.ethereum) {
      window.ethereum.enable().then((res) => {});
    } else {
      alert("请安装MetaMask钱包");
    }
  });
};
send();
// 查询代币余额
// const getToken = () => {
//   let web3 = window.ethereum && new Web3(window.ethereum);
//   const contractAbi = JSON.parse(
//     '[{"inputs": [{"internalType":"uint256","name": "_initialSupply","type": "uint256"},{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_symbol","type": "string"},{"internalType": "uint8","name": "_decimal","type": "uint8"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType":"address","name": "_user","type": "address"}],"name":"AddedBlackList","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address", "name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType":"address","name": "_user","type": "address"}],"name":"RemovedBlackList","type": "event"},{ "anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name":"to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256" }],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name":"_addr","type": "address"},{"internalType": "bool","name":"_admin","type": "bool"}],"name": "addAdmin", "outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_evilUser","type": "address"}],"name": "addBlackList","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{ "internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType":"uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender", "type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{ "internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [ { "internalType": "address","name": "account", "type":"address"}],"name": "balanceOf","outputs": [{"internalType":"uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "blackListed","outputs": [{ "internalType": "bool","name": "","type":"bool"}], "stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256", "name": "_amount","type":"uint256"}],"name": "burn","outputs": [],"stateMutability":"nonpayable","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"} ],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address", "name": "spender","type": "address"},{"internalType": "uint256","name": "subtractedValue","type": "uint256"}],"name": "decreaseAllowance","outputs": [{"internalType": "bool", "name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address", "name": "_maker","type": "address"}],"name": "getBlackListStatus","outputs": [ {"internalType": "bool","name": "", "type": "bool"}],"stateMutability": "view", "type": "function"},{"inputs": [{"internalType": "address","name": "_addr","type": "address"} ],"name": "getLowerLevel","outputs": [ {"internalType": "address[]", "name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_addr","type": "address"}],"name": "getUpperLevel","outputs": [{ "internalType": "address",  "name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [ {"internalType": "address","name": "spender","type": "address"},{ "internalType": "uint256","name": "addedValue","type": "uint256"}],"name": "increaseAllowance","outputs": [ {"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function" },{"inputs": [{ "internalType":"address","name": "_addr","type": "address"}],"name":"isUser","outputs": [ {"internalType": "bool", "name": "", "type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{ "internalType": "address","name": "", "type": "address"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "lowerLevel", "outputs": [{"internalType": "address", "name": "", "type": "address" } ],"stateMutability": "view", "type": "function"}, {"inputs": [ { "internalType": "address","name": "","type": "address"} ], "name": "mapAdmin","outputs": [{"internalType": "bool","name": "","type": "bool"}], "stateMutability": "view","type": "function"},{"inputs": [],"name": "name", "outputs": [{"internalType": "string","name": "","type": "string" }],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "", "type": "address" }],"stateMutability": "view","type": "function" },{ "inputs": [ {"internalType": "address","name": "_clearedUser", "type": "address" }],"name": "removeBlackList","outputs": [], "stateMutability": "nonpayable","type": "function"}, {"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function" },{ "inputs": [],"name": "symbol","outputs": [ { "internalType": "string","name": "", "type": "string"}],"stateMutability": "view",  "type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{ "internalType": "address","name": "to", "type": "address"},{ "internalType": "uint256","name": "amount","type": "uint256" } ],"name": "transfer","outputs": [ {  "internalType":"bool", "name": "","type": "bool"}],"stateMutability":"nonpayable","type": "function"},{ "inputs": [{"internalType": "address","name": "from","type": "address" }, { "name": "to","type": "address"},{ "internalType": "uint256","name": "amount","type": "uint256"} ],"name": "transferFrom","outputs": [ {"internalType": "bool","name": "", "type": "bool" } ],"stateMutability": "nonpayable", "type": "function"},{"inputs": [{"internalType": "address", "name": "newOwner","type": "address" } ],"name": "transferOwnership","outputs": [], "stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType":"address", "name": "","type": "address"}, { "internalType": "address", "name": "", "type": "address"  }], "name": "transferRelation","outputs": [ { "internalType": "uint256", "name": "","type": "uint256" }], "stateMutability": "view", "type": "function" },{ "inputs": [ {  "internalType": "address", "name": "","type": "address"}],"name": "upperLevel","outputs": [ { "internalType": "address", "name": "addr", "type": "address" }, {   "internalType": "bool","name": "valid", "type": "bool" }], "stateMutability": "view", "type": "function"}]'
//   );
//   const contractAddress = "0xf9f412bAdd9b4451670bdC605f5e4eaACcefbccE"; //查询用户地址
//   const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
//   myContract.methods.balanceOf(contractAddress).call((res) => {
//     console.log(res);
//   });
// };
const toThousands = (num = 0) => {
  return num.toString().replace(/\d+/, function (n) {
    return n.replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  });
};
onMounted(() => {
  getWebrelay({ action: "hashrate" }).then((res) => {
    topData.value = res.data;
    topData.blockHeight = res.data.blockHeight;
    topData.blockTime = res.data.blockTime.toFixed(2);
    topData.difficulty = res.data.difficulty;
    topData.hashrate = res.data.hashrate.toFixed(2);
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
});
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
    > div {
      display: none;
      &.on {
        display: block;
      }
    }
    .first {
      .topData {
        color: #02204e;
        h3 {
          font-family: "din";
          font-weight: 1400;
          font-size: 46px !important;
        }
        p {
          font-size: 16px;
          margin-top: 5px;
        }
      }
      .contentData {
        width: 100%;
        margin-top: 100px;
        > div {
          width: 48%;
          height: 600px;
        }
        .left {
          background: #1c2437;
          border-radius: 20px;
          .list {
            overflow-y: scroll;
            height: 480px;
            .one {
              color: #fff;
              margin-bottom: 30px;
              .ri {
                width: 90%;
                height: 119px;
                background: #384053;
                border-radius: 6px;
                backdrop-filter: blur(14px);
                .hovers:hover {
                  text-decoration: overline;
                  color: #1a67f0;
                }
                .hovere:hover {
                  text-decoration: overline;
                  color: #1a67f0;
                }
              }
            }
          }
          .list::-webkit-scrollbar-track-piece {
            background-color: rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(0, 0, 0, 0);
          }
          .list::-webkit-scrollbar {
            width: 5px;
            height: 13px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
          .list::-webkit-scrollbar-thumb {
            background-color: rgba(52, 112, 89, 0.5);
            background-clip: padding-box;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            min-height: 28px;
          }
          .list::-webkit-scrollbar-thumb:hover {
            background-color: rgba(52, 112, 89, 0.8);
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
        }
        .right {
          background: #1c2437;
          border-radius: 20px;
          .list {
            overflow-y: scroll;
            height: 480px;
            .item {
              background: #384053;
              border-radius: 6px;
              padding-bottom: 20px;
              width: 100%;
              height: 200px;
              .a1 {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; /*加宽度width属来兼容部分浏览*/
              }
              .a1:hover {
                text-decoration: overline;
                color: #1a67f0;
              }
              .a2 {
                width: 300px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; /*加宽度width属来兼容部分浏览*/
              }
              .a2:hover {
                text-decoration: overline;
                color: #1a67f0;
              }
            }
          }
          .list::-webkit-scrollbar-track-piece {
            background-color: rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(0, 0, 0, 0);
          }
          .list::-webkit-scrollbar {
            width: 5px;
            height: 13px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
          .list::-webkit-scrollbar-thumb {
            background-color: rgba(52, 112, 89, 0.5);
            background-clip: padding-box;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            min-height: 28px;
          }
          .list::-webkit-scrollbar-thumb:hover {
            background-color: rgba(52, 112, 89, 0.8);
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
.footer {
  height: 240px;
  width: 100%;
  background: #1c2437;
  .shallow {
    height: 160px;
    padding: 40px 0 30px 0;
  }
  .deep {
    background: #384053;
    width: 100%;
    height: 80px;
  }
}
</style>