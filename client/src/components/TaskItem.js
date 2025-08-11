import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, onUpdate, onDelete, onToggleStatus, animationDelay = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) return;
    
    setIsUpdating(true);
    const result = await onUpdate(task._id, { title: editTitle.trim() });
    
    if (result.success) {
      setIsEditing(false);
    }
    setIsUpdating(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(task.title);
  };

  const handleToggleStatus = async () => {
    await onToggleStatus(task._id, task.status);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await onDelete(task._id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Today';
    } else if (diffDays === 2) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays - 1} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div 
      className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
    >
      {/* Task Status Toggle */}
      <div className="task-status-toggle">
        <button
          onClick={handleToggleStatus}
          className={`status-toggle-btn ${task.status === 'completed' ? 'completed' : ''}`}
          title={task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'}
        >
          {task.status === 'completed' ? '✅' : '⭕'}
        </button>
      </div>

      {/* Task Content */}
      <div className="task-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="edit-input"
              placeholder="Enter task title..."
              autoFocus
            />
            <div className="edit-actions">
              <button
                onClick={handleSave}
                className="btn btn-success btn-sm"
                disabled={isUpdating}
              >
                {isUpdating ? '💾' : '💾 Save'}
              </button>
              <button
                onClick={handleCancel}
                className="btn btn-secondary btn-sm"
                disabled={isUpdating}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="task-info">
              <h3 className="task-title">{task.title}</h3>
              <div className="task-meta">
                <span className="task-date">
                  📅 {formatDate(task.createdAt)}
                </span>
                <span className={`task-status ${task.status}`}>
                  {task.status === 'completed' ? '✅ Completed' : '⏳ Pending'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Task Actions */}
      {!isEditing && (
        <div className="task-actions">
          <button
            onClick={handleEdit}
            className="btn btn-secondary btn-sm"
            title="Edit task"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger btn-sm"
            title="Delete task"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
