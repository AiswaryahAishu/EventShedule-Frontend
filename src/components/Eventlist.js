import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../Api/Api";

const EventList = ({ onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let result = await fetchEvents();
    console.log(result);
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (id) => {
      onDelete(id);
      fetchData()
    };

  return (
    <table className="event-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Location</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>{event.date}</td>
            <td>{event.location}</td>
            <td>
              <button onClick={() => navigate(`/view/${event._id}`)}>view</button>
              <button onClick={() => handleDelete(event._id)}>Delete</button>
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventList;
