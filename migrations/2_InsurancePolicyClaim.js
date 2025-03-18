var HealthInsurance = artifacts.require("./InsurancePolicyClaim.sol");

module.exports = function (deployer) {
  deployer.deploy(HealthInsurance);
};
