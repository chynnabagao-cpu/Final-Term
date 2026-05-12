# Student Information Management System

A Node.js web application for managing student records with CRUD operations.

## Features

- Add new student records
- View all student records
- Update student information
- Delete student records

## Technologies Used

- Node.js
- Express.js
- MySQL (Aiven)
- HTML/CSS/JavaScript

## Deployment

This application is deployed on Render and uses Aiven for cloud database hosting.

Deployment Link: [Insert Render URL here]

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables for database connection
4. Run the application: `npm start`

## Database Schema

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    year_level INT NOT NULL,
    email VARCHAR(100) NOT NULL
);
```