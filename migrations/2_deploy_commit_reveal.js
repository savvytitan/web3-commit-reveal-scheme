var CommitReveal = artifacts.require("CommitReveal.sol");

module.exports = function (deployer) {
  deployer.deploy(CommitReveal, 180, "YES", "NO");
};
