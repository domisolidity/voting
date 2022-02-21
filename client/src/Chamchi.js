import React, { useState, useRef, useEffect } from "react";
import "./Chamchi.css";
import axios from "axios";

function Chamchi() {
  const [candidateName, setCandidateName] = useState(""); // 등록할 후보자 이름
  const [candidateAge, setCandidateAge] = useState(""); // 등록할 후보자 (나이)

  console.log(candidateName);
  console.log(candidateAge);

  const vote = async (e) => {
    console.log(e.target.value);
  };

  return (
    <div>
      <hr className="boundary" />
      <div className="vote_box">
        <div className="vote_box-title">후보자 명단</div>
        <div className="candidate_list">
          <div className="candidate_list-box">
            <div className="photo_box">사진</div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={1}
              className="candidate_list-box-button"
              onClick={vote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">사진</div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={2}
              className="candidate_list-box-button"
              onClick={vote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">사진</div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={3}
              className="candidate_list-box-button"
              onClick={vote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">사진</div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={4}
              className="candidate_list-box-button"
              onClick={vote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">사진</div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={5}
              className="candidate_list-box-button"
              onClick={vote}
            >
              투표하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chamchi;
