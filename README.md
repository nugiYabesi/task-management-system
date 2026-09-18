# Task Management System

A full-stack task management app built for the kLab Tech Upskill coding challenge.

## Technologies Used

- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL

## Project Structure

```
task-manager/
├── backend/     # Express REST API
└── frontend/    # React app (Vite)
```

## Setup & Installation

### 1. Database (PostgreSQL)

1. Open **pgAdmin**, create a new database called `task_manager`.
2. Open the Query Tool on that database and run the contents of `backend/schema.sql` to create the `tasks` table.

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your PostgreSQL username/password (the same ones pgAdmin uses to connect).

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 3. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:5173` and talks to the API at `http://localhost:5000`.

## API Endpoints

| Method | Endpoint     | Purpose       |
| ------ | ------------ | ------------- |
| GET    | /tasks       | Get all tasks (optional `?status=Pending` or `?status=Completed`) |
| GET    | /tasks/:id   | Get one task  |
| POST   | /tasks       | Create a task |
| PUT    | /tasks/:id   | Update a task |
| DELETE | /tasks/:id   | Delete a task |

## Technical Decisions

- **PostgreSQL via the `pg` driver**, using parameterized queries throughout to prevent SQL injection.
- **Status/priority validation** is enforced both at the database level (`CHECK` constraints) and in the API layer.
- **Filtering by status** is done server-side via a query parameter (`GET /tasks?status=Completed`) rather than filtering only on the frontend, so the same endpoint could support large datasets later.
- Frontend uses plain `useState`/`useEffect` (no extra state library) since the app's state is simple enough not to need one.

## Possible Next Steps (not implemented)

- User authentication
- Search and pagination
- Automated tests
