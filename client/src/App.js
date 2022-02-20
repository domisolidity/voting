import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import Kimchi from "./Kimchi";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // 네트워크 공급자 및 web3 인스턴스를 가져옵니다.
      const web3 = await getWeb3();

      // web3를 사용하여 사용자 계정을 가져옵니다.
      const accounts = await web3.eth.getAccounts();

      // 계약 인스턴스를 가져옵니다.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // web3, 계정, 컨트랙트를 상태로 설정한 후 컨트랙트의 메소드와 상호작용하는 예제를 진행합니다.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // 위의 작업에 대한 오류를 포착합니다.
      alert(
        `web3, 계정 또는 계약을 로드하지 못했습니다. 자세한 내용은 콘솔을 확인하십시오.`
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // 기본적으로 5인 주어진 값을 저장합니다.
    await contract.methods.set(5).send({ from: accounts[0] });

    // 계약에서 가치를 가져와 작동했음을 증명합니다.
    const response = await contract.methods.get().call();

    // 결과로 상태를 업데이트합니다.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>기다려봐 좀</div>;
    }
    return (
      <div className="App">
        <h1>도레미파솔리디티</h1>
        안녕 우리 투표하자
        <Kimchi />
      </div>
    );
  }
}

export default App;
