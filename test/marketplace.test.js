
import { ROLES } from '../src/constants'

const Marketplace = artifacts.require('Marketplace');

contract('marketplace', accounts => {

  const Owner = accounts[0];

  describe('when initializing the contract', () => {
    let marketplace;

    before( 'setup instance', async () => {
      marketplace = await Marketplace.deployed();
    })

    it('should set default value', async () => {
      let role = await marketplace.role.call(Owner);
      assert.equal(role, ROLES.ADMIN);
    }) 
  })
})