// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract AuditTrail {
    struct Employee {
        uint EidRegistered;
        uint Bid;
        uint Hid;
        mapping(uint => bool) isComplaintHp;
        mapping(uint => bool) isComplaintIC;
        mapping(uint => uint) data;
        uint timestamp;
    }

    mapping(address => Employee) public employees; // Mapping employees' data
    address public admin;

    constructor() {
        admin = msg.sender; // Ethereum address of the account 
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function verifyCompliant(address employeeAddress, uint HPicom, uint ICcom) external onlyAdmin {
        Employee storage employee = employees[employeeAddress]; // Access employee data
        employee.isComplaintHp[HPicom] = true;
        employee.isComplaintIC[ICcom] = true;
    }
}
