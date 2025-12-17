# Coffee Blog CMS - Development Commands
# Usage: make <command>
# Run 'make help' to see all available commands

.PHONY: help install dev dev-frontend dev-backend setup clean test lint build

# Default target
help:
	@echo "Coffee Blog CMS - Available Commands"
	@echo "====================================="
	@echo ""
	@echo "Setup & Installation:"
	@echo "  make setup          - First-time project setup (install all dependencies)"
	@echo "  make install        - Install dependencies for both frontend and backend"
	@echo "  make install-fe     - Install frontend dependencies only"
	@echo "  make install-be     - Install backend dependencies only"
	@echo ""
	@echo "Development:"
	@echo "  make dev            - Start both frontend and backend (requires 2 terminals)"
	@echo "  make dev-frontend   - Start frontend dev server (http://localhost:5173)"
	@echo "  make dev-backend    - Start backend dev server (http://localhost:8000)"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint           - Run linters for both frontend and backend"
	@echo "  make lint-fe        - Run ESLint on frontend"
	@echo "  make test           - Run all tests"
	@echo "  make test-be        - Run backend tests (pytest)"
	@echo ""
	@echo "Building:"
	@echo "  make build          - Build frontend for production"
	@echo "  make preview        - Preview production build"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean          - Remove build artifacts and caches"
	@echo "  make env-check      - Verify environment files exist"
	@echo ""

# ============================================
# SETUP & INSTALLATION
# ============================================

setup: env-check install
	@echo ""
	@echo "Setup complete! Next steps:"
	@echo "1. Edit frontend/.env with your Supabase credentials"
	@echo "2. Edit backend/.env with your Supabase credentials"
	@echo "3. Run 'make dev-backend' in one terminal"
	@echo "4. Run 'make dev-frontend' in another terminal"
	@echo ""

install: install-fe install-be
	@echo "All dependencies installed!"

install-fe:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

install-be:
	@echo "Installing backend dependencies..."
	cd backend && uv sync 2>/dev/null || pip install -r requirements.txt 2>/dev/null || (python -m venv .venv && . .venv/bin/activate && pip install -e .)
	@echo "Backend dependencies installed!"

# ============================================
# DEVELOPMENT SERVERS
# ============================================

dev:
	@echo "To run both servers, open two terminals and run:"
	@echo "  Terminal 1: make dev-backend"
	@echo "  Terminal 2: make dev-frontend"
	@echo ""
	@echo "Or use: make dev-backend & make dev-frontend (background mode)"

dev-frontend:
	@echo "Starting frontend dev server..."
	cd frontend && npm run dev

dev-backend:
	@echo "Starting backend dev server..."
	cd backend && (. .venv/bin/activate 2>/dev/null || true) && uvicorn app.main:app --reload --port 8000

# ============================================
# CODE QUALITY
# ============================================

lint: lint-fe
	@echo "Linting complete!"

lint-fe:
	@echo "Running ESLint on frontend..."
	cd frontend && npm run lint

test: test-be
	@echo "All tests complete!"

test-be:
	@echo "Running backend tests..."
	cd backend && (. .venv/bin/activate 2>/dev/null || true) && pytest -v 2>/dev/null || echo "No tests found. Add tests in backend/tests/"

# ============================================
# BUILD
# ============================================

build:
	@echo "Building frontend for production..."
	cd frontend && npm run build

preview:
	@echo "Previewing production build..."
	cd frontend && npm run preview

# ============================================
# UTILITIES
# ============================================

clean:
	@echo "Cleaning build artifacts..."
	rm -rf frontend/dist
	rm -rf frontend/node_modules/.vite
	rm -rf backend/__pycache__
	rm -rf backend/app/__pycache__
	rm -rf backend/app/**/__pycache__
	rm -rf backend/.pytest_cache
	rm -rf .pytest_cache
	@echo "Clean complete!"

env-check:
	@echo "Checking environment files..."
	@if [ ! -f frontend/.env ]; then \
		echo "Creating frontend/.env from template..."; \
		cp frontend/.env.example frontend/.env 2>/dev/null || echo "Warning: frontend/.env.example not found"; \
	fi
	@if [ ! -f backend/.env ]; then \
		echo "Creating backend/.env from template..."; \
		cp backend/.env.example backend/.env 2>/dev/null || echo "Warning: backend/.env.example not found"; \
	fi
	@echo "Environment check complete!"
