const SafeMath = artifacts.require("./libraries/SafeMath.sol");
const Ownable = artifacts.require("./libraries/Ownable.sol");
const Pausable = artifacts.require("./libraries/Pausable.sol");
const ReentrancyGuard = artifacts.require("./libraries/ReentrancyGuard.sol");

const Core = artifacts.require("./Core.sol");
const MarketStorage = artifacts.require("./MarketStorage.sol");
const Shopper = artifacts.require("./Shopper.sol");
const Storefront = artifacts.require("./Storefront.sol");
const Marketplace = artifacts.require("./Marketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(Ownable);
  deployer.deploy(Pausable);
  deployer.deploy(ReentrancyGuard);
  deployer.deploy(MarketStorage);
  deployer.link(SafeMath, MarketStorage);
  deployer.deploy(Core);
  deployer.deploy(Shopper);
  deployer.deploy(Storefront);
  deployer.deploy(Marketplace);
};
