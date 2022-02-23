import React, { useCallback, useEffect, useState } from "react";
import VotingContract from "./contracts/Voting.json";
import Top from "./components/top/Top"
import Registration from "./components/registration/Registration"
import getWeb3 from "./getWeb3";
import { getwebState } from "./redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

const App = () => {

  //const [web3, setWeb3] = useState(null);
  //const [userAccount, setuserAccount] = useState(null);
  const [voting, setVoting] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const AuthReducer = useSelector((state) => state.web3.auth);
  console.log(AuthReducer);

  useEffect(() => {
    function checkAuth() {
      if (AuthReducer) {
        setLoading(true);
      }
    }
    checkAuth()
    dispatch(getwebState());
  }, [dispatch, AuthReducer]);

  // const test = async () => {
  //   let ensAdd = await window.web3.eth.ens.getAddress();
  //   console.log(ensAdd);
  // }


  //////////////////////////////

  // useEffect(() => {
  //   async function checkAuth() {
  //     try {

  //       if (AuthReducer) {
  //         setLoading(true);
  //       }

  //     } catch (error) {
  //       if (error === "MetamskNeeds") {
  //         alert(
  //           `Download link:metamask`,
  //         );
  //       } else {
  //         console.log(error);
  //         alert(
  //           `Failed to load web3, accounts, or contract. Check console for details.`,
  //         );
  //       }
  //     }
  //   }
  //   checkAuth();
  //   dispatch(getwebState())
  // }, [dispatch, AuthReducer])

  /////////////////////////

  // useEffect(() => {
  //   async function checkAPI() {
  //     try {
  //       await checkUpEnv();
  //       await setLoading(true);
  //     } catch (error) {
  //       if (error === "MetamskNeeds") {
  //         alert(
  //           `Download link:metamask`,
  //         );
  //       } else {
  //         console.log(error);
  //         alert(
  //           `Failed to load web3, accounts, or contract. Check console for details.`,
  //         );
  //       }
  //     }
  //   }
  //   checkAPI();
  // }, [])

  // const checkUpEnv = useCallback(async () => {

  //   let web3;

  //   if (window.ethereum) {
  //     web3 = await getWeb3();
  //     //setWeb3(web3);
  //   } else {
  //     throw "MetamskNeeds";
  //   }

  //   // let users = await web3.eth.getAccounts();
  //   // await setuserAccount(users[0]);
  //   await deployContracts(web3)//, users);
  // }, [])

  // const deployContracts = useCallback(async (web3, users) => {
  //   let networkId = await web3.eth.net.getId();
  //   let voting = await new web3.eth.Contract(
  //     VotingContract.abi,
  //     VotingContract.networks[networkId] && VotingContract.networks[networkId].address,
  //   )
  //   await setVoting(voting);
  // }, [])

  return (
    <>
      <Top />
      <br />
      {
        !loading ?
          <div>메타마스크에 연결되지 않았어요. 연결이 필요합니다.</div>
          :
          <>
            <Registration />
          </>
      }
    </>
  )
}

export default App;