HEVA Backend
Backend for the HEVA AI-Powered Communication Tool, built with the MERN stack for the HEVA Communications & Accessibility Hackathon.
Features

JWT-based authentication for login/signup
Real-time chat with Socket.io
AI chatbot endpoint (placeholder for Gemini integration)
Opportunities directory with CRUD operations
FAQ automation with Redis caching
Multilingual support for accessibility

Prerequisites

Node.js (v16 or higher)
pnpm (v8 or higher)
MongoDB Atlas account
Redis account (optional for caching)

Setup

Clone the repository:git clone https://github.com/your-username/heva-backend.git
cd heva-backend


Install dependencies with pnpm:pnpm install


Create a .env file with:MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/heva?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=https://your-netlify-site.netlify.app
REDIS_URL=redis://default:<password>@redis-12345.c1.us-west-2-1.ec2.cloud.redislabs.com:12345
PORT=5000


Start the server:pnpm dev



Deployment

Deploy on Render or Railway.
Set environment variables in the hosting platform.
Ensure the frontend (hosted on Netlify) points to the backend URL.

API Endpoints

POST /api/auth/signup: Register a new user
POST /api/auth/login: Login and get JWT
GET /api/opportunities: List opportunities (filter by category, language)
POST /api/opportunities: Create an opportunity (authenticated)
PUT /api/opportunities/:id/apply: Increment applicants (authenticated)
GET /api/faqs: List FAQs (cached, filter by category, language)
POST /api/faqs: Create an FAQ (authenticated)
POST /api/chatbot: Send message to chatbot (authenticated)

Accessibility

Multilingual support via language field in models
Metadata for voice input/output in MongoDB
Compatible with screen readers (frontend)

License
MIT