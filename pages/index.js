import Head from 'next/head'
import React from 'react';
import { loadData } from '../web3/funcs';

export default function Home() {

  const [number, setNumber] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [addressAccount, setAddressAccount] = React.useState(null);
  const [contractAddress, setContractAddress] = React.useState(null);

  const [inputValue, setInputValue] = React.useState(null);

  const handleWeb3 = async () => {
    const data = await loadData();

    setNumber(data.number);
    setContract(data.Contract_Web3_Conection);
    setAddressAccount(data.addressAccount);
    setContractAddress(data.Contract_Address);
  };

  const handleChangeNumber = async () => {
    const data = await contract.methods.changeNumber(inputValue).encodeABI();

    const nonce = await web3.eth.getTransactionCount(addressAccount);

    const estimateGas = await contract.methods.changeNumber(inputValue).estimateGas({
      from: addressAccount,
      to: contractAddress,
      nonce: nonce,
      data: data
    });

    const params = {
      from: addressAccount,
      to: contractAddress,
      gas: web3.utils.toHex(estimateGas),
      gasPrice: web3.utils.toHex(web3.utils.toWei('50', 'gwei')),
      data: data
    };

    ethereum.request({
      method: 'eth_sendTransaction',
      params: [params]
    }).then((res) => {
      console.log("Transaction Hash: ", res);

      setInterval(() => {
        // after 10 seconds will execute this code...
        setNumber(inputValue);
      }, 10000); // 10 seconds

    });

  };

  return (
    <>
      <Head>
        <title>Web3 Conection</title>
        <meta name="description" content="Simple web3 conection" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Web3 Conection</h1>

      <button onClick={handleWeb3}>Connect to Web3</button>

      <h3>Number: {number}</h3>

      <input type='number' value={inputValue} onChange={(e) => setInputValue(e.currentTarget.value) } placeholder="Put the number that you want to store in the blockchain"/>
      <button onClick={handleChangeNumber}>Change Number</button>

    </>
  )
}
