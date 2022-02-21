import React, { useState, useRef, useEffect } from "react";
import "./TeamName.css";
import axios from "axios";

function TeamName() {
  const [candidateName, setCandidateName] = useState(""); // 등록할 후보자 이름
  const [candidateAge, setCandidateAge] = useState(""); // 등록할 후보자 나이

  console.log(candidateName);
  console.log(candidateAge);

  const registration = async () => {
    console.log("aaaaaa");
    // const { accounts, contract } = this.state;
    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();
    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  //   const bcMaker = async () => {
  //     const data = 블록데이터;
  //     if (data.length === 0) {
  //       //데이터없으면 리네임
  //       return alert(`데이터를 넣어주세용`);
  //     }
  //     await axios
  //       .post(`http://localhost:3001/mineBlock`, { data: [data] })
  //       .then((req) => alert(req.data));
  //   };

  return (
    <div className="team_name">
      <div className="do">도</div>
      <div className="dot">·</div>
      <div className="re">레</div>
      <div className="dot">·</div>
      <div className="mi">미</div>
      <div className="dot">·</div>
      <div className="fa">파</div>
      <div className="dot">·</div>
      <div className="so">솔</div>
      <div className="dot">·</div>
      <div className="li">리</div>
      <div className="dot">·</div>
      <div className="di">디</div>
      <div className="dot">·</div>
      <div className="ty">티</div>
    </div>
  );
}

export default TeamName;
