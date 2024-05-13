/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { formatBalance, formatChainAsNum } from "../utils/";
import detectEthereumProvider from "@metamask/detect-provider";
import axios from 'axios';
const MetaMask = ({data}) => {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState("");
  const [equity, setEquity] = useState(0);
  const [usdPrice, setUsdPrice] = useState('');
  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        setWallet(initialState);
      }
    };
// console.log(data)
    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum?.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum?.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnectMetamask = async () => {
    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setError(false);
      updateWallet(accounts);
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };
  const convertToUsd = async () => {
    if(amount!==""){
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd`
      );
      const maticPriceInUsd = response.data['matic-network'].usd;
      const usdValue = parseFloat(amount) * maticPriceInUsd;
      setUsdPrice(usdValue.toFixed(2));
    } catch (error) {
      console.error('Error fetching data:', error);
    }}
  };

  const handleInvestmentChange = () => {
    const eqty = ((usdPrice / data.amountRequired) * data.equity).toFixed(4);

    setEquity(eqty);
  };
useEffect(()=>{
  convertToUsd()
},[amount])


  useEffect(() => {
    if (data) {
      handleInvestmentChange();
    }
  }, [usdPrice]);
console.log(usdPrice)
  const handleInvest = async () => {
    if (!wallet.accounts.length) return; // Ensure account is available
const total=parseInt(amount)+parseInt(tip);
console.log(total)
    const valueInWei =total* 1000000000000000+""; // 1 Matic in wei

    try {
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: wallet.accounts[0],
            to: "0x65Ed972De49e29fa75C99b29C42E2D6De566BC9a", // The recipient address
            value: valueInWei, // 1 Matic in wei
            gasLimit: "0x5028",
            maxPriorityFeePerGas: "0x3b9aca00",
            maxFeePerGas: "0x2540be400",
          },
        ],
      });
      console.log(txHash);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(amount, tip, equity);
  // console.log(wallet);
  return (
    <div className="">
      {/* <div>Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist</div>

      {window.ethereum?.isMetaMask && !wallet.accounts.length && (
        <button disabled={isConnecting} onClick={handleConnect}>Connect MetaMask</button>
      )}

      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      )}
      {error && (
        <div onClick={() => setError(false)}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}

      <button className="sendEthButton" onClick={handleSendEth}>
        Send Ethereum
      </button>

      <button onClick={handleConnect}>Connect MetaMask</button> */}

      <div className="flex justify-center items-center pt-5 mt-8 bg-gray-200">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter PolyGon Quantity"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tip">
            Tip:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tip"
            type="number"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="Enter tip"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="equity">
            Equity:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="equity"
            type="text"
            value={equity}
            disabled
            placeholder="Calculated equity"
          />
        </div>
        {wallet.accounts.length < 1 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleConnectMetamask}
          >
            Connect MetaMask
          </button>
        )}
        {wallet.accounts.length > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleInvest}
          >
            Invest Now
          </button>
        )}
      </form>
    </div>
    </div>
  );
};

export default MetaMask;