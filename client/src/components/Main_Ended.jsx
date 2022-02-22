import React, {useState} from 'react'
import No1 from "../images/1.png";
import No2 from "../images/2.png";
import No3 from "../images/3.png";
import No4 from "../images/4.png";
import No5 from "../images/5.png";

const Main_Ended = (props) => {
  const {voteContract, accounts , isLoading} = props.initialization;

  const [electedCandidate, setElectedCaindated] = useState();
  const [isView, setIsView] = useState(false)
  
  const getElectedCandidate = async() =>{
      await voteContract.methods.getElectedCandidate().call()
      .then(result => setElectedCaindated(result))
      .then(setIsView(true))
      .catch(console.error);


    
  }
  return (
    <>
      {!isView ? (
        <>
          <div>진행중인 투표가 없습니다.</div>
          <button onClick={getElectedCandidate}>투표결과 확인하기</button>
        </>
      ): (
        <div className="vote_box">
              <div className="candidate_list">
                <div className="candidate_list-box">
                  <div className="photo_box">
                    <img src={No1} />
                  </div>
                  <div>(후보명)</div>
                  <div>(나이)</div>
                </div>
              </div>
            </div>
      )}
    </>
  )
}

export default Main_Ended