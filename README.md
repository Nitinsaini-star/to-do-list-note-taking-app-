# Modern Todo App

A fully functional modern rich UI todo application with authentication, authorization, and complete CRUD operations.

## Features

- **Authentication**: User registration and login with JWT
- **Authorization**: Protected routes and user-specific data
- **Rich UI**: Modern interface with drag-and-drop, filters, and search
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Instant UI updates with toast notifications
- **Data Persistence**: MongoDB backend with proper indexing
- **Priority System**: High, medium, and low priority todos
- **Due Dates**: Optional due date tracking
- **Search & Filter**: Advanced filtering by status, priority, and search terms
- **Drag & Drop**: Reorder todos with drag and drop functionality

## Tech Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- React Hook Form with Yup validation
- Custom CSS (Tailwind-inspired utility classes)
- React Hot Toast for notifications
- DnD Kit for drag and drop
- Lucide React for icons
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing
- Express Validator for input validation
- Helmet for security
- Rate limiting for API protection

## Project Structure

```
todo/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Utility functions
│   └── public/             # Static assets
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   └── dist/               # Compiled TypeScript
├── README.md               # This file
├── package.json            # Root package.json
├── docker-compose.yml      # Docker configuration
├── Dockerfile             # Docker build file
└── vercel.json            # Vercel deployment config
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nitinsaini-star/to-do-list-note-taking-app-.git
   cd to-do-list-note-taking-app-
   ```

2. Install dependencies:
   ```bash
   npm run install:all
   ```

3. Set up environment variables:
   ```bash
   # Backend
   cp backend/.env.example backend/.env
   # Edit backend/.env with your MongoDB URI and JWT secret
   
   # Frontend
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your API URL
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:5000`

## Docker Deployment

1. Build and run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

2. The application will be available at:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`
   - MongoDB: `localhost:27017`

## Quick Deploy to Vercel 🚀

### One-Click Deployment

1. **Deploy Backend:**
   ```bash
   npm run deploy:backend
   ```

2. **Deploy Frontend:**
   ```bash
   npm run deploy:frontend
   ```

### Detailed Deployment Guide

📖 **Check out [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions**

### Required Environment Variables

**Backend:**
- `MONGODB_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secure random string for JWT tokens

**Frontend:**
- `REACT_APP_API_URL`: Your deployed backend URL

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Todos
- `GET /api/todos` - Get user's todos (with filtering)
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `PUT /api/todos/reorder` - Reorder todos

### Query Parameters for Todos
- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `search` - Search in title and description
- `page` - Pagination page number
- `limit` - Items per page

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ using React, Node.js, and MongoDB**
