import fs from 'fs';
import Web3 from 'web3';
import chalk from 'chalk';
import {Accounts} from './node_modules/web3-eth-accounts';

//setting up the connection
const rpcURL = "http://127.0.0.1:8545"
const web3 = new Web3(rpcURL);
// const accounts = new Accounts(rpcURL);

// console.log(chalk.white(accounts));

// get the address from the blockchain
var firstAddress = '';
web3.eth.getAccounts().then(function(data){
  firstAddress = data[0];
  web3.eth.getBalance(firstAddress).then(function(balance){
    console.log(chalk.green(balance));
  });
  console.log(chalk.yellow(firstAddress));
})

/**
 * Account {
              address: '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d',
              privateKey: '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50',
            accounts: null
          }
 */
const newAccount = web3.eth.accounts.create();
console.log(newAccount);



