// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Host {

    event alertMsg(address _from,uint256 _value ,string message);

    //리시브를 통해 호스트 스마트 컨트랙트가 이더를 받음
    receive() external payable {
    //이더를 받고 난후 실행 : 누가, 얼마나 , 메세지 
      emit alertMsg(msg.sender, msg.value,"It has been registered successfully registered." );
    }
}


contract Voting {

    address owner;

    constructor() payable{
        owner = msg.sender;
    }

    struct Candidate {
        string name;
        uint256 age;
    }
    
    Candidate[] public candiateList;

    event candiateListInfo(uint256 indexed _index, Candidate);
    
    function registerCandidate(string memory _name, uint256 _age, address payable _to) public payable{
        require(candiateList.length < 5 , "Registration is no longer available.");
        require(msg.value == 10000000000000000000,"Amount is wrong. Check your money.");

        (bool sent, ) = _to.call{value: msg.value}("");
        require(sent, "Failled" );
  
        candiateList.push(Candidate(_name,_age));
    }

    // 모든 후보자 리스트
    function getAllCandidateList() public {
        for(uint256 i = 0; i < candiateList.length; i++){
            emit candiateListInfo(i,candiateList[i]);
        }
    }

}