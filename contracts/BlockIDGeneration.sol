// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockIDGeneration {
    struct User {
        string info;  // υn: User information
        bool isRegistered;
    }

    mapping(address => User) public users;
    mapping(uint256 => bytes32) public blockHashes;

    event UserRegistered(address indexed user, string info);
    event BlockIDGenerated(address indexed user, uint256 bid, bytes32 hi);

    function registerUser(address uid, string memory _info) public {
        require(!users[uid].isRegistered, "User already registered");
        users[uid] = User(_info, true);
        emit UserRegistered(uid, _info);
    }

    function generateBlockID(address uid) public returns (bytes32) {
        require(users[uid].isRegistered, "Failed to generate Hi");

        uint256 bid = block.number; // Using the current block number as Bid
        bytes32 hi = blockhash(bid);

        blockHashes[bid] = hi;
        emit BlockIDGenerated(uid, bid, hi);
        return hi;
    }
}