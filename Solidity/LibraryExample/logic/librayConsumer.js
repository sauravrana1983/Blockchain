import chalk from 'chalk';
import {    getContractObject,
            deployContract,
            setDataMethodofContract,
            setDataWithValueMethodofContract } from './coreObject';


function sanityTest(){
  console.log(chalk.red('====> Adding the library function'))
}

async function consumeLibrary(){
    let deployedContractAddress = await deployContract();
    console.log(chalk.green(deployedContractAddress));
    // setDataMethodofContract(100, deployedContractAddress);
    // setDataWithValueMethodofContract(200, deployedContractAddress);
}

export {
  sanityTest,
  consumeLibrary
}



