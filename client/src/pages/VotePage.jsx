import React, { useState, useEffect } from "react";
import "../styles/VotePage.css";
import Step from "../components/Step";
import Main_Registering from "../components/Main_Registering";
import Main_Voting from "../components/Main_Voting";
import Main_Ended from "../components/Main_Ended";
import VotingRestart from "../components/VotingRestart";

const Vote = (props) => {
  const [selectNum, setSelectNum] = useState(0);
  const [step, setStep] = useState("");

  const { voteContract, accounts, isLoading } = props.initialization;

  // 진행 단계 가져오기
  const currentStep = async () => {
    const getStep = await voteContract.methods.voteState().call();
    if (getStep == 0) {
      console.log("00000000");
      setStep("후보 등록중");
    } else if (getStep == 1) {
      console.log("11111111");
      setStep("투표 진행중");
    } else if (getStep == 2) {
      setStep("투표가 종료되었습니다.");
    }
  };

  const reStart = async () => {
    const adminAddress = await voteContract.methods.admin().call(); //배포자 계정

    if (adminAddress === accounts[0]) {
      await voteContract.methods
        .startVote()
        .call()
        //.then(setStep("후보 등록중"))
        .catch((err) => console.error(err));

      setStep("후보 등록중");
      console.log(step);
      // console.log(await voteContract.methods.startVote().call());
      // console.log(await voteContract.methods.voteState().call());
    } else {
      alert("관리자가 아니네요. 관리자에게 문의 하세요!");
    }
  };
  console.log(step);

  useEffect(() => {
    console.log(voteContract);
    if (voteContract == undefined) return;
    console.log("유즈이펙트2");
    currentStep();
  }, [voteContract]);
  useEffect(() => {}, [step]);

  if (step == "후보 등록중") {
    return (
      <>
        <Step step={step} />
        <Main_Registering step={step} initialization={props.initialization} />
      </>
    );
  } else if (step == "투표 진행중") {
    return (
      <>
        <Step step={step} />
        <Main_Voting step={step} initialization={props.initialization} />
      </>
    );
  } else {
    return (
      <>
        <div className="restart">
          <Step step={step} />
          <button onClick={reStart}>선거 다시 시작하기</button>
        </div>
        <Main_Ended step={step} initialization={props.initialization} />
      </>
    );
  }
};

export default Vote;
