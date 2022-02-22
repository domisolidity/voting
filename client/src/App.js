import React, { useCallback, useEffect, useState } from "react";
import VotingContract from "./contracts/Voting.json";
import Top from "./components/top/Top"
import Registration from "./components/registration/Registration"
import getWeb3 from "./getWeb3";

import "./App.css";

const App = () => {

  const [web3, setWeb3] = useState(null);
  const [userAccount, setuserAccount] = useState(null);
  const [voting, setVoting] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAPI() {
      try {
        await checkUpEnv();
        await setLoading(true);
      } catch (error) {
        if (error === "MetamskNeeds") {
          alert(
            `Download link:metamask`,
          );
        } else {
          console.log(error);
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
        }
      }
    }
    checkAPI();
  }, [])

  const checkUpEnv = useCallback(async () => {

    let web3;

    if (window.ethereum) {
      web3 = await getWeb3();
      setWeb3(web3);
    } else {
      throw "MetamskNeeds";
    }

    let users = await web3.eth.getAccounts();
    await setuserAccount(users[0]);
    await deployContracts(web3, users);
  }, [])

  const deployContracts = useCallback(async (web3, users) => {
    let networkId = await web3.eth.net.getId();
    let voting = await new web3.eth.Contract(
      VotingContract.abi,
      VotingContract.networks[networkId] && VotingContract.networks[networkId].address,
    )
    await setVoting(voting);
  }, [])

  return (
    <>
      {
        !loading ?
          <div>Loading Web3, accounts, and contract...</div>
          :
          <>
            <Top />
            <Registration />
          </>
      }
    </>
  )
}

export default App;