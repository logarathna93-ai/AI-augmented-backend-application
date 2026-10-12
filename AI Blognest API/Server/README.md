# AI BlogNest API

AI BlogNest is an AI-powered blog management backend API developed using Node.js, Express.js, MongoDB, Mongoose and Google Gemini AI.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js
- Google Gemini AI
- Express Validator
- Express Rate Limit
- Winston Logger
- Postman

## Main Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcrypt.js

### Role-Based Access Control

Supported roles:

- Admin
- Editor
- Author
- Reader

### Blog Management

- Create Blog
- View Blogs
- Update Blog
- Delete Blog
- Search Blogs

### Categories and Tags

- Create Categories
- View Categories
- Create Tags
- View Tags
- Connect Categories and Tags with Blogs

### Comments

- Add Comments
- View Blog Comments

### Media

- Store Media Metadata
- View Media Metadata

### AI Features

- Generate Blog using Google Gemini AI
- Summarize Blog using Google Gemini AI

### Security

- JWT Authentication
- Role-Based Authorization
- Password Hashing
- Input Validation
- Rate Limiting
- Centralized Error Handling

### Logging

- Structured JSON logging using Winston

## API Base URL

http://localhost:5000

## Run the Project

Install dependencies:

npm install

Start the server:

node server.js

The API runs on:

http://localhost:5000

## Project Architecture

The project follows an MVC-style architecture:

- Models → Database schemas
- Controllers → Business logic
- Routes → API endpoints
- Middleware → Authentication, authorization, validation and error handling
- Utils → Logging utilities

## Database

MongoDB database:

blognest

## Testing

The API endpoints were tested using Postman.

## Project Status

AI BlogNest API backend development completed.