import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // Backend base URL

// Functions to communicate with the backend
export const fetchEvents = () => API.get('/event'); // Get all events
export const createEvent = (eventData) => API.post('/event', eventData); // Add an event
export const fetchEventById=(id)=> API.get(`/event/${id}`); //
export const deleteEvent=(id)=> API.delete(`/event/${id}`);

// Session APIs
export const fetchSessions = (eventId) => API.get(`/sessions/${eventId}`); // Get sessions for a specific event
export const createSession = ( sessionData) => API.post(`/sessions`, sessionData); // Create a session for a specific event

// get all sessions
export const fetchAllSessions = () => API.get('/sessions/allsession'); // Get all sessions



