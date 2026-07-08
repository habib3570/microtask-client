# MicroTask — Frontend

React + Tailwind CSS frontend for **MicroTask**, a Picoworkers-style micro-tasking and earning platform. Workers complete tasks to earn coins, Buyers post tasks and pay for work, and Admins manage the whole platform. This frontend connects to the [MicroTaskAPI](#) ASP.NET Core backend.

## 🚀 Tech Stack

- **React 18** (Vite)
- **Tailwind CSS 3**
- **React Router DOM** — routing & role-based protected routes
- **Axios** — API communication
- **Firebase Auth** — Google Sign-In
- **React Hot Toast** — notifications

## 👥 User Roles

- **Worker** — browses tasks, submits work, earns coins, requests withdrawals
- **Buyer** — posts tasks, reviews submissions, purchases coins, pays workers
- **Admin** — manages users & tasks, approves withdrawals and payments

## ✨ Features

- Public landing page (hero, stats, how-it-works, top workers, task preview, testimonials)
- Email/password + Google authentication
- Role-based dashboards with protected routing
- Worker: task list, task details & submission, submission history (paginated), withdrawals
- Buyer: add/edit/delete tasks, review & approve/reject submissions, manual coin purchase, payment history
- Admin: manage users & roles, manage tasks, approve/reject withdrawals & payments
- In-app notifications with unread count
- Fully responsive, light-themed UI with hover interactions throughout

## 📋 Prerequisites

- **Node.js** `20.19+` or `22.12+` ([download](https://nodejs.org))
- **npm** (comes with Node.js)
- The [MicroTaskAPI backend](#) running locally or deployed
- A [Firebase](https://console.firebase.google.com) project with Google Sign-In enabled (optional — only needed for the "Continue with Google" button)

## 🔧 Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/microtask-client.git
cd microtask-client
```

### 2. Install dependencies

```bash
npm install
```

If you're setting this project up from scratch (not cloning), install packages individually:

```bash
npm install react-router-dom axios firebase react-icons react-hot-toast
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npx tailwindcss init -p
```

> ⚠️ Use Tailwind **v3**, not v4 — this project's `tailwind.config.js` uses the v3 configuration format.

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://localhost:44302/api

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

- `VITE_API_BASE_URL` must match the port your backend API is running on (check the Swagger URL).
- Firebase values come from **Firebase Console → Project Settings → General → Your apps**. If you skip these, everything works except the Google Sign-In button.
- Restart the dev server after any `.env` change — Vite does not hot-reload environment variables.

### 4. Run the development server

```bash
npm run dev
```

The app will be available at the local URL shown in the terminal (typically `http://localhost:5173`).



## 📁 Project Structure

```
src/
├── assets/
├── components/
│   ├── common/
│   ├── layout/          # Navbar, Footer, Sidebar, DashboardNavbar
│   └── home/             # HeroSection, StatsSection, HowItWorks, etc.
├── pages/
│   ├── public/            # Home, NotFound
│   ├── auth/               # Login, Register
│   ├── worker/              # WorkerDashboard, TaskList, TaskDetails, MySubmissions, Withdrawals
│   ├── buyer/                # BuyerDashboard, AddTask, MyTasks, ReviewSubmissions, PurchaseCoin, PaymentHistory
│   ├── admin/                 # AdminDashboard, ManageUsers, ManageTasks, WithdrawRequests, PaymentRequests
│   └── shared/                 # Notifications
├── layouts/
│   ├── PublicLayout.jsx
│   └── DashboardLayout.jsx
├── routes/
│   ├── router.jsx
│   ├── PrivateRoute.jsx
│   ├── PublicRoute.jsx
│   └── RoleRoute.jsx
├── context/
│   └── AuthContext.jsx
├── services/
│   └── api.js              # Axios instance with auth interceptors
├── firebase/
│   └── firebase.config.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🔗 Backend Connection

This app expects the MicroTaskAPI backend to be running and reachable at the URL set in `VITE_API_BASE_URL`. Make sure the backend's CORS configuration (`Cors:AllowedOrigins` in `appsettings.json`) includes this frontend's origin (e.g. `http://localhost:5173`).

## ⚠️ Troubleshooting

| Issue | Fix |
|---|---|
| CORS errors in console | Confirm the frontend origin is listed in the backend's CORS policy |
| API calls failing / network error | Check `VITE_API_BASE_URL` matches the backend's actual running port |
| Google Sign-In fails | Verify Firebase config values in `.env` and that Google Sign-In is enabled in Firebase Console |
| `.env` changes not applying | Restart `npm run dev` |
| `npx tailwindcss init -p` fails silently | You likely have Tailwind v4 installed; run `npm uninstall tailwindcss && npm install -D tailwindcss@3.4.17` |

## 📄 License

This project is for educational/portfolio purposes.
