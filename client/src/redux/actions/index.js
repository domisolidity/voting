import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

export const AUTH = "AUTH";

export async function getwebState() {
  // const contract = require("@truffle/contract");

  // let web3 = await getWeb3()

  // let votingSystem = contract(VotingContract);
  // votingSystem.setProvider(web3.currentProvider);

  // let instance = await votingSystem.deployed();
  // console.log('instance\n', instance);

  // // 계정(address) 가져오기
  // let accounts = await web3.eth.getAccounts();

  // return {
  //   type: AUTH,
  //   web3,//
  //   instance,
  //   account: accounts[0]//users
  // }

  if (window.ethereum) {
    const contract = require("@truffle/contract");

    let web3 = await getWeb3()

    let votingSystem = contract(VotingContract);
    votingSystem.setProvider(web3.currentProvider);

    let instance = await votingSystem.deployed();
    let voteContract = instance.contract;
    console.log('instance\n', instance);
    console.log('voteContract\n', voteContract);

    // 계정(address) 가져오기
    let accounts = await web3.eth.getAccounts();

    return {
      type: AUTH,
      web3,//
      instance,
      voteContract,
      account: accounts[0],//users
      auth: true
    }
  } else {
    console.log("로그인 안됨.");

    return {
      type: AUTH,
      web3: null,
      instance: null,
      voteContract: null,
      account: null,
      auth: false,
    }
  }
}