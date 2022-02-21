import React, { useState, useRef, useEffect } from "react";
import BackgroundSound from "./BackgroundSound";
import "./Kimchi.css";

function Kimchi() {
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
    <div>
      <div className="registration-box">
        <div className="registration-title">후보자 등록</div>
        <div className="candidate_input-box">
          <div>후보명</div>
          <input
            placeholder="예) 고란이"
            onChange={(e) => {
              setCandidateName(e.target.value);
            }}
            value={candidateName}
          />
        </div>
        <div className="candidate_input-box">
          <div>나이</div>
          <input
            placeholder="예) 78351"
            onChange={(e) => {
              setCandidateAge(e.target.value);
            }}
            value={candidateAge}
          />
        </div>
        <button className="registration-button" onClick={registration}>
          후보등록하기
        </button>
      </div>
      <BackgroundSound />
    </div>
  );
}

export default Kimchi;
