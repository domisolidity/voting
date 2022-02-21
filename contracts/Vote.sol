// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Vote {

    enum State {Registering, Voting, Ended}
    State public voteState;

    event completeRegist(uint8 candidateNum, string name, uint8 age, uint8 receivedVote, address addr);
    
    struct Candidate {
        uint8 candidateNum;
        string name;
        uint8 age;
        uint8 receivedVote;
        address addr;
    }
    address public admin;

    uint index;
    uint voteCount = 1;

    // mapping(uint => Candidate) public candidates;
    Candidate[]  public candidates;
    Candidate public electedCandidate;

    mapping(address => bool) public isRegist; // private로?
    mapping(address => uint8) public isVote; // private로?

    constructor() public {
        voteState = State.Registering;
    }


    // @ 후보등록
    function register(string memory _name, uint8 _age) public {
        // require(msg.value == 5 * 10 ** 15);
        require(voteState == State.Registering,"Registration has closed.");
        require(isRegist[msg.sender] == false, "already registered.");

        candidates.push(Candidate(uint8(index), _name, _age, 0, msg.sender));

        isRegist[msg.sender] = true;

        emit completeRegist(candidates[index].candidateNum, _name, _age, 0, msg.sender);
        
        index++;
        if(index==5) {
            voteState = State.Voting;
        }
    }

    // @ 투표
    function vote(uint _selectNum) public{
        require(voteState == State.Voting,"voting is over.");
        require(isVote[msg.sender] == 0, "already voted.");
        
        candidates[_selectNum - 1].receivedVote += 1;
        isVote[msg.sender] = 0;

        if(candidates[_selectNum-1].receivedVote == 10) {
            voteState = State.Ended;
            electedCandidate = candidates[_selectNum - 1];
            for(uint i=0; i <= candidates.length; i++) {
                candidates.pop();
            }
            index = 0;
        }
    }

    // 후보 투표수 보기
    function getCandidateReceivedVote(uint _selectNum) public view returns(uint8) {
        Candidate memory candidate = candidates[_selectNum - 1];
        return candidate.receivedVote;
    }


    // 당선자 보기
    function getElectedCandidate() public view returns(Candidate memory) {
        return electedCandidate;
    }

    // 후보 등록 시작
    function startElect() public { // ! onlyOwner추가하기
      require(voteState == State.Ended);
      voteState = State.Registering;
    }
}

/*
    주요기능
        @ 후보자 등록
        @ 투표
    
    조건
        # 후보 등록 비용 
        # 후보 5명 제한 v
        # 후보 5명 등록되기 전까지 투표 못하도록 v
        # 유권자당 투표권 1장 v
        # 특정 후보 10표 선 득표시 승리 -> 종료 v
        # option) 종료시 결과 초기화
        # option) 등록된 후보 이름으로 이미지 출력
    
    기간
        ~ 2/23 까지 
    
    고려사항
        ? 당선후보 초기화 여부
            : getElectedCandidate()함수가 memory로 불러오는데다 startElect()시작하면 프론트에 getElectedCandidate() 호출 못하게 하면 되니까.?
        ! startElect()에 onlyOwner 추가하기
        ? 상태변수 함수 내에서 메모리 위치시키면?
        ? 중복 투표/후보등록 방지 새 투표 진행시 초기화 문제 

*/