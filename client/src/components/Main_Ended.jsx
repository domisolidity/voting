import React, { useState } from "react";
import Crwon from "./Crwon";

const Main_Ended = (props) => {
  const { voteContract } = props.initialization;

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
      .catch(console.error);
  };
  return (
    <>
      {!isView ? (
        <>
          <div>투표가 종료되었습니다.</div>
          <button onClick={getElectedCandidate}>투표결과 확인하기</button>
        </>
      ) : (
        <div className="vote_box">
          <div className="candidate_list">
            <div className="candidate_list-box">
              <div className="photo_box">
                <img src={require("../images/" + candidateNum_E + ".png")} />
                <Crwon candidateNum_E={candidateNum_E} />
              </div>
              기호 번호 : <span>{candidateNum_E}</span> <br />
              후보명 : <span>{name_E}</span> <br />
              나이 : <span>{age_E}</span> <br />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main_Ended;
