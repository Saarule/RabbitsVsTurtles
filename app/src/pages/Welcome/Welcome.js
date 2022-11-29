import React from 'react'
import { useEffect, useState } from 'react';
import {useWeb3React} from "@web3-react/core";
import { getConnection } from '../../connectors/utils';
import {useNavigate} from 'react-router-dom'


import './welcome.css'
import connectWalletPic from '../../assets/pic/connect-wallet.png'
import playAsGuesePic from '../../assets/pic/play-as-guese.png'
import headerImg from '../../assets/pic/welcome-header.png'
import discordIcon from '../../assets/pic/discord-icon.png'
import muteIcon from '../../assets/pic/sound-mute.png'
import unmuteIcon from '../../assets/pic/sound-unmute.png'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import WaitingToConnect from '../../components/WaitingToConnect/WaitingToConnect'
import FailToConnect from '../../components/FailToConnect/FailToConnect'
import { Connect } from '../../services/connect.wallet.service';

const Welcome = ({isAudio, setIsAudio}) => {

  const [activeModal, setActiveModal] = useState('welcome')
  const [chosenConnection, setChosenConnection] = useState('')
  const {
    chainId,
    accounts,
    isActivating,
    isActive,
    provider,
    ENSNames,
    connector
  } = useWeb3React();
  let navigate = useNavigate();
  const audio = new Audio(require('../../assets/music/Fallen Leaves - Openning.mp3'))
  audio.loop = true

  useEffect(()=>{
    if(accounts && accounts[0]) navigate('/map')
  },[accounts])

  useEffect(()=>{
    if(isAudio) audio.play()
    else{
      audio.pause()
      audio.currentTime = 0;
    }
    return ()=>{
      audio.pause()
      audio.currentTime = 0;
    }
  },[isAudio])


const connectToWallet = async (connectionName) => {
  setChosenConnection(connectionName)
  setActiveModal('WaitingToConnect')
  const res = await Connect(connectionName)
  if(res) setActiveModal('FailToConnect')
  // const connection = getConnection(connectionName);
  // try{ 
  //   console.log(connection);
  //   await connection.connector.activate(137);
  // } catch (err){
  //   console.log(err);
  //   setActiveModal('FailToConnect')
  // }
};

  return (
    <div className='welcome'>
        <div className='welcome-header'><img alt='' src={headerImg}/></div>
        <a href={`https://discord.gg/FGwhMDAv3s`} target="_blank" className='welcome-discord'><img alt='' src={discordIcon}/>   JOIN OUR DISCORD</a>
        <div className='welcome-mute' onClick={()=>setIsAudio(!isAudio)}><img alt='' src={!isAudio? muteIcon : unmuteIcon}/></div>
        {activeModal === 'welcome' && <div className='welcome-connect-container'>
          <div className='welcome-connect' onClick={()=>setActiveModal('connectModal')}>
            <div className='connect-header'>Play using your wallet</div>
            <div className='connect-context'>Connect your account to fully enjoy RABBITS VS. TURTLES!</div>
            <div className='connect-pic'><img alt='' src={connectWalletPic}/></div>
            <div className='connect-btn glow-on-hover'>Connect with wallet</div>
          </div>
        </div>}
        {activeModal === 'welcome' && <div className='welcome-connect-container'>
          <div className='welcome-connect' onClick={()=>navigate('/map')}>
            <div className='connect-header'>Play as guest</div>
            <div className='connect-context'>Your information will be locally stored and your experience limited.</div>
            <div className='connect-pic'><img alt='' src={playAsGuesePic}/></div>
            <div className='connect-btn glow-on-hover'>Continue as guest</div>
          </div>
        </div>}
        {activeModal === 'connectModal' && <ConnectModal setActiveModal={setActiveModal} setChosenConnection={setChosenConnection}/>}
        {activeModal === 'waitingToConnect' && <WaitingToConnect closeFunction={()=>setActiveModal('welcome')} header={'Waiting to connect'} subHeader={'Confirm this connection in your wallet'} footer={'By connecting a wallet, you agree to RVT Terms of Service and acknowledge that you have read and understand the RVT Protocol Disclaimer.'}/>}
        {activeModal === 'failToConnect' && <FailToConnect setActiveModal={setActiveModal} chosenConnection={chosenConnection}/>}
    </div>
  )
}

export default Welcome