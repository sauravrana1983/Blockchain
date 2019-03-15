import Web3 from 'web3';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


//setting up the connection
const rpcURL = "http://127.0.0.1:8545"
const web3 = new Web3(rpcURL);
const firstAccount = '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94';
const contractAddress = '0x89a8699D63466C7f9754fB8A00599E6c302AF43d';

async function getCurrentAccounts(){
  const accounts = await web3.eth.getAccounts();
  accounts.forEach(function(value, index){
     console.log(chalk.yellow('Account Number [' + index +  '] : ' + value ));
  })
}

function createNewAccount(){
  const newAccount = web3.eth.accounts.create();
  console.log(chalk.green('New Address Created: ' + newAccount.address));
}


// Creating a new account node
async function createNewAccountNode(){
  const password = 'Password'
  const newAccount = await web3.eth.personal.newAccount(password);
  console.log(chalk.cyan(newAccount));
  console.log(chalk.white("######  Unlocking the newly created account ########"));
  let status = await web3.eth.personal.unlockAccount(newAccount, password, 600);
  console.log(chalk.green('Account unlock status: ' + status));
}


// How to deploy a contract programmatically
async function deployContract(){

  let abiPath = path.resolve(__dirname + '../../bin/TestLibrary.abi');
  let binPath = path.resolve(__dirname + '../../bin/TestLibrary.bin');



  console.log(chalk.green(abiPath));
  console.log(chalk.green(binPath));

  let abi = fs.readFileSync(abiPath);
  let bin = fs.readFileSync(binPath);


  let contract = new web3.eth.Contract(JSON.parse(abi));

  // Returns an object of abstract contract.
  let status = await contract.deploy({
    data:  bin,
    arguments: []
  }).send({
    from: '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94',
    gasPrice: 1,
    gas: 3000000
  })

  let deployedContractAddress = status.options.address;

  console.log(chalk.red('Address of Contract Deployed : ' + status.options.address));
  return deployedContractAddress;
}


/**
 *
 * @param {*} value
 */
async function setDataMethodofContract(value, address){
  let parameters ={
    from: firstAccount
  }
  console.log(chalk.green('==> Demonstrating the get method invocation of smart contract'));
  let deployedContract = getContractObject(address);

  let returnValue = await deployedContract.methods.testIncrement(value).send(parameters);
  console.log(chalk.green(returnValue));
  returnValue = await deployedContract.methods.testDecrement(value).send(parameters);
  console.log(chalk.green(returnValue));
}

/**
 *
 */
async function setDataWithValueMethodofContract(value, address){
  let parameters ={
    from: firstAccount
  }
  console.log(chalk.green('==> Demonstrating the increment using library'));
  let deployedContract = getContractObject(address);
  let returnValue = await deployedContract.methods.testIncrementByValue(value, 10).send(parameters);
  console.log(returnValue);
  returnValue = await deployedContract.methods.testDecrementByValue(value, 10).send(parameters);
  console.log(returnValue);
}

/**
 * Creating a utility function to get the contract object.
 */
function getContractObject(addessDeployedContract){
  let abiPath = path.join(__dirname + '../../bin/TestLibrary.abi');
  let abi = fs.readFileSync(abiPath);

  let options = {
    from: '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94',
    gasPrice: 1000,
    gas: 300000
  };
  // pass the address of the delployed contract
  let deployedContract = new web3.eth.Contract(JSON.parse(abi),addessDeployedContract,options);
  return deployedContract;
}
/**
 * Account {
              address: '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d',
              privateKey: '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50',
            accounts: null
          }
 */


export {  setDataMethodofContract,
          setDataWithValueMethodofContract,
          createNewAccount,
          createNewAccountNode,
          deployContract,
          getContractObject
        };
