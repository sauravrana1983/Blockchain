// any smart contract start with the following decleration

pragma solidity >=0.4.0 <0.6.0;

contract DataStorageEvent{
    uint storageData;
    address public _owner;
    event StorageDataUpdate(address initiator, uint value);

    constructor (uint data) public{
        storageData = data;
        _owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == _owner, "Only owner can initiate this transaction");
        _;
    }

    function getData() public view returns(uint){
        return storageData;
    }

    function setData(uint data) public{
        storageData = data;
    }

    function setDataWithCheck(uint data) public onlyOwner {
        storageData = data;
        emit StorageDataUpdate(msg.sender, data);
    }
}
