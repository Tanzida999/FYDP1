var AuditTrail = artifacts.require("./auditTrail.sol");

module.exports = function (deployer) {
  deployer.deploy(AuditTrail);
};
