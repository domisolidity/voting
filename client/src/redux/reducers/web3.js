import { AUTH } from "../actions";

let initialState = { web3: null, instance: null, voteContract: null, account: null, auth: false }

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH:
      let { web3, instance, voteContract, account } = action
      return {
        ...state,
        web3,
        instance,
        voteContract,
        account,
        auth: true,
      }
    default:
      return state;
  }
}