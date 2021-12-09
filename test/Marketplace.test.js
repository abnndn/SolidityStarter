const Marketplace = artifacts.require('./Marketplace.sol')

require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('Marketplace', ([deployer, seller, buyer]) => {
	let marketplace 

	before(async() => {
		marketplace = await Marketplace.deployed()
	})

	describe('deployment', () => {
		it('deploys successfully', async() => {
			const address = await marketplace.address

			assert.notEqual(address, 0x0)
			assert.notEqual(address, '')
			assert.notEqual(address, null)
			assert.notEqual(address, undefined)
		})

		it('has a name', async() => {
			const name = await marketplace.name()
			assert.equal(name, "Marketplace 1")
		})
	})

	describe('products', async() => {

		let result, productCount

		before(async() => {
			result = await marketplace.createProduct('iphone x', web3.utils.toWei('1', 'Ether'), { from: seller })
			productCount = await marketplace.productCount()
		})

		it('creates products', () => {
			assert.equal(productCount, 1);
			console.log(result.logs);

			const event = result.logs[0].args
			assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
			assert.equal(event.name, 'iphone x', 'name is correct');
			assert.equal(event.price.toString(), '1000000000000000000', 'price is correct');
			assert.equal(event.owner, seller, 'owner is correct');
		})

		it('should fail to create product', async () => {
			await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;

			await marketplace.createProduct('i phone xr', 0, {from: seller}).should.be.rejected;
		})
	})

})

