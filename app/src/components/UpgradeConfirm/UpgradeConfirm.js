import React from 'react'

import './upgrade-confirm.css'
import Product from '../Product/Product'
import Player from '../Player/Player'
import MainBtn from '../../components/MainBtn/MainBtn'

const UpgradeConfirm = ({player, product, setActiveStage, buyUpgrade}) => {
  return (
    <div className='upgrade-confirm'>
        <div className='shop-frame-header'>STORE</div>
        <div className='upgrade-frame'>
          <div className='upgrade-product'>
            <div>Your choose to give</div>
            <div className='bold-txt'>{`“${product.header}”`}</div>
          </div>
          <div className='upgrade-poduct-img'><img alt='' src={require(`../../assets/pic/${product.productImg}.png`)}/></div>
          <div className='upgrade-plarer'>To <span className='bold-txt'>{`player number #${player.player.name.split('#')[1]}`}</span></div>
          <div className='upgrade-player-image'><img alt='' src={player.image}/></div>
          <div className='buy-btn'><MainBtn txt='Buy' func={buyUpgrade}/></div>
        </div>
    </div>
  )
}

{/* <div className='upgrade-txt'>
  <div>You choose give</div>
  <div>{product.header}</div>
  <div>{`To player number #${player.player.name.split('#')[1]}`}</div>
</div>
<div className='confirm-btn' onClick={buyUpgrade}><img alt='' src={btn}/><div>Buy</div></div> */}
export default UpgradeConfirm