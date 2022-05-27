// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Base64.sol";
import "./Turtle.sol";
import "./Rabbit.sol";
import "./RVTUtils.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RabbitsVsTurtles is ERC721Enumerable, VRFConsumerBase, Ownable {
  using Strings for uint256;

   mapping (uint256 => RVTUtils.Player) public players;
   
   bytes32 internal keyHash;
   uint256 internal fee;
   uint256 internal randomRes;

   uint256 public cost = 1 ether;
   uint256 public increaseAttackCost = 5 ether;
   uint256 public increaseDefenseCost = 5 ether;
   uint256 public increaseArmorCost = 10 ether;
   uint256 public increaseStaminaCost = 10 ether;
   uint256 public revivePlayerCost = 500 ether;

   event Attacked (uint256 indexed _eaterId, uint256 indexed _eatenId);
   event AttackIncreased (uint256 indexed _playerId);
   event DefenseIncreased (uint256 indexed _playerId);
   event ArmorIncreased (uint256 indexed _playerId);
   event StaminaIncreased (uint256 indexed _playerId);
   event Revived (uint256 indexed _playerId);

   constructor() ERC721("Rabbits Vs. Turtles", "RVT") VRFConsumerBase(
            0xAE975071Be8F8eE67addBC1A82488F1C24858067, // VRF Coordinator
            0xb0897686c545045aFc77CF20eC7A532E3120E0F1  // LINK Token
        )
    {
        keyHash = 0xcc294a196eeeb44da2888d17c0625cc88d70d9760a69d58d853ba6581a9ab0cd;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

  function mint() public payable {
    uint256 supply = totalSupply();
    
    RVTUtils.Player memory newPlayer = RVTUtils.Player(
        string(abi.encodePacked('Rabbits Vs. Turtles #', uint256(supply + 1).toString())), 
        checkWhichTeamNewPlayerWillJoin(),
        "Rabbits Vs. Turtles is a new dynamic NFT Multiplayer game which is 100% on-chain. Each NFT represents a player in the game and the value of each NFT is highly tied to the player's performance in the game! Take your part in the battle of the rabbits and the turtles and become the best of the best!",
        RVTUtils.generateArrayOfRandomNumbers(361, block.difficulty+30, block.timestamp, 50,randomRes),
        true,
        block.timestamp,
        RVTUtils.randomNumStartingAt(1 ,100, block.difficulty+40, block.timestamp ,randomRes),
        RVTUtils.randomNumStartingAt(1 ,100, block.difficulty, block.timestamp+50, randomRes),
        0,
        false
        );
    
    if (msg.sender != owner()) {
      require(msg.value >= cost);
    }
    players[supply + 1] = newPlayer;
    _safeMint(msg.sender, supply + 1);
    cost = (cost * 1001) / 1000;
}

  function getPlayerByIndex(uint256 _tokenId) public view returns(RVTUtils.Player memory) {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    RVTUtils.Player memory player = players[_tokenId];
    return player;
  }

  function checkWhichTeamNewPlayerWillJoin() public view returns(string memory) {
        return RVTUtils.checkWhichTeamNewPlayerWillJoin(getRabbitTeamSize(), getTurtleTeamSize());
    }
    
    function getGameInfo() public view returns(uint256[8] memory) {
        uint256 turtleCounter = 0;
        uint256 rabbitCounter = 0;
        uint256 aliveTurtleCounter = 0;
        uint256 aliveRabbitCounter = 0;
        uint256 deadTurtleCounter = 0;
        uint256 deadRabbitCounter = 0;
        uint256 revivedTurtleCounter = 0;
        uint256 revivedRabbitCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(RVTUtils.compareStrings(player.playerType,"Turtle")) {
                    turtleCounter++;
                    if(player.alive) {
                        aliveTurtleCounter++;
                    } else {
                        deadTurtleCounter++;
                    }
                    if(player.revived) {
                        revivedTurtleCounter++;
                    }
                }else if(RVTUtils.compareStrings(player.playerType,"Rabbit")) {
                    rabbitCounter++;
                    if(player.alive) {
                        aliveRabbitCounter++;
                    } else {
                        deadRabbitCounter++;
                    }
                    if(player.revived) {
                        revivedRabbitCounter++;
                    }
                }
        }
        return [turtleCounter, rabbitCounter, aliveTurtleCounter, aliveRabbitCounter, deadTurtleCounter, deadRabbitCounter, revivedTurtleCounter, revivedRabbitCounter];
    }
    
    function getTurtleTeamSize() public view returns(uint256) {
        uint256 turtleCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
                if(RVTUtils.compareStrings(player.playerType,"Turtle")) {
                    turtleCounter++;
                }
        }
        return turtleCounter;
    }

    function getRabbitTeamSize() public view returns(uint256) {
        uint256 rabbitCounter = 0;
        for(uint256 i = 0; i < totalSupply()+1; i++) {
            RVTUtils.Player memory player = players[i];
            if(RVTUtils.compareStrings(player.playerType,"Rabbit")) {
                rabbitCounter++;
            }
        }
        return rabbitCounter;
    }

  function getPlayerType(uint256 _tokenId) public view returns(string memory) {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    RVTUtils.Player memory player = players[_tokenId];
    return player.playerType;
  }

  function attackPlayer(uint256 _attackerId, uint256 _attackedId) public {
    require(_exists(_attackerId),"ERC721Metadata: Query for nonexistent token");
    require(_exists(_attackedId),"ERC721Metadata: Query for nonexistent token");
    require(ownerOf(_attackerId) == msg.sender,"You are not the owner's of the attacker Player");
    require(isAlive(_attackedId),"Attacked player Id is already dead");
    require(isAlive(_attackerId),"Attacker player Id is already dead");
    require(!(keccak256(bytes(getPlayerType(_attackerId))) == keccak256(bytes(getPlayerType(_attackedId)))),"You cannot attack your own team");
    RVTUtils.Player storage attacker = players[_attackerId];
    RVTUtils.Player storage attacked = players[_attackedId];
    require(attacker.attack > attacked.defense && attacker.defense > attacked.attack,"You cannot attack because you are not strong enough");
    attacked.alive = false;
    attacker.kills = attacker.kills + 1;
    emit Attacked(_attackerId, _attackedId);
  }

  function increaseAttack(uint256 _tokenId) payable public {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    require(isAlive(_tokenId),"Dead player Id cannot increase attack");
    if (msg.sender != owner()) {
        require(msg.value >= increaseAttackCost, "You don't have enough money to increase armor");
    }
    RVTUtils.Player storage player = players[_tokenId];
    player.attack = player.attack + 5;
    emit AttackIncreased(_tokenId);
  }

  function increaseDefense(uint256 _tokenId) payable public {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    require(isAlive(_tokenId),"Dead player Id cannot increase armor");
    if (msg.sender != owner()) {
        require(msg.value >= increaseDefenseCost, "You don't have enough money to increase armor");
    }
    RVTUtils.Player storage player = players[_tokenId];
    player.defense = player.defense + 5;
    emit DefenseIncreased(_tokenId);
  }
  
    function increaseStamina(uint256 _tokenId) payable public {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    require(isAlive(_tokenId),"Dead player Id cannot increase stamina");
    if (msg.sender != owner()) {
        require(msg.value >= increaseStaminaCost, "You don't have enough money to increase stamina");
    }
    RVTUtils.Player storage player = players[_tokenId];
    player.attack = player.attack + 20;
    emit StaminaIncreased(_tokenId);
  }

  function increaseArmor(uint256 _tokenId) payable public {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    require(isAlive(_tokenId),"Dead player Id cannot increase armor");
    if (msg.sender != owner()) {
        require(msg.value >= increaseArmorCost, "You don't have enough money to increase armor");
    }
    RVTUtils.Player storage player = players[_tokenId];
    player.defense = player.defense + 20;
    emit ArmorIncreased(_tokenId);
  }

  function revivePlayer(uint256 _tokenId) payable public {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    require(!isAlive(_tokenId),"Player Id is already alive");
    require(ownerOf(_tokenId) == msg.sender,"You are not the owner's of the revived Player");
    if (msg.sender != owner()) {
        require(msg.value >= revivePlayerCost, "You don't have enough money to revive player");
    }
    RVTUtils.Player storage player = players[_tokenId];
    require(player.revived == false,"Player has already revived once, every player can only revive once");
    player.alive = true;
    player.revived = true;
    emit Revived(_tokenId);
  }

  function isAlive(uint256 _tokenId) public view returns(bool) {
    require(_exists(_tokenId),"ERC721Metadata: Query for nonexistent token");
    RVTUtils.Player memory player = players[_tokenId];
    return player.alive;
  }
  
  function buildImage(uint256 _tokenId) public view returns(string memory) {
    RVTUtils.Player memory currentPlayer = players[_tokenId];
    if(RVTUtils.compareStrings(currentPlayer.playerType, "Rabbit")) {
        return Base64.encode(Rabbit.RabbitString(currentPlayer, _tokenId));
    }else{
        return Base64.encode(Turtle.TurtleString(currentPlayer, _tokenId));
    }
  }
  
  function buildMetadata(uint256 _tokenId) public view returns(string memory) {
      RVTUtils.Player memory currentPlayer = players[_tokenId];
      return string(abi.encodePacked(
              'data:application/json;base64,', Base64.encode(bytes(abi.encodePacked(
                          '{"name":"', 
                          currentPlayer.name,
                          '", "description":"', 
                          currentPlayer.description,
                          '", "image": "', 
                          'data:image/svg+xml;base64,', 
                          buildImage(_tokenId),
                          '"}')))));
  }

  function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
    require(_exists(_tokenId),"ERC721Metadata: URI query for nonexistent token");
    return buildMetadata(_tokenId);
  }
  
  function enforceRandomness() public returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
    return requestRandomness(keyHash, fee);
    }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    randomRes = randomness;
    }

  function setMintCost(uint256 _newCost) public onlyOwner() {
    cost = _newCost;
  }
  
  function setIncreaseAttackCost(uint256 _newCost) public onlyOwner() {
    increaseAttackCost = _newCost;
  }
  
  function setIncreaseDefenseCost(uint256 _newCost) public onlyOwner() {
    increaseDefenseCost = _newCost;
  }

  function setArmorCost(uint256 _newCost) public onlyOwner() {
    increaseArmorCost = _newCost;
  }
  
  function setStaminaCost(uint256 _newCost) public onlyOwner() {
    increaseStaminaCost = _newCost;
  }

  function setReviveCost(uint256 _newCost) public onlyOwner() {
    revivePlayerCost = _newCost;
  }

  function withdraw() public payable onlyOwner {
    (bool os, ) = payable(owner()).call{value: address(this).balance}("");
    require(os);
  }
}