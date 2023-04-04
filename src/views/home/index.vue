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
    <div class="change mb40">
      <el-tabs
        @tab-click="goHome"
        v-model="activeName"
        tabPosition="top"
        class="demo-tabs fz24"
      >
        <el-tab-pane label="Home" name="first" class="first container">
          <div class="topData mt20 df aic jcsb">
            <div>
              <h3># {{ topData.blockHeight }}</h3>
              <p>BLOCK HEIGHT</p>
            </div>
            <div>
              <h3>{{ topData.blockTime }}S</h3>
              <p>BLOCK TIME</p>
            </div>
            <div>
              <h3>{{ topData.hashrate }}H/s</h3>
              <p>NETWORK HASHHRATE</p>
            </div>
            <div>
              <h3>{{ topData.difficulty }}H</h3>
              <p>DIFFICULTY</p>
            </div>
          </div>
          <div class="contentData df aic jcsb">
            <div class="left">
              <div
                class="df aic jcsb mb20"
                style="border-bottom: 1px solid #ddd; padding-bottom: 40px"
              >
                <p class="red fz16 fw7">BLOCKS</p>
                <p class="fz16 blue" @click="$router.go(0)">
                  <el-icon color="#337ab7" size="20"><Refresh /></el-icon>
                </p>
              </div>
              <div class="list df fdc">
                <div
                  class="item p20 bsbb df jcsb mb20"
                  v-for="(v, i) in blockArr"
                  :key="i"
                >
                  <div class="df fdc fz14">
                    <p class="fw7 mb10" style="color: #09c">{{ v.number }}</p>
                    <p style="color: #69a1b3">3 days,23 hours ago</p>
                  </div>
                  <div class="fz14" style="color: #09c; width: 200px">
                    <p class="mb5 elli">{{ v.logsBloom }}</p>
                    <p class="mb5 elli">
                      by <span>{{ v.miner }}</span>
                    </p>
                    <p>
                      <span>{{ v.txn }}</span> txns
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="right fz16">
              <div
                class="df aic jcsb mb20"
                style="border-bottom: 1px solid #ddd; padding-bottom: 40px"
              >
                <p class="red fz16 fw7">TRANSACTIONS</p>
                <p class="fz16 blue" @click="$router.go(0)">
                  <el-icon color="#337ab7" size="20"><Refresh /></el-icon>
                </p>
              </div>
              <div class="list df fdc">
                <div
                  class="item mb20 df fdc"
                  v-for="(v, i) in transactionArr"
                  :key="i"
                >
                  <div class="df aic jcsb mb10" style="width: 100%">
                    <p class="elli df aic" style="width: 300px">
                      <span class="mr10" style="color: #69a1b3">TX &ensp;</span>
                      <span
                        class="a1 hover"
                        style="color: #09c; display: inline-block"
                        @click="goDetail(v)"
                        >{{ v.hash }}</span
                      >
                    </p>
                    <p style="color: #69a1b3; text-align: right">
                      {{ deltaTS(v.timestamp * 1000) }}
                    </p>
                  </div>
                  <div class="df aic elli bsbb" style="padding-bottom: 10px">
                    <p style="width: 45%" class="df aic mr20">
                      <span style="color: #69a1b3">From &ensp;</span>
                      <span
                        class="elli3 a2"
                        style="color: #09c"
                        @click="goFromAddr(v)"
                        >{{ v.from }}</span
                      >
                    </p>
                    <p style="width: 45%" class="df aic">
                      <span style="color: #69a1b3">To &ensp;</span>
                      <span
                        class="elli3 a2"
                        style="color: #09c"
                        @click="goToAddr(v)"
                        >{{ v.to }}</span
                      >
                    </p>
                  </div>
                  <div style="color: #09c">0 CHER</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second"> </el-tab-pane>
        <el-tab-pane label="NFT" name="third" class="third fz14"> </el-tab-pane>
      </el-tabs>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { getBlock, getTransation, getWebrelay } from "@/api/index";
import Web3 from "web3";
import footerBar from "../../components/footer/index.vue";
export default {
  data() {
    return {
      input: "",
      activeName: "first",
      blockArr: [],
      transactionArr: [],
      topData: {},
    };
  },
  components: {
    footerBar,
  },
  methods: {
    goToAddr(n) {
      this.$router.push({
        path: "/to",
        query: {
          to: n.to,
        },
      });
    },
    goFromAddr(n) {
      this.$router.push({
        path: "/from",
        query: {
          from: n.from,
        },
      });
    },
    getBlockData() {
      getBlock().then((res) => {
        this.blockArr = res.data.result;
      });
    },
    getTransationData() {
      getTransation().then((res) => {
        this.transactionArr = res.data.result;
      });
    },
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
      // 计算分钟数侯剩余毫秒数
      var leave3 = leave2 % (3600 * 1000);
      var second = Math.floor(leave3 / (60 * 1000));
      var time = days + " " + "days" + "," + hours + " " + "hours ago";
      return time;
    },
    deltaTS(faultDat) {
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
      // 计算相差秒数
      var second = Math.floor(leave3 / (60 * 1000));
      var time = minutes + " " + "mins" + "," + second + " " + "seconds ago";
      return time;
    },
    goDetail(n) {
      this.$router.push({
        path: "/transactions",
        query: {
          hash: n.hash,
        },
      });
    },
    goTokenDetail() {
      this.$router.push("/tokenDetail");
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
    // 发送合约
    async send() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = JSON.parse(
        '[{"inputs": [],"name": "retrieve","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "num","type": "uint256"}],"name": "store","outputs": [],"stateMutability": "nonpayable","type":"function"}]'
      );
      const contractAddress = "0x6e65a1e833698f00573b9106427596c8bb349cb2";
      const myContract = new web3.eth.Contract(contractAbi, contractAddress);
      let fromAddress = await web3.eth.getAccounts();
      myContract.methods.store(1).send({ from: fromAddress[0] }, function () {
        if (window.ethereum) {
          window.ethereum.enable().then((res) => {});
        } else {
          alert("请安装MetaMask钱包");
        }
      });
    },
    //查询代币余额
    async getToken() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = JSON.parse(
        '[{"inputs": [{"internalType":"uint256","name": "_initialSupply","type": "uint256"},{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_symbol","type": "string"},{"internalType": "uint8","name": "_decimal","type": "uint8"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType":"address","name": "_user","type": "address"}],"name":"AddedBlackList","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "previousOwner","type": "address"},{"indexed": true,"internalType": "address", "name": "newOwner","type": "address"}],"name": "OwnershipTransferred","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType":"address","name": "_user","type": "address"}],"name":"RemovedBlackList","type": "event"},{ "anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name":"to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256" }],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name":"_addr","type": "address"},{"internalType": "bool","name":"_admin","type": "bool"}],"name": "addAdmin", "outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_evilUser","type": "address"}],"name": "addBlackList","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "owner","type": "address"},{ "internalType": "address","name": "spender","type": "address"}],"name": "allowance","outputs": [{"internalType":"uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender", "type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{ "internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [ { "internalType": "address","name": "account", "type":"address"}],"name": "balanceOf","outputs": [{"internalType":"uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "blackListed","outputs": [{ "internalType": "bool","name": "","type":"bool"}], "stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256", "name": "_amount","type":"uint256"}],"name": "burn","outputs": [],"stateMutability":"nonpayable","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"} ],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address", "name": "spender","type": "address"},{"internalType": "uint256","name": "subtractedValue","type": "uint256"}],"name": "decreaseAllowance","outputs": [{"internalType": "bool", "name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address", "name": "_maker","type": "address"}],"name": "getBlackListStatus","outputs": [ {"internalType": "bool","name": "", "type": "bool"}],"stateMutability": "view", "type": "function"},{"inputs": [{"internalType": "address","name": "_addr","type": "address"} ],"name": "getLowerLevel","outputs": [ {"internalType": "address[]", "name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_addr","type": "address"}],"name": "getUpperLevel","outputs": [{ "internalType": "address",  "name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [ {"internalType": "address","name": "spender","type": "address"},{ "internalType": "uint256","name": "addedValue","type": "uint256"}],"name": "increaseAllowance","outputs": [ {"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function" },{"inputs": [{ "internalType":"address","name": "_addr","type": "address"}],"name":"isUser","outputs": [ {"internalType": "bool", "name": "", "type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{ "internalType": "address","name": "", "type": "address"},{"internalType": "uint256","name": "","type": "uint256"}],"name": "lowerLevel", "outputs": [{"internalType": "address", "name": "", "type": "address" } ],"stateMutability": "view", "type": "function"}, {"inputs": [ { "internalType": "address","name": "","type": "address"} ], "name": "mapAdmin","outputs": [{"internalType": "bool","name": "","type": "bool"}], "stateMutability": "view","type": "function"},{"inputs": [],"name": "name", "outputs": [{"internalType": "string","name": "","type": "string" }],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "", "type": "address" }],"stateMutability": "view","type": "function" },{ "inputs": [ {"internalType": "address","name": "_clearedUser", "type": "address" }],"name": "removeBlackList","outputs": [], "stateMutability": "nonpayable","type": "function"}, {"inputs": [],"name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable","type": "function" },{ "inputs": [],"name": "symbol","outputs": [ { "internalType": "string","name": "", "type": "string"}],"stateMutability": "view",  "type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{ "internalType": "address","name": "to", "type": "address"},{ "internalType": "uint256","name": "amount","type": "uint256" } ],"name": "transfer","outputs": [ {  "internalType":"bool", "name": "","type": "bool"}],"stateMutability":"nonpayable","type": "function"},{ "inputs": [{"internalType": "address","name": "from","type": "address" }, { "name": "to","type": "address"},{ "internalType": "uint256","name": "amount","type": "uint256"} ],"name": "transferFrom","outputs": [ {"internalType": "bool","name": "", "type": "bool" } ],"stateMutability": "nonpayable", "type": "function"},{"inputs": [{"internalType": "address", "name": "newOwner","type": "address" } ],"name": "transferOwnership","outputs": [], "stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType":"address", "name": "","type": "address"}, { "internalType": "address", "name": "", "type": "address"  }], "name": "transferRelation","outputs": [ { "internalType": "uint256", "name": "","type": "uint256" }], "stateMutability": "view", "type": "function" },{ "inputs": [ {  "internalType": "address", "name": "","type": "address"}],"name": "upperLevel","outputs": [ { "internalType": "address", "name": "addr", "type": "address" }, {   "internalType": "bool","name": "valid", "type": "bool" }], "stateMutability": "view", "type": "function"}]'
      );
      const contractAddress = "0xf9f412bAdd9b4451670bdC605f5e4eaACcefbccE"; //查询用户地址
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
      await myContract.methods.balanceOf(contractAddress).call((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.send();
    this.getBlockData();
    this.getTransationData();
  },
  mounted() {
    getWebrelay({ action: "hashrate" }).then((res) => {
      this.topData = res.data;
      this.topData.hashrate = res.data.hashrate.toFixed(2);
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
        margin-top: 100px;
        > div {
          width: 45%;
          height: 600px;
        }
        .left {
          .list {
            overflow-y: scroll;
            height: 600px;
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
            height: 600px;
            .item {
              padding-bottom: 20px;
              width: 100%;
              height: 120px;
              border-bottom: 1px solid #ddd;
              .a1 {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; /*加宽度width属来兼容部分浏览*/
              }
              .a1:hover {
                text-decoration: overline;
                color: red;
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
  }
}
</style>