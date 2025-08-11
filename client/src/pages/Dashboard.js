import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import TaskItem from '../components/TaskItem';
import AddTask from '../components/AddTask';
import './Dashboard.css';

const Dashboard = () => {
  const { user, token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setError('');
      } else {
        setError('Failed to fetch tasks');
      }
    } catch (error) {
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks(prev => [newTask, ...prev]);
        setShowAddTask(false);
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(prev => prev.map(task => 
          task._id === id ? updatedTask : task
        ));
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setTasks(prev => prev.filter(task => task._id !== id));
        return { success: true };
      } else {
        const error = await response.json();
        return { success: false, error: error.error };
      }
    } catch (error) {
      return { success: false, error: 'Network error occurred' };
    }
  };

  const toggleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    const result = await updateTask(id, { status: newStatus });
    return result;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, completionRate };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header fade-in">
        <h1 className="dashboard-title">Welcome back, {user?.username}! 👋</h1>
        <p className="dashboard-subtitle">Manage your tasks and stay productive</p>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-stats fade-in">
        <div className="stat-card hover-lift">
          <div className="stat-icon">📊</div>
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        
        <div className="stat-card hover-lift">
          <div className="stat-icon">✅</div>
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        
        <div className="stat-card hover-lift">
          <div className="stat-icon">⏳</div>
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        
        <div className="stat-card hover-lift">
          <div className="stat-icon">🎯</div>
          <div className="stat-number">{stats.completionRate}%</div>
          <div className="stat-label">Completion Rate</div>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="task-section slide-in">
        <div className="section-header">
          <h2 className="section-title">
            📝 Task Management
          </h2>
          <button 
            onClick={() => setShowAddTask(!showAddTask)}
            className="btn btn-primary"
          >
            {showAddTask ? '❌ Cancel' : '➕ Add New Task'}
          </button>
        </div>

        {/* Add Task Form */}
        {showAddTask && (
          <AddTask 
            onAddTask={addTask}
            onCancel={() => setShowAddTask(false)}
          />
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button 
              onClick={fetchTasks}
              className="btn btn-secondary btn-sm"
            >
              Retry
            </button>
          </div>
        )}

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No tasks yet!</h3>
              <p>Start by adding your first task to get organized.</p>
              <button 
                onClick={() => setShowAddTask(true)}
                className="btn btn-primary"
              >
                ➕ Add Your First Task
              </button>
            </div>
          ) : (
            tasks.map((task, index) => (
              <TaskItem
                key={task._id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggleStatus={toggleTaskStatus}
                animationDelay={index * 0.1}
              />
            ))
          )}
        </div>

        {/* Quick Actions */}
        {tasks.length > 0 && (
          <div className="quick-actions">
            <button 
              onClick={() => {
                const allCompleted = tasks.every(task => task.status === 'completed');
                const newStatus = allCompleted ? 'pending' : 'completed';
                tasks.forEach(task => {
                  if (task.status !== newStatus) {
                    updateTask(task._id, { status: newStatus });
                  }
                });
              }}
              className="btn btn-secondary"
            >
              {tasks.every(task => task.status === 'completed') 
                ? '🔄 Mark All Pending' 
                : '✅ Mark All Complete'
              }
            </button>
            
            <button 
              onClick={() => {
                if (window.confirm('Are you sure you want to delete all tasks?')) {
                  tasks.forEach(task => deleteTask(task._id));
                }
              }}
              className="btn btn-danger"
            >
              🗑️ Clear All Tasks
            </button>
          </div>
        )}
      </div>

      {/* Productivity Tips */}
      <div className="tips-section slide-in">
        <h3 className="tips-title">💡 Productivity Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">🎯</span>
            <h4>Set Clear Goals</h4>
            <p>Break down large tasks into smaller, manageable steps</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">⏰</span>
            <h4>Time Management</h4>
            <p>Use the Pomodoro technique: 25 minutes focused work, 5 minutes break</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📱</span>
            <h4>Stay Organized</h4>
            <p>Keep your task list clean and prioritize what's most important</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
