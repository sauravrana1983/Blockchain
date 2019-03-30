pragma solidity >=0.4.0 <=0.6.0;

contract PurchasesOrder{

    //creating a structure for Order
    struct Order{
        string productName;
        int productQuantity;
        address customer;
        State orderState;
    }

    // Modifier specified with the input variable.
    modifier onlyOwner(uint orderNumber){
        require(msg.sender == orders[orderNumber].customer, "Only owner can change the state to approved");
        _;
    }
    
    // mapping defind to map the order id to the order
    mapping(uint=>Order) orders;
    mapping(uint=>bool) test;
    
    
    
    //orders[orderID] ===> order object ===> order.productName;
    
    // hash table stores the order id which is uint and corresponding order Object
    
    //mapping(address=>bool) voted;
    
    //voted mapping stores address of the person who has voted and the boolean value
    // function vote ===> voted[address of person who wants to vote]  ===> boolean value =true, false tha
    

    //count to maintain the orders
    uint orderID;//persisted ===> storage

    //enum depicting different state of order
    enum State { Created, Approved, QualityCheck, Shipped, Delievered }

    //creating order
    function CreateOrder(string memory productName, int productQuantity) public{
        orderID = orderID+1;
        orders[orderID] = Order(productName, productQuantity, msg.sender, State.Created);
        test[orderID]=true;
        // hashtable ===> orderID, true
        
        
        if(test[orderID]){
                // do something
        }
    }

    function GetOrdersState(uint orderNumber) public view returns (State){
        Order memory orderDetails = orders[orderNumber];
        return orderDetails.orderState;
    }

    function GetOrderCustomer(uint orderNumber) public view returns(address){
        Order memory orderDetails = orders[orderNumber];
        return orderDetails.customer;
    }

    // updating the status of the order
    function MarkOrderDelievered(uint orderNumber) public onlyOwner(orderNumber){
        (orders[orderNumber]).orderState = State.Delievered;
    }
    
    function GetOrderCount() public view returns (uint){
        return orderID;
    }
}

contract extendedPO is PurchasesOrder{
    address _supplier;
    
    function getSupplier() public view returns (address){
        return _supplier;
    }
}
