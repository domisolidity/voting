// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting {
    // 당선 결과 이벤트
    // event VotingResult(Candidate[] candidateList);

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
    // 당선자 구조체
    struct President {
        address candidateAddress; // 대통령 주소
        uint8 number; // 몇번째 대통령
        uint8 age; // 대통령 나이
        uint256 electedDay; // 당선일
        uint256 expiration; // 임기종료일
        uint256 presidentialTerm; // 임기
        string name; // 대통령 이름
    }

    // 후보자 목록
    Candidate[] public candidateList;
    // 투표자 목록
    Voter[] public voterList;
    // 당선자 목록
    President[] public presidentialList;
    // 몇 대 선거인지 변수
    uint8 presidentNum = 1;
    // 후보자 번호용 변수
    uint8 candidateNum = 1;
    // 후보자 등록에 필요한 금액
    uint256 registrationFee = 0.5 ether;

    // 당선기록용 매핑
    mapping(address => uint8) public elected;

    // 후보 중복등록 방지 함수
    function candidateDuplication() public view returns (bool) {
        for (uint8 i = 0; i < candidateNum - 1; i++) {
            if (candidateList[i].candidateAddress == msg.sender) {
                return false;
            }
        }
        return true;
    }

    // 유권자 중복투표 방지 함수
    function duplicationVote() public view returns (bool) {
        for (uint8 i = 0; i < voterList.length; i++) {
            if (voterList[i].VoterAddress == msg.sender) {
                return false;
            }
        }
        return true;
    }

    // 연임 방지 함수
    function cannotServeConsecutiveTerms() public view returns (bool) {
        // 당선된 적이 없으면 연임 해당 안됨
        if (elected[msg.sender] == 0) {
            return true;
        }
        // 현재 대선 번호보다 2이상 작으면 연임 아님
        else if (presidentNum - 1 > elected[msg.sender]) {
            return true;
        }
        return false;
    }

    // 현재 몇 대 선거인지 불러오는 함수
    function getElectionNumber() public view returns (uint8) {
        return presidentNum;
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
            cannotServeConsecutiveTerms(),
            "cannot serve consecutive terms"
        );
        // // 후보자가 등록비를 충분히 지불했으면 통과
        // require(msg.value >= registrationFee);

        // 후보자가 입력한 정보로 구조체 생성 (주소, 번호, 나이, 득표수, 이름)
        candidateList.push(Candidate(msg.sender, candidateNum, _age, 0, _name));
        // 다음 후보자 번호 다음번호로 바꿔주기
        candidateNum++;
    }

    // 투표하기 함수
    function vote(uint8 _number) public {
        // 후보자 5인이 아직 채워지지 않았으면 투표 못함
        require(candidateList.length == 5, "There must be 5 candidates");
        // 이미 투표했는지 검사
        require(duplicationVote(), "you have already voted");

        // 해당 후보에게 1표 추가
        candidateList[_number - 1].poll++;
        // 투표권를 행사했으면 투표자의 주소 투표자 구조체에 기록
        voterList.push(Voter(msg.sender));

        // 내 투표로 인해 해당 후보자가 5표째 득표라면
        if (candidateList[_number - 1].poll == 5) {
            // 투표결과 기록
            // emit VotingResult(candidateList);
            // 당선자 목록에 추가
            presidentialList.push(
                President(
                    candidateList[_number - 1].candidateAddress,
                    presidentNum,
                    candidateList[_number - 1].age,
                    block.timestamp,
                    0,
                    0,
                    candidateList[_number - 1].name
                )
            );
            if (presidentialList.length > 1) {
                // 임기 종료일에 시간 기록
                presidentialList[presidentNum - 2].expiration = block.timestamp;
                uint256 expiration = presidentialList[presidentNum - 2]
                    .expiration;
                uint256 electedDay = presidentialList[presidentNum - 2]
                    .electedDay;
                // 임기 = 임기종료일 - 당선일
                presidentialList[presidentNum - 2]
                    .presidentialTerm = (expiration - electedDay);
            }
            // 당선자에게 당선 번호 부여
            elected[msg.sender] = presidentNum;

            /* 새로운 대선 준비 */
            // 후보자, 투표자 목록 비우기
            while (candidateList.length > 0) {
                candidateList.pop();
            }
            while (voterList.length > 0) {
                voterList.pop();
            }
            // 다음 대선 번호
            presidentNum++;
            // 후보자 번호 초기화
            candidateNum = 1;
        }
    }
}
