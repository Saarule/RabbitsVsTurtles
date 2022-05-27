// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "./RabbitsVSTurtles.sol";


contract RabbitsVsTurtlesGame is RabbitsVsTurtles {
    
    function getTurtleTeamSize() public view override returns(uint256) {
        uint256 turtleCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Turtle")) {
                    turtleCounter++;
                }
        }
        return turtleCounter;
    }

    function getAliveTurtleTeamSize() public view returns(uint256) {
        uint256 turtleCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Turtle") && player.alive) {
                    turtleCounter++;
                }
        }
        return turtleCounter;
    }

    function getDeadTurtleTeamSize() public view returns(uint256) {
        uint256 turtleCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Turtle") && !player.alive) {
                    turtleCounter++;
                }
        }
        return turtleCounter;
    }

    function getRevivedTurtleTeamSize() public view returns(uint256) {
        uint256 turtleCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Turtle") && player.revived) {
                    turtleCounter++;
                }
        }
        return turtleCounter;
    }

    function getRabbitTeamSize() public view override returns(uint256) {
        uint256 rabbitCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
            if(compareStrings(player.playerType,"Rabbit")) {
                rabbitCounter++;
            }
        }
        return rabbitCounter;
    }

    function getAliveRabbitTeamSize() public view returns(uint256) {
        uint256 rabbitCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Rabbit") && player.alive) {
                    rabbitCounter++;
                }
        }
        return rabbitCounter;
    }

    function getDeadRabbitTeamSize() public view returns(uint256) {
        uint256 rabbitCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Rabbit") && !player.alive) {
                    rabbitCounter++;
                }
        }
        return rabbitCounter;
    }

    function getRevivedRabbitTeamSize() public view returns(uint256) {
        uint256 rabbitCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(compareStrings(player.playerType,"Rabbit") && player.revived) {
                    rabbitCounter++;
                }
        }
        return rabbitCounter;
    }
}