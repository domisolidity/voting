
import React, {  useState,useEffect } from "react";
import VoteContract from "./contracts/Vote.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Vote from "./pages/Vote"

const App = () => {
    // const [storageValue, setStorageValue] = useState(0)
    const [web3, setWeb3] = useState()
    const [accounts, setAccounts] = useState()
    const [voteContract, setVoteContract] = useState()

    useEffect(async() => {
        try {
          console.log("여기요")
            // Get network provider and web3 instance.
          const web3 = await getWeb3();
          console.log("=============\n",web3)
          console.log("=============\n")
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = VoteContract.networks[networkId];
            
            const voteContract = new web3.eth.Contract(
                VoteContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setWeb3(web3);
            setAccounts(accounts);
            setVoteContract(voteContract);
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`);
            console.error(error);
        }
    }, [])
    

    if (!web3) {
        return <div>Loading Web3, accounets, and contract...</div>;
      }
      return (
        <div className="App">
            <Vote contract={voteContract} account={accounts}/>
        </div>
      );
}

export default App