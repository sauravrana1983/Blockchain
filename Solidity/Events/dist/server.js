"use strict";

var _web = _interopRequireDefault(require("web3"));

var _chalk = _interopRequireDefault(require("chalk"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//setting up the connection
var rpcURL = "http://127.0.0.1:8545";
var web3 = new _web.default(rpcURL);
var firstAccount = '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94';

function getCurrentAccounts() {
  return _getCurrentAccounts.apply(this, arguments);
}

function _getCurrentAccounts() {
  _getCurrentAccounts = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var accounts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return web3.eth.getAccounts();

          case 2:
            accounts = _context.sent;
            accounts.forEach(function (value, index) {
              console.log(_chalk.default.yellow('Account Number [' + index + '] : ' + value));
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getCurrentAccounts.apply(this, arguments);
}

function createNewAccount() {
  var newAccount = web3.eth.accounts.create();
  console.log(_chalk.default.green('New Address Created: ' + newAccount.address));
} // Creating a new account node


function createNewAccountNode() {
  return _createNewAccountNode.apply(this, arguments);
} // How to deploy a contract programmatically


function _createNewAccountNode() {
  _createNewAccountNode = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var password, newAccount, status;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            password = 'Password';
            _context2.next = 3;
            return web3.eth.personal.newAccount(password);

          case 3:
            newAccount = _context2.sent;
            console.log(_chalk.default.cyan(newAccount));
            console.log(_chalk.default.white("######  Unlocking the newly created account ########"));
            _context2.next = 8;
            return web3.eth.personal.unlockAccount(newAccount, password, 600);

          case 8:
            status = _context2.sent;
            console.log(_chalk.default.green('Account unlock status: ' + status));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _createNewAccountNode.apply(this, arguments);
}

function deployContract() {
  return _deployContract.apply(this, arguments);
}

function _deployContract() {
  _deployContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3() {
    var abiPath, binPath, abi, bin, contract, status;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            abiPath = _path.default.join(__dirname + '/bin/DataStorageEvent.abi');
            binPath = _path.default.join(__dirname + '/bin/DataStorageEvent.bin');
            console.log(_chalk.default.green(abiPath));
            console.log(_chalk.default.green(binPath));
            abi = _fs.default.readFileSync(abiPath);
            bin = '0x' + _fs.default.readFileSync(binPath);
            contract = new web3.eth.Contract(JSON.parse(abi));
            console.log(); // Returns an object of abstract contract.

            _context3.next = 10;
            return contract.deploy({
              data: bin,
              arguments: [100]
            }).send({
              from: '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94',
              gasPrice: 1000,
              gas: 300000
            });

          case 10:
            status = _context3.sent;
            console.log(_chalk.default.red('Address of Contract Deployed : ' + status.options.address));

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _deployContract.apply(this, arguments);
}

function readMethodOfContract() {
  return _readMethodOfContract.apply(this, arguments);
}
/**
 *
 * @param {*} value
 */


function _readMethodOfContract() {
  _readMethodOfContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var deployedContract, output;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            console.log(_chalk.default.green('==> Demonstrating the get method invocation of smart contract'));
            deployedContract = getContractObject();
            console.log(_chalk.default.bgWhite(_chalk.default.black('######## Details of Deployed Contract ###########')));
            console.log(_chalk.default.green('Contract Address : ' + deployedContract.options.address));
            console.log(_chalk.default.green('Address used to deploy : ' + deployedContract.options.from));
            console.log(_chalk.default.white("######  Method Invocation ########"));
            console.log(_chalk.default.yellow('Invoking function getData() on contract : ' + deployedContract.methods.getData()));
            console.log(_chalk.default.green('====== This is just spitting out the code that should be invoked. ======'));
            _context4.next = 10;
            return deployedContract.methods.getData().call();

          case 10:
            output = _context4.sent;
            console.log(_chalk.default.yellow('Invoking function getData() on contract : ' + output));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _readMethodOfContract.apply(this, arguments);
}

function setDataMethodofContract(_x) {
  return _setDataMethodofContract.apply(this, arguments);
}
/**
 *
 */


function _setDataMethodofContract() {
  _setDataMethodofContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(value) {
    var parameters, deployedContract, returnValue;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            parameters = {
              from: firstAccount
            };
            console.log(_chalk.default.green('==> Demonstrating the get method invocation of smart contract'));
            deployedContract = getContractObject();
            _context5.next = 5;
            return deployedContract.methods.setData(value).send(parameters);

          case 5:
            returnValue = _context5.sent;
            console.log(returnValue);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _setDataMethodofContract.apply(this, arguments);
}

function setDataWithCheckMethodofContract(_x2) {
  return _setDataWithCheckMethodofContract.apply(this, arguments);
}
/**
 * Creating a utility function to get the contract object.
 */


function _setDataWithCheckMethodofContract() {
  _setDataWithCheckMethodofContract = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(value) {
    var parameters, deployedContract, returnValue;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            parameters = {
              from: firstAccount
            };
            console.log(_chalk.default.green('==> Demonstrating the get method invocation of smart contract'));
            deployedContract = getContractObject();
            _context6.next = 5;
            return deployedContract.methods.setDataWithCheck(value).send(parameters);

          case 5:
            returnValue = _context6.sent;
            console.log(returnValue);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _setDataWithCheckMethodofContract.apply(this, arguments);
}

function getContractObject() {
  var abiPath = _path.default.join(__dirname + '/bin/DataStorage.abi');

  var abi = _fs.default.readFileSync(abiPath); // Replace the contract address with the contract you want to invoke.


  var contractAddress = '0xadb1e7fea9a24daee48492c3523721ea6b42f271'; // address of the deployed contract

  var options = {
    from: '0xfD5bd9e6f31301bA31D9ddC2426E649b3edb7d94',
    gasPrice: 1000,
    gas: 300000
  };
  var deployedContract = new web3.eth.Contract(JSON.parse(abi), contractAddress, options);
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


deployContract(); // readMethodOfContract();
// setDataMethodofContract(3000);
// readMethodOfContract();
// setDataWithCheckMethodofContract(999);
// readMethodOfContract();

var privateKey = '0xbc47da09dbdbbd702284ca9d1c40307ccb89c087a3c701f258689e4f87e4fb50';
var address = '0xCCf0461B9fae7090B9dEc544fBAe3D5ef1fF419d';