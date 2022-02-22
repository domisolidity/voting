import Web3 from "web3";

const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // web3 주입 타이밍으로 경쟁 조건을 피하기 위해 로드 완료를 기다립니다.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // 필요한 경우 계정 액세스 요청
          await window.ethereum.enable();
          // 현재 노출된 계정
          resolve(web3);
          console.log("???? 사용")
        } catch (error) {
          reject(error);
        }
      }
      // 기존 dapp 브라우저...
      else if (window.web3) {
        console.log("메타마스크 사용")
        // Mist/MetaMask의 공급자를 사용하십시오.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // 로컬 호스트로 대체; 기본적으로 dev 콘솔 포트를 사용...
      else {
        console.log("로컬호스트사용")
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:9545"
          );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
