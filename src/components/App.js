import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadWeb3() {
    window.addEventListener('load', async () => {
        // Modern dapp browsers... Supported now.
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            try {
              await web3.eth.defaultAccount;

            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        // Commenting out the deprecated code. 
        // else if (window.web3) {
        //     const web3 = new Web3(window.web3.currentProvider)      // Accounts always exposed
        //     web3.eth.sendTransaction({/* ... */});
        // }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    });
  }

  async loadBlockchainData() {

    const web3 = new Web3(window.ethereum);
    
    const accounts = await web3.eth.getAccounts(); // window.ethereum.request({ method: 'eth_accounts' });
    console.log(accounts);
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId();
    const networkData = Marketplace.networks[networkId];

    // Works when we're in the right network, mainnet or testnet.
    if(networkData) {
      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address);

      this.setState({ marketplace: marketplace,
                      loading: false });
      const productCount = await marketplace.methods.productCount().call();
      
      // Load products
      for (var i=1; i<=productCount;i++) {
        const product = await marketplace.methods.products(i).call();
        this.setState({
          products: [...this.state.products, product]
        });
      }
      console.log(this.state.products);
      this.setState({ loading: false});
    } else {
      window.alert("Marketplace contract not deployed to detected network")
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true
    }

    this.createProduct = this.createProduct.bind(this);
    this.purchaseProduct = this.purchaseProduct.bind(this);
  }

  createProduct(name, price) {
    this.setState({loading: true});

    this.state.marketplace.methods.createProduct(name, price).send({
      from: this.state.account
    }).on('reciept', (reciept) => {
      this.setState({loading: false});
    }).on('error', (error) => {
      console.log("sent trasaction failed with error", error);
      this.setState({loading: false});
    })
  }

  purchaseProduct(id, price) {
    this.setState({loading: true});

    this.state.marketplace.methods.purchaseProduct(id).send({
      from: this.state.account,
      value: price
    }).on('receipt', (receipt) => {
      this.setState({loading: false});
    })
  }

  render() {
    return (
      <div>
        <Navbar account = {this.state.account} />
        <div className = "container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              {
                this.state.loading 
                  ? <div id="loader" className="text-center">
                      <p className="text-center"> 
                        Loading... 
                      </p>
                    </div>
                  : <Main createProduct={this.createProduct}
                      purchaseProduct={this.purchaseProduct}
                      products={this.state.products}
                      web3={new Web3(window.ethereum)}
                    />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
