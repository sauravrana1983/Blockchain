import chalk from 'chalk';
import {getContractObject} from './coreObject';

const ALL_EVENTS = 'allEvents';

function sanityTest(){
  console.log(chalk.red('====> Adding the event subscriber function'))
}

async function getPastEventsForContract(){
  let deployedContract = getContractObject();
  let pastEvents = await deployedContract.getPastEvents(ALL_EVENTS, {
     fromBlock: 0,
     toBlock: 'latest'
  });

  pastEvents.forEach(function(value, index){
    console.log(chalk.red('=========> Event [' + index + ']'));
    console.log(chalk.green(JSON.stringify(value)));
  });
}

async function getAllEvents(){
  let deployedContract = getContractObject();
  let allEvents = deployedContract.events.allEvents({
    fromBlock: 0,
    toBlock: 'latest'
  });

  if(allEvents.length > 0){
    allEvents.forEach(function(value, index){
        console.log(chalk.yellow(value));
    });
  }
}

export {
  sanityTest,
  getPastEventsForContract
}



