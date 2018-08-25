# EthMarket

An online marketplace that operates on the Ethereum blockchain.
 
There are a list of stores on a central marketplace where shoppers can purchase goods posted by the store owners.
 
The central marketplace is managed by a group of administrators. Admins allow store owners to add stores to the marketplace. Store owners can manage their store’s inventory and funds. Shoppers can visit stores and purchase goods that are in stock using ether. 

## How to install

### Install global dependencies 
```bash
  #Install ganachi-cli
  npm install -g ganache-cli
  #Install truffle
  npm install -g truffle
  #Install metafox in browser extension (https://metamask.io/)
```
### Run local blockchain
```bash
  #Run ganachi (record mnemonic for use in metafox) 
  ganachi-cli
```

### Run local UI instance (In new terminal window)
```bash
  #Clone Repo, and cd into it to install dependencies
  npm install
  #Compile contracts
  truffle compile
  #Migrate contracts
  truffle migrate
  #Run Web App (in project root)
  npm run serve
  #Run unit tests
  npm test
```

### Reference docs folder for description of features, and technical details.