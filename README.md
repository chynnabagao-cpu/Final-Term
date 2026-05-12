# Student Information Management System

A Node.js web application for managing student records with CRUD operations.

## Features

- Add new student records
- View all student records
- Update student information
- Delete student records

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL (Aiven)** - Cloud database hosting
- **Render** - Web application hosting
- **GitHub** - Source code repository and version control
- HTML/CSS/JavaScript - Frontend

## Deployment

This application is deployed on [Render](https://render.com) and uses [Aiven](https://aiven.io) for cloud database hosting.

### Deployment Link
[Insert Render URL here after deployment]

## Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/chynnabagao-cpu/Final-Term.git
   cd Final-Term
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env`
   - Fill in your Aiven MySQL database credentials (get these from your Aiven dashboard):
     ```
     DB_HOST=your-aiven-host
     DB_USER=your-database-user
     DB_PASSWORD=your-database-password
     DB_NAME=your-database-name
     DB_PORT=3306
     ```

4. **Run the application**
   ```bash
   npm start
   ```

## Database Setup (Aiven)

1. Create an Aiven account at [aiven.io](https://aiven.io)
2. Create a new MySQL service
3. Note down the following from your Aiven dashboard:
   - **Host**: The service URI (e.g., `your-service.aivencloud.com`)
   - **Port**: Usually 3306
   - **Database Name**: The database name provided
   - **Username**: Your database username
   - **Password**: Your database password

4. Update your `.env` file with these values:
   ```
   DB_HOST=your-service.aivencloud.com
   DB_USER=your-username
   DB_PASSWORD=your-password
   DB_NAME=your-database-name
   DB_PORT=3306
   ```

## Deployment on Render

1. Create a Render account at [render.com](https://render.com)
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure the service:
   - **Runtime**: Node
   - **Branch**: main (ensure main is set as default branch on GitHub)
   - **Build Command**: (leave empty)
   - **Start Command**: `npm start`
5. Add environment variables in Render dashboard:
   - `DB_HOST`
   - `DB_USER`
   - `DB_PASSWORD`
   - `DB_NAME`
   - `DB_PORT` (optional, defaults to 3306)
6. Deploy the service

**Note**: If your GitHub repository has `master` as the default branch, change it to `main` in your repository settings on GitHub.

## Database Schema

The application automatically creates the required table on startup. The schema is:

```sql
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    year_level INT NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```