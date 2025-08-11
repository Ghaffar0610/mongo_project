// Simple test script to verify backend functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'password123'
};

let authToken = '';
let taskId = '';

// Test functions
const testServer = async () => {
  try {
    console.log('🧪 Testing Task Manager Backend...\n');
    
    // Test 1: Check if server is running
    console.log('1️⃣ Testing server connection...');
    const response = await axios.get('http://localhost:5000/');
    console.log('✅ Server is running:', response.data.message);
    
    // Test 2: User registration
    console.log('\n2️⃣ Testing user registration...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, testUser);
    console.log('✅ User registered:', registerResponse.data.message);
    authToken = registerResponse.data.token;
    
    // Test 3: User login
    console.log('\n3️⃣ Testing user login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ User logged in:', loginResponse.data.message);
    authToken = loginResponse.data.token;
    
    // Test 4: Create task
    console.log('\n4️⃣ Testing task creation...');
    const createTaskResponse = await axios.post(`${BASE_URL}/tasks`, {
      title: 'Test task from backend test'
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Task created:', createTaskResponse.data.title);
    taskId = createTaskResponse.data._id;
    
    // Test 5: Get tasks
    console.log('\n5️⃣ Testing get tasks...');
    const getTasksResponse = await axios.get(`${BASE_URL}/tasks`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Tasks retrieved:', getTasksResponse.data.length, 'tasks found');
    
    // Test 6: Update task
    console.log('\n6️⃣ Testing task update...');
    const updateTaskResponse = await axios.put(`${BASE_URL}/tasks/${taskId}`, {
      completed: true
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Task updated:', updateTaskResponse.data.completed ? 'completed' : 'pending');
    
    // Test 7: Delete task
    console.log('\n7️⃣ Testing task deletion...');
    await axios.delete(`${BASE_URL}/tasks/${taskId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Task deleted successfully');
    
    // Test 8: Get user profile
    console.log('\n8️⃣ Testing get profile...');
    const profileResponse = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Profile retrieved:', profileResponse.data.username);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    if (error.response) {
      console.error('❌ Test failed:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('❌ No response received. Is the server running?');
    } else {
      console.error('❌ Error:', error.message);
    }
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testServer();
}

module.exports = { testServer };
