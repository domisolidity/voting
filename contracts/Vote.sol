// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract Vote {
    // 투표 단계 지정
    enum State {
        Registering,
        Voting,
        Ended
    }
    State public voteState;

    event completeRegist(
        uint8 candidateNum,
        string name,
        uint8 age,
        uint8 receivedVote,
        address addr
    );
    event Step(State _state);

    // 관리자
    address public admin;

    // 후보자 구조체
    struct Candidate {
        uint8 candidateNum;
        string name;
        uint8 age;
        uint8 receivedVote;
        address addr;
    }
    Candidate[] public candidates;
    Candidate public electedCandidate;
    mapping(uint256 => Candidate) public candidateToNum;

    uint256 index; // 후보 등록 시 기호번호 지정 용도
    // uint voteCount = 1;

    mapping(address => bool) public isRegist; // private로?
    mapping(address => uint8) public isVote; // private로?

    // 초기 설정
    constructor() public {
        admin = msg.sender;
        voteState = State.Registering;
        emit Step(voteState);
    }

    // 어드민 권한 함수 제어자
    modifier onlyAdmin() {
        require(msg.sender == admin);
        _;
    }

    // @ 후보등록
    function register(string memory _name, uint8 _age) public payable {
        // require(msg.value >= registrationFee, "gas is over");
        require(voteState == State.Registering, "Registration has closed.");
        require(isRegist[msg.sender] == false, "already registered.");

        // admin.transfer(5 * 10 ** 14);
        candidates.push(
            Candidate(uint8(index + 1), _name, _age, 0, msg.sender)
        );

        isRegist[msg.sender] = true;

        emit completeRegist(uint8(index + 1), _name, _age, 0, msg.sender);

        index++;
        if (index == 2) {
            voteState = State.Voting;
            emit Step(voteState); // step 이벤트 실행
        }
    }

    // @ 투표
    function vote(uint256 _selectNum) public {
        require(voteState == State.Voting, "voting is over.");
        require(duplicationVote(), "already voted.");

        candidates[_selectNum - 1].receivedVote += 1;
        voterList.push(msg.sender);

        // 당선됐을때(해당 후보의 득표수가 충족될 때)
        if (candidates[_selectNum - 1].receivedVote == 2) {
            // 당선함수 실행
            isElected(_selectNum);
        }
    }

    // @ 당선함수
    function isElected(uint256 _selectNum) public {
        voteState = State.Ended;
        emit Step(voteState); // step 이벤트 실행
        electedCandidate = candidates[_selectNum - 1];
        index = 0;
    }

    // @ 후보 투표수 보기
    function getCandidateReceivedVote(uint256 _selectNum)
        external
        view
        returns (uint8)
    {
        Candidate memory candidate = candidates[_selectNum - 1];
        return candidate.receivedVote;
    }

    // @ 모든 후보자 보기
    function getCandidate() public view returns (Candidate[] memory) {
        return candidates;
    }

    // @ 당선자 보기
    function getElectedCandidate() external view returns (Candidate memory) {
        return electedCandidate;
    }

    // @ 후보 등록 시작
    function startVote() external onlyAdmin {
        require(voteState == State.Ended);
        // 선거가 끝났으니 후보들 중복출마 기능 해제
        for (uint256 i = 0; i < candidates.length; i++) {
            isRegist[candidates[0].addr] = false;
        }
        for (uint256 i = 0; i < candidates.length; i++) {
            candidates.pop();
        }
        for (uint256 i = 0; i < voterList.length; i++) {
            voterList.pop();
        }
        index = 0;
        voteState = State.Registering;
        emit Step(voteState); // step 이벤트 실행
    }

    // 후보자 등록에 필요한 금액
    uint256 registrationFee = 30 ether;
    // 투표자 명단
    address[] public voterList;

    // 유권자 중복투표 방지 함수
    function duplicationVote() public view returns (bool) {
        for (uint8 i = 0; i < voterList.length; i++) {
            if (voterList[i] == msg.sender) {
                return false;
            }
        }
        return true;
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
