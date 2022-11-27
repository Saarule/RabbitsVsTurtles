import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllEvents } from "../../features/eventsSlice";
import { addEvent } from "../../features/eventsSlice";

import "./events.css";
import notificationIcon from "../../assets/pic/notification-icon.png";
import notificationMuteIcon from "../../assets/pic/notification-mute-icon.png";

const Events = ({setIsEvents, isDarkMode, isNotification, setIsNotification}) => {
    const dispatch = useDispatch()
    const events = useSelector(selectAllEvents)
    console.log(events);

    const addNewEvent = ()=>{
        dispatch(addEvent({txt: `Player number #345 attacked player number #345 ! 🤯 Player number #345 attacked player number #345 ! 🤯 `}))
    }

    const getTimeformat = (time) =>{
      let timeSplit = new Date(time).toString().split(' ')
      if(Number(timeSplit[2]) === new Date(time).getDate()){
        return `Today at ${tConvert(timeSplit[4])}`
      }else{
        return `${time[2] + time[1]}`
      }
    }

    function tConvert (time) {
      console.log(time);
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      if (time.length > 1) {
        time = time.slice(1,4);
        console.log(time);
        time[5] = +time[0] < 12 ? 'AM' : 'PM';
        time[0] = +time[0] % 12 || 12;
      }
      return time.join (''); // return adjusted time or original string
    }
    
  return (
    <div className="events" onClick={(e)=>e.stopPropagation()} style={
      isDarkMode
        ? {
            background:
              "linear-gradient(225.23deg, #0F0C29 -3.27%, #0F0C29 -3.26%, #302B63 47.48%, #24243E 103.26%",
            color: "#ffffff",
          }
        : {}
    }>
      <div className="events-header">
        <div className="event-back" onClick={()=>setIsEvents(false)}>
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
        <div className="events-header-txt" onClick={addNewEvent}>Last Events</div>
        <div className="events-clear" onClick={()=>setIsNotification(!isNotification)}>
          <img alt="" src={isNotification? notificationIcon : notificationMuteIcon}/>
        </div>
      </div>
      <div className="event-list">
        {events.map((event, idx) =>{
          return (
          <div className="event-container">
          <div className="event-time">{getTimeformat(event.time)}</div>
          <div key={idx} className="event-detail">{event.txt}</div>
          </div>
          )}

        )} 
      </div>
    </div>
  );
};

export default Events;
