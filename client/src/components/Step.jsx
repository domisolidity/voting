import React, { useState, useEffect } from "react";

const Step = (props) => {
  const currentStep = props.step;

  return (
    <>
      <div className="step_box">
        현재 스텝: <span>{currentStep}</span>
      </div>
    </>
  );
};

export default Step;
