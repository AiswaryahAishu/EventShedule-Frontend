import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { fetchAllSessions } from '../Api/Api';


const SessionList = ({onDelete}) => {
  // const { id} = useParams(); // Get the eventId from the URL
const [sessions, setSessions] = useState([]);
 const navigate = useNavigate();
    
      
    
    useEffect(() => {
      fetchAllSessions()
      .then((response)=>{
        console.log(response);
        setSessions(response.data)
      })
      .catch((error) => {
        console.error(error);
      }); // Fetch data when the component mounts
    }, []); // Fetch data when the component mounts

    const handleDelete = async (id) => {
      onDelete(id);
     
    };


  console.log(sessions);
  

  return (
    <div>
      <h2>Sessions for Event</h2>
      <table className='event-list'>
        <thead>
          <tr>
            <th>Speaker</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td>{session.speaker}</td>
              <td>{session.description}</td>
              <td>{new Date(session.startTime).toLocaleString()}</td>
              <td>{new Date(session.endTime).toLocaleString()}</td>
              <td>
              <button onClick={() => navigate(`/viewSession/${session._id}`)}>view</button>
              <button onClick={() => handleDelete(session.id)}>Delete</button>
             
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SessionList;
