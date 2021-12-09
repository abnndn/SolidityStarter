pragma solidity ^0.5.0;

contract Marketplace {

	string public name;
	uint public productCount = 0;
	mapping(uint => Product) public products;

	struct Product {
		uint id;
		string name;
		uint price;
		address owner;
		bool purchased;
	}

	event ProductCreated(
		uint id,
		string name,
		uint price,
		address owner,
		bool purchased
	);

	constructor() public {
		name = "Marketplace 1";
	}

	function createProduct(string memory _name, uint _price) public {
		// Require Name and Price
		require(bytes(_name).length > 0, "");
		require(_price > 0, "");

		//Increase total product count
		productCount++;

		// Create Product
		products[productCount] = Product(productCount, _name, _price, msg.sender, false);

		//Trigger an event
		emit ProductCreated(productCount, _name, _price, msg.sender, false);
	}
}