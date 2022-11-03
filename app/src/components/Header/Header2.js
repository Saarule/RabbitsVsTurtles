import React from 'react'

import './header2.css'
import lighting from '../../assets/pic/btn-lighting.png'
import heart from '../../assets/pic/btn-heart.png'
import swords from '../../assets/pic/btn-swords.png'
import flags from '../../assets/pic/btn-flags.png'
import logo from '../../assets/pic/game-logo.png'
import account from '../../assets/pic/header-account.png'

const Header = ({setActivePage}) => {
  return (
    <div className='header'>
        <div className='header-links'>
            <img alt='' src={lighting} onClick={()=>setActivePage('mint')}/>
            <img alt='' src={heart} onClick={()=>setActivePage('shop')}/>
            <img alt='' src={swords} onClick={()=>setActivePage('map')}/>
            <img alt='' src={flags}/>
        </div>
        <div className='header-logo'><img alt='' src={logo} style={{height: '100%'}}/></div>
        <div className='header-account'>
            <img alt='' src={account}/>
        </div>
        <div></div>
    </div>
  )
}

export default Header