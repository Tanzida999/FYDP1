// SPDX-License-Identifier:MIT
pragma solidity >=0.5.0 <0.9.0;
contract auditTrail{
    struct Employee{
        uint EidRegistered;
        uint Bid;
        uint Hid;
        mapping(uint => bool) isComplaintHp;
        mapping(uint => bool) isComplaintIC;
        mapping(uint => uint) data;
        uint timestamp;

    }
    mapping(address => Employee) public employees; //mapping employees data from ethereum
    address public admin;
    constructor(){
        admin = msg.sender; //Ethereum address of the account 
    }
    modifier onlyAdmin()
    {
        require(msg.sender == admin, "only admin can perform this action");
    _;
    }
    function varifyCompliant(uint employeeIndex, uint HPicom, uint ICcom) external onlyAdmin{
        Employee storage employee  = employees[employeeIndex];
        
    }



    }