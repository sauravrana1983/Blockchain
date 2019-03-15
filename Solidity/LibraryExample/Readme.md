# Solidity example of Library
Solidity Contract has been written.

## Step 1 Compile the contract
Smart contract can be compiled in different ways
    * Using solidity compile solc
    * Using solc-js javascript implementation of the solidity compile

### In order to install the solidity compile follow the instructio available here
    * https://solidity.readthedocs.io/en/develop/installing-solidity.html
    * Follow the instructions mentioned here https://solidity.readthedocs.io/en/develop/installing-solidity.html

### Prerequisite: Solidity is installed on the system.
    Command to run while in folder "solidity"
    *solc --bin --abi --overwrite -o ./bin ./contract/**

    * This will create two files in the "bin" folder.
        <contract_name>.abi --- [Application Binary Interface]
        <contract_name>.bin --- [Binary file]
        overwrite --- option to overwrite if the file already exists
        -o  --- output directory where the files need to be written to
