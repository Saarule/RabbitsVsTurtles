import React from 'react'

import './product.css'
import plusBtn from '../../assets/pic/plus-btn.png'
import minusBtn from '../../assets/pic/minus-btn.png'
import productPriceFrame from '../../assets/pic/product-price-frame.png'
import maticSymbol from '../../assets/pic/matic-coint.png'
import btn from '../../assets/pic/mint-btn.png'
import MainBtn from '../MainBtn/MainBtn'

const Product = ({productImg, price = null, header, func, btnTxt, height}) => {
  return (
    <div className='product' style={{height}}>
        {/* <div className='product-plus-btn'><img alt='' src={plusBtn}/></div> */}
        {/* <div className='product-minus-btn'><img alt='' src={minusBtn}/></div> */}
        <div className='product-header'>{header}</div>
        <div className='product-img'><img alt='' src={require(`../../assets/pic/${productImg}.png`)}/></div>
        {price && <div className='product-price-container'>
            <img alt='' src={productPriceFrame}/>
            <div className='product-price'>
              <img alt='' src={maticSymbol}/>
              <div>{price}</div>
            </div>
        </div>}
        <div className='product-buy-btn' onClick={func}>
            <img alt='' src={btn}/>
            <div>{btnTxt}</div>
        </div>
        <div></div>
    </div>
  )
}

export default Product