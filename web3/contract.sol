// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Web3Conection {
    uint256 public number = 7;

    function changeNumber(uint256 _amount) public {
        number = _amount;
    }

}