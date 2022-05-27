// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "./Rabbit1.sol";
import "./RabbitHelper.sol";
import "./Rabbit2.sol";
import "./Rabbit3.sol";
import "./Rabbit4.sol";
import "./RVTUtils.sol";
import "./RabbitColorsHelper.sol";
import "./RabbitDeadHelper.sol";
import "./RabbitDeadHelper2.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


library Rabbit {
    using Strings for uint256;
    function RabbitString(RVTUtils.Player memory _player, uint256 _tokenId) public view returns (bytes memory) {
        RVTUtils.Player memory player = _player;
        if(player.alive){
            return bytes(
            abi.encodePacked(
                Rabbit1.RabbitString(),
                RabbitHelper.RabbitString(),
                RabbitColorsHelper.RabbitString(player.colors),
                Rabbit2.RabbitString(),
                Rabbit3.RabbitString(),
                Rabbit4.RabbitString(player.attack.toString(), player.defense.toString(), player.kills, player.revived, _tokenId.toString(), player.mintTimestamp)
            ));
        }else {
            return bytes(
            abi.encodePacked(
                Rabbit1.RabbitString(),
                RabbitHelper.RabbitString(),
                RabbitDeadHelper.RabbitString(),
                RabbitDeadHelper2.RabbitString(player.attack.toString(), player.defense.toString(), player.kills, player.revived, _tokenId.toString(), player.mintTimestamp)
            ));
        }
    }

}