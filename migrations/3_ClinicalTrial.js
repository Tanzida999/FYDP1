var ClinicalTrial = artifacts.require("./ClinicalTrial.sol");

module.exports = function (deployer, network, accounts) {
  const regulator = accounts[0]; // First account as regulator
  const cro = accounts[1]; // Second account as CRO
  const proposalId = 1; // Example proposal ID
  const startDate = Math.floor(Date.now() / 1000) + 86400; // Start time (tomorrow)
  const endDate = startDate + 30 * 86400; // End time (30 days later)
  const drugName = web3.utils.asciiToHex("DrugX"); // Convert "DrugX" to bytes32
  const ipfsHash = web3.utils.asciiToHex("Qm123..."); // Example IPFS hash (should be 32 bytes)

  deployer.deploy(
    ClinicalTrial,
    regulator,
    cro,
    proposalId,
    startDate,
    endDate,
    drugName,
    ipfsHash
  );
};
