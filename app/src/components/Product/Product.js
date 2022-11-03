import React from 'react'

import './product.css'
import plusBtn from '../../assets/pic/plus-btn.png'
import minusBtn from '../../assets/pic/minus-btn.png'
import productPriceFrame from '../../assets/pic/product-price-frame.png'
import maticSymbol from '../../assets/pic/matic-coint.png'
import btn from '../../assets/pic/mint-btn.png'

const Product = ({productImg = 'potion-green', price = 300, header='Attack'}) => {
  return (
    <div className='product'>
        <div className='product-plus-btn'><img alt='' src={plusBtn}/></div>
        <div className='product-minus-btn'><img alt='' src={minusBtn}/></div>
        <div className='product-header'>{header}</div>
        <div className='product-img'><img alt='' src={require(`../../assets/pic/${productImg}.png`)}/></div>
        <div className='product-price-container'>
            <img alt='' src={productPriceFrame}/>
            <div className='product-price'>
              <img alt='' src={maticSymbol}/>
              <div>{price}</div>
            </div>
        </div>
        <div className='product-buy-btn'>
            <img alt='' src={btn}/>
            <div>BUY</div>
        </div>
        <div></div>
    </div>
  )
}

export default Product