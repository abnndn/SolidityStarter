Reference Playlist: https://www.youtube.com/playlist?list=PLS5SEs8ZftgW6kyVyD43dLXK0xpfiaJBJ

Guthub Fork: https://github.com/dappuniversity/starter_kit

Creating a Basic blockchain App.

---

Prerequisites:

#nodejs
#truffle
#ganache
#Sublime as IDE, install package controller
#npm

The document contains the high level commands that can be used to run this code in ethererum testnet.

#Commands to run the smartContract:

`npm install` to add all required dependencies first.

`truffle compile` to compile solidity code.

`truffle migrate (--reset)` to deploy the compiled code to local blockchain network.

`truffle console` to access blockchain network.

`.exit` to exit from truffle console.

Run test using:
`truffle test`

#Few Internal Console commands to get started:

`accounts = await web3.eth.getAccounts()`.

`blockNumber = await web3.eth.getBlockNumber()`.

`marketplace = await Marketplace.deployed()`.

`marketplace.address`.

`name = await marketplace.name()`.

`migrate` to redeploy from inside truffle console

#Useful NPM commands:

`npm run start` starts the local server frontend on `http://localhost:3000/`
<Change metamask protocol to test>

#Reference Links:

https://stackoverflow.com/questions/67245415/how-to-change-account-in-truffleganache

https://medium.com/valist/how-to-connect-web3-js-to-metamask-in-2020-fee2b2edf58a

Diff b/w window.ethereum and window.web3: https://ethereum.stackexchange.com/questions/68293/difference-between-window-ethereum-and-window-web3

https://github.com/MetaMask/metamask-extension/issues/8077