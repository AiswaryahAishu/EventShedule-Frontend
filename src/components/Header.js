import React,{useEffect,useState} from 'react';
import './Header.css';

import axios from 'axios'; // Axios for making HTTP requests to the backend server

function Header() {
  const [events, setEvents] = useState([]); // State to store events data

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/event'); // Replace with your backend URL
        setEvents(response.data); // Set the events data
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents(); // Call fetchEvents function
  }, []); // Empty dependency array means it runs only once when the component mounts

  return (
    <header className="header">
      <h1>Event Scheduler</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#sessions">Sessions</a></li>
          <li><a href="#speakers">Speakers</a></li>
          <li><a href="#schedule">Schedule</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
