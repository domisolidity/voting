import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props) => {
  const navigate = useNavigate();

  const { web3, voteContract, accounts } = props.initialization;

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const myRegistrationFee = "30";
  const [status, setStatus] = useState(0);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };

  const resisterCandidate = async () => {
    if (name == "") {
      alert("너의 이름은...");
      return;
    } else if (typeof name !== typeof "string") {
      alert("이름은 문자로 입력해야합니다");
      return;
    } else if (name.length > 10) {
      alert("이름이 너무 길어요 10자 이내로 해주세요");
      return;
    }
    if (age == "" || 0) {
      alert("아직 안태어나셨나요?");
      return;
    } else if (age > 200 || age < 0) {
      alert("당신 나이가 그게 사람입니까?");
      return;
    } else if (age < 8) {
      alert("적어도 초등학교는 들어가야 선거에 참여하실 수 있읍니다");
      return;
    }

    // let accounts = await web3.eth.getAccounts()
    // console.log(accounts[0])
    console.log(accounts[0]);
    await web3.eth.getTransactionCount(accounts[0], (err, txCount) => {
      console.log(txCount);
    });
    let result = await voteContract.methods
      .register(name, age)
      .send({
        from: accounts[0],
        value: web3.utils.toWei(myRegistrationFee, "ether"),
      })
      .then(() =>
        alert(`${name} 후보가 등록되었읍니다. 메인페이지로 이동합니다.`)
      )
      .then(() => navigate("/"))
      .catch((err) => {
        alert("이미 후보 등록 하셨습니다.");
        console.error(err);
      });
  };
  return (
    <>
      <h1>Register-page</h1>
      <div>
        <div className="registration-box">
          <div className="registration-title">후보자 등록</div>
          <div className="candidate_input-box">
            <div>후보명</div>
            <input
              type={"text"}
              placeholder="예) 고란이"
              onChange={handleName}
            />
          </div>
          <div className="candidate_input-box">
            <div>나이</div>
            <input type={"number"} placeholder="예) 33" onChange={handleAge} />
          </div>
          <button className="registration-button" onClick={resisterCandidate}>
            후보등록하기
          </button>
        </div>
        <div style={{ fontSize: "13px", textAlign: "center" }}>
          후보등록에는 고작 {myRegistrationFee}이더(ETH)만 있으면 됩니다
        </div>
      </div>

      <div></div>
    </>
  );
};

export default RegisterPage;
