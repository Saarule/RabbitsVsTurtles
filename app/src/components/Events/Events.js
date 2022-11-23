import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllEvents } from "../../features/eventsSlice";
import { addEvent } from "../../features/eventsSlice";

import "./events.css";

const Events = ({setIsEvents, isDarkMode}) => {
    const dispatch = useDispatch()
    const events = useSelector(selectAllEvents)
    console.log(events);

    const addNewEvent = ()=>{
        dispatch(addEvent({txt: `Player number #345 attacked player number #345 ! 🤯 Player number #345 attacked player number #345 ! 🤯 `}))
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
        <div className="events-header-txt">Last Events</div>
        <div className="events-clear" onClick={addNewEvent}>Clear All</div>
      </div>
      <div className="event-list">
        {events.map((event, idx) => <div key={idx} className="event-details">{event.txt}</div>)}
      </div>
    </div>
  );
};

export default Events;
