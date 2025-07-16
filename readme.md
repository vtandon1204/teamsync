# TeamSync

TeamSync is a full-stack team and project management platform that helps users create workspaces, manage members, track projects, and assign tasks. It features role-based access control, Google OAuth integration, analytics dashboards, and more.

## Features

### Workspace Management
- Create and manage workspaces
- Invite members using unique invite codes
- Role-based permissions: Owner, Admin, Member

### Project Management
- Create, edit, delete, and view projects
- Emoji & description customization
- View project-specific analytics

### Task Management
- Create, assign, update, and delete tasks
- Track task status (To-do, In-progress, Done, etc.)
- Prioritize tasks (Low, Medium, High)
- View task lists with filtering and pagination

### Analytics & Dashboards
- Project and workspace-level analytics
- Activity overview and recent changes


## Tech Stack

| Layer      | Tech                                 |
| ---------- | ------------------------------------ |
| Frontend   | React, TypeScript, Vite, TailwindCSS |
| Backend    | Node.js, Express, TypeScript         |
| Auth       | Passport.js (Google & Local)         |
| Database   | MongoDB                              |
| ORM        | Mongoose                             |
| Validation | Zod                                  |

## Getting Started

### Backend Setup
```bash
cd backend
cp .env.example .env # Add your environment variables
npm install
npm run seed          # Seed roles
npm run dev           # Start backend server
```

### Frontend Setup
```bash
cd client
cp .env.example .env  # Add your frontend environment variables
npm install
npm run dev           # Start client app
```

## Future Improvements
- Notifications system
- File uploads
- Activity logs
- Mobile-friendly optimizations