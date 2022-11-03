import React from "react";

import "./shop.css";
import Introduction from "../../components/Introduction/Introduction";
import Product from "../../components/Product/Product";
import magition from '../../assets/pic/magition.png'

const Shop = () => {
  const products = [
    { header: "Attack", productImg: "potion-green", price: 300 },
    { header: "Defence", productImg: "potion-blue", price: 350 },
    { header: "Stamina", productImg: "potion-red", price: 600 },
    { header: "Armor", productImg: "potion-yellow", price: 500 },
  ];
  const character = {url: 'magition', top: '-2%', left: '86%'}
  return (
    <div className="shop">
      {/* <Introduction
        header={"STORE"}
        btnTxt={`LET'T GO`}
        txt={
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id ut rutrum metus neque enim, maecenas. Nibh nulla urna iaculis phasellus. Sed non in accumsan, nulla id. Vitae pharetra hendrerit id volutpat mi vitae nibh."
        }
      /> */}
      <div className="products-frame">
        <div className="character" style={{top: character.top, left: character.left}}>
          <img alt="" src={require(`../../assets/pic/${character.url}.png`)}/>
        </div>
        <div className="shop-frame-header">STORE</div>
        <div className="product-list">
        {products.map((product)=>{
          return <Product header={product.header} productImg={product.productImg} price={product.price}/>
        })}
        </div>
      </div>
    </div>
  );
};

export default Shop;
