import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPlayers } from '../../features/playersSlice'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'

import './my-players.css'
import filterTurtle from '../../assets/pic/filter-turtles.png'
import filterRabbit from '../../assets/pic/filter-rabbits.png'
import playerFrame from '../../assets/pic/my-player-frame.png'
import filterAll from '../../assets/pic/filter-all-players.png'
import filterDead from '../../assets/pic/filter-dead-players.png'
import playerNameFrameRed from '../../assets/pic/player-name-frame-red.png'
import playerNameFrameBlue from '../../assets/pic/player-name-frame-blue.png'
import { playerUpdate } from '../../features/playerToShowSlice'


const MyPlayers = () => {

    const [myPlayers, setMyPlayers] = useState([])
    const [filter, setFilter] = useState('')
    const players = useSelector(selectAllPlayers)
    const {accounts} = useWeb3React()
    const dispath = useDispatch()

    useEffect(()=>{
        let myPlayers
        console.log(accounts, accounts && accounts[0]   );
        if(accounts && accounts[0]) myPlayers = players.filter(player=>player.owner === accounts[0])
        setMyPlayers(myPlayers)
    },[players])

    const filterPlayers = ()=>{
        if(filter === '') return myPlayers
        if(filter === 'dead'){
            return myPlayers.filter(player=>!player.player.alive)
        }
        return myPlayers.filter(player=>player.player.playerType === filter)
    }
    if(!accounts || !accounts[0]) return
  return (
    <div className='my-players' onClick={e=>e.stopPropagation()}>
        <div className='my-players-header'>
            <div onClick={()=>setFilter('Turtle')}><img alt='' src={filterTurtle}/></div>
            <div onClick={()=>setFilter('Rabbit')}><img alt='' src={filterRabbit}/></div>
            <div onClick={()=>setFilter('')}><img alt='' src={filterAll}/></div>
            <div onClick={()=>setFilter('dead')}><img alt='' src={filterDead}/></div>
        </div>
        <div className='my-players-list'>
            {filterPlayers().map(player=>{
                return(
            <div className='my-player' key={player.id} onClick={()=>dispath(playerUpdate(player))}>
                <div className='my-player-frame'>
                    <img alt='' src={playerFrame}/>
                    <img className='my-player-img' alt='' src={player.image}/>
                    <div className='my-player-name'>
                        <img alt='' src={player.player.playerType === 'Rabbit'? playerNameFrameBlue: playerNameFrameRed}/>
                        <div className='my-player-id'>{`#${player.id}`}</div>
                    </div>
                </div>
            </div>
                )
            })}
            <Link to='/mint' className='my-player'>
                <div className='my-player-frame'><img alt='' src={playerFrame}/><div className='empty-background'/></div>
                <div className='mint-new-player'>Tap to mint a new warrior</div>
            </Link>
        </div>
    </div>
  )
}

export default MyPlayers