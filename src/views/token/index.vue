<template>
  <div class="home">
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
        v-model="activeName"
        tabPosition="top"
        class="demo-tabs fz24"
        @tab-click="goHome"
      >
        <el-tab-pane label="Home" name="first" class="first"></el-tab-pane>
        <el-tab-pane label="Tokens" name="second" class="second container">
          <p class="fz30 b1 mt20" style="margin-left: 50px">Tokens</p>
          <div class="content p10 bsbb mt40 df fdc">
            <div class="list df fdc fz16">
              <div class="item p10 bsbb df jcsb">
                <span class="b3" style="margin-right: 120px">AA(BB)</span>
                <span class="b2 hover" @click="goTokenDetail">{{
                  tokens
                }}</span>
                <span></span>
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
export default {
  data() {
    return {
      input: "",
      activeName: "second",
      tokens: "0xF75fBB9273D50cc14a0DB178bf4b823f02c9F5e5",
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
    };
  },
  methods: {
    goTokenDetail() {
      this.$router.push({
        path: "/tokenDetail",
        query: {
          tokens: this.tokens,
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
    async get() {
      let web3 = window.ethereum && new Web3(window.ethereum);
      const contractAbi = JSON.parse(
        '[{"inputs": [ {"internalType": "uint256","name": "_initialSupply","type": "uint256"},{ "internalType": "string","name": "_name","type": "string" },{"internalType": "string","name": "_symbol", "type": "string"},{"internalType": "uint8","name": "_decimal","type": "uint8" } ],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [ {"indexed": false,"internalType": "address","name": "_user","type": "address"}],"name": "AddedBlackList", "type": "event"},{"anonymous": false, "inputs": [{"indexed": true,"internalType": "address","name": "owner", "type": "address" },{"indexed": true,"internalType": "address","name": "spender","type": "address" },{ "indexed": false,"internalType": "uint256","name": "value", "type": "uint256"}], "name": "Approval","type": "event"},{"anonymous": false,"inputs": [ {"indexed": true,"internalType": "address","name": "previousOwner","type": "address"}, {"indexed": true,"internalType": "address", "name": "newOwner", "type": "address" }],"name": "OwnershipTransferred","type": "event"}, {"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "_user","type": "address"}],"name": "RemovedBlackList","type": "event" }, { "anonymous": false,"inputs": [ {"indexed": true,"internalType": "address","name": "from","type": "address" },{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"} ],"name": "Transfer", "type": "event"},{"inputs": [{"internalType": "address","name": "_addr","type": "address" },{"internalType": "bool","name": "_admin", "type": "bool"}], "name": "addAdmin", "outputs": [],"stateMutability": "nonpayable", "type": "function"}, {"inputs": [ {"internalType": "address","name": "_evilUser", "type": "address"} ],"name": "addBlackList","outputs": [],"stateMutability": "nonpayable","type": "function" }, {"inputs": [ {"internalType": "address", "name": "owner","type": "address" }, {"internalType": "address","name": "spender","type": "address"}],"name": "allowance", "outputs": [{"internalType": "uint256","name": "","type": "uint256" } ],"stateMutability": "view", "type": "function" },{"inputs": [ {"internalType": "address","name": "spender","type": "address"}, {"internalType": "uint256","name": "amount", "type": "uint256"} ],"name": "approve","outputs": [{"internalType": "bool","name": "", "type": "bool"}],"stateMutability": "nonpayable","type": "function" },{"inputs": [ {"internalType": "address", "name": "account","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256", "name": "","type": "uint256"}],"stateMutability": "view","type": "function" },{"inputs": [ {"internalType": "address","name": "","type": "address"}],"name": "blackListed", "outputs": [ {"internalType": "bool","name": "","type": "bool"  } ], "stateMutability": "view","type": "function" },{"inputs": [ {"internalType": "uint256","name": "_amount","type": "uint256"} ],"name": "burn","outputs": [],"stateMutability": "nonpayable","type": "function"  },{"inputs": [], "name": "decimals","outputs": [ {"internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view","type": "function"},{ "inputs": [ {"internalType": "address","name": "spender","type": "address" },{"internalType": "uint256","name": "subtractedValue","type": "uint256"} ],"name": "decreaseAllowance","outputs": [ { "internalType": "bool","name": "","type": "bool"} ], "stateMutability": "nonpayable","type": "function"},{ "inputs": [ {"internalType": "address","name": "_maker","type": "address" }],"name": "getBlackListStatus","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [ {"internalType": "address","name": "_addr", "type": "address"}], "name": "getLowerLevel","outputs": [{"internalType": "address[]","name": "","type": "address[]"} ],"stateMutability": "view","type": "function" },{"inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "getUpperLevel","outputs": [ {"internalType": "address", "name": "","type": "address" } ],"stateMutability": "view","type": "function" }, {"inputs": [ {"internalType": "address","name": "spender","type": "address" }, {"internalType": "uint256", "name": "addedValue","type": "uint256"} ],"name": "increaseAllowance","outputs": [{"internalType": "bool","name": "","type": "bool" }],"stateMutability": "nonpayable","type": "function" },{"inputs": [{"internalType": "address", "name": "_addr","type": "address"}],"name": "isUser","outputs": [ {"internalType": "bool", "name": "", "type": "bool" } ],"stateMutability": "view","type": "function" }, {"inputs": [ {"internalType": "address","name": "","type": "address"  }, {"internalType": "uint256", "name": "", "type": "uint256"  } ], "name": "lowerLevel", "outputs": [ {"internalType": "address","name": "", "type": "address"   } ], "stateMutability": "view", "type": "function"},{"inputs": [ {"internalType": "address", "name": "", "type": "address"} ],"name": "mapAdmin", "outputs": [{"internalType": "bool", "name": "","type": "bool" } ], "stateMutability": "view",  "type": "function" },{"inputs": [],"name": "name","outputs": [{ "internalType": "string","name": "",  "type": "string"  } ], "stateMutability": "view","type": "function"},{"inputs": [], "name": "owner","outputs": [ {"internalType": "address","name": "","type": "address"  }],"stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_clearedUser","type": "address" }],"name": "removeBlackList","outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership","outputs": [],"stateMutability": "nonpayable", "type": "function" },{"inputs": [],"name": "symbol","outputs": [ {"internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply","outputs": [  {"internalType": "uint256", "name": "","type": "uint256"  }  ], "stateMutability": "view","type": "function" }, {"inputs": [ {"internalType": "address","name": "to", "type": "address" }, {"internalType": "uint256","name": "amount","type": "uint256" }],"name": "transfer", "outputs": [  { "internalType": "bool", "name": "","type": "bool"   }  ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address","name": "from", "type": "address" },  { "internalType": "address", "name": "to", "type": "address"  }, {"internalType": "uint256","name": "amount", "type": "uint256" }  ], "name": "transferFrom", "outputs": [ {"internalType": "bool","name": "","type": "bool"  }  ],"stateMutability": "nonpayable","type": "function" },{"inputs": [ {"internalType": "address","name": "newOwner", "type": "address"  } ], "name": "transferOwnership","outputs": [],"stateMutability": "nonpayable", "type": "function" },{ "inputs": [ {"internalType": "address", "name": "","type": "address"}, { "internalType": "address", "name": "","type": "address"} ],"name": "transferRelation","outputs": [{"internalType": "uint256","name": "", "type": "uint256"}],"stateMutability": "view","type": "function"},{ "inputs": [{"internalType": "address","name": "","type": "address"}],"name": "upperLevel","outputs": [{"internalType": "address","name": "addr","type": "address"},{"internalType": "bool","name": "valid","type": "bool"}],"stateMutability": "view","type": "function"}]'
      );
      // const contractAbi = this.tokenAbi;
      const contractAddress = "0xAC9B082D83eceF7FA456159e285e78AdFb70d8a3"; //查询用户地址
      const myContract = new web3.eth.Contract(contractAbi, contractAddress); //所有代币的abi可以通用（abi,合约地址）
      await myContract.methods
        .balanceOf("0x7B6191C29ad7e732a36806D33FF28803091C056b")
        .call()
        .then((res) => {
          console.log(res);
        });
    },
  },
  created() {},
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
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.home {
  font-family: "pingfang";
  height: 100%;
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
        > div {
          width: 40%;
          height: 600px;
        }
        .left {
          .list {
            overflow-y: scroll;
            height: 400px;
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
            height: 400px;
            .item {
              width: 100%;
              height: 90px;
              border-bottom: 1px solid #ddd;
              .a1 {
                width: 200px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap; /*加宽度width属来兼容部分浏览*/
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
    .second {
      .content {
        .list {
          .item {
            border-top: 1px solid #ddd;
            width: 80%;
            height: 100px;
            margin: 0 auto;
            .hover:hover {
              color: #666 !important;
              text-decoration: underline;
            }
          }
        }
      }
    }
    .third {
      .content {
        .list {
          .item {
            border-top: 1px solid #ddd;
            width: 80%;
            height: 100px;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
</style>