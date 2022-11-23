import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectAllInfo } from '../../features/infoSlice'
import { fetchPastEvents, selectAllPastEvents } from '../../features/pastEventsSlice'
import { selectAllPlayers, selectPlayerById } from '../../features/playersSlice'
import { store } from '../../features/store'

import './transactions.css'

const Transactions = ({isDarkMode}) => {
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

    const getIfPlayerIsOwned = (id) =>{
      // console.log(id);
      const player = players.filter(player=>player.id === id)
      // console.log(!!player.length);
      return !!player.length
    }

    const filterAccountEvent = () => {
      // let myTransaction = []
      // const filteredEvents = pastEvents.filter(event=>{
      //   switch (event.event) {
      //     case 'Transfer':
      //       if(event.returnValues.from === "0x0000000000000000000000000000000000000000"){
      //        if(getIfPlayerIsOwned(event.returnValues.from)) myTransaction.push({txt: `Player number #${event.returnValues.from} increased attack! 💪`})
      //       }else{

      //       }
      //       break;
      //     case 'Attacked':
              
      //         break;
      //     case 'AttackIncreased':
              
      //       const sssdf={txt: `Player number #${event.returnValues._playerId} increased attack! 💪`}
      //         break;
      //     case 'ArmorIncreased':
      //       const saaedf={txt: `Player number #${event.returnValues._playerId} increased armor! 🛡️`}
      //         break;
      //     case 'DefenseIncreased':
            
      //       const ssdfdf={txt: `Player number #${event.returnValues._playerId} increased defense! 🦾`}
      //         break;
      //     case 'StaminaIncreased':
              
      //       const ssdffdf={txt: `Player number #${event.returnValues._playerId} increased stamina! 🏋️‍♂️`}
      //         break;
      //     case 'Revived':
            
      //         const sdf={txt: `Player number #${event.returnValues._playerId} revived back into the game! 😍 😇`}
      //       break;
      //     default:
      //       break;
      //   }
      // })
    }
    
    console.log(pastEvents);
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
        <div className="event-back" onClick={()=>{}}>
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
        <div className="events-clear" >Clear All</div>
      </div>
      <div className="event-list">
        {/* {events.map((event, idx) => <div key={idx} className="event-details">{event.txt}</div>)} */}
      </div>
    </div>
  );
}

export default Transactions