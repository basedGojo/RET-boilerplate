import React, { useState } from "react"
import { ethers } from "ethers"
import AggregatorV3ABI from "./AggregatorV3ABI.json"

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet")

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
        accountChangeHandler(result[0])
        setConnectButtonText("Wallet Connected")
      })
    } else {
      setErrorMessage("Install MetaMask!")
    }
  }

  const accountChangeHandler = (newAccount) => {
    setDefaultAccount(newAccount)
  }

  let provider = new ethers.providers.Web3Provider(window.ethereum)
  let signer = provider.getSigner()
  const BTCUSDContract = new ethers.Contract("0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c", AggregatorV3ABI, signer)
  const ETHUSDContract = new ethers.Contract("0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", AggregatorV3ABI, signer)
  const USDCUSDContract = new ethers.Contract("0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6", AggregatorV3ABI, signer)

  const [BTCPrice, setBTCPrice] = useState()
  const BTCUSDCall = async () => {
    let roundData = await BTCUSDContract.latestRoundData()
    let decimals = await BTCUSDContract.decimals()
    setBTCPrice(Number((roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)))
  }

  const [ETHPrice, setETHPrice] = useState()
  const ETHUSDCall = async () => {
    let roundData = await ETHUSDContract.latestRoundData()
    let decimals = await ETHUSDContract.decimals()
    setETHPrice(Number((roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)))
  }

  const [USDCPrice, setUSDCPrice] = useState()
  const USDCUSDCall = async () => {
    let roundData = await USDCUSDContract.latestRoundData()
    let decimals = await USDCUSDContract.decimals()
    setUSDCPrice(Number((roundData.answer.toString() / Math.pow(10, decimals)).toFixed(2)))
  }

  const multicall = async () => {
    BTCUSDCall()
    ETHUSDCall()
    USDCUSDCall()
  }

  return (
    <div className="w-screen h-screen flex flex-col  items-center bg-neutral-500 pt-4">
      <h1 className="text-4xl text-white w-2/5  h-20 border-b-2 border-white flex justify-center items-center">Ethers.js, React, Tailwind Boiler</h1>
      <button className="mt-2 w-40 h-8 bg-slate-200 rounded-xl" onClick={multicall}>
        Get Prices
      </button>
      <div className="mt-16 w-1/5 flex flex-col">
        <div className="flex justify-between">
          <div className="text-3xl text-white">BTC Price:</div>
          <div className="text-3xl text-white">${Number(BTCPrice).toLocaleString("en-us")}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-3xl text-white">ETH Price:</div>
          <div className="text-3xl text-white">${Number(ETHPrice).toLocaleString("en-us")}</div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="text-3xl text-white">USDC Price:</div>
          <div className="text-3xl text-white">${Number(USDCPrice).toFixed(4)}</div>
        </div>
      </div>
      <button
        className="absolute top-4 right-8 border-2 bg-gradient-to-tr from-neutral-700 to-neutral-600 border-white text-white rounded-xl w-40 p-1"
        onClick={connectWalletHandler}
      >
        {connectButtonText}
      </button>
      <h2 className="text-white text-2xl absolute bottom-4 opacity-50">{defaultAccount == null ? "No Wallet Connected" : defaultAccount}</h2>
    </div>
  )
}

export default App
