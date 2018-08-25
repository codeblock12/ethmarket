## Design Patterns

### Emergency Stop
Emergency stop implemented through Pausable.sol contract. Two functions are restricted through the stop: the buyProduct, and the withdrawStoreFunds. Only these two functions modify the ether balance of the contract. Other function modify state but does not have any financial impact.

### Ownable
Contract is ownable where the ownership can be renoucned or transferred in the event that the current owner no longer can or want to operate the market.

### Upgradabililty
Seperated the majority of contract storage to MarketStorage.sol to protect against issues with gas limit if storage grows too large.

## Security
* Implemented SafeMath library for safety checks on math-related issues
* Implemented ReentrancyGuard.sol to protect against reentrancy attacks. This guard is placed on all functions with financial impact
* Modifiers are used to protection against cross-function race conditions (withrawStorefunds sends a uint balance to the caller. buyProduct increments this balance value, but have a modifier paidEnough that ensure the caller send enough eth before performing the increment)
* Ensured that forcibily sending ether to contract will not do anything bad
* All functions that operate on a collection uses index to lookup or manipuate the storage rather than iterating over the entire collection. This limits the risk of running into the block gas limit
* No public lockup variables are used across more than a single function. This ensure that none can DoS the contract until the lock is release.
* Underflow: No arrays are popped. Elements stay in collections, and are deactivated through a flag
* Integer overflow/underflow attacks are migitaged by using the SafeMath lib on all math operations

## Misc

### Library Usage
Use SafeMath library to modify uints in the Storefront.sol, and MarketStorage.sol

