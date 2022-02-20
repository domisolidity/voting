// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting {
    // 당선 결과 이벤트
    // event VotingResult(Candidate[] CandidateList);

    // 후보자 구조체
    struct Candidate {
        address candidateAddress; // 후보자 주소
        uint8 number; // 후보자 번호
        uint8 age; // 후보자 나이
        uint8 poll; // 득표수
        string name; // 후보자 이름
    }
    // 투표자 구조체
    struct Voter {
        address VoterAddress; // 투표자 주소
    }

    // 후보자 목록
    Candidate[] public CandidateList;
    // 투표자 목록
    Voter[] public VoterList;
    // 후보자 번호용 변수
    uint8 candidateNum = 1;
    // 후보자 등록에 필요한 금액
    uint256 registrationFee = 0.5 ether;

    // 연임(재임)불가 시키기 위한 매핑
    mapping(address => bool) public serveConsecutiveTerms;

    // 후보 중복등록 방지 함수
    function candidateDuplication() public view returns (bool) {
        for (uint8 i = 0; i < candidateNum - 1; i++) {
            if (CandidateList[i].candidateAddress == msg.sender) {
                return false;
            }
        }
        return true;
    }

    // 유권자 중복투표 방지 함수
    function duplicationVote() public view returns (bool) {
        for (uint8 i = 0; i < VoterList.length; i++) {
            if (VoterList[i].VoterAddress == msg.sender) {
                return false;
            }
        }
        return true;
    }

    // 후보자 등록 함수
    function candidateRegistration(uint8 _age, string memory _name)
        public
    // payable
    {
        // 후보자가 5인 이하인지, 중복등록인지, 재임자인지 확인
        require(candidateNum <= 5, "Candidate registration is closed");
        require(candidateDuplication(), "you have already registered");
        require(
            !(serveConsecutiveTerms[msg.sender]),
            "You have already been elected in the past"
        );
        // // 후보자가 등록비를 충분히 지불했으면 통과
        // require(msg.value >= registrationFee);

        // 후보자가 입력한 정보로 구조체 생성 (주소, 번호, 나이, 득표수, 이름)
        CandidateList.push(Candidate(msg.sender, candidateNum, _age, 0, _name));
        // 다음 후보자 번호 다음번호로 바꿔주기
        candidateNum++;
    }

    // 투표하기 함수
    function vote(uint8 _number) public {
        // 후보자 5인이 아직 채워지지 않았으면 투표 못함
        require(CandidateList.length == 5, "There must be 5 candidates");
        // 이미 투표했는지 검사
        require(duplicationVote(), "you have already voted");

        // 해당 후보에게 1표 추가
        CandidateList[_number - 1].poll++;
        // 투표권를 행사했으면 투표자의 주소 투표자 구조체에 기록
        VoterList.push(Voter(msg.sender));

        // 내 투표로 인해 해당 후보자가 5표째 득표라면
        if (CandidateList[_number - 1].poll == 5) {
            // 투표결과 기록
            // emit VotingResult(CandidateList);

            /* 새로운 대선 준비 */
            // 당선자는 재선 불가시키기
            serveConsecutiveTerms[
                CandidateList[_number - 1].candidateAddress
            ] = true;
            // 후보자, 투표자 목록 비우기
            while (CandidateList.length > 0) {
                CandidateList.pop();
            }
            while (VoterList.length > 0) {
                VoterList.pop();
            }
            // 후보자 번호 초기화
            candidateNum = 1;
        }
    }
}
