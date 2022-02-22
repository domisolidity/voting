import { INIT } from "../actions";

let initialState = { web3: null, instance: null, account: null }

export default function (state = initialState, action) {
  switch (action.type) {
    case INIT:
      let { web3, instance, account } = action
      return {
        ...state,
        web3,
        instance,
        account
      }
    default:
      return state;
  }
}