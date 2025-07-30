# Spotify Clone

A full-stack music streaming application built with React, TypeScript, Node.js, and Express. This project replicates core Spotify functionality including music playback, user authentication, admin panel, and real-time chat features.

## Features

- 🎵 **Music Streaming**: Play songs with custom audio controls
- 🔐 **Authentication**: Secure user authentication with Clerk
- 👥 **User Management**: User profiles and preferences
- 📱 **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- 💬 **Real-time Chat**: Socket.io powered chat functionality
- 📊 **Admin Dashboard**: Admin panel for managing songs, albums, and users
- 🎨 **Modern UI**: Clean interface with Radix UI components
- ☁️ **Cloud Storage**: Cloudinary integration for media files
- 📈 **Analytics**: User statistics and listening data

## Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Router** for navigation
- **Zustand** for state management
- **Socket.io Client** for real-time features
- **Clerk** for authentication
- **Axios** for API requests

### Backend

- **Node.js** with Express
- **MongoDB** with Mongoose
- **Socket.io** for real-time communication
- **Clerk Express** for authentication middleware
- **Cloudinary** for file storage
- **Express FileUpload** for handling uploads
- **Node Cron** for scheduled tasks
- **CORS** for cross-origin requests

## Project Structure

```
spotify-clone/
├── frontEnd/                 # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── layout/          # Layout components
│   │   ├── providers/       # Context providers
│   │   ├── stores/          # Zustand stores
│   │   ├── types/           # TypeScript type definitions
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   │   ├── albums/          # Album cover images
│   │   ├── cover-images/    # Additional cover images
│   │   └── songs/           # Audio files
│   └── dist/                # Production build
├── backEnd/                 # Node.js Express backend
│   ├── src/
│   │   ├── controller/      # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── lib/             # Database and utility functions
│   │   └── seeds/           # Database seeders
│   └── tmp/                 # Temporary file storage
└── package.json             # Root package configuration
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database
- Cloudinary account
- Clerk account for authentication

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd spotify-clone
   ```

2. **Install dependencies**

   ```bash
   npm run build
   ```

3. **Environment Setup**

   Create `.env` file in the `backEnd` directory:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

   Create `.env.local` file in the `frontEnd` directory:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```

4. **Database Setup**

   Seed the database with sample data:

   ```bash
   cd backEnd
   npm run seed:songs
   npm run seed:albums
   ```

### Development

1. **Start the backend server**

   ```bash
   cd backEnd
   npm run dev
   ```

2. **Start the frontend development server**

   ```bash
   cd frontEnd
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/*` - Authentication routes

### Users

- `GET /api/users/*` - User management routes

### Songs

- `GET /api/songs/*` - Song retrieval and management
- `POST /api/songs/*` - Song upload and creation

### Albums

- `GET /api/albums/*` - Album management routes

### Admin

- `POST /api/admin/*` - Admin panel operations

### Statistics

- `GET /api/stats/*` - Analytics and statistics

## Key Features Implementation

### Real-time Chat

- Socket.io integration for instant messaging
- Real-time user presence indicators
- Message history and persistence

### Audio Playback

- Custom audio player with controls
- Playlist management
- Volume and progress controls

### File Upload

- Cloudinary integration for audio and image uploads
- Temporary file cleanup with cron jobs
- File size and type validation

### Authentication

- Clerk integration for secure authentication
- Protected routes and middleware
- User session management

## Scripts

### Root Level

- `npm run build` - Install dependencies and build frontend
- `npm start` - Start production server

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed:songs` - Seed database with songs
- `npm run seed:albums` - Seed database with albums

## Deployment

The application is configured for deployment on platforms like Render, Vercel, or Heroku. The backend serves the frontend static files in production mode.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
