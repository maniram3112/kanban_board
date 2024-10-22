import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './Components/KanbanBoard';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching tickets', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedGroupBy = localStorage.getItem('groupBy');
    const savedSortBy = localStorage.getItem('sortBy');
    if (savedGroupBy) setGroupBy(savedGroupBy);
    if (savedSortBy) setSortBy(savedSortBy);
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  return (
    <div className="app-container">
      <div className="controls">
        <div className="dropdown">
          <button className="dropdown-toggle">Group By</button>
          <div className="dropdown-menu">
            <button onClick={() => setGroupBy('status')}>Status</button>
            <button onClick={() => setGroupBy('user')}>User</button>
            <button onClick={() => setGroupBy('priority')}>Priority</button>
          </div>
        </div>

        <div className="dropdown">
          <button className="dropdown-toggle">Sort By</button>
          <div className="dropdown-menu">
            <button onClick={() => setSortBy('priority')}>Priority</button>
            <button onClick={() => setSortBy('title')}>Title</button>
          </div>
        </div>
      </div>

      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
