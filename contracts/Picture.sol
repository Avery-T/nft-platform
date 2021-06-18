
//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;
import "hardhat/console.sol"; 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
contract Picture is ERC721Enumerable {
  string[] public pictureHashes;
  mapping(string => bool) _pictureMinted;
  constructor() ERC721("Picture", "PICTURE") {
  }

  //tracks the hash of a picture 
  function mint(string memory _hash) public {
     require(!_pictureMinted[_hash]);
     pictureHashes.push(_hash);
     uint _id = pictureHashes.length - 1;
     _mint(msg.sender, _id);
     _pictureMinted[_hash] = true;
    }
 }
