# Student Management REST API

A simple REST API built with Express.js to manage student records. No database is
used — data is stored in a JavaScript array in memory (resets when the server restarts).

## Project Structure

```
student-management-api/
├── app.js
├── package.json
├── routes/
│   └── studentRoutes.js
├── middleware/
│   └── logger.js
└── data/
    └── students.js
```


Server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint          | Description             | Success | Errors |
|--------|-------------------|--------------------------|---------|--------|
| GET    | /students         | Get all students         | 200     | —      |
| GET    | /students/:id     | Get a student by id      | 200     | 404    |
| POST   | /students         | Create a new student     | 201     | 400    |
| PUT    | /students/:id     | Update a student         | 200     | 400, 404 |
| DELETE | /students/:id     | Delete a student         | 200     | 404    |

### Request body (POST / PUT)

```json
{
  "name": "Aman Sharma",
  "age": 20,
  "course": "Computer Science"
}
```

- POST requires `name`, `age`, and `course`.
- PUT accepts any subset of those fields.

## Testing with Postman

1. Start the server (`npm start`).
2. Open Postman and create requests for each endpoint above against
   `http://localhost:3000`.
3. For POST/PUT, set the body to `raw` → `JSON` and use the example body above.
4. Check that the returned status codes match the table above.

## Middleware

`middleware/logger.js` logs every incoming request's timestamp, method, and URL to
the console — this is wired in globally in `app.js` before the routes.

## Error Handling

- Invalid/missing fields on create/update → `400 Bad Request`
- Student id not found → `404 Not Found`
- Unknown routes → `404 Not Found`
- Unexpected server errors → `500 Internal Server Error` (via a central error-handling
  middleware in `app.js`)
