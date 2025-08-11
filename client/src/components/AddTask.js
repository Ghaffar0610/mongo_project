import React, { useState } from 'react';
import './AddTask.css';

const AddTask = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await onAddTask(title.trim());
      
      if (result.success) {
        setTitle('');
        // Task will be added to the list by the parent component
      } else {
        setError(result.error || 'Failed to add task');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setError('');
    onCancel();
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-form">
        <div className="form-header">
          <h3 className="form-title">➕ Add New Task</h3>
          <p className="form-subtitle">What would you like to accomplish today?</p>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="taskTitle" className="form-label">
            📝 Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            className="form-input"
            placeholder="Enter your task here..."
            disabled={isSubmitting}
            autoFocus
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !title.trim()}
          >
            {isSubmitting ? (
              <>
                <div className="spinner"></div>
                Adding Task...
              </>
            ) : (
              '🚀 Add Task'
            )}
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            ❌ Cancel
          </button>
        </div>

        <div className="form-tips">
          <div className="tip-item">
            <span className="tip-icon">💡</span>
            <span>Keep tasks specific and actionable</span>
          </div>
          <div className="tip-item">
            <span className="tip-icon">⏰</span>
            <span>Break large tasks into smaller ones</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
