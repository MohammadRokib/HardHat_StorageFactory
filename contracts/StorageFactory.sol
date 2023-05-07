// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SimpleStorage.sol";

contract StorageFactory {
    SimpleStorage[] public ssArray;
    string public personName;
    uint256 public personNum;

    function createSimpleStorage() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        ssArray.push(simpleStorage);
    }

    function sfStore (uint256 ssIndex, uint256 ssNum) public {
        SimpleStorage sStorage = ssArray[ssIndex];
        sStorage.store (ssNum);
    }

    function sfGet (uint256 ssIndex) public view returns (uint256) {
        SimpleStorage sStorage = ssArray[ssIndex];
        return sStorage.retrieve ();
    }

    function sfAddPerson (uint256 ssIndex, string memory str, uint256 num) public {
        SimpleStorage sStorage = ssArray[ssIndex];
        sStorage.addPerson (str, num);

        ( personName, personNum ) = sStorage.list(0);
    }
}