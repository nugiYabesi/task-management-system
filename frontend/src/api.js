// api.js — small wrapper around the backend REST API
import axios from "axios";

const API_BASE = "http://localhost:5000";

export const getTasks = (status) =>
  axios
    .get(`${API_BASE}/tasks`, { params: status ? { status } : {} })
    .then((res) => res.data);

export const createTask = (task) =>
  axios.post(`${API_BASE}/tasks`, task).then((res) => res.data);

export const updateTask = (id, task) =>
  axios.put(`${API_BASE}/tasks/${id}`, task).then((res) => res.data);

export const deleteTask = (id) => axios.delete(`${API_BASE}/tasks/${id}`);
