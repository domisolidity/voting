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
            top: "14%",
            left: "39%",
            transform: "translate(-50%, -50%) rotate(-35deg)",
            width: "100px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 2 ? (
        <img
          style={{
            position: "absolute",
            top: "16%",
            left: "55%",
            transform: "translate(-50%, -50%) rotate(40deg)",
            width: "100px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 3 ? (
        <img
          style={{
            position: "absolute",
            top: "16%",
            left: "53%",
            transform: "translate(-50%, -50%) rotate(15deg)",
            width: "100px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 4 ? (
        <img
          style={{
            position: "absolute",
            top: "8%",
            left: "40%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            width: "150px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : candidateNum_E == 5 ? (
        <img
          style={{
            position: "absolute",
            top: "12%",
            left: "53%",
            transform: "translate(-50%, -50%) rotate(10deg)",
            width: "150px",
          }}
          src={require("../images/crwon.png")}
        />
      ) : null}
    </>
  );
};

export default Crwon;
