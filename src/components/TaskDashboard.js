import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');


  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setToken(userToken)
    fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
        params: {
          userId: token, // Filter tasks based on the user's token
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response);
        setTasks(response.data);
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  

  const createTask = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify({
          userId: token, 
          id: tasks.length + 1,
          title: newTaskTitle,
          completed: false,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setTasks([...tasks, data]);
        setNewTaskTitle(''); 
      } else {
        throw new Error('Failed to create task');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <h2>Task Dashboard</h2>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
        />
        <button onClick={createTask}>Create Task</button>
      </div>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;