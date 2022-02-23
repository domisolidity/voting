import React, { useState } from "react";
import Crwon from "./Crwon";

const Main_Ended = (props) => {
  const { voteContract, accounts } = props.initialization;

  const [candidateNum_E, setCandidateNum_E] = useState(0);
  const [name_E, setName_E] = useState("");
  const [age_E, setAge_E] = useState(0);
  const [isView, setIsView] = useState(false);

  const getElectedCandidate = async () => {
    await voteContract.methods
      .electedCandidate()
      .call()
      .then((result) => {
        setCandidateNum_E(result.candidateNum);
        setName_E(result.name);
        setAge_E(result.age);
        setIsView(true);
      })
      .catch((err) => console.error(err));
  };

  const reStart = async () => {
    const adminAddress = await voteContract.methods.admin().call(); //배포자 계정

    if (adminAddress === accounts[0]) {
      await voteContract.methods
        .startVote()
        .call()
        //.then(console.log(await voteContract.methods.voteState()))
        .catch((err) => console.error(err));

      console.log(await voteContract.methods.startVote().call());
      console.log(await voteContract.methods.voteState().call());
    } else {
      alert("관리자가 아니네요. 관리자에게 문의 하세요!");
    }
  };

  return (
    <>
      {!isView ? (
        <>
          <button className="result_button" onClick={getElectedCandidate}>
            투표결과 확인하기
          </button>
        </>
      ) : (
        <div className="vote_box">
          <div className="candidate_list">
            <div className="candidate_list-box">
              <div className="president_photo_box">
                <img src={require("../images/" + candidateNum_E + ".png")} />
                <Crwon candidateNum_E={candidateNum_E} />
              </div>
              기호 번호 : <span>{candidateNum_E}</span> <br />
              후보명 : <span>{name_E}</span> <br />
              나이 : <span>{age_E}</span> <br />
            </div>
          </div>
          <button onClick={reStart}>선거 다시 시작하기</button>
        </div>
      )}
    </>
  );
};

export default Main_Ended;
