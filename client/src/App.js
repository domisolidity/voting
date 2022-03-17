
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VoteContract from "./contracts/Vote.json";
import VoteContract from "./contracts/Vote.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Vote from "./pages/VotePage";
import Register from "./pages/RegisterPage";
import Step from './components/Step';

import Title from "./components/Title";

const App = () => {
  const [web3, setWeb3] = useState()
  const [accounts, setAccounts] = useState()
  const [voteContract, setVoteContract] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const init = async () => {
    setIsLoading(true);
    try {
      console.log("유즈이펙트1")
      // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
      const web3 = await getWeb3();
      // web3를 사용하여 사용자 계정을 가져옵니다.
      const accounts = await web3.eth.getAccounts(); 

      console.log(accounts);
      // Get the contract instance.
      
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = await VoteContract.networks[networkId];
      // 계약 인스턴스를 가져옵니다.
      const voteContract = await new web3.eth.Contract(
        VoteContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccounts(accounts);
      setVoteContract(voteContract);
      setIsLoading(false);
      console.log("유즈이펙트");
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }

  useEffect(async () => {
    init();
  }, [])

  const initialization = { web3, accounts, voteContract, isLoading }

  return (
    <BrowserRouter>
      <Title />
      <Routes>
        {console.log("페이지")}
        <div>아마존 바꾼 버전</div>
        <Route path="/" exact element={<Vote initialization={initialization} />}></Route>
        <Route path="/register" exact element={<Register initialization={initialization} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App