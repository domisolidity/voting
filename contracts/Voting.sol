// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Voting {
    // 당선 결과 이벤트
    event VotingResult(Candidate[] a);

    // 후보자 구조체
    struct Candidate {
        uint8 number; // 후보자 번호
        uint8 age; // 후보자 나이
        string name; // 후보자 이름
        uint8 poll; // 득표수
    }

    // 후보자 목록
    Candidate[] public CandidateList;
    // 후보자 번호용 변수
    uint8 candidateNum = 1;
    // 후보자 등록에 필요한 금액
    uint256 registrationFee = 0.5 ether;

    // 후보자 주소를 통해 후보자 구조체에 매핑
    mapping(address => Candidate) public asdf;
    // 투표하면 내 주소를 통해 투표권 사라지도록 매핑
    mapping(address => bool) public suffrage;
    // 한 사용자가 후보자 중복등록을 방지하기 위한 매핑
    mapping(address => bool) public candidateDuplication;

    // 후보자 등록 함수
    function candidateRegistration(uint8 _age, string memory _name)
        public
    // payable
    {
        // 후보자가 5인 이하인지, 중복등록인지 확인
        require(candidateNum <= 5, "Candidate registration is closed");
        require(
            candidateDuplication[msg.sender] == false,
            "you have already registered"
        );
        // 후보자가 등록비를 충분히 지불했으면 통과
        // require(msg.value >= registrationFee);
        // 후보자가 입력한 정보로 구조체 생성
        CandidateList.push(Candidate(candidateNum, _age, _name, 0));
        // 다음 후보자 번호 다음번호로 바꿔주기
        candidateNum++;
        // 같은 사용자가 후보등록을 또 할 수 없도록 제한
        candidateDuplication[msg.sender] = true;
    }

    // 투표하기 함수
    function vote(uint8 _number) public {
        // 후보자 5인이 아직 채워지지 않았으면 투표 못함
        require(candidateNum > 5, "There must be 5 candidates");
        // 투표를 이미 한 사람은 투표권을 행사했으니 멈춰!
        require(suffrage[msg.sender] == false, "you have already voted");

        // 해당 후보구조체에 1표 추가
        CandidateList[_number - 1].poll++;
        // 투표했으면 내 투표권 없애기
        suffrage[msg.sender] = true;
        // 내 투표로 인해 해당 후보자가 10표째 득표라면
        // if (CandidateList[_number - 1] == 5) {
        //     // 당선함수 실행
        //     // AnnouncementOfResults(number, name, age);
        // }
    }

    // 축 당선 발표 함수
    // function _election(uint8 _candidateAddress) public {
    //      AnnouncementOfResults( number,  name, age);

    // }
}
