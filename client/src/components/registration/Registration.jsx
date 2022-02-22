import React, { useState, useRef, useEffect } from "react";
import "./registration.css";
import VotingContract from "../../contracts/Voting.json";

function Registration() {
  const [candidateName, setCandidateName] = useState(""); // 등록할 후보자 이름
  const [candidateAge, setCandidateAge] = useState(""); // 등록할 후보자 나이

  console.log(candidateName);
  console.log(candidateAge);

  const registration = async () => {
    console.log("aaaaaa");
  };

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
    </div>
  );
}

export default Registration;
