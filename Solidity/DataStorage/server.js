import Web3 from 'web3';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';


//setting up the connection
const rpcURL = "http://127.0.0.1:8545"
const web3 = new Web3(rpcURL);
const firstAccount = '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94';

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

  let abiPath = path.join(__dirname + '/bin/DataStorage.abi');
  let binPath = path.join(__dirname + '/bin/DataStorage.bin');

  console.log(chalk.green(abiPath));
  console.log(chalk.green(binPath));

  let abi = fs.readFileSync(abiPath);
  let bin = fs.readFileSync(binPath);


  let contract = new web3.eth.Contract(JSON.parse(abi));

  console.log()
  // Returns an object of abstract contract.
  let status = await contract.deploy({
    data: bin,
    arguments: [100]
  }).send({
    from: '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94',
    gasPrice: 1000,
    gas: 300000
  })

  console.log(chalk.red('Address of Contract Deployed : ' + status.options.address));
}


async function readMethodOfContract(){

  console.log(chalk.green('==> Demonstrating the get method invocation of smart contract'));
  let deployedContract = getContractObject();

  console.log(chalk.bgWhite(chalk.black('######## Details of Deployed Contract ###########')));
  console.log(chalk.green('Contract Address : ' + deployedContract.options.address));
  console.log(chalk.green('Address used to deploy : ' + deployedContract.options.from));

  console.log(chalk.white("######  Method Invocation ########"));
  console.log(chalk.yellow('Invoking function getData() on contract : ' + deployedContract.methods.getData()));
  console.log(chalk.green('====== This is just spitting out the code that should be invoked. ======'));

  let output = await deployedContract.methods.getData().call();
  console.log(chalk.yellow('Invoking function getData() on contract : ' + output));
}

/**
 *
 * @param {*} value
 */
async function setDataMethodofContract(value){
  let parameters ={
    from: firstAccount
  }
  console.log(chalk.green('==> Demonstrating the get method invocation of smart contract'));
  let deployedContract = getContractObject();
  let returnValue = await deployedContract.methods.setData(value).send(parameters);
  console.log(returnValue);
}

/**
 *
 */
async function setDataWithCheckMethodofContract(value){
  let parameters ={
    from: firstAccount
  }
  console.log(chalk.green('==> Demonstrating the get method invocation of smart contract'));
  let deployedContract = getContractObject();
  let returnValue = await deployedContract.methods.setDataWithCheck(value).send(parameters);
  console.log(returnValue);
}

/**
 * Creating a utility function to get the contract object.
 */
function getContractObject(){
  let abiPath = path.join(__dirname + '/bin/DataStorage.abi');
  let abi = fs.readFileSync(abiPath);
  console.log(abi);

  // Replace the contract address with the contract you want to invoke.
  let contractAddress = '0xaDB1E7fEA9a24DaEe48492C3523721Ea6b42F271';  // address of the deployed contract
  let options = {
    from: '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94',
    gasPrice: 1000,
    gas: 300000
  };
  let deployedContract = new web3.eth.Contract(JSON.parse(abi),contractAddress,options);
  return deployedContract;
}
/**
 * Account {
              address: '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d',
              privateKey: '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50',
            accounts: null
          }
 */

 // Execution of function Area

 // getCurrentAccounts();
// createNewAccountNode();
// deployContract();
readMethodOfContract();
setDataMethodofContract(3000);
readMethodOfContract();
setDataWithCheckMethodofContract(999);
readMethodOfContract();

const privateKey = '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50';
const address = '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d';



