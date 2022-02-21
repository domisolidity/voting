import React, {  useState,useEffect } from "react";

const Vote = (props) => {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const voteInstance = props.contract;
  const accounts = props.account;
  console.log("보트인스딴스",voteInstance);
  console.log("어까운트",accounts);

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleAge = (e) => {
    setAge(e.target.value);
  }
  const handleSubmit = async () => {
    let result = await voteInstance.methods.register(name,age).send({from: accounts[0]})
    console.log(result);
  }

  return (
    <>
      <div>Vote</div>
      <div>Hellow~~~~~~~~~~~~</div>
      <h1>후보 등록</h1>
      이름 : <input type="text" onChange={handleName}/>
      나이 : <input type="text" onChange={handleAge}/>
      <button type='button' onClick={handleSubmit}>등록하기</button>
    </>

  )
}

export default Vote