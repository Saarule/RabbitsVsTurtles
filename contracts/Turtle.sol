// SPDX-License-Identifier: MIT

import "./Turtle1.sol";
import "./Turtle2.sol";
import "./Turtle3.sol";
import "./TurtleHelper.sol";
import "./TurtleHelper2.sol";
import "./RVTUtils.sol";
import "./TurtleColorsHelper.sol";
import "./TurtleDeadHelper.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

pragma solidity >=0.8.0 <0.9.0;

library Turtle {
    using Strings for uint256;
    function TurtleString(RVTUtils.Player memory _player, uint256 _tokenId) public view returns (bytes memory) {
        RVTUtils.Player memory player = _player;
        if(player.alive){
            return bytes(
            abi.encodePacked(
                Turtle1.TurtleString(),
                TurtleHelper.TurtleString(),
                TurtleHelper2.TurtleString(),
                TurtleColorsHelper.TurtleString(player.colors),
                Turtle2.TurtleString(),
                Turtle3.TurtleString(player.attack.toString(), player.defense.toString(), player.kills, player.revived, _tokenId.toString(), player.mintTimestamp)
            ));
        }else{
            return bytes(
            abi.encodePacked(
                Turtle1.TurtleString(),
                TurtleHelper.TurtleString(),
                TurtleHelper2.TurtleString(),
                TurtleDeadHelper.TurtleString(player.attack.toString(), player.defense.toString(), player.kills, player.revived, _tokenId.toString(), player.mintTimestamp)
            ));
        }
    }
}