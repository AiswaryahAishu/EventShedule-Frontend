import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { fetchEventById } from '../Api/Api'


const View = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const {id}=useParams()
  
    useEffect(() => {
      const fetchData = async () => {
        let result = await fetchEventById(id);
        console.log(result);
        
        setData([result.data]);
      };
      fetchData();
    }, []);
  return (
    <div className='container mt-5' style={{ textAlign: 'left' }}>
            <h2 className='mb-4' style={{ fontWeight: 'bold' }}>Events</h2>
            <div className='event-list'>
                {data.map((event) => (
                    <div className='event-item mb-4 p-3 border rounded bg-light' style={{ textAlign: 'left' }}>
                        <h3>{event.title}</h3>
                        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                        <p><strong>Location:</strong> {event.location}</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default View
