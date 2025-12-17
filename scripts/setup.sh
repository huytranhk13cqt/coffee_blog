#!/bin/bash

# ============================================
# Coffee Blog CMS - Quick Setup Script
# ============================================
# Usage: ./scripts/setup.sh
# This script sets up the entire project in one command

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo ""
echo -e "${BLUE}============================================${NC}"
echo -e "${BLUE}  Coffee Blog CMS - Setup Script${NC}"
echo -e "${BLUE}============================================${NC}"
echo ""

# Get project root directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_ROOT"

# Step 1: Check for environment files
echo -e "${BLUE}[1/5]${NC} Checking environment files..."

if [ ! -f frontend/.env ]; then
    if [ -f frontend/.env.example ]; then
        cp frontend/.env.example frontend/.env
        echo -e "${YELLOW}  Created frontend/.env from template - please edit with your credentials${NC}"
    else
        echo -e "${YELLOW}  Warning: frontend/.env.example not found${NC}"
    fi
else
    echo -e "${GREEN}  frontend/.env exists${NC}"
fi

if [ ! -f backend/.env ]; then
    if [ -f backend/.env.example ]; then
        cp backend/.env.example backend/.env
        echo -e "${YELLOW}  Created backend/.env from template - please edit with your credentials${NC}"
    else
        echo -e "${YELLOW}  Warning: backend/.env.example not found${NC}"
    fi
else
    echo -e "${GREEN}  backend/.env exists${NC}"
fi

# Step 2: Install frontend dependencies
echo ""
echo -e "${BLUE}[2/5]${NC} Installing frontend dependencies..."
cd "$PROJECT_ROOT/frontend"
npm install
echo -e "${GREEN}  Frontend dependencies installed${NC}"

# Step 3: Install backend dependencies
echo ""
echo -e "${BLUE}[3/5]${NC} Installing backend dependencies..."
cd "$PROJECT_ROOT/backend"

# Try uv first, then pip
if command -v uv &> /dev/null; then
    echo "  Using uv package manager..."
    uv sync
elif [ -f "pyproject.toml" ]; then
    echo "  Using pip with pyproject.toml..."
    if [ ! -d ".venv" ]; then
        python3 -m venv .venv
    fi
    source .venv/bin/activate
    pip install -e .
else
    echo "  Using pip with requirements.txt..."
    if [ ! -d ".venv" ]; then
        python3 -m venv .venv
    fi
    source .venv/bin/activate
    pip install fastapi uvicorn python-dotenv supabase
fi
echo -e "${GREEN}  Backend dependencies installed${NC}"

# Step 4: Verify setup
echo ""
echo -e "${BLUE}[4/5]${NC} Verifying setup..."
cd "$PROJECT_ROOT"

# Check frontend
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}  Frontend: OK${NC}"
else
    echo -e "${YELLOW}  Frontend: node_modules not found${NC}"
fi

# Check backend
if [ -d "backend/.venv" ] || command -v uv &> /dev/null; then
    echo -e "${GREEN}  Backend: OK${NC}"
else
    echo -e "${YELLOW}  Backend: virtual environment not found${NC}"
fi

# Step 5: Print next steps
echo ""
echo -e "${BLUE}[5/5]${NC} Setup complete!"
echo ""
echo -e "${GREEN}============================================${NC}"
echo -e "${GREEN}  Setup Complete!${NC}"
echo -e "${GREEN}============================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "  1. Edit environment files (if not already done):"
echo "     - frontend/.env"
echo "     - backend/.env"
echo ""
echo "  2. Start the development servers:"
echo ""
echo "     Terminal 1 (Backend):"
echo "       cd backend && source .venv/bin/activate"
echo "       uvicorn app.main:app --reload --port 8000"
echo ""
echo "     Terminal 2 (Frontend):"
echo "       cd frontend && npm run dev"
echo ""
echo "  Or use the Makefile:"
echo "     make dev-backend   # Terminal 1"
echo "     make dev-frontend  # Terminal 2"
echo ""
echo "  Access:"
echo "     Frontend: http://localhost:5173"
echo "     Backend:  http://localhost:8000"
echo "     API Docs: http://localhost:8000/docs"
echo ""
