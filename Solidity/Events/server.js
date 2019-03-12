
import {  readMethodOfContract,
          setDataMethodofContract,
          setDataWithCheckMethodofContract} from './logic/coreObject';
import {sanityTest,
        getPastEventsForContract} from './logic/eventSubscriber'




// readMethodOfContract();
// setDataMethodofContract(3000);
// readMethodOfContract();
// setDataWithCheckMethodofContract(999);
// readMethodOfContract();
sanityTest();
getPastEventsForContract();
