# Daily Development Workflow Guide

> A practical guide for daily coding sessions on the Coffee Blog CMS project.

---

## Current Project Status

### Where You Are in the 100-Day Plan

```
Phase 1 (Days 1-15): Foundation          [██████████░░░░░░░░░░] 85%
Phase 2 (Days 16-35): Core CMS           [░░░░░░░░░░░░░░░░░░░░]  0%  ← YOU ARE HERE
Phase 3 (Days 36-55): Public Site        [████████████████████] 100% ✓ (Done early!)
Phase 4 (Days 56-75): Extended Features  [████████████████████] 100% ✓ (Done early!)
Phase 5 (Days 76-90): Polish & Deploy    [░░░░░░░░░░░░░░░░░░░░]  0%
Phase 6 (Days 91-100): Creative          [░░░░░░░░░░░░░░░░░░░░]  0%

Overall Progress: ~45% complete
```

### What's Done vs What's Missing

| Feature                  | Status | Location                                      |
| ------------------------ | ------ | --------------------------------------------- |
| **DONE**                 |        |                                               |
| Database schema          | ✅     | Supabase                                      |
| Backend API (Posts CRUD) | ✅     | backend/app/main.py                           |
| Backend API (Categories) | ✅     | backend/app/main.py                           |
| Backend API (Tags)       | ✅     | backend/app/main.py                           |
| Backend API (Projects)   | ✅     | backend/app/main.py                           |
| Backend API (Gallery)    | ✅     | backend/app/main.py                           |
| Homepage                 | ✅     | frontend/src/pages/public/Home.jsx            |
| Post Detail Page         | ✅     | frontend/src/pages/public/PostDetail.jsx      |
| Category Pages           | ✅     | frontend/src/pages/public/Category.jsx        |
| Tag Pages                | ✅     | frontend/src/pages/public/Tag.jsx             |
| Search                   | ✅     | frontend/src/pages/public/Search.jsx          |
| Portfolio                | ✅     | frontend/src/pages/public/Portfolio.jsx       |
| Gallery                  | ✅     | frontend/src/pages/public/Gallery.jsx         |
| About Page               | ✅     | frontend/src/pages/public/About.jsx           |
| Contact Page             | ✅     | frontend/src/pages/public/Contact.jsx         |
| Uses Page                | ✅     | frontend/src/pages/public/Uses.jsx            |
| Bookmarks Page           | ✅     | frontend/src/pages/public/Bookmarks.jsx       |
| Dark/Light Mode          | ✅     | frontend/src/contexts/ThemeContext.jsx        |
| Table of Contents        | ✅     | frontend/src/components/post/                 |
| Responsive CSS           | ✅     | frontend/src/styles/                          |
| **NOT DONE**             |        |                                               |
| Authentication           | ❌     | Need: backend middleware + frontend context   |
| Admin Dashboard          | ❌     | Need: frontend/src/pages/admin/Dashboard.jsx  |
| Post Editor              | ❌     | Need: frontend/src/pages/admin/PostEditor.jsx |
| Image Upload             | ❌     | Need: backend route + frontend component      |
| Docker Setup             | ❌     | Need: Dockerfile, docker-compose.yml          |
| CI/CD Pipeline           | ❌     | Need: .github/workflows/                      |

### Your Unique Situation

You built the **public-facing site first** (Phases 3-4) before the **admin system** (Phase 2).

This means:

- ✅ Users can READ posts (if you add them via Supabase directly)
- ❌ You can't CREATE/EDIT posts from the website yet
- ❌ No login system to protect admin features

**Next Priority:** Build the Admin System (Phase 2)

---

## Daily Workflow

### Before You Start Coding (5-10 minutes)

```bash
# 1. Open terminal and navigate to project
cd ~/Desktop/Desktop/Personal-Project/coffee_blog_pixel

# 2. Check git status - what did you change last time?
git status
git log --oneline -5

# 3. Pull latest changes (if working on multiple machines)
git pull origin w1

# 4. Start the servers
# Terminal 1:
make dev-backend
# or: cd backend && source .venv/bin/activate && uvicorn app.main:app --reload

# Terminal 2:
make dev-frontend
# or: cd frontend && npm run dev

# 5. Open in browser
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/docs
```

### Daily Coding Session Structure

```
┌─────────────────────────────────────────────────────────────┐
│  DAILY SESSION (1-2 hours recommended)                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. REVIEW (5 min)                                          │
│     - Check what you did yesterday                          │
│     - Read any notes/TODOs you left                         │
│                                                             │
│  2. PLAN (5 min)                                            │
│     - Pick ONE small task from the task list below          │
│     - Write down what files you'll touch                    │
│                                                             │
│  3. CODE (45-60 min)                                        │
│     - Focus on that ONE task                                │
│     - Test as you go in browser                             │
│     - Don't get distracted by "nice to haves"               │
│                                                             │
│  4. TEST (10 min)                                           │
│     - Does it work in browser?                              │
│     - Did you break anything else?                          │
│     - Check console for errors                              │
│                                                             │
│  5. COMMIT (5 min)                                          │
│     - Stage changes: git add .                              │
│     - Commit with clear message                             │
│     - Push to remote                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Where to Code: Frontend or Backend?

**Rule of Thumb:**

| If you need to...            | Work on...                   | Files to edit                                  |
| ---------------------------- | ---------------------------- | ---------------------------------------------- |
| Show something new on screen | Frontend                     | `frontend/src/`                                |
| Store/retrieve data          | Backend first, then Frontend | `backend/app/` → `frontend/src/services/`      |
| Add a new page               | Frontend                     | `frontend/src/pages/` + `App.jsx`              |
| Add a new API endpoint       | Backend                      | `backend/app/main.py` or `backend/app/routes/` |
| Style something              | Frontend                     | `frontend/src/styles/` or component CSS        |
| Add authentication           | Both                         | Backend middleware → Frontend context          |

**For your current phase (Admin System):**

```
Week 1-2: Backend Auth
  → Focus on: backend/app/

Week 3-4: Admin UI
  → Focus on: frontend/src/pages/admin/

Week 5-6: Post Editor
  → Focus on: frontend/src/components/editor/
```

---

## Task Breakdown: What to Code Next

### Recommended Order (Phase 2: Admin System)

#### Week 1: Authentication Backend

| Day | Task                            | Files                            | Time |
| --- | ------------------------------- | -------------------------------- | ---- |
| 1   | Create auth middleware skeleton | `backend/app/middleware/auth.py` | 1h   |
| 2   | Add login endpoint              | `backend/app/routes/auth.py`     | 1h   |
| 3   | Add JWT token verification      | `backend/app/middleware/auth.py` | 1h   |
| 4   | Protect POST/PUT/DELETE routes  | `backend/app/main.py`            | 1h   |
| 5   | Test auth with API docs         | Browser: localhost:8000/docs     | 30m  |

#### Week 2: Authentication Frontend

| Day | Task                         | Files                                               | Time |
| --- | ---------------------------- | --------------------------------------------------- | ---- |
| 1   | Create AuthContext           | `frontend/src/contexts/AuthContext.jsx`             | 1h   |
| 2   | Create Login page            | `frontend/src/pages/admin/Login.jsx`                | 1h   |
| 3   | Create authService           | `frontend/src/services/authService.js`              | 1h   |
| 4   | Add ProtectedRoute component | `frontend/src/components/common/ProtectedRoute.jsx` | 1h   |
| 5   | Connect Login to backend     | Test login flow                                     | 1h   |

#### Week 3: Admin Dashboard

| Day | Task                              | Files                                           | Time |
| --- | --------------------------------- | ----------------------------------------------- | ---- |
| 1   | Create admin layout               | `frontend/src/components/admin/AdminLayout.jsx` | 1h   |
| 2   | Create Dashboard page             | `frontend/src/pages/admin/Dashboard.jsx`        | 1h   |
| 3   | Add stats cards (post count, etc) | Dashboard.jsx                                   | 1h   |
| 4   | Add recent posts list             | Dashboard.jsx                                   | 1h   |
| 5   | Style admin pages                 | CSS files                                       | 1h   |

#### Week 4: Post Management

| Day | Task                             | Files                                     | Time |
| --- | -------------------------------- | ----------------------------------------- | ---- |
| 1   | Create PostList admin page       | `frontend/src/pages/admin/PostList.jsx`   | 1h   |
| 2   | Add delete post button           | PostList.jsx                              | 1h   |
| 3   | Create PostEditor page skeleton  | `frontend/src/pages/admin/PostEditor.jsx` | 1h   |
| 4   | Add form fields (title, content) | PostEditor.jsx                            | 1h   |
| 5   | Connect to backend API           | PostEditor.jsx + postService.js           | 1h   |

#### Week 5-6: Markdown Editor

| Day | Task                            | Files                                               | Time |
| --- | ------------------------------- | --------------------------------------------------- | ---- |
| 1-2 | Create split-view editor        | `frontend/src/components/editor/MarkdownEditor.jsx` | 2h   |
| 3   | Add live preview                | MarkdownEditor.jsx                                  | 1h   |
| 4   | Add toolbar (bold, italic, etc) | `frontend/src/components/editor/EditorToolbar.jsx`  | 1h   |
| 5-6 | Add image upload                | Backend route + Frontend component                  | 2h   |

---

## Testing Checklist

### Before Every Commit

```markdown
□ Frontend compiles without errors (check terminal)
□ No red errors in browser console (F12 → Console)
□ Backend runs without crashes (check terminal)
□ The feature I added actually works
□ I didn't break existing features (quick click-through)
```

### Quick Smoke Test (2 minutes)

```markdown
□ Homepage loads
□ Can click on a post
□ Search works
□ Dark mode toggle works
□ No console errors
```

---

## Git Commit Guide

### When to Commit

- ✅ After completing ONE small feature
- ✅ After fixing ONE bug
- ✅ Before taking a break
- ✅ When code is in a working state
- ❌ Don't commit broken code
- ❌ Don't wait until "everything is done"

### Commit Command Sequence

```bash
# 1. See what changed
git status
git diff

# 2. Stage changes
git add .
# or stage specific files:
git add frontend/src/pages/admin/Login.jsx

# 3. Commit with message
git commit -m "[type] Short description"

# 4. Push to remote
git push origin w1
```

### Commit Message Format

```
[type] Short description (max 50 chars)

Types:
  [feat]     - New feature
  [fix]      - Bug fix
  [style]    - CSS/UI changes
  [refactor] - Code restructuring
  [docs]     - Documentation
  [chore]    - Maintenance

Examples:
  [feat] Add login page with form validation
  [fix] Correct dark mode toggle persistence
  [style] Update admin dashboard layout
  [refactor] Extract auth logic to separate hook
```

---

## Common Problems & Solutions

### "I don't know where to start"

1. Pick the FIRST task from the task list above
2. Open ONLY the files mentioned
3. Don't think about other features
4. Just make that ONE thing work

### "I broke something"

```bash
# See what you changed
git diff

# Undo all changes (careful!)
git checkout .

# Or undo specific file
git checkout frontend/src/App.jsx
```

### "Backend won't start"

```bash
# Check if port is in use
lsof -i :8000

# Kill the process
kill -9 <PID>

# Or use different port
uvicorn app.main:app --reload --port 8001
```

### "Frontend won't start"

```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm run dev
```

### "I'm stuck on a bug"

1. Read the error message carefully
2. Google the exact error message
3. Add console.log() to trace the problem
4. Take a 5-minute break, then look again
5. Ask Claude for help with the specific error

---

## Daily Checklist Template

Copy this for each day:

```markdown
## Date: \_\_\_\_

### Today's Task

- [ ] Task: **\*\***\_\_\_\_**\*\***
- [ ] Files: **\*\***\_\_\_\_**\*\***

### Before Coding

- [ ] git pull
- [ ] Servers running
- [ ] Yesterday's code still works

### Coding Session

- [ ] Task completed
- [ ] Tested in browser
- [ ] No console errors

### After Coding

- [ ] git add .
- [ ] git commit -m "[type] description"
- [ ] git push

### Notes for Tomorrow

---
```

---

## Quick Reference

### Start Servers

```bash
make dev-backend   # Terminal 1
make dev-frontend  # Terminal 2
```

### URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Key Directories

```
frontend/src/pages/admin/    # Admin pages (to create)
frontend/src/components/     # Reusable components
frontend/src/services/       # API calls
backend/app/routes/          # API endpoints
backend/app/middleware/      # Auth (to create)
```

### Useful Commands

```bash
git status          # See changes
git log --oneline   # See recent commits
make lint           # Check code quality
```
