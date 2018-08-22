
import { ROLES, STOREFRONT, PRODUCT } from '../src/constants'

const Storefront = artifacts.require('Storefront');

contract('storefront', accounts => {

  const Owner = accounts[0];
  const Admin = accounts[1];
  const StoreOwner = accounts[2];
  const Shopper = accounts[3];

  describe('when modifying storefronts as a store owner', () => {
    let storefrontInstance;
    let storefront;
    let marketStorage;
    let core;

    before( 'setup instance', async () => {
      let storeName = "mockStorefrontName";
      storefront = await Storefront.deployed();
      await storefront.addAdmin(Admin, {from: Owner});
      await storefront.addStoreOwner(StoreOwner, {from: Admin});
      await storefront.createStorefront(storeName, {from: StoreOwner, gas: 6000000});      
    })

    it('should create a storefront with inital settings', async () => {
      let newStorefront = await storefront.storefronts.call(0);
      assert.equal(newStorefront[STOREFRONT.STOREFRONT_ID], 0);
      assert.equal(newStorefront[STOREFRONT.OWNER], StoreOwner);
      assert.equal(newStorefront[STOREFRONT.BALANCE], 0);
      assert.equal(newStorefront[STOREFRONT.IS_ACTIVE], true);
    })      

    it('should return list of ids of owned storefronts', async () => {
      let ownedStorefront = await storefront.getOwnedStorefronts.call(StoreOwner);
      assert.equal(ownedStorefront.length, 1);
      assert.equal(ownedStorefront[0], 0);
    })  
    
    xit('should update storefrontId with new storefront creation', async () => {
      let role = await storefront.role.call(Owner);
      assert.equal(role, ROLES.ADMIN);
    })  
    
    xit('should update status of deactivated storefronts', async () => {
      let role = await storefront.role.call(Owner);
      assert.equal(role, ROLES.ADMIN);
    })     
  })
})