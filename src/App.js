import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/dashboard" element={<TaskDashboard/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
