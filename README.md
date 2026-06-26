# Student Management System

A React + Redux student management dashboard, styled after a purple admin-panel
design, backed by a `json-server` mock REST API.

## Features

- **Auth**: simple sign-in screen, protected routes (`PrivateRoute`), session
  persisted in `localStorage`.
- **Student List**: fetches from the API on load, search box, filter by class,
  filter by exam type (All / Class Exam / Online Exam / Missed Exam), sort by
  name or roll number.
- **Add Student**: form for name, roll number, class/grade, age, phone, email,
  subject, marks, exam type, photo URL.
- **Student Details**: view a student's full record, edit in place, or delete.
- **Redux**: actions + thunks for fetch/add/update/delete, with loading and
  error state.
- **Bootstrap 5** for layout primitives, with a custom purple theme on top.

## Project structure

```
src/
  redux/
    types.js
    store.js
    actions/
      studentActions.js   # fetchStudents, addStudent, updateStudent, deleteStudent
      authActions.js      # login, logout, loadUserFromStorage
    reducers/
      studentReducer.js
      authReducer.js
      index.js
  components/
    Navbar.js
    PrivateRoute.js
    Login.js
    StudentList.js
    StudentForm.js
    StudentDetails.js
  App.js
  index.js
  index.css
db.json   # json-server mock database (students + users)
```

## Getting started

1. Unzip the project and open a terminal in the folder:

   ```bash
   cd student-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the mock API server (uses `db.json`, runs on port 5000):

   ```bash
   npm run server
   ```

4. In a **second terminal**, start the React app (runs on port 3000):

   ```bash
   npm start
   ```

   Or, run both together in one terminal:

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 and sign in with:

   - **Username:** `admin`
   - **Password:** `admin123`

## API endpoints (served by json-server on :5000)

| Method | URL                  | Purpose             |
|--------|----------------------|----------------------|
| GET    | /students            | List all students    |
| POST   | /students             | Add a student        |
| PATCH  | /students/:id        | Update a student      |
| DELETE | /students/:id        | Delete a student      |
| GET    | /users?username=...  | Look up a user (auth) |

## Notes

- Each student has a unique `id` (assigned by json-server) used to identify
  records for update/delete.
- If you reload directly on a `/students/:id` page, the app will re-fetch the
  full student list from the API to repopulate the Redux store.
- To reset sample data, stop `json-server` and restore `db.json` from the zip.
