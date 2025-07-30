// 1. Load environment variables FIRST - this must be at the VERY TOP
const path = require('path');
require('dotenv').config();


// 2. Debug log to verify environment variables are loaded
console.log('Environment Variables Loaded:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Exists' : 'MISSING');
console.log('- PORT:', process.env.PORT || 'Using default (5000)');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const opportunityRoutes = require('./routes/opportunities');
const faqRoutes = require('./routes/faqs');
const chatbotRoutes = require('./routes/chatbot');
const configureSocket = require('./sockets/chat');

const app = express();
const server = http.createServer(app);

// 3. Verify MongoDB URI before attempting connection
if (!process.env.MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Enhanced MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection failed:');
  console.error('- Error:', err.message);
  console.error('- URI used:', process.env.MONGODB_URI);
  process.exit(1);
});

// Rest of your configuration remains the same
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Socket.io
configureSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));