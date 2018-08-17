const web3 = window.web3;

export default class Blockchain {
  getCurrentAccount() {
    return new Promise((resolve, reject) => {
        debugger;
      web3.eth.getAccounts().then(accounts => {
          resolve(accounts[0])
      }).catch(err => reject(err))
    })       
  }
}