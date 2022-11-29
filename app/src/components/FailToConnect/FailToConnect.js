import React, { useEffect } from 'react'
import { getConnection } from '../../connectors/utils'

import './fail-to-connect.css'
import exitIcon from '../../assets/pic/exit-icon.png'
// import goBack from '../../assets/pic/akar-icons-arrow-right.png'
import errorIcon from '../../assets/pic/error-icon.png'
import { Connect } from '../../services/connect.wallet.service'

const FailToConnect = ({setActiveModal,chosenConnection}) => {

  const connectToWallet = async () => {
    setActiveModal('waitingToConnect')
    const res = await Connect(chosenConnection)
    if(res) setActiveModal('failToConnect')
    // try{ 
    //   await connection.connector.connectEagerly(137)
    //   await connection.connector.activate(137);
    // } catch (err){
    //   console.log(err);
    //   try{
    //     await connection.connector.activate(137);
    //     console.log('hi');
    //   } catch(err){
    //     console.log(err);
        
    //   }
    // }
  };

  return (
    <div className='fail-connect'>
        <div className='fail-connect-exit' onClick={()=>setActiveModal('welcome')}><img alt='' src={exitIcon}/></div>
        {/* <div className='fail-connect-go-back'><img alt='' src={goBack}/></div> */}
        <div><img alt='' src={errorIcon}/></div>
        <div className='fail-connect-header'>Error connecting</div>
        <div className='fail-connect-text'>The connection attempt failed. Please click try again and follow the steps to connect in your wallet.</div>
        <div className='fail-connect-btn' onClick={connectToWallet}>Try Again</div>
        <div className='fail-connect-footer' onClick={()=>setActiveModal('connectModal')}>Back to wallet selection</div>
    </div>
  )
}

export default FailToConnect