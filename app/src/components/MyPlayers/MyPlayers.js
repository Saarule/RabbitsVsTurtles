import React, { useEffect, useState } from 'react'

import './my-players.css'
import filterTurtle from '../../assets/pic/filter-turtles.png'
import filterRabbit from '../../assets/pic/filter-rabbits.png'
import playerFrame from '../../assets/pic/my-player-frame.png'
// import rabbitFrame from '../../assets/pic/my-player-frame-blue.png'
import { useSelector } from 'react-redux'
import { selectAllPlayers } from '../../features/playersSlice'
import { useWeb3React } from '@web3-react/core'

const MyPlayers = () => {

    const [myPlayers, setMyPlayers] = useState([])
    const players = useSelector(selectAllPlayers)
    const {accounts} = useWeb3React()

    useEffect(()=>{
        const myPlayers = players.filter(player=>player.owner === accounts[0])
        setMyPlayers(myPlayers)
    },[players])
console.log(myPlayers);
  return (
    <div className='my-players' onClick={e=>e.stopPropagation()}>
        <div className='my-players-header'>
            <div className='my-fitler-turtle'><img alt='' src={filterTurtle}/></div>
            <div className='my-fitler-rabbit'><img alt='' src={filterRabbit}/></div>
            <select className='my-players-sort'>
                <option>Show by</option>
            </select>
        </div>
        <div className='my-players-list'>
            {myPlayers.map(player=>{
                return(
            <div className='my-player' key={player.id}>
                <div className='my-player-frame'><img alt='' src={playerFrame}/><img className='my-player-img' alt='' src={player.image}/></div>
                <div className='my-player-img'></div>
            </div>
                )
            })}
            {/* <div className='my-player'>
                <div className='my-player-frame'><img alt='' src={playerFrame}/><img className='my-player-img' alt='' src={players[0].image}/></div>
                <div className='my-player-img'></div>
            </div> */}
        </div>
    </div>
  )
}

export default MyPlayers