# BulkMail - MERN Stack Bulk Email Application

A full-stack bulk email sending web app built with React, Node.js/Express, and MongoDB.

---

## Features

- Send bulk emails with Subject + Body
- Upload recipient list via Excel file (Column A)
- Add recipients manually
- Input validation on frontend
- Email history page (admin protected)
- Admin login with secret key
- MongoDB logging of all email batches
- Deployed on Vercel (frontend + backend)

---

## Project Structure

```
bulkmail/
├── frontend/         → React + Tailwind CSS
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── index.js
│       └── index.css
│
├── backend/          → Node.js + Express
│   ├── index.js
│   ├── .env.example
│   ├── vercel.json
│   └── package.json
│
└── README.md
```

---

## Setup Instructions

### Backend

1. Go to the backend folder:
   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```
   MONGO_URI=your_mongodb_connection_string
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ADMIN_KEY=your_secret_admin_key
   ```

3. Start the server:
   ```bash
   npm start
   ```

### Frontend

1. Go to the frontend folder:
   ```bash
   cd frontend
   npm install
   ```

2. Update `BACKEND_URL` in `src/App.js` to your backend URL.

3. Start the app:
   ```bash
   npm start
   ```

---

## Environment Variables

| Variable     | Description                        |
|--------------|------------------------------------|
| `MONGO_URI`  | MongoDB connection string          |
| `EMAIL_USER` | Gmail address used to send emails  |
| `EMAIL_PASS` | Gmail App Password (not login pwd) |
| `ADMIN_KEY`  | Secret key to access history page  |

---

## API Endpoints

| Method | Route         | Description              | Auth         |
|--------|---------------|--------------------------|--------------|
| GET    | `/`           | Health check             | None         |
| POST   | `/sendemail`  | Send bulk emails         | None         |
| GET    | `/history`    | Fetch email history      | x-admin-key  |

---

## Deployment

Both frontend and backend can be deployed on **Vercel**.
- Backend: `vercel.json` is already configured.
- Frontend: Deploy the `frontend/` folder as a Vercel static site.
