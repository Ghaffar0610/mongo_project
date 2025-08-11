const Task = require('../models/Task');

// Get all tasks for a user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

// Add a new task
const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const newTask = await Task.create({ 
      title: title.trim(), 
      userId: req.user.id 
    });
    
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    const updateData = {};
    if (title !== undefined) {
      if (title.trim().length === 0) {
        return res.status(400).json({ error: 'Task title cannot be empty' });
      }
      updateData.title = title.trim();
    }
    if (completed !== undefined) {
      updateData.completed = completed;
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error('Error updating task:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    res.status(500).json({ error: 'Failed to update task' });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Task ID is required' });
    }

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid task ID' });
    }
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
