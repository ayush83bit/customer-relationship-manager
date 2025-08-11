// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // assuming token is stored in localStorage after login
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Leads API
export const getLeads = () => api.get('/leads').then(res => res.data);
export const getLeadById = (id) => api.get(`/leads/${id}`).then(res => res.data);
export const createLead = (lead) => api.post('/leads', lead).then(res => res.data);
export const updateLead = (id, lead) => api.put(`/leads/${id}`, lead).then(res => res.data);
export const deleteLead = (id) => api.delete(`/leads/${id}`).then(res => res.data);

// Tickets API
export const getTickets = () => api.get('/api/tickets/all').then(res => res.data);
export const raiseTicket = (leadId, subject, description) =>
  api.post('/api/tickets/raise', { leadId, subject, description }).then(res => res.data);
export const assignTicket = (ticketId, departmentId) =>
  api.post('/api/tickets/assign', { ticketId, departmentId }).then(res => res.data);
export const resolveTicket = (ticketId) =>
  api.post('/api/tickets/resolve', { ticketId }).then(res => res.data);

// Departments API
export const getDepartments = () => api.get('/departments').then(res => res.data);

export default api;