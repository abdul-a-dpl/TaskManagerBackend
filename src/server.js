const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Test database connection
app.get('/test/db', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    res.json({ 
      status: 'success',
      message: `Database is ${states[dbState]}`,
      state: dbState
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Test user creation route
app.post('/test/create-user', async (req, res) => {
  try {
    const User = require('./models/User');
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('Attempting to save user:', testUser);
    const savedUser = await testUser.save();
    console.log('User saved successfully:', savedUser);
    res.json({ status: 'success', message: 'User created successfully', user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Test task creation route
app.post('/test/create-task', async (req, res) => {
  try {
    const Task = require('./models/Task');
    const testTask = new Task({
      title: 'Mobile App Task',
      description: 'Create UI components for the mobile app',
      status: 'pending',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      user: '67cfe9cd7e922003cfbcf612' // The actual user ID we just created
    });
    console.log('Attempting to save task:', testTask);
    const savedTask = await testTask.save();
    console.log('Task saved successfully:', savedTask);
    res.json({ status: 'success', message: 'Task created successfully', task: savedTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Test get tasks route
app.get('/test/get-tasks', async (req, res) => {
  try {
    const Task = require('./models/Task');
    const tasks = await Task.find({ user: '67cfe9cd7e922003cfbcf612' }).sort({ createdAt: -1 });
    res.json({ status: 'success', tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// MongoDB Connection with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, '❌ MongoDB connection error:'));
db.once('open', function() {
  console.log('✅ MongoDB database connection established successfully');
});

// Routes
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
}); 