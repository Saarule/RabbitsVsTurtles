import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllInfo } from '../../features/infoSlice'
import { fetchPastEvents, selectAllPastEvents } from '../../features/pastEventsSlice'
import { selectAllPlayers, selectPlayerById } from '../../features/playersSlice'
import { store } from '../../features/store'

import './transactions.css'
import lighting from '../../assets/pic/lighting.png'
import borkenShield from '../../assets/pic/broke-armor.png'
import sword from '../../assets/pic/sword-right.png'
import heart from '../../assets/pic/heart.png'
import money from '../../assets/pic/money-block.png'
import greenV from '../../assets/pic/green-v.png'

const Transactions = ({isDarkMode, setIsTransaction}) => {
    const info = useSelector(selectAllInfo)
    const pastEvents = useSelector(selectAllPastEvents)
    const players = useSelector(selectAllPlayers)
    const {accounts} = useWeb3React()
   
    useEffect(()=>{
      if(!pastEvents.length) store.dispatch(fetchPastEvents(info))
    },[])

    useEffect(()=>{
      filterAccountEvent()
    },[pastEvents])

    const getIfPlayerIsOwned = (playerId) =>{
      const player = players.find(player=>player.id === playerId)
      return player.owner === accounts[0]
    }

    const getIcon = (eventName)=>{
      switch (eventName) {
        case 'Transfer':
            return lighting
        case 'Attacked':
            return sword
        case 'Defenced':
            return borkenShield
        case 'AttackIncreased':
         return money;
        case 'ArmorIncreased':
         return money
        case 'DefenseIncreased':
          return money
        case 'StaminaIncreased':
          return money
        case 'Revived':
          return heart
        default:
          break;
      }
    }

    const filterAccountEvent = () => {
      let myTransaction = []
      pastEvents.filter(event=>{
        switch (event.event) {
          case 'Transfer':
            if(event.returnValues.from === "0x0000000000000000000000000000000000000000"){
             if(event.returnValues.to === accounts[0]) myTransaction.push({action: 'Transfer', txt: `Mint player number #${event.returnValues.tokenId} 🥳`})
            }else{
              if(event.returnValues.to === accounts[0]) myTransaction.push({action: 'Transfer', txt: `You got player number #${event.returnValues.tokenId} from another user :)`})
              if(event.returnValues.from === accounts[0]) myTransaction.push({action: 'Transfer', txt: `You pass player number #${event.returnValues.tokenId} to another user :)`})
            }
            break;
          case 'Attacked':
              if(getIfPlayerIsOwned(event.returnValues._eaterId) && getIfPlayerIsOwned(event.returnValues._eatenId)){
                myTransaction.push({action: 'Attacked', txt: `Attacked yourself! player number #${event.returnValues._eatenId} with player number #${event.returnValues._eaterId} successfully`})
              }else{
              if(getIfPlayerIsOwned(event.returnValues._eaterId)) myTransaction.push({action: 'Attacked', txt: `Attacked player number #${event.returnValues._eatenId} with player number #${event.returnValues._eaterId} successfully`})
              if(getIfPlayerIsOwned(event.returnValues._eatenId)) myTransaction.push({action: 'Defenced', txt: `Player number #${event.returnValues._eatenId} attacked you with player number #${event.returnValues._eaterId}`})
              }
              break;
          case 'AttackIncreased':
            if(getIfPlayerIsOwned(event.returnValues._playerId)) myTransaction.push({action: 'AttackIncreased', txt: `Bought "Attack Potion" for player number #${event.returnValues._playerId}`})
              break;
          case 'ArmorIncreased':
            if(getIfPlayerIsOwned(event.returnValues._playerId)) myTransaction.push({action: 'ArmorIncreased', txt: `Bought "Armor Potion" for player number #${event.returnValues._playerId}`})
              break;
          case 'DefenseIncreased':
            if(getIfPlayerIsOwned(event.returnValues._playerId)) myTransaction.push({action: 'DefenseIncreased', txt: `Bought "Defence Potion" for player number #${event.returnValues._playerId}`})
              break;
          case 'StaminaIncreased':
            if(getIfPlayerIsOwned(event.returnValues._playerId)) myTransaction.push({action: 'StaminaIncreased', txt: `Bought "Stamina Potion" for player number #${event.returnValues._playerId}`})
              break;
          case 'Revived':
            if(getIfPlayerIsOwned(event.returnValues._playerId)) myTransaction.push({action: 'Revived', txt: `Revived player number #${event.returnValues._playerId} from the graveyard`})
            break;
          default:
            break;
        }
      })
      return myTransaction
    }
    
  return (
    <div className="transaction" onClick={(e)=>e.stopPropagation()} style={
      isDarkMode
        ? {
            background:
              "linear-gradient(225.23deg, #0F0C29 -3.27%, #0F0C29 -3.26%, #302B63 47.48%, #24243E 103.26%",
            color: "#ffffff",
          }
        : {}
    }>
      <div className="events-header">
        <div className="event-back" onClick={()=>setIsTransaction(false)}>
          <svg
            width="15"
            height="23"
            viewBox="0 0 15 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8621 20.7098L12.6646 22.7193L0.0629763 11.5856L12.4781 0.232271L14.7085 2.20294L4.49093 11.5467L14.8621 20.7098Z"
              fill={isDarkMode ? "white" : "black"}
            />
          </svg>
        </div>
        <div className="events-header-txt">Transactions</div>
        <div className="events-clear" ></div>
      </div>
      {pastEvents.length? <div className="transaction-event-list">
        {filterAccountEvent().map((event, idx) => {
        return(
        <div key={idx} className="transaction-event-details">
          <div className='transaction-event-symbol'><img alt='' src={getIcon(event.action)}/></div>
          <div className='transaction-event-txt'>{event.txt}</div>
          <div className='transaction-event-v'><img alt='' src={greenV}/></div>
        </div>
        )})}
      </div>:
      <div className='loader-container' style={{height: '30%'}}><div className='loader'/></div>}
    </div>
  );
}

export default Transactions