Solidity Contract has been written.

First Step is to compile the contract written in solidity.
Mutiple ways to achieve the same this.
Installing solidity compiler ---- solc command will become available online
Follow the instructions mentioned here https://solidity.readthedocs.io/en/develop/installing-solidity.html

Prerequisite: Solidity is installed on the system.
Command to run while in folder "solidity"
    solc --bin --abi --overwrite -o ./bin ./contract/DataStorage.sol

This will create two files in the "bin" folder.
Datastorage.abi --- [Application Binary Interface] 
Datastorage.bin