# Modern Todo App

A fully functional modern rich UI todo application with authentication, authorization, and complete CRUD operations.

## Features

- **Authentication**: User registration and login
- **Authorization**: Protected routes and user-specific data
- **Rich UI**: Modern interface with drag-and-drop, filters, and search
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Instant UI updates
- **Data Persistence**: MongoDB backend

## Tech Stack

### Frontend
- React 18
- TypeScript
- TailwindCSS
- Lucide Icons
- React Hook Form
- React Query

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- JWT Authentication
- bcrypt

## Project Structure

```
todo/
├── frontend/          # React frontend
├── backend/           # Node.js backend
├── README.md          # This file
└── package.json       # Root package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Set up environment variables (see `.env.example`)
4. Start the development servers:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`
The backend will be available at `http://localhost:5000`

## Deployment

This application is deployed and available at: [Deployment URL]

## License

MIT
