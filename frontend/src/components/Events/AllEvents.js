import axios from "axios";
import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom"
const AllEvents = () => {
  const [allEvents,setAllEvents]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3002/events").then((res)=>{
      setAllEvents(res.data)
      
    })
    .catch(error => console.error("Error fetching events:", error));
  },[])
  return(
       <div>
       <h2>Upcoming Events</h2>
       <Link to = {`/events/new`}>Create New Event</Link>
       <ul>
           {allEvents.map(event => (
               <li key={event._id}>
                 <Link to={`/events/${event._id}`}>
                   <h3>{event.title}</h3>
                  </Link>
                   <p>{event.description}</p>
                   <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                   <p><strong>Location:</strong> {event.location}</p>
               </li>
           ))}
       </ul>
       </div>
  )
}

export default AllEvents;