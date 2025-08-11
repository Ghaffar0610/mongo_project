# Task Manager Backend

A robust Node.js backend API for a task management application with user authentication and CRUD operations for tasks.

## 🚀 Features

- **User Authentication**: JWT-based registration and login system
- **Task Management**: Full CRUD operations for tasks
- **Security**: Password hashing with bcrypt, JWT tokens
- **Database**: MongoDB with Mongoose ODM
- **API**: RESTful API with proper error handling
- **Middleware**: Authentication middleware for protected routes

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mongo_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 🗄️ Database Models

### User Model
- `username`: String (required, min 3 chars)
- `email`: String (required, unique, validated)
- `password`: String (required, min 6 chars, hashed)
- `timestamps`: Created and updated timestamps

### Task Model
- `title`: String (required, trimmed)
- `completed`: Boolean (default: false)
- `userId`: ObjectId (required, references User)
- `timestamps`: Created and updated timestamps

## 🔐 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/register` | User registration | No |
| POST | `/login` | User login | No |
| GET | `/profile` | Get user profile | Yes |

### Task Routes (`/api/tasks`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/` | Get all user tasks | Yes |
| POST | `/` | Create new task | Yes |
| PUT | `/:id` | Update task | Yes |
| DELETE | `/:id` | Delete task | Yes |

## 📝 API Usage Examples

### User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Task
```bash
POST /api/tasks
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Complete project documentation"
}
```

### Get Tasks
```bash
GET /api/tasks
Authorization: Bearer <jwt_token>
```

### Update Task
```bash
PUT /api/tasks/:taskId
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated task title",
  "completed": true
}
```

### Delete Task
```bash
DELETE /api/tasks/:taskId
Authorization: Bearer <jwt_token>
```

## 🔒 Authentication

- JWT tokens are required for protected routes
- Include token in Authorization header: `Bearer <token>`
- Tokens expire after 7 days (configurable)
- Password hashing with bcrypt (salt rounds: 10)

## 🏗️ Project Structure

```
mongo_project/
├── config/
│   ├── config.js          # Configuration and environment variables
│   └── db.js             # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── taskController.js  # Task CRUD operations
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── Task.js           # Task data model
│   └── user.js           # User data model
├── routes/
│   ├── authRoutes.js     # Authentication routes
│   └── taskRoutes.js     # Task routes
├── server.js             # Main server file
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🚦 Error Handling

The API includes comprehensive error handling:
- Input validation errors (400)
- Authentication errors (401)
- Not found errors (404)
- Server errors (500)
- Detailed error messages for debugging

## 🔧 Configuration

Key configuration options in `config/config.js`:
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRES_IN`: Token expiration time
- `MONGODB_URI`: MongoDB connection string
- `CORS_ORIGIN`: Allowed CORS origins
- `PORT`: Server port number

## 🧪 Testing

To test the API endpoints, you can use:
- Postman
- Insomnia
- cURL commands
- Frontend application

## 🚀 Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a strong, unique `JWT_SECRET`
3. Configure production MongoDB connection
4. Set up proper CORS origins
5. Use environment-specific configuration

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.
