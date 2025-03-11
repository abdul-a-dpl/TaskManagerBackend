# Task Manager Backend

A Node.js/Express backend for the Task Manager mobile application.

## Features

- User authentication (signup/login)
- Task management (CRUD operations)
- MongoDB database integration
- RESTful API design

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

## API Endpoints

### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create a new task
- PATCH `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task

## Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd task-manager-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

4. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## Deployment

The application is configured for deployment on Render.com. See `render.yaml` for configuration details.

## License

MIT 