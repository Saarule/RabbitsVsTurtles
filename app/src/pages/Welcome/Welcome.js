import React from 'react'
import { useEffect, useState } from 'react';
import {useWeb3React} from "@web3-react/core";
import { getConnection } from '../../connectors/utils';
import {useNavigate} from 'react-router-dom'


import './welcome.css'
import connectWalletPic from '../../assets/pic/connect-wallet.png'
import playAsGuesePic from '../../assets/pic/play-as-guese.png'
import ConnectModal from '../../components/ConnectModal/ConnectModal'
import WaitingToConnect from '../../components/WaitingToConnect/WaitingToConnect'
import FailToConnect from '../../components/FailToConnect/FailToConnect'

const Welcome = ({}) => {

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

  useEffect(()=>{
    if(isActive) navigate('/map')
  },[isActive])


const connectToWallet = async (connectionName) => {
  setChosenConnection(connectionName)
  const connection = getConnection(connectionName);
  setActiveModal('WaitingToConnect')
  try{ 
    console.log(connection);
    await connection.connector.activate(137);
  } catch (err){
    console.log(err);
    setActiveModal('FailToConnect')
  }
};

  return (
    <div className='welcome'>
        {activeModal === 'welcome' && <div className='welcome-connect' onClick={()=>setActiveModal('connectModal')}>
          <div className='connect-header'>Play using your wallet</div>
          <div className='connect-context'>Connect your account to fully enjoy RABBITS VS. TURTLES!</div>
          <div className='connect-pic'><img alt='' src={connectWalletPic}/></div>
        </div>}
        {activeModal === 'welcome' && <div className='welcome-connect' onClick={()=>connectToWallet('Network')}>
          <div className='connect-header'>Play as guest</div>
          <div className='connect-context'>Your information will be locally stored and your experience limited.</div>
          <div className='connect-pic'><img alt='' src={playAsGuesePic}/></div>
        </div>}
        {activeModal === 'connectModal' && <ConnectModal setActiveModal={setActiveModal} setChosenConnection={setChosenConnection}/>}
        {activeModal === 'waitingToConnect' && <WaitingToConnect closeFunction={()=>setActiveModal('welcome')} header={'Waiting to connect'} subHeader={'Confirm this connection in your wallet'} footer={'By connecting a wallet, you agree to Mverse Terms of Service and acknowledge that you have read and understand the Mverse Protocol Disclaimer.'}/>}
        {activeModal === 'failToConnect' && <FailToConnect setActiveModal={setActiveModal} chosenConnection={chosenConnection}/>}
    </div>
  )
}

export default Welcome