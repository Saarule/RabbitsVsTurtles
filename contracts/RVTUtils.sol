// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

library RVTUtils {
   using Strings for uint256;

    struct Player { 
      string name;
      string playerType;
      string description;
      string[] colors;
      bool alive;
      uint256 mintTimestamp;
      uint256 attack;
      uint256 defense;
      uint256 kills;
      bool revived;
   }
  
  function randomNum(uint256 _mod, uint256 _seed, uint _salt, uint256 randomRes) public view returns(uint256) {
      uint256 num = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _seed, _salt, randomRes)));
      num = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _seed, _salt, num, randomRes))) % _mod;
      return num;
  }
  
  function randomNumStartingAt(uint256 startingAt, uint256 _mod, uint256 _seed, uint _salt, uint256 randomRes) public view returns(uint256) {
      uint256 num = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _seed, _salt, randomRes)));
      num = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, _seed, _salt, num, randomRes))) % _mod;
      return num + startingAt;
  }

  function generateArrayOfRandomNumbers(uint256 _mod, uint256 _seed, uint _salt, uint256 _length, uint256 randomRes) public view returns(string[] memory) {
      string[] memory nums = new string[](_length); 
      for (uint256 i = 0; i < _length; i++) {
          nums[i] = randomNum(_mod, _seed, _salt + i, randomRes).toString();
      }
      return nums;
  }
  
  function compareStrings(string memory _string1, string memory _string2) internal pure returns(bool) {
      return keccak256(bytes(_string1)) == keccak256(bytes(_string2));
  }
  
  function checkWhichTeamNewPlayerWillJoin(uint256 rabbitCounter, uint256 turtleCounter) public pure returns(string memory) {
      if(rabbitCounter > turtleCounter) {
            return "Turtle";
      } else if(rabbitCounter < turtleCounter) {
            return "Rabbit";
      } else {
            return "Turtle";
      }
    
   }
}

