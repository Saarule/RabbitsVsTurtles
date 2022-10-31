import React from "react";

import './shop.css'
import Introduction from "../../components/Introduction/Introduction";

const Shop = () => {
  return (
    <div className="shop">
        <Introduction/>
      <div className="shop-frame">
        <div className="frame-title">
          <div></div>
          <div></div>
        </div>
        <div className="frame-txt"></div>
        <div className="frame-btn"></div>
        <div></div>
      </div>
    </div>
  );
};

export default Shop;
