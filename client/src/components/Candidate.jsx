import React, { useState, useRef, useEffect } from "react";
import "../styles/Candidate.css";
import No1 from "../images/1.png";
import No2 from "../images/2.png";
import No3 from "../images/3.png";
import No4 from "../images/4.png";
import No5 from "../images/5.png";

function Candidate(props) {
  const {web3, voteContract, accounts, isLoading} = props.initialization;
  
  useEffect(() => {  
    console.log("유즈이펙트3")
    if(voteContract == undefined) return
    const test = async() =>{
      await voteContract.methods.getCandidate().call()
      .then((err,result)=>console.log("겟캔디데이트 : ",result));
    }
    test();
  }, [voteContract])
  

  const submitVote = async(e) =>{
    console.log("투표하기 e.target.value : ", e.target.value)
    await voteContract.methods.vote(e.target.value).send({from: accounts[0]})
      .then(voteResult => console.log(voteResult))
    
  }

  return (
    <>
    {isLoading ? (
        <div>Loading Web3, accounts, and contract...</div>
    ) : (
    <div>
      {console.log("페이지3")}
      {/* <button type="button" onClick={test}>확인용</button> */}
      <hr className="boundary" />
      <div className="juseok">
        ※ 사진에 나온 인물들은 모두 가상의 인물들입니다
      </div>
      <div className="vote_box">
        <div className="vote_box-title">후보자 명단</div>
        <div className="candidate_list">
          <div className="candidate_list-box">
            <div className="photo_box">
              <img src={No1} />
            </div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={1}
              className="candidate_list-box-button"
              onClick={submitVote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">
              <img src={No2} />
            </div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={2}
              className="candidate_list-box-button"
              onClick={submitVote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">
              <img src={No3} />
            </div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={3}
              className="candidate_list-box-button"
              onClick={submitVote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">
              <img src={No4} />
            </div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={4}
              className="candidate_list-box-button"
              onClick={submitVote}
            >
              투표하기
            </button>
          </div>
          <div className="candidate_list-box">
            <div className="photo_box">
              <img src={No5} />
            </div>
            <div>(후보명)</div>
            <div>(나이)</div>
            <div>(현재득표수)</div>
            <button
              value={5}
              className="candidate_list-box-button"
              onClick={submitVote}
            >
              투표하기
            </button>
          </div>
        </div>
      </div>
    </div>)
    }
    </>
  )
}

export default Candidate;