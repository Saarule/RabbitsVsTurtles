import React, { useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./shop.css";
import Introduction from "../../components/Introduction/Introduction";
import Product from "../../components/Product/Product";
import ChoosePlayer from "../../components/ChoosePlayer/ChoosePlayer";
import UpgradeConfirm from "../../components/UpgradeConfirm/UpgradeConfirm";
import WaitingToConnect from "../../components/WaitingToConnect/WaitingToConnect";
import Notification from "../../components/Notification/Notification";

const Shop = ({ playersData, info, confirmTransaction }) => {
  const products = [
    { header: "Attack", productImg: "potion-green", price: 300 },
    { header: "Defence", productImg: "potion-blue", price: 350 },
    { header: "Stamina", productImg: "potion-red", price: 600 },
    { header: "Armor", productImg: "potion-yellow", price: 500 },
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

  const {accounts, provider} = useWeb3React();

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

  const buyUpgrade = async () => {
    let desc
    const params = {
      to: info.contractJSON.address,
      from: accounts[0],
      value: "",
      data: "",
    };
    console.log(Number(choosenPlayer.player.name.split('#')[1]));
    switch (choosenUpgrade) {
      case 0:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseAttackCost))
        );
        params.data = info.contract.methods
          .increaseAttack(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
        desc = 'Increase Attack'
        break;
      case 1:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseAttackCost))
        );
        params.data = info.contract.methods
          .increaseDefense(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
          desc = 'Increase Defence'
        break;
      case 2:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseAttackCost))
        );
        params.data = info.contract.methods
          .increaseStamina(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
        desc = 'Increase Stamina'
        break;
      case 3:
        params.value = String(
          info.web3.utils.toHex(Number(mintInfo.increaseAttackCost))
        );
        params.data = info.contract.methods
          .increaseArmor(Number(choosenPlayer.player.name.split('#')[1]))
          .encodeABI();
        desc = 'Increase Attack'
        break;
      default:
        return;
    }
    confirmTransaction(params, desc)
  };

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
          buyUpgrade={buyUpgrade}
        />
      )}
    </div>
  );
};

export default Shop;
