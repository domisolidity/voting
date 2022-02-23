import React, { useState, useRef, useEffect } from "react";
import "../styles/Candidate.css";

const Main_Voting = (props) => {
  const {web3, voteContract, accounts, isLoading} = props.initialization;

  const [allCandidate, setAllCandidate] = useState(0);
  const [receivedVote, setReceivedVote] = useState(0);


  
  useEffect(() => {  
    console.log("유즈이펙트3")
    if(voteContract == undefined) return

    const getAllCandidates = async() =>{
      await voteContract.methods.getCandidate().call()
      .then(result=> setAllCandidate(result));
    }
    getAllCandidates();
  }, [voteContract,props.step])



  const submitVote = async(e) =>{
    console.log("투표하기 e.target.value : ", e.target.value)
    await voteContract.methods.vote(e.target.value).send({from: accounts[0]})
      .then(voteResult => console.log(voteResult))
      .catch(alert("이미 투표하셨습니다."))
    
    await voteContract.methods.getCandidateReceivedVote(e.target.value).call()
    .then(result=> { setReceivedVote(result)});

  }

  return (
    <>
        <div>
        {/* <button type="button" onClick={test}>확인용</button> */}
        <hr className="boundary" />
        <div className="juseok">
          ※ 사진에 나온 인물들은 모두 가상의 인물들입니다
        </div>
        <div className="vote_box">
          <div className="vote_box-title">후보자 명단</div>
          <div className="candidate_list">
            {allCandidate && allCandidate.map((candidate)=>{
              return (
                <>
                <div className="candidate_list-box">
                  <div className="photo_box">
                    <img src={require('../images/'+ candidate.candidateNum + '.png')} />
                  </div>
                  <div>{candidate.name}</div>
                  <div>{candidate.age}</div>
                  <div>{candidate.receivedVote}</div>
                  <button
                    value={candidate.candidateNum}
                    className="candidate_list-box-button"
                    onClick={submitVote}
                  >
                    투표하기
                  </button>
                </div>
                
                </>
              ) 
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main_Voting