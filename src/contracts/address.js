import { reactive, ref } from "vue";

export const isTest = false
let contractObj;

if (isTest) {
  contractObj = {
    RETRIVE: '0x6e65a1e833698f00573b9106427596c8bb349cb2'
  }
}
export const { RETRIVE } = contractObj
export const RETRIVE_ADDR = {
  address: RETRIVE,
  abi: [
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "num",
          "type": "uint256"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
}

const Web3 = reactive(require("web3"));
const rpcURL = ref("http://3.20.206.120:9650/ext/bc/C/rpc"); // Your RPC URL goes here
const abi = reactive([
  {
    inputs: [],
    name: "retrieve",
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
        internalType: "uint256",
        name: "num",
        type: "uint256",
      },
    ],
    name: "store",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]);
const web3 = new Web3(rpcURL);
const address = ref("0x6e65a1e833698f00573b9106427596c8bb349cb2");
web3.eth.getBalance(address, (err, wei) => {
  balance = web3.utils.fromWei(wei, "ether");
});