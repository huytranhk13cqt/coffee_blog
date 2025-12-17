#!/bin/bash

# ============================================
# Coffee Blog Project Initializer
# ============================================
# Usage: ./scripts/init-project.sh <project-name>
# This script creates a new full-stack project with the same structure
# as the Coffee Blog CMS project.

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check arguments
if [ -z "$1" ]; then
    echo "Usage: $0 <project-name>"
    echo "Example: $0 my-blog"
    exit 1
fi

PROJECT_NAME=$1
PROJECT_DIR=$(pwd)/$PROJECT_NAME

echo ""
echo "============================================"
echo "  Creating Project: $PROJECT_NAME"
echo "============================================"
echo ""

# Check if directory exists
if [ -d "$PROJECT_DIR" ]; then
    print_error "Directory '$PROJECT_NAME' already exists!"
    exit 1
fi

# Create project structure
print_step "Creating project structure..."

mkdir -p "$PROJECT_DIR"/{frontend,backend,.claude/skills}
mkdir -p "$PROJECT_DIR"/frontend/src/{components/{common,layout,admin},pages/{public,admin},hooks,services,contexts,styles,utils,assets}
mkdir -p "$PROJECT_DIR"/backend/app/{models,routes,services,middleware,utils}
mkdir -p "$PROJECT_DIR"/backend/tests
mkdir -p "$PROJECT_DIR"/scripts
mkdir -p "$PROJECT_DIR"/nginx
mkdir -p "$PROJECT_DIR"/docs

print_success "Project structure created"

# Create .gitignore
print_step "Creating .gitignore..."
cat > "$PROJECT_DIR/.gitignore" << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
*.pyo
.venv/
venv/
env/
*.egg-info/

# Environment
.env
.env.local
.env.*.local

# Build outputs
dist/
build/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Testing
coverage/
.pytest_cache/
.coverage
htmlcov/

# Temporary
*.tmp
*.temp
EOF
print_success ".gitignore created"

# Create frontend package.json
print_step "Creating frontend/package.json..."
cat > "$PROJECT_DIR/frontend/package.json" << EOF
{
  "name": "$PROJECT_NAME-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "eslint": "^9.15.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.12.0",
    "vite": "^6.0.1"
  }
}
EOF
print_success "frontend/package.json created"

# Create frontend vite.config.js
print_step "Creating frontend/vite.config.js..."
cat > "$PROJECT_DIR/frontend/vite.config.js" << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
EOF
print_success "frontend/vite.config.js created"

# Create frontend eslint.config.js
print_step "Creating frontend/eslint.config.js..."
cat > "$PROJECT_DIR/frontend/eslint.config.js" << 'EOF'
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z]' }],
    },
  },
]
EOF
print_success "frontend/eslint.config.js created"

# Create frontend index.html
print_step "Creating frontend/index.html..."
cat > "$PROJECT_DIR/frontend/index.html" << EOF
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$PROJECT_NAME</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
EOF
print_success "frontend/index.html created"

# Create frontend main.jsx
print_step "Creating frontend/src/main.jsx..."
cat > "$PROJECT_DIR/frontend/src/main.jsx" << 'EOF'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
EOF
print_success "frontend/src/main.jsx created"

# Create frontend App.jsx
print_step "Creating frontend/src/App.jsx..."
cat > "$PROJECT_DIR/frontend/src/App.jsx" << 'EOF'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <main>
      <h1>Welcome to your new project!</h1>
      <p>Edit src/App.jsx to get started.</p>
    </main>
  )
}

export default App
EOF
print_success "frontend/src/App.jsx created"

# Create frontend globals.css
print_step "Creating frontend/src/styles/globals.css..."
cat > "$PROJECT_DIR/frontend/src/styles/globals.css" << 'EOF'
/* CSS Variables */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-text: #1e293b;
  --color-border: #e2e8f0;

  --font-sans: system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, monospace;

  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-text: #f1f5f9;
    --color-border: #334155;
  }
}

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-background);
  color: var(--color-text);
  line-height: 1.6;
}

a {
  color: var(--color-primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
EOF
print_success "frontend/src/styles/globals.css created"

# Create frontend .env.example
print_step "Creating frontend/.env.example..."
cat > "$PROJECT_DIR/frontend/.env.example" << 'EOF'
# Frontend Environment Variables
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
EOF
print_success "frontend/.env.example created"

# Create frontend api service
print_step "Creating frontend/src/services/api.js..."
cat > "$PROJECT_DIR/frontend/src/services/api.js" << 'EOF'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function request(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
EOF
print_success "frontend/src/services/api.js created"

# Create backend pyproject.toml
print_step "Creating backend/pyproject.toml..."
cat > "$PROJECT_DIR/backend/pyproject.toml" << EOF
[project]
name = "$PROJECT_NAME-backend"
version = "0.1.0"
description = "Backend API for $PROJECT_NAME"
requires-python = ">=3.10"
dependencies = [
    "fastapi>=0.115.0",
    "uvicorn>=0.32.0",
    "python-dotenv>=1.0.0",
    "supabase>=2.0.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.0.0",
    "pytest-asyncio>=0.24.0",
    "httpx>=0.27.0",
]
EOF
print_success "backend/pyproject.toml created"

# Create backend .python-version
print_step "Creating backend/.python-version..."
echo "3.10" > "$PROJECT_DIR/backend/.python-version"
print_success "backend/.python-version created"

# Create backend .env.example
print_step "Creating backend/.env.example..."
cat > "$PROJECT_DIR/backend/.env.example" << 'EOF'
# Backend Environment Variables
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here
JWT_SECRET=your-super-secret-jwt-key-change-this
ENVIRONMENT=development
EOF
print_success "backend/.env.example created"

# Create backend main.py
print_step "Creating backend/app/main.py..."
cat > "$PROJECT_DIR/backend/app/main.py" << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="API",
    version="0.1.0",
    description="Backend API"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "API is running", "status": "ok"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Add your routes here
# from app.routes import posts, categories
# app.include_router(posts.router)
EOF
print_success "backend/app/main.py created"

# Create backend config.py
print_step "Creating backend/app/config.py..."
cat > "$PROJECT_DIR/backend/app/config.py" << 'EOF'
import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    SUPABASE_SERVICE_KEY: str = os.getenv("SUPABASE_SERVICE_KEY", "")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "dev-secret-change-me")
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")

    def __init__(self):
        if not self.SUPABASE_URL or not self.SUPABASE_KEY:
            print("Warning: Supabase credentials not configured")

settings = Settings()
EOF
print_success "backend/app/config.py created"

# Create backend database.py
print_step "Creating backend/app/database.py..."
cat > "$PROJECT_DIR/backend/app/database.py" << 'EOF'
from supabase import create_client, Client
from app.config import settings

supabase: Client = None

def get_supabase() -> Client:
    global supabase
    if supabase is None:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
    return supabase
EOF
print_success "backend/app/database.py created"

# Create backend __init__.py files
touch "$PROJECT_DIR/backend/app/__init__.py"
touch "$PROJECT_DIR/backend/app/models/__init__.py"
touch "$PROJECT_DIR/backend/app/routes/__init__.py"
touch "$PROJECT_DIR/backend/app/services/__init__.py"
touch "$PROJECT_DIR/backend/app/middleware/__init__.py"
touch "$PROJECT_DIR/backend/app/utils/__init__.py"
print_success "Python package files created"

# Create Makefile
print_step "Creating Makefile..."
cat > "$PROJECT_DIR/Makefile" << 'EOF'
.PHONY: help install dev dev-frontend dev-backend setup clean test lint build

help:
	@echo "Available commands:"
	@echo "  make setup        - First-time project setup"
	@echo "  make install      - Install all dependencies"
	@echo "  make dev-frontend - Start frontend dev server"
	@echo "  make dev-backend  - Start backend dev server"
	@echo "  make lint         - Run linters"
	@echo "  make test         - Run tests"
	@echo "  make build        - Build for production"
	@echo "  make clean        - Remove build artifacts"

setup: env-check install
	@echo "Setup complete! Edit .env files and run 'make dev-backend' and 'make dev-frontend'"

install:
	cd frontend && npm install
	cd backend && pip install -e ".[dev]" 2>/dev/null || pip install -e .

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && uvicorn app.main:app --reload --port 8000

lint:
	cd frontend && npm run lint

test:
	cd backend && pytest -v

build:
	cd frontend && npm run build

clean:
	rm -rf frontend/dist frontend/node_modules/.vite
	rm -rf backend/__pycache__ backend/app/__pycache__

env-check:
	@test -f frontend/.env || cp frontend/.env.example frontend/.env
	@test -f backend/.env || cp backend/.env.example backend/.env
EOF
print_success "Makefile created"

# Create CLAUDE.md
print_step "Creating .claude/CLAUDE.md..."
cat > "$PROJECT_DIR/.claude/CLAUDE.md" << EOF
# CLAUDE.md

## Project: $PROJECT_NAME

### Tech Stack
- **Frontend:** React + Vite
- **Backend:** FastAPI + Python
- **Database:** Supabase (PostgreSQL)

### Quick Commands
\`\`\`bash
# Setup
make setup

# Development
make dev-frontend  # Terminal 1
make dev-backend   # Terminal 2

# Code quality
make lint
make test
\`\`\`

### Project Structure
\`\`\`
$PROJECT_NAME/
├── frontend/          # React + Vite
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── services/
│       └── styles/
├── backend/           # FastAPI
│   └── app/
│       ├── models/
│       ├── routes/
│       ├── services/
│       └── utils/
└── .claude/           # Claude Code config
\`\`\`

### Naming Conventions
- React components: PascalCase.jsx
- Python files: snake_case.py
- CSS files: kebab-case.css
EOF
print_success ".claude/CLAUDE.md created"

# Create README.md
print_step "Creating README.md..."
cat > "$PROJECT_DIR/README.md" << EOF
# $PROJECT_NAME

A full-stack web application built with React and FastAPI.

## Tech Stack

- **Frontend:** React 19 + Vite
- **Backend:** FastAPI + Python 3.10+
- **Database:** Supabase (PostgreSQL)

## Quick Start

\`\`\`bash
# 1. Setup project
make setup

# 2. Configure environment
# Edit frontend/.env and backend/.env with your Supabase credentials

# 3. Start development servers
make dev-backend   # Terminal 1: http://localhost:8000
make dev-frontend  # Terminal 2: http://localhost:5173
\`\`\`

## Project Structure

\`\`\`
$PROJECT_NAME/
├── frontend/          # React frontend
├── backend/           # FastAPI backend
├── .claude/           # Claude Code configuration
├── scripts/           # Utility scripts
├── docs/              # Documentation
└── Makefile           # Development commands
\`\`\`

## Available Commands

| Command | Description |
|---------|-------------|
| \`make setup\` | First-time project setup |
| \`make dev-frontend\` | Start frontend dev server |
| \`make dev-backend\` | Start backend dev server |
| \`make lint\` | Run code linters |
| \`make test\` | Run tests |
| \`make build\` | Build for production |

## License

MIT
EOF
print_success "README.md created"

# Initialize git
print_step "Initializing git repository..."
cd "$PROJECT_DIR"
git init
git add .
git commit -m "Initial commit: Project scaffolding"
print_success "Git repository initialized"

# Final output
echo ""
echo "============================================"
echo -e "${GREEN}  Project '$PROJECT_NAME' created successfully!${NC}"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. cd $PROJECT_NAME"
echo "  2. make setup"
echo "  3. Edit frontend/.env and backend/.env"
echo "  4. make dev-backend  (in terminal 1)"
echo "  5. make dev-frontend (in terminal 2)"
echo ""
echo "Happy coding!"
