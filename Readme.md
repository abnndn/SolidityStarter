Reference Playlist: https://www.youtube.com/playlist?list=PLS5SEs8ZftgW6kyVyD43dLXK0xpfiaJBJ

Guthub Fork: https://github.com/dappuniversity/starter_kit

Creating a Basic blockchain App.

---

Prerequisites:

#nodejs
#truffle
#ganache
#Sublime as IDE, install package controller

The document contains the high level commands that can be used to run this code in ethererum testnet.

#Commands to run the smartContract:

`truffle compile` to compile solidity code.

`truffle migrate` to deploy the compiled code to local blockchain network.

`truffle console` to access blockchain network.
`.exit` to exit from truffle console.

Run test using:
`truffle test`

#Internal Console commands for ease of use:

`accounts = await web3.eth.getAccounts()`
`blockNumber = await web3.eth.getBlockNumber()`
`marketplace = await Marketplace.deployed()`
`marketplace.address`
`name = await marketplace.name()`
