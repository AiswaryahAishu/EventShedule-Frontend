import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSessions } from "../Api/Api"; // Assuming this is a valid API call

const ViewSession = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]); // Initialize as an empty array
  const { eventId } = useParams(); // Extract eventId from the route params
  console.log(eventId);
  

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const result = await fetchSessions(eventId);
        console.log("Fetched sessions:", result);
        console.log('api response:',result.data);
        
        // Assuming result.sessions is already an array
        setSessions(result.data.sessions || []); // Fallback to an empty array if undefined
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };
    fetchSession();
  }, [eventId]); // Re-fetch if eventId changes

  if (!sessions || sessions.length === 0) {
    return <p>No sessions available.</p>;
  }

  return (
    <div className="container mt-5" style={{ textAlign: "left" }}>
      <h2 className="mb-4" style={{ fontWeight: "bold" }}>Sessions</h2>
      <div className="event-list">
        {sessions.map((session, index) => (
          <div
            key={session.id || index} // Ensure a unique key for React (fallback to index if no id)
            className="event-item mb-4 p-3 border rounded bg-light"
            style={{ textAlign: "left" }}
          >
            <h3>{session.speaker || "Unknown Speaker"}</h3> {/* Handle undefined */}
            <p><strong>Description:</strong> {session.description || "No description available"}</p>
            <p><strong>Start Time:</strong> {session.startTime ? new Date(session.startTime).toLocaleString() : "N/A"}</p>
            <p><strong>End Time:</strong> {session.endTime ? new Date(session.endTime).toLocaleString() : "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSession;
