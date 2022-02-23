import React, { useState, useEffect } from "react";

const Crwon = (props) => {
  const candidateNum_E = props.candidateNum_E;
  console.log(props);
  return (
    <>
      {candidateNum_E == 1 ? (
        <img
          style={{
            position: "absolute",
            top: "9%",
            left: "25%",
            transform: "translate(-50%, -50%) rotate(-35deg)",
            width: "100px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 2 ? (
        <img
          style={{
            position: "absolute",
            top: "14%",
            left: "60%",
            transform: "translate(-50%, -50%) rotate(40deg)",
            width: "100px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 3 ? (
        <img
          style={{
            position: "absolute",
            top: "12%",
            left: "58%",
            transform: "translate(-50%, -50%) rotate(15deg)",
            width: "100px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 4 ? (
        <img
          style={{
            position: "absolute",
            top: "-5%",
            left: "30%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            width: "150px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 5 ? (
        <img
          style={{
            position: "absolute",
            top: "11%",
            left: "58%",
            transform: "translate(-50%, -50%) rotate(15deg)",
            width: "50px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : null}
    </>
  );
};

export default Crwon;
