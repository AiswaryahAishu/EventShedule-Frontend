import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEvents } from "../Api/Api";

const SessionPage = ({ onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchData = async () => {
    let result = await fetchEvents();
    console.log(result);
    setData(result.data);
  };
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
              <button onClick={() => onDelete(event.id)}>Delete</button>
              <button onClick={() => navigate(`/Sessionform/${event._id}`)}>Create Session</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SessionPage;
