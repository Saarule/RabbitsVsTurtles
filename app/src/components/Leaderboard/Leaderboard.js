import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllPlayers } from '../../features/playersSlice'

import './leaderboard.css'
import blueShield from '../../assets/pic/leaderboard-shield-blue.png'
import redShield from '../../assets/pic/leaderboard-shield-red.png'
import firsFrame from '../../assets/pic/leaderboard-first-frame.png'
import oneIcon from '../../assets/pic/leaderboard-one.png'
import exitIconWhite from '../../assets/pic/exit-icon-white.png'

const Leaderboard = ({setIsLeaderboard}) => {

    const [playersData, setPlayersData] = useState([])
    const players = useSelector(selectAllPlayers)

    useEffect(() => {
      let playersData = players.sort((a,b)=> b.player.kills - a.player.kills)
        setPlayersData(playersData)
    }, [players])
    
  return (
    <div className='leaderboard' onClick={e=>e.stopPropagation()}>
        {!playersData.length? <div className='loader-container' style={{height: '50%'}}><div className='loader'></div></div> :
        <>
        <div className='leaderboard-exit' onClick={()=>setIsLeaderboard(false)}><img alt='' src={exitIconWhite}/></div>
        <div className='leaderboard-first'>
            <div className='first-frame'><img alt='' src={firsFrame}/></div>
            <div className='first-image'><img alt='' src={playersData[0]?.image}/></div>
            <div className='first-one'><img alt='' src={oneIcon}/></div>
            <div className='first-desc'>{`${playersData[0].player.playerType} - #${playersData[0].id} with: ${playersData[0].player.kills} kills`}</div>
        </div>
        <div className='leaderboard-list'>
            {playersData.map((player, idx)=>{
                if(!idx) return
                return(
                    <div className='leaderboard-player' key={idx}>
                        <div className='leaderboard-place'>{idx+1}</div>
                        <div className='leaderboard-img'><img alt='' src={player.image}/></div>
                        <div className='leaderboard-desc'>{`${player.player.playerType} - #${player.id}`}</div>
                        <div className='leaderboard-kills'>{`with: ${player.player.kills} kills`}</div>
                        <div className='leaderboard-sheild'><img alt='' src={player.player.playerType === 'Turtle'? redShield : blueShield}/></div>
                    </div>
                )
            })}
        </div>
        </>}
    </div>
  )
}

export default Leaderboard