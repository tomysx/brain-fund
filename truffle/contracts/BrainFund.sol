// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract BrainFund {
    struct Case {
        uint256 id;
        address requester;
        string description;
        uint256 goal;
        uint256 amountRaised;
        bool funded;
    }

    uint256 public caseCount;
    mapping(uint256 => Case) public cases;

    event CaseCreated(uint256 caseId, address requester, string description, uint256 goal);
    event DonationReceived(uint256 caseId, address donor, uint256 amount);

    function createCase(string memory _description, uint256 _goal) public {
        require(_goal > 0, "Goal must be greater than zero.");
        caseCount++;
        cases[caseCount] = Case(caseCount, msg.sender, _description, _goal, 0, false);
        emit CaseCreated(caseCount, msg.sender, _description, _goal);
    }

    function donate(uint256 _caseId) public payable {
        require(_caseId > 0 && _caseId <= caseCount, "Invalid case ID.");
        Case storage _case = cases[_caseId];
        require(!_case.funded, "Case already funded.");
        _case.amountRaised += msg.value;
        emit DonationReceived(_caseId, msg.sender, msg.value);

        if (_case.amountRaised >= _case.goal) {
            _case.funded = true;
        }
    }

    function getCase(uint256 _caseId) public view returns (Case memory) {
        require(_caseId > 0 && _caseId <= caseCount, "Invalid case ID.");
        return cases[_caseId];
    }
}
