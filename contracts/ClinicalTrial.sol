// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract ClinicalTrial {
   address public cro;
   address public regulator;

   uint public proposalId;

   uint public startDate;
   uint public endDate;
   uint public createdDate;

   bytes32 public drugName;
   bytes public ipfsHash;

   event AddSubject(address msgSender, bytes32 msg, uint timestamp);
   event AddDataPoint(address msgSender, bytes32 msg, uint timestamp);

   struct DataPoint {
      uint timestamp;
      bytes32 json;
   }

   bytes32[] public subjects;
   mapping(bytes32 => DataPoint[]) public data; // index keccak256(subjectId)

   modifier croOnly() {
      require(msg.sender == cro, "Not authorized");
      _;
   }

   modifier trialIdOpen() {
      require(block.timestamp >= startDate && block.timestamp <= endDate, "Trial not open");
      _;
   }

   modifier dateBeforeStart() {
      require(block.timestamp < startDate, "Trial already started");
      _;
   }

   constructor(
      address _regulator,
      address _cro,
      uint _proposalId,
      uint _startDate,
      uint _endDate,
      bytes32 _drugName,
      bytes memory _ipfsHash
   ) {
      regulator = _regulator;
      cro = _cro;
      proposalId = _proposalId;
      startDate = _startDate;
      endDate = _endDate;
      drugName = _drugName;
      ipfsHash = _ipfsHash;
      createdDate = block.timestamp;
   }

   function getSubjectsCount() public view returns (uint _counter) {
      _counter = subjects.length;
   }

   function getSubjectById(uint _id) public view returns (bytes32 _subject) {
      if (_id < subjects.length) {
         _subject = subjects[_id];
      }
   }

   function getDataCounterForSubject(uint _subjectId) public view returns (uint _counter) {
      bytes32 ident = getSubjectIdentById(_subjectId);
      _counter = data[ident].length;
   }

   function getSubjectIdentById(uint _subjectId) public view returns (bytes32 _ident) {
      if (_subjectId < subjects.length) {
         _ident = keccak256(abi.encodePacked(subjects[_subjectId]));
      }
   }

   function getDataPointForSubject(uint _subjectId, uint _dataPointId) public view returns (uint _timestamp, bytes32 _json) {
      bytes32 ident = getSubjectIdentById(_subjectId);
      if (_dataPointId < data[ident].length) {
         _timestamp = data[ident][_dataPointId].timestamp;
         _json = data[ident][_dataPointId].json;
      }
   }

   function addSubject(bytes32 _subject) public croOnly dateBeforeStart returns (bool _success) {
      subjects.push(_subject);
      emit AddSubject(msg.sender, _subject, block.timestamp);
      return true;
   }

   function addDataPoint(uint _subjectId, bytes32 _json) public croOnly trialIdOpen returns (bool _success) {
      bytes32 ident = getSubjectIdentById(_subjectId);
      DataPoint memory dp;
      dp.timestamp = block.timestamp;
      dp.json = _json;
      data[ident].push(dp);
      emit AddDataPoint(msg.sender, _json, block.timestamp);
      return true;
   }
}
