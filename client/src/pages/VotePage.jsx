import React, { useState, useEffect } from "react";
import "../styles/VotePage.css";
import Step from "../components/Step";
import Main_Registering from "../components/Main_Registering";
import Main_Voting from "../components/Main_Voting";
import Main_Ended from "../components/Main_Ended";

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
      setStep("진행중인 투표가 없습니다.");
    }
  };

  useEffect(() => {
    console.log(voteContract);
    if (voteContract == undefined) return;
    console.log("유즈이펙트2");
    currentStep();
  }, [voteContract, step]);

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
        <Step step={step} />
        <Main_Ended step={step} initialization={props.initialization} />
      </>
    );
  }
};

export default Vote;
