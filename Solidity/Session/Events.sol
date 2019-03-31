pragma solidity >=0.4.0 < 0.6.0;

contract SimpleStorage{
    uint storageData;
    address public _owner;
    event StorageDataUpdated (address initiator, uint value);

    //constructor 
    constructor (uint data) public{
        storageData = data;
        _owner = msg.sender; // setting up the owner in the constructor
    }

    //specifying a condition check only owner can perform an operation
    modifier onlyOwner(){
        require(msg.sender == _owner, "Only owner can initiate the function");
        _;
    }

    // call to retrieve
    function getData() public view returns(uint){
        return storageData;
    }

    //transaction to set  data
    function setData(uint data) public{
        storageData = data;
    }

    // This function can only be invoked by the owner of the contract
    function setDataCheck(uint data) public payable onlyOwner{
        storageData = data;
        emit StorageDataUpdated(msg.sender, data);
    }
}