import React, { useState, useRef, useEffect } from "react";
import "./registration.css";
//import VotingContract from "../../contracts/Voting.json";
import { useSelector } from "react-redux";

function Registration() {
  const [candidateName, setCandidateName] = useState(""); // 등록할 후보자 이름
  const [candidateAge, setCandidateAge] = useState(""); // 등록할 후보자 나이

  const web3 = useSelector((state) => state.web3.web3);
  const voteContract = useSelector((state) => state.web3.voteContract);
  //const instance = useSelector((state) => state.web3.instance);
  console.log(web3);
  console.log(voteContract);
  //console.log(instance.methods);

  const getCandidateName = (e) => {
    setCandidateName(e.target.value);
  };
  const getCandidateAge = (e) => {
    setCandidateAge(e.target.value);
  };

  console.log(candidateName);
  console.log(candidateAge);

  const registration = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await web3.eth.getTransactionCount(accounts[0], (err, txCount) => {
      console.log(err);
    });
    let result = await voteContract.methods
      .registerCandidate(candidateName, candidateAge)
      .send({ from: accounts[0] });
    console.log(result);
  };
  const getList = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    await web3.eth.getTransactionCount(accounts[0], (err, txCount) => {
      console.log(err);
    });
    let result = await voteContract.methods
      .getAllCandidateList()
      .send({ from: accounts[0] });
    console.log(result);
  };

  return (
    <div>
      <div className="registration-box">
        <div className="registration-title">후보자 등록</div>
        <div className="candidate_input-box">
          <div>후보명</div>
          <input
            placeholder="예) 고란이"
            onChange={getCandidateName}
            value={candidateName}
          />
        </div>
        <div className="candidate_input-box">
          <div>나이</div>
          <input
            placeholder="예) 78351"
            onChange={getCandidateAge}
            value={candidateAge}
          />
        </div>
        <button className="registration-button" onClick={registration}>
          후보등록하기
        </button>
        <button className="registration-button" onClick={getList}>
          후보조회
        </button>
      </div>
    </div>
  );
}

export default Registration;
