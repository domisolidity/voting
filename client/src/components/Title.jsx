import React from "react";
import "../styles/Title.css";
import { Link } from "react-router-dom";

function Title() {
  return (
    <div>
      <Link className="team_name" to="/">
        <div className="do">도</div>
        <div className="dot">·</div>
        <div className="re">레</div>
        <div className="dot">·</div>
        <div className="mi">미</div>
        <div className="dot">·</div>
        <div className="fa">파</div>
        <div className="dot">·</div>
        <div className="so">솔</div>
        <div className="dot">·</div>
        <div className="li">리</div>
        <div className="dot">·</div>
        <div className="di">디</div>
        <div className="dot">·</div>
        <div className="ty">티</div>
      </Link>
    </div>
  );
}

export default Title;
