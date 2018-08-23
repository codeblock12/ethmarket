
import { ROLES, STOREFRONT, PRODUCT } from '../src/constants'
import { tryCatch } from '../helpers/test-helpers'

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
      await storefront.createStorefront(storeName, {from: StoreOwner});      
    })

    it('should create a storefront successfully', async () => {
      let newStorefront = await storefront.storefronts.call(0);
      assert.equal(newStorefront[STOREFRONT.STOREFRONT_ID], 0);
      assert.equal(newStorefront[STOREFRONT.OWNER], StoreOwner);
      assert.equal(newStorefront[STOREFRONT.BALANCE], 0);
      assert.equal(newStorefront[STOREFRONT.IS_ACTIVE], true);
    })      

    it('should only allow storefront owners to create', async () => {
      await tryCatch(storefront.createStorefront('mockStorefront', {from: Admin}));
      await tryCatch(storefront.createStorefront('mockStorefront', {from: Shopper}));
    })        

    it('should return list of ids of owned storefronts', async () => {
      let ownedStorefront = await storefront.getOwnedStorefronts.call(StoreOwner);
      assert.equal(ownedStorefront.length, 1);
      assert.equal(ownedStorefront[0], 0);
    })  
    
    it('should update storefront count', async () => {
      let count = await storefront.storefrontCount.call();
      assert.equal(count, 1);
      await storefront.createStorefront("newStorefront", {from: StoreOwner});      
      count = await storefront.storefrontCount.call();
      assert.equal(count, 2);
    })  

    it('should be able to modify storefront name', async () => {
      await storefront.modifyStorefrontName(0, 'modifiedStorefront', {from: StoreOwner});      
      let modifiedStorefront = await storefront.storefronts.call(0);
      assert.equal(modifiedStorefront[STOREFRONT.NAME], 'modifiedStorefront');
    })        
    
    it('should update status of deactivated storefronts', async () => {
      await storefront.deactivateStorefront(0, {from: StoreOwner});      
      let deactivatedStorefront = await storefront.storefronts.call(0);
      assert.equal(deactivatedStorefront[STOREFRONT.IS_ACTIVE], false);
    })  
    
    it('should be able to withdraw ', async () => {
      await storefront.deactivateStorefront(0, {from: StoreOwner});      
      let deactivatedStorefront = await storefront.storefronts.call(0);
      assert.equal(deactivatedStorefront[STOREFRONT.IS_ACTIVE], false);
    })      
  })

  describe('when creating a product as a storefront owner', async () => {
    xit('should create a product succesfully', () => {});
    xit('should update the product id', () => {});
    xit('should be able to update the product status', () => {});
  })
})