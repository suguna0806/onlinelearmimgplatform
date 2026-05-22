# 📚 LearnHub — Online Learning Platform

> A full-stack inspired online learning platform built with React (Vite) and JavaScript.  
> Browse courses, enroll, track lesson progress, and earn certificates — all from the browser.
> LIVE LINK:onlinelearmimgplatform.vercel.app

---

## 🚀 Live Features

| Feature | Status |
|---|---|
| Homepage with featured courses | ✅ |
| Course listing with search & filter | ✅ |
| Individual course detail page | ✅ |
| Enroll button & enrollment system | ✅ |
| My Learning dashboard | ✅ |
| Lesson completion (checkboxes) | ✅ |
| Progress tracking (% bar) | ✅ |
| Certificate generation on completion | ✅ |
| Mock user authentication (Sign Up / Login) | ✅ |
| LocalStorage persistence | ✅ |
| Responsive design (mobile + desktop) | ✅ |

---

## 🛠️ Tech Stack

- **Frontend** — React 18, Vite
- **Styling** — Pure CSS with CSS Variables
- **Data Persistence** — localStorage
- **Fonts** — Syne, DM Sans (Google Fonts)
- **Backend (planned)** — Java, Spring MVC, JDBC, MySQL

---

## 📁 Project Structure

```
learning-platform/
├── public/
├── src/
│   ├── App.jsx        # Main application (all components)
│   └── main.jsx       # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18 or above → [nodejs.org](https://nodejs.org)
- VS Code (recommended)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/learning-platform.git

# 2. Navigate into the project
cd learning-platform

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Then open your browser at:
```
http://localhost:5173
```

---

## 📸 Pages Overview

### 🏠 Home Page
- Hero section with call-to-action
- Platform statistics (courses, students, rating)
- Featured courses grid

### 📖 Courses Page
- All 6 courses displayed in a grid
- Search bar (filter by title/description)
- Category filter chips (Web Dev, Frontend, Database, etc.)

### 📄 Course Detail Page
- Full course info (instructor, duration, level, rating)
- Lesson list with durations
- Mark lessons as complete (click to toggle)
- Live progress bar

### 📊 My Dashboard
- Enrolled courses summary stats
- Per-course progress bars
- Per-lesson checkboxes
- Certificate button on 100% completion

### 🏆 Certificate Page
- Auto-generated on course completion
- Shows student name, course name, and date

### 🔐 Auth Pages
- Sign Up and Login forms
- Mock authentication (stored in localStorage)

---

## 🗺️ Project Phases (as per guide)

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Folder structure + mock course data | ✅ Done |
| Phase 2 | Course listing and detail pages | ✅ Done |
| Phase 3 | Enrollment system + My Courses dashboard | ✅ Done |
| Phase 4 | Progress tracking + lesson completion | ✅ Done |
| Phase 5 | Search/filter, responsive design, localStorage | ✅ Done |
| Bonus | Auth, certificates, admin panel | ✅ Auth + Certs Done |

---

## 🔮 Future Enhancements

- [ ] Java Spring Boot REST API backend
- [ ] MySQL database integration (JDBC)
- [ ] Admin panel to add/edit courses
- [ ] Video player integration for lessons
- [ ] Real JWT-based authentication
- [ ] Email notifications on enrollment

---

## 👨‍💻 Author

**Suguna**  
Full Stack Java Project — Major Project Submission  
 B.Tech — Information Technology

---

## 📄 License

This project is built for educational purposes as part of a college major project.
