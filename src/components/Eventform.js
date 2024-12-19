import React, { useState, useEffect } from "react";
import { createEvent } from "../Api/Api";

const EventForm = ({ onAdd, onEdit, selectedEvent }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description || "");
      setDate(selectedEvent.date);
      setLocation(selectedEvent.location);
    } else {
      resetForm();
    }
  }, [selectedEvent]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = { title, description, date, location };
    createEvent(eventData);

    if (selectedEvent) {
      onEdit(eventData); // Edit existing event
    } else {
      onAdd(eventData); // Add new event
    }

    resetForm();
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
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
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
      <button type="submit">{selectedEvent ? "Update Event" : "Add Event"}</button>
      <button type="button" onClick={resetForm}>
        Cancel
      </button>
    </form>
  );
};

export default EventForm;
