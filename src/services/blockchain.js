export default class Blockchain {
  getCurrentAccount() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getAccounts().then(accounts => {
          resolve(accounts[0])
      }).catch(err => reject(err))
    })       
  }
}