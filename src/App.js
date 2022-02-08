import React, { useState } from "react"
import { ethers } from "ethers"

function App() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [defaultAccount, setDefaultAccount] = useState(null)
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet")

  const connectWalletHandler = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
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

  return (
    <div className="w-screen h-screen flex flex-col  items-center bg-neutral-500 pt-4">
      <h1 className="text-4xl text-white w-2/5  h-20 border-b-2 border-white flex justify-center items-center">
        Ethers.js, React, Tailwind Boiler
      </h1>
      <button
        className="absolute top-4 right-8 border-2 bg-gradient-to-tr from-neutral-700 to-neutral-600 border-white text-white rounded-xl w-40 p-1"
        onClick={connectWalletHandler}
      >
        {connectButtonText}
      </button>
      <h2 className="text-white text-2xl absolute bottom-4 opacity-50">
        {defaultAccount == null ? "No Wallet Connected" : defaultAccount}
      </h2>
    </div>
  )
}

export default App
