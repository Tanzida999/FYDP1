//SPDX-License-Identifier:MIT 
pragma solidity ^0.8.0;

contract Insurance{
    address [] public policyholders; //who will hold the policy in the contract will habe the address here
    mapping(address => uint256) public policies; //What policy they have
    mapping(address => uint256) public claims;//Tract of the claims
    address payable owner;//Who deploy the contract
    uint256 public totalPremium;
    constructor() public{ 
        owner = payable(msg.sender);
    }

function purchasePolicy(uint256 premium) public payable{
    require(msg.value == premium, "Incorrect premium amount.");
    require(premium>0,"Premium amount must be greater than 0.");
    policyholders.push(msg.sender);
    policies[msg.sender] = premium;
    totalPremium += premium;
}

function policyClaim(uint256 amount) public{
    require(policies[msg.sender]>0,"Must Have a valid policy to file a claim.");
    require(amount >0, "Claim amount must be greater than 0.");
    require(amount <= policies[msg.sender],"Claim amount cannout exceed policy limit.");
    claims[msg.sender] += amount;

}

function approveClaim(address policyholder) public {
    require(msg.sender == owner, "Only the owner can approve claim.");
    require(claims[policyholder]>0,"Policyholders has no outstanding claim. "); 
    payable(policyholder).transfer(claims[policyholder]);
    claims[policyholder] = 0;


}
function getPolicy(address policyholder )public view returns(uint256){
    return policies[policyholder];
}

function getClaim(address policyholder) public view returns (uint256){
    return claims[policyholder];
}
function getTotalPremium() public view returns(uint256){
    return totalPremium;
}


function revokeAccess(address payable)public {
    require(msg.sender == owner,"Only owner can revoke Access" );
    owner = payable(msg.sender);
    
}
function destroy() public{
    require(msg.sender == owner,"Only the owner can destroy the contract");
    selfdestruct(owner);
}
}