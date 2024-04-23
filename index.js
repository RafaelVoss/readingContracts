const { ethers } = require("ethers");
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const INFURA_ID = process.env.INFURA_ID;
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
const address = process.env.ADDRESS;
const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
]
const contract = new ethers.Contract( address , ERC20_ABI , provider )


const main = async () => {
    const name = await contract.name();
    const symbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const balance = await contract.balanceOf("0xBF293D5138a2a1BA407B43672643434C43827179");
    console.log(`\nReading from ${address}...\n`);
    console.log(`Name: ${name}\n`);
    console.log(`Symbol: ${symbol}\n`);
    console.log(`Total Supply: ${totalSupply}\n`);
    console.log(`Balance returned: ${balance}\n`);
    console.log(`Balance formated: ${ethers.formatEther(balance)}\n`);
};

main();