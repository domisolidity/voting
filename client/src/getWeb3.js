import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // web3 주입 타이밍으로 경쟁 조건을 피하기 위해 로드 완료를 기다립니다.
    window.addEventListener("load", async () => {
      // 최신 dapp 브라우저 ...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // 필요한 경우 계정 액세스 요청
          await window.ethereum.enable();
          // 현재 노출된 계정
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // 기존 dapp 브라우저...
      else if (window.web3) {
        // Mist/MetaMask의 공급자를 사용하십시오.
        const web3 = window.web3;
        console.log("주입된 web3가 감지되었습니다.");
        resolve(web3);
      }
      // 로컬 호스트로 대체; 기본적으로 dev 콘솔 포트를 사용...
      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );
        const web3 = new Web3(provider);
        console.log("Local web3를 사용하여 주입된 web3 인스턴스가 없습니다.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
