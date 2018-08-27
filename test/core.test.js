
import { ROLES } from '../src/constants'
import { tryCatch } from '../helpers/test-helpers'

const Core = artifacts.require('Core');

contract('Core', accounts => {

  const Owner = accounts[0];
  const Admin = accounts[1];
  const StoreOwner = accounts[2];
  const Shopper = accounts[3];
  const Unknown = accounts[4]

  describe('when assigning roles', () => {
    let core;

    beforeEach( 'setup account roles', async () => {
      core = await Core.deployed();
      await core.addAdmin(Admin, {from: Owner});
      await core.addStoreOwner(StoreOwner, {from: Admin});
      await core.removeAdmin(Shopper, {from: Owner});
      await core.removeStoreOwner(Shopper, {from: Admin});
    })
  
    it('should default unknown accounts as Shoppers', async () => {
      let role = await core.role.call(Unknown);
      assert.equal(role, ROLES.SHOPPER);
    }) 

    it('should be able to add admin role as Owner', async () => {
      await core.addAdmin(Unknown), {from: Owner};
      let role = await core.role.call(Unknown);
      assert.equal(role, ROLES.ADMIN);
    })

    it('should be able to remove admin role as Owner', async () => {  
      await core.removeAdmin(Admin, {from: Owner});
      let role = await core.role.call(Admin);
      assert.equal(role, ROLES.SHOPPER);
    })    
  
    it('should be able to add storeOwner role as Admin', async () => {  
      await core.addStoreOwner(Unknown, {from: Admin})
      let role = await core.role.call(Unknown);
      assert.equal(role, ROLES.STORE_OWNER);
    })  

    it('should be able to remove storeOwner role as Admin', async () => {  
      await core.removeStoreOwner(StoreOwner, {from: Admin});
      let role = await core.role.call(StoreOwner);
      assert.equal(role, ROLES.SHOPPER);
    })  
    
    it('should allow only owner to modify admin role', async () => {  
      await tryCatch(core.addAdmin(Shopper, {from: Shopper}));
      await tryCatch(core.addAdmin(Shopper, {from: StoreOwner}));
      await tryCatch(core.addAdmin(Shopper, {from: Admin}));
      await tryCatch(core.removeAdmin(Shopper, {from: Shopper}));
      await tryCatch(core.removeAdmin(Shopper, {from: StoreOwner}));
      await tryCatch(core.removeAdmin(Shopper, {from: Admin}));  
    })  

    it('should allow only admins to modify store owner role', async () => {  
      await tryCatch(core.addStoreOwner(Shopper, {from: Shopper}));
      await tryCatch(core.addStoreOwner(Shopper, {from: StoreOwner}));
      await tryCatch(core.removeStoreOwner(Shopper, {from: Shopper}));
      await tryCatch(core.removeStoreOwner(Shopper, {from: StoreOwner}));
    })      
  
  })
})