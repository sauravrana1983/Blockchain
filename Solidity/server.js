import Web3 from 'web3';
import chalk from 'chalk';


//setting up the connection
const rpcURL = "http://127.0.0.1:8545"
const web3 = new Web3(rpcURL);
// const accounts = new Accounts(rpcURL);

// console.log(chalk.white(accounts));

// get the address from the blockchain
// var firstAddress = '';
// web3.eth.getAccounts().then(function(data){
//   firstAddress = data[0];
//   web3.eth.getBalance(firstAddress).then(function(balance){
//     console.log(chalk.green(balance));
//   });
//   console.log(chalk.yellow(firstAddress));
// })

async function getCurrentAccounts(){
  const accounts = await web3.eth.getAccounts();
  accounts.forEach(function(value, index){
     console.log(chalk.yellow('Account Number [' + index +  '] : ' + value ));
  })
  // console.log(chalk.yellow(JSON.stringify(accounts)));
  console.log(chalk.yellow('First Account : ' + accounts[0]));
}

function createNewAccount(){
  const newAccount = web3.eth.accounts.create();
  console.log(chalk.green('New Address Created: ' + newAccount.address));
}

// async function unlockAccount(accountAddress, password){
//   console.log(chalk.white("######  Unlocking the newly created account ########"));
//   let status = await web3.eth.personal.unlockAccount(accountAddress, password, 600);
//   return status;
// }

async function createNewAccountNode(){
  const password = 'Password'
  const newAccount = await web3.eth.personal.newAccount(password);
  console.log(chalk.cyan(newAccount));
  console.log(chalk.white("######  Unlocking the newly created account ########"));
  let status = await web3.eth.personal.unlockAccount(newAccount, password, 600);
  console.log(chalk.green('Account unlock status: ' + status));
}



/**
 * Account {
              address: '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d',
              privateKey: '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50',
            accounts: null
          }
 */

getCurrentAccounts();
// createNewAccountNode();

const privateKey = '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50';
const address = '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d';



