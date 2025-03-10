var BlockIDGeneration = artifacts.require("./BlockIDGeneration.sol");

module.exports = function (deployer) {
  deployer.deploy(BlockIDGeneration);
};
