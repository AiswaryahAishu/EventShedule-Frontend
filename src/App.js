import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Eventlist from "./components/Eventlist";
import Eventform from "./components/Eventform";
import Sessionform from "./components/Sessionform";
import Sessionlist from "./components/Sessionlist";
import View from "./components/View";
import ViewSession from "./components/viewSession";
import Header from "./components/Header";
import "./App.css";
import SessionPage from "./components/SessionPage";
import { deleteEvent, fetchEvents } from "./Api/Api";


function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);


  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    setSelectedEvent(null);
  };

  const handleDeleteEvent = async (id) => {
    deleteEvent(id);
    await fetchEvents()
  };

  const handleAddSession = (newSession) => {
    setSessions([...sessions, { id: Date.now(), ...newSession }]);
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="sidebar">
          <h1>Event Scheduler</h1>
          <ul>
            <li>
              <Link to="/create-event">Create Event</Link>
            </li>
            <li>
              <Link to="/view-events">View Events</Link>
            </li>
            <li>
              <Link to="/create-session/:id">Create Session</Link>
            </li>
            
            <li>
              <Link to="/view-session">View Session</Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Routes>
            <Route
              path="/create-event"
              element={
                <Eventform
                  onAdd={handleAddEvent}
                  onEdit={handleEditEvent}
                  selectedEvent={selectedEvent}
                />
              }
            />
            <Route
              path="/view-events"
              element={
                <Eventlist
                  events={events}
                  onDelete={handleDeleteEvent}
                  onEdit={handleEditEvent}
                />
              }
            />
            <Route
            path="/create-session/:id"
            element={
              <SessionPage/>
            }
            />
             <Route
              path="/sessionform/:id"
              element={
                <Sessionform
                  onCreate={handleAddSession}
                />
              }
            /> 
            
            <Route
              path="/view-session"
              element={
                <Sessionlist
                session={sessions}
                  onEdit={handleEditEvent}
                />
              }
            />
            <Route
              path="/view/:id"
              element={
                <View />
              }
            />
            <Route
              path="/viewSession/:eventid"
              element={
                <ViewSession />
              }
            />
            <Route
              path="/"
              element={
                <div>
                  <h2>Welcome to the Event Scheduler App!</h2>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
