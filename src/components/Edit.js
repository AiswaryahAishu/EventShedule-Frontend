import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = ({ events, onEdit }) => {
  // const {id} = useParams(); // Get the event ID from the URL
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("")
  const [location, setLocation] = useState("");

  // Fetch the event details based on the ID
  // useEffect(() => {
  //   const eventToEdit = events.find((event) => event.id === parseInt(id));
  //   if (eventToEdit) {
  //     setTitle(eventToEdit.title);
  //     setDate(eventToEdit.date);
  //     setLocation(eventToEdit.location);
  //   }
  // }, [id, events]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedEvent = { title, date,description, location };
    onEdit(updatedEvent); // Call the onEdit function passed as a prop
    navigate("/view-events"); // Redirect to the event list
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Changes</button>
      <button type="button" onClick={() => navigate("/view-events")}>
        Cancel
      </button>
    </form>
  );
};

export default Edit;
