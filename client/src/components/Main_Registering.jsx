import React from "react";
import { Link } from "react-router-dom";

const Main_Registering = () => {
  return (
    <>
      <Link className="register_button" to="/register">
        후보 등록 하러 가기
      </Link>
    </>
  );
};

export default Main_Registering;
