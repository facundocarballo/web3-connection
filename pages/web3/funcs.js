import Web3 from 'web3';
import Web3Conection from './ABI/web3Conection.json';

const BSC_TESTNET_RPC = "https://speedy-nodes-nyc.moralis.io/2912346aef06f91434f92aa1/bsc/testnet";

const Contract = require("web3-eth-contract");

Contract.setProvider(BSC_TESTNET_RPC);

const Contract_Address = "0x6E3A99C60fb6d2D78B8F383c1A825122f627458a";

const loadWeb3 = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            // Request account access if needed
            await ethereum.enable();
            // Acccounts now exposed
            web3.eth.sendTransaction({method: 'eth_requestAccounts'});
        } catch (error) {
            // User denied account access...
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */});
    }
    // Non-dapp browsers...
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
};

export const loadData = async () => {
    await loadWeb3();

    const Contract_Web3_Conection = new Contract(Web3Conection.output.abi, Contract_Address);

    const addressAccount = await window.web3.eth.getCoinbase();

    const number = await Contract_Web3_Conection.methods.number().call();

    return { Contract_Web3_Conection, addressAccount, number, Contract_Address };
};

