const BrainFund = artifacts.require("BrainFund");

module.exports = function (deployer) {
  deployer.deploy(BrainFund);
};
