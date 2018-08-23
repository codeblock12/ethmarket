
import { ROLES, STOREFRONT, PRODUCT } from '../src/constants'
import {errTypes, tryCatch} from '../helpers/test-helpers'

const Shopper = artifacts.require('Shopper');

contract('Shopper', accounts => {

  const Owner = accounts[0];
  const Admin = accounts[1];
  const StoreOwner = accounts[2];
  const Shopper = accounts[3];

  describe('when buying products as a shopper', () => {
    let shopper;

    before( 'setup instance', async () => {
      shopper = await Shopper.deployed();
      await shopper.addAdmin(Admin, {from: Owner});
      await shopper.addStoreOwner(StoreOwner, {from: Admin});
      await shopper.createStorefront('mockStorefrontName', {from: StoreOwner}); 
      await shopper.addProduct(0, 'mockProduct', 1000, 100, {from: StoreOWner});     
    })

    it('should be able to buy a product', async () => {
      let success = await shopper.buyProduct(0, 0, 1, {from: Shopper, value: 1000});
      assert.equal(success, true);
    })  

    it('should revert if not enough money is sent', async () => {

    });

    xit('should create an order of bought products', async() => {

    })

    xit('should be able to ')
  })
})