# Whispers of the Mind - Mindfulness Journal Application

## Overview
Whispers of the Mind is a full-stack web application designed to help users maintain a digital mindfulness journal. Users can record their daily thoughts, track their moods, and engage with interactive features that promote mental wellness.

## Technology Stack

### Frontend
- React.js (with Vite)
- React Router for navigation
- Chart.js for mood visualization
- Axios for API requests
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- Passport.js for authentication
- bcryptjs for password hashing 

## Features

### 1. User Authentication
- Secure registration and login system
- Password encryption using bcrypt
- Session management with express-session
- Protected routes requiring authentication

### 2. Journal Entries
- Create new journal entries with:
  - Title
  - Content
  - Mood selection (Happy, Sad, Neutral, Excited)
- View all past entries
- Delete unwanted entries
- Entries are private and user-specific

### 3. Mood Tracking
- Visual representation of mood patterns using Chart.js
- Doughnut chart showing mood distribution
- Color-coded mood indicators

### 4. Interactive Mood Game
- Drag-and-drop game matching emotions with emojis
- Score tracking
- Immediate feedback on correct/incorrect matches
- Helps users identify and understand different emotions

## Component Structure

### Frontend Components

1. **Navbar**
- Main navigation component
- Links to Home, Add Journal, Mood Game
- Login/Register buttons
- Responsive design

2. **Home Page**
- Welcome message for non-authenticated users
- Dashboard view for authenticated users
- Displays MoodChart and CalendarView components

3. **AddJournal**
- Form for creating new journal entries
- Mood selection dropdown
- Title and content input fields
- Success/error message handling

4. **CalendarView**
- Displays journal entries in a card format
- Shows entry date, mood emoji, title, and content
- Delete functionality for entries

5. **MoodGame**
- Interactive drag-and-drop game
- Score tracking
- Visual feedback for correct/incorrect matches

6. **MoodChart**
- Added proper mood counting logic with getMoodCounts()
_ Added Percentage calculation 
_ Added proper error handling sor the API call
_ Your entries being saved with the correct mood Values 


### Backend Structure

1. **Authentication Routes (`/auth`)**
- POST `/register`: New user registration
- POST `/login`: User login
- POST `/logout`: User logout
- GET `/check-auth`: Authentication status check

2. **Entry Routes (`/entries`)**
- GET `/`: Fetch user's journal entries
- POST `/`: Create new entry
- DELETE `/:id`: Remove specific entry
- PUT `/:id`: Update existing entry

3. **Models**
- User Model: Handles user data and authentication
- Entry Model: Manages journal entries with references to users

## Database Schema

### User Schema 

## Development Challenges and Solutions

### 1. Authentication Issues
**Problem**: Users remained unauthorized even after successful login, with "unauthorized access" errors.
**Solution**: 
- Implemented proper session management with express-session
- Added withCredentials: true to Axios configuration
- Configured CORS to accept credentials:

```javascript
app.use(cors({

You can run the Backend and FrontEnd by doing NPM start on Terminal

Once you run the Backend, You should be able to see:
Server is running at http://localhost:5004
Connected to MongoDB

One you run the Frontend, You should be able to see:
     VITE v5.4.11  ready in 466 ms
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

When You register:
You shoull be able to see the registered users on Terminal

Before you want to run the BackEnd, make sure your You have added your IP Adderess to your MONGODB and you have put the right Connection String on Server.js and .env..... in some cases, you might have trouble adding your IP address for MONGODB if you are using public WIFI.

If you are facing any issues with your API, You can test your API with Postman.

Here is a detailed step-by-step guide on testing your API with Postman.
Sign up for a Postman Account. ...
Create a New Request. ...
Enter Request Methods, Parameters. ...
Send the Request. ...
Create a Postman Collection. ...
Add Requests to the Collection. ...
Use the Postman Collection Runner. ...
Analyze the Test Results.


