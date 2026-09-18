# Task Management System

A full-stack Task Management System developed for the **kLab Tech Upskill Program Full-Stack Coding Challenge**.

The application allows users to create, view, edit, delete, and manage tasks while storing task data persistently in PostgreSQL.

## Features

### Core Features

* Create new tasks
* View all tasks
* View tasks by status
* Edit existing tasks
* Delete tasks
* Mark tasks as **Pending** or **Completed**
* Filter tasks by status
* Set task priority: **Low, Medium, or High**
* Store task creation date automatically
* Persistent PostgreSQL database storage

### Validation and Error Handling

* Task title is required
* Status values are restricted to `Pending` and `Completed`
* Priority values are restricted to `Low`, `Medium`, and `High`
* API returns appropriate HTTP status codes for invalid requests and missing tasks
* Frontend displays errors when API operations fail
* Delete operations require user confirmation

## Technologies Used

### Frontend

* React
* Vite
* Axios
* JavaScript (ES6+)
* HTML/CSS

### Backend

* Node.js
* Express.js
* PostgreSQL `pg` driver
* REST API

### Database

* PostgreSQL 17

### Development Tools

* Git
* GitHub
* pgAdmin 4
* Visual Studio Code

## Project Structure

```text
task-management-system/
|
+-- backend/
|   +-- routes/
|   |   +-- tasks.js
|   +-- .env.example
|   +-- db.js
|   +-- package.json
|   +-- schema.sql
|   +-- server.js
|
+-- frontend/
|   +-- src/
|   |   +-- App.jsx
|   |   +-- api.js
|   |   +-- index.css
|   |   +-- main.jsx
|   +-- index.html
|   +-- package.json
|   +-- vite.config.js
|
+-- .gitignore
+-- README.md
```

## Prerequisites

Before running the project, install:

* Node.js
* npm
* PostgreSQL
* pgAdmin 4
* Git

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nugiYabesi/task-management-system.git
cd task-management-system
```

### 2. Database Setup

Open **pgAdmin 4** and create a PostgreSQL database named:

```text
task-manager
```

Open the Query Tool for the `task-manager` database and run the SQL contained in:

```text
backend/schema.sql
```

This creates the `tasks` table with the following fields:

| Field         | Description                                |
| ------------- | ------------------------------------------ |
| `id`          | Unique task identifier                     |
| `title`       | Task title                                 |
| `description` | Task description                           |
| `status`      | Pending or Completed                       |
| `priority`    | Low, Medium, or High                       |
| `createdAt`   | Automatically generated creation timestamp |

### 3. Backend Setup

Open a terminal in the project directory:

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`.

Configure the database connection:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task-manager
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
PORT=5000
```

Start the backend:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

You can verify that the API is running by opening:

```text
http://localhost:5000
```

The API should return:

```json
{
  "message": "Task Management System API is running"
}
```

### 4. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will display the local address in the terminal, normally:

```text
http://localhost:5173
```

If port `5173` is already in use, Vite may automatically select another available port.

## REST API

The backend provides the following REST endpoints:

| Method   | Endpoint     | Description             |
| -------- | ------------ | ----------------------- |
| `GET`    | `/tasks`     | Retrieve all tasks      |
| `GET`    | `/tasks/:id` | Retrieve one task       |
| `POST`   | `/tasks`     | Create a new task       |
| `PUT`    | `/tasks/:id` | Update an existing task |
| `DELETE` | `/tasks/:id` | Delete a task           |

### Filter Tasks

Tasks can be filtered by status using the query parameter:

```text
GET /tasks?status=Pending
```

or:

```text
GET /tasks?status=Completed
```

## Example Task

A task returned by the API has the following structure:

```json
{
  "id": 1,
  "title": "Learn PostgreSQL",
  "description": "Study PostgreSQL fundamentals",
  "status": "Pending",
  "priority": "Medium",
  "createdAt": "2026-09-18T01:51:42.903Z"
}
```

## Technical Decisions

### PostgreSQL

PostgreSQL was selected as the database because the application requires persistent relational storage for structured task data.

### REST API

The backend follows a REST-style architecture using Express.js. CRUD operations are exposed through clear HTTP endpoints.

### Parameterized SQL Queries

The PostgreSQL `pg` driver is used with parameterized queries such as:

```javascript
pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
```

This prevents user-provided values from being directly inserted into SQL statements.

### Data Validation

Validation is implemented at two levels:

1. **API layer** — validates task status, priority, and required title.
2. **Database layer** — PostgreSQL `CHECK` constraints enforce valid status and priority values.

### Server-Side Filtering

Status filtering is performed by the backend through:

```text
GET /tasks?status=Pending
```

This keeps filtering logic on the server and allows the API to scale more effectively as the number of tasks increases.

### React State Management

The frontend uses React's built-in `useState` and `useEffect` hooks. An additional state-management library was not necessary because the application has relatively simple state requirements.

## Security and Repository Practices

Sensitive configuration is kept outside the repository.

The following files and directories are excluded through `.gitignore`:

```text
node_modules/
.env
*.db
dist/
```

A `.env.example` file is provided so developers can configure their own local database credentials without exposing passwords.

## Testing and Verification

The following functionality was tested during development:

* Creating tasks through the frontend
* Viewing tasks retrieved from PostgreSQL
* Editing existing tasks
* Deleting tasks
* Changing task status between Pending and Completed
* Filtering Pending tasks
* Filtering Completed tasks
* Verifying database changes using pgAdmin
* Testing REST API responses through the backend
* Verifying that task data persists in PostgreSQL

## Future Improvements

The following optional features could be added in future versions:

* User authentication
* Search functionality
* Pagination
* Automated unit and integration tests
* API documentation using Swagger/OpenAPI
* Cloud deployment
* Improved UI/UX and responsive design

## Author

**Yabesi Iyukuri**

Software Engineering Student
AUCA

GitHub:
https://github.com/nugiYabesi/task-management-system
