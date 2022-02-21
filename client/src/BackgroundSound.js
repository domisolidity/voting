import React, { useState, useRef, useEffect } from "react";
// import "./BackgroundSound.css";

function BackgroundSound() {
  const [candidateName, setCandidateName] = useState(""); // 등록할 후보자 이름
  const [candidateAge, setCandidateAge] = useState(""); // 등록할 후보자 (나이)

  console.log(candidateName);
  console.log(candidateAge);

  const vote = async (e) => {
    console.log(e.target.value);
  };

  return (
    <iframe
      className="sound_box"
      width="300"
      height="50"
      src="https://www.youtube.com/embed/g7iEMZO-oaM?autoplay=1&loop=1&playlist=g7iEMZO-oaM&controls=1&showinfo=0&modestbranding=1&fs=0&rel=0"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; loop; clipboard-write; encrypted-media; gyroscope; picture-in-picture; showinfo; modestbranding; fs; rel"
    ></iframe>
  );
}

export default BackgroundSound;
