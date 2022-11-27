import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { selectAllPlayers } from "../../features/playersSlice";
import { useSelector } from "react-redux";
import { selectAllInfo } from "../../features/infoSlice";

import "./shop.css";
import Introduction from "../../components/Introduction/Introduction";
import Product from "../../components/Product/Product";
import ChoosePlayer from "../../components/ChoosePlayer/ChoosePlayer";
import UpgradeConfirm from "../../components/UpgradeConfirm/UpgradeConfirm";
import frame from "../../assets/pic/frame.png";
import { toast, Flip } from "react-toastify";

const Shop = ({ confirmTransaction }) => {
  const products = [
    { header: "Attack", productImg: "potion-green", price: 5 },
    { header: "Defence", productImg: "potion-blue", price: 5 },
    { header: "Stamina", productImg: "potion-red", price: 10 },
    { header: "Armor", productImg: "potion-yellow", price: 10 },
  ];
  const character = { url: "magition", top: "-2%", left: "86%" };

  const mintInfo = {
    increaseAttackCost: "5000000000000000000", // 5 Matic
    increaseDefenseCost: "5000000000000000000", // 5 Matic
    increaseStaminaCost: "10000000000000000000", // 10 Matic
    increaseArmorCost: "10000000000000000000", // 10 Matic
    revivePlayerCost: "500000000000000000000", // 500 Matic
  };
  const [activeStage, setActiveStage] = useState("store");
  const [choosenPlayer, setChoosenPlayer] = useState();
  const [choosenUpgrade, setChoosenUpgrade] = useState();
  const [playersData, setPlayersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {accounts, provider} = useWeb3React();
  const players = useSelector(selectAllPlayers)
  const info = useSelector(selectAllInfo)

  useEffect(()=>{
    let filterPlayers = players.filter(
      (player) =>{ 
        if(choosenPlayer?.id === player.id) setChoosenPlayer(player)
        return player.player.alive
      });
      setPlayersData(filterPlayers)
  },[players])

  const setChoosen = (choosen) => {
    if (typeof choosen === "number") {
      setChoosenUpgrade(choosen);
      if (!choosenPlayer) setActiveStage("choosePlayer");
      else setActiveStage("confirmUpgrade");
    } else {
      setChoosenPlayer(choosen);
      if (choosenUpgrade === undefined) setActiveStage("store");
      else setActiveStage("confirmUpgrade");
    }
  };

  const resetState = () =>{
    setChoosenPlayer('')
    setChoosenUpgrade('')
    setActiveStage('store')
  }

  const buyUpgrade = async () => {
    let desc = {}
    const params = {
      to: info.contractJSON.address,
      from: accounts[0],
      value: "",
      data: "",
    };
    // console.log(Number(choosenPlayer.player.name.split('#')[1]));
    switch (choosenUpgrade) {
      case 0:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseAttackCost))
        );
        params.data = info.contract.methods
          .increaseAttack(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
        desc.action = 'Increase Attack'
        desc.txt = `You are about to give player number #${choosenPlayer.player.name.split('#')[1]} attack potion.`
        desc.img = choosenPlayer.image
        desc.symbol = products[0].productImg
        break;
      case 1:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseDefenseCost))
        );
        params.data = info.contract.methods
          .increaseDefense(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
          desc.action = 'Increase Defence'
          desc.txt = `You are about to give player number #${choosenPlayer.player.name.split('#')[1]} Defence potion.`
          desc.img = choosenPlayer.image
          desc.symbol = products[1].productImg
        break;
      case 2:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseStaminaCost))
        );
        params.data = info.contract.methods
          .increaseStamina(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
        desc.action = 'Increase Stamina'
        desc.txt = `You are about to give player number #${choosenPlayer.player.name.split('#')[1]} Stamina potion.`
        desc.img = choosenPlayer.image
        desc.symbol = products[2].productImg
        break;
      case 3:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseArmorCost))
        );
        params.data = info.contract.methods
          .increaseArmor(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
        desc.action = 'Increase Armor'
        desc.txt = `You are about to give player number #${choosenPlayer.player.name.split('#')[1]} Armor potion.`
        desc.img = choosenPlayer.image
        desc.symbol = products[3].productImg
        break;
      default:
        return;
    }
    const res = await confirmTransaction(params, desc)
    console.log(res);
    if(res){
        toast.warning('Insufficient funds', {
        theme: "light",
        position: "bottom-left",
        autoClose: 3000,
        transition: Flip,
      });
    }
  };
  if(isLoading) return <div style={{height: '100%', width: '100%', background: 'gray'}}> <img alt="" src={frame} style={{opacity: '0'}} onLoad={() => setIsLoading(false)}/><div className="loader-container" style={{height: '50%'}}><div className="loader"></div></div></div>
  return (
    <div className="shop">
      {activeStage === "introduction" && (
        <Introduction
          header={"STORE"}
          btnTxt={`LET'T GO`}
          txt={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ut rutrum metus neque enim, maecenas. Nibh nulla urna iaculis phasellus. Sed non in accumsan, nulla id. Vitae pharetra hendrerit id volutpat mi vitae nibh."
          }
        />
      )}
      {activeStage === "store" && (
        <div className="products-frame">
          <div
            className="character"
            style={{ top: character.top, left: character.left }}
          >
            <img
              alt=""
              src={require(`../../assets/pic/${character.url}.png`)}
            />
          </div>
          <div className="shop-frame-header">STORE</div>
          <div className="product-list">
            {products.map((product, idx) => {
              return (
                <Product
                  key={product.header}
                  header={product.header}
                  productImg={product.productImg}
                  price={product.price}
                  func={() => setChoosen(idx)}
                  height="45%"
                  btnTxt={"Select"}
                />
              );
            })}
          </div>
        </div>
      )}
      {activeStage === "choosePlayer" && (
        <ChoosePlayer playersData={playersData} setChoosen={setChoosen} />
      )}
      {activeStage === "confirmUpgrade" && (
        <UpgradeConfirm
          player={choosenPlayer}
          product={products[choosenUpgrade]}
          setActiveStage={setActiveStage}
          resetState={resetState}
          buyUpgrade={buyUpgrade}
        />
      )}
    </div>
  );
};

export default Shop;
