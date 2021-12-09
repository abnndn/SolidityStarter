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

			const event = result.logs[0].args;
			assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
			assert.equal(event.name, 'iphone x', 'name is correct');
			assert.equal(event.price.toString(), '1000000000000000000', 'price is correct');
			assert.equal(event.owner, seller, 'owner is correct');
		})

		it('should fail to create product', async () => {
			await marketplace.createProduct('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;

			await marketplace.createProduct('i phone xr', 0, {from: seller}).should.be.rejected;
		})

		it('list products', async() => {
			const product = await marketplace.products(productCount);
			assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct');
			assert.equal(product.name, 'iphone x', 'name is correct');
			assert.equal(product.price.toString(), '1000000000000000000', 'price is correct');
			assert.equal(product.owner, seller, 'owner is correct');
			assert.equal(product.purchased, false, 'purchsed is correct');
		})

		it('sells products', async() => {
			let oldSellerBalance 
			oldSellerBalance = await web3.eth.getBalance(seller)
			oldSellerBalance = new web3.utils.BN(oldSellerBalance)

			result = await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

			const event = result.logs[0].args
			assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct');
			assert.equal(event.name, 'iphone x', 'name is correct');
			assert.equal(event.price.toString(), '1000000000000000000', 'price is correct');
			assert.equal(event.owner, buyer, 'owner is correct');
			assert.equal(event.purchased, true, 'purchsed is correct');

			let newSellerBalance 
			newSellerBalance = await web3.eth.getBalance(seller)
			newSellerBalance = new web3.utils.BN(newSellerBalance)

			let price
			price = web3.utils.toWei('1','Ether')
			price = new web3.utils.BN(price);

			console.log(oldSellerBalance, newSellerBalance, price)

			const expectedBalance = oldSellerBalance.add(price);

			assert.equal(newSellerBalance.toString(), expectedBalance.toString());

			await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
			await marketplace.purchaseProduct(productCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether')}).should.be.rejected;
			await marketplace.purchaseProduct(productCount, { from: deployer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
			await marketplace.purchaseProduct(productCount, { from: seller, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
		})
	})

})

