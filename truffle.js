/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require('babel-register');
require('babel-polyfill');
let HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "opinion destroy betray whale bored house paint one from address see next";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!  
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: { 
      provider: function() { 
        return new HDWalletProvider(mnemonic, 'https://ropsten.infura.io/', 0); 
      },
      network_id: "1", 
      gas: 4500000 
    },    
  },
  mocha: {
    useColors: true
  }    
};
