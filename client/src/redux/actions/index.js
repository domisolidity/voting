import getWeb3 from "../../getWeb3";
import VotingContract from "../../contracts/Voting.json";

export const INIT = "INIT";

export async function getwebState() {
  const contract = require("@truffle/contract");

  let web3 = await getWeb3()

  let votingSystem = contract(VotingContract);
  votingSystem.setProvider(web3.currentProvider);

  let instance = await votingSystem.deployed();
  console.log('instance\n', instance);

  // 계정(address) 가져오기
  let accounts = await web3.eth.getAccounts();

  return {
    type: INIT,
    web3,
    instance,
    account: accounts[0]
  }
}