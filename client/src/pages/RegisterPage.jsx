import React, {  useState,useEffect } from "react";
import Title from "../components/Title"

const RegisterPage = (props) => {
  const {web3, voteContract, accounts} = props.initialization;

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [status, setStatus] = useState(0);

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleAge = (e) => {
    setAge(e.target.value);
  }

  const resisterCandidate = async () => {
    // let accounts = await web3.eth.getAccounts()
    // console.log(accounts[0])
    console.log(accounts[0])
    await web3.eth.getTransactionCount(accounts[0],(err,txCount)=>{
      console.log(txCount)
    })
    let result = await voteContract.methods.register(name,age).send({from: accounts[0]})
    console.log(result);

  }
  return (
    <>
    <Title/>
      <h1>Register-page</h1>
      <div>
        <div className="registration-box">
          <div className="registration-title">후보자 등록</div>
          <div className="candidate_input-box">
          <div>후보명</div>
          <input placeholder="예) 고란이" onChange={handleName}/>
          </div>
          <div className="candidate_input-box">
          <div>나이</div>
          <input placeholder="예) 33" onChange={handleAge}/>
          </div>
          <button className="registration-button" onClick={resisterCandidate}> 
            후보등록하기
          </button>
        </div>
    </div>
    </>
  )
}

export default RegisterPage