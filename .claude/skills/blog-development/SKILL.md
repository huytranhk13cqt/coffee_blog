---
name: blog-cms-development
description: Development guidelines for Coffee Blog CMS project. Use when working on React frontend, FastAPI backend, Supabase database, project architecture, or needing project context and conventions.
---

# Coffee Blog CMS Development Guide

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 19 + Vite | UI with CSR |
| Styling | CSS Modules / TailwindCSS | Component styling |
| Backend | FastAPI + Pydantic | REST API |
| Database | Supabase (PostgreSQL) | Data + Auth + Storage |
| DevOps | Docker + Nginx | Deployment |

## Quick Commands

```bash
# Frontend development
cd frontend && npm run dev          # http://localhost:5173

# Backend development
cd backend && source .venv/bin/activate
uvicorn app.main:app --reload --port 8000

# Docker (full stack)
docker-compose up -d
```

## Project Structure

```
coffee_blog_pixel/
├── backend/app/
│   ├── main.py           # FastAPI entry point
│   ├── config.py         # Environment config
│   ├── database.py       # Supabase client
│   ├── models/           # Pydantic schemas
│   ├── routes/           # API endpoints
│   ├── services/         # Business logic
│   └── utils/            # Helpers
├── frontend/src/
│   ├── components/       # Reusable UI
│   ├── pages/            # Route pages
│   ├── hooks/            # Custom hooks
│   ├── services/         # API calls
│   ├── contexts/         # React contexts
│   └── styles/           # CSS files
└── .claude/              # Claude config
```

## Naming Conventions

### JavaScript/React
- Components: `PascalCase.jsx` (PostCard.jsx)
- Hooks: `useCamelCase.js` (usePosts.js)
- Utils: `camelCase.js` (formatDate.js)
- CSS: `kebab-case.css` or `Component.module.css`

### Python/FastAPI
- Files: `snake_case.py` (post_service.py)
- Classes: `PascalCase` (PostRepository)
- Functions: `snake_case` (get_post_by_id)
- Constants: `SCREAMING_SNAKE_CASE`

## API Response Format

All endpoints return:

```json
{
  "success": true,
  "data": { },
  "message": "Optional message",
  "error": null
}
```

## Common Patterns

### React Component Template
```jsx
function ComponentName({ prop1, prop2 }) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Side effects
  }, [dependencies]);

  return (
    <div className="component-name">
      {/* JSX */}
    </div>
  );
}

export default ComponentName;
```

### FastAPI Endpoint Template
```python
@router.get("/{id}", response_model=ResponseSchema)
async def get_item(id: str, db: Database = Depends(get_db)):
    """Get item by ID."""
    result = await service.get_by_id(id)
    if not result:
        raise HTTPException(status_code=404, detail="Not found")
    return {"success": True, "data": result}
```

## Full Documentation

- Project overview: See `README.md`
- Development instructions: See `CLAUDE.md`
