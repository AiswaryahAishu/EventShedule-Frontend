import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { createSession } from '../Api/Api';

const SessionForm = ({ onCreate}) => {
  const { id } = useParams(); // Get the eventId from the URL
  const [speaker, setSpeaker] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sessionData = {
      speaker,
      description,
      startTime,
      endTime,
      eventId:id
      
    };
    createSession(sessionData);

    try {
      await createSession(sessionData); // Pass eventId and sessionData
      alert('Session created successfully');
      setSpeaker('');
      setDescription('');
      setStartTime('');
      setEndTime('');
    } catch (error) {
      console.error('Error creating session:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Speaker</label>
        <input type="text" value={speaker} onChange={(e) => setSpeaker(e.target.value)} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <div>
        <label>Start Time:</label>
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </div>
      <div>
        <label>End Time:</label>
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </div>
      <button type="submit">Add Session</button>
    </form>
  );
};

export default SessionForm;
