# Projects CRUD Implementation - Learning Session

**Date:** 18/12/2025
**Topic:** Implementing Projects CRUD with Authentication
**Status:** ✅ Completed

---

## Context

After completing Tags CRUD, we moved to implement Projects CRUD for the Portfolio feature. This follows the same pattern established in Categories and Tags.

---

## Project Status Before This Session

| Feature | Repository | API Endpoints | Auth |
|---------|------------|---------------|------|
| Posts | Full CRUD | GET/POST/PUT/DELETE | Protected |
| Categories | Full CRUD | GET/POST/PUT/DELETE | Protected |
| Tags | Full CRUD | GET/POST/PUT/DELETE | Protected |
| **Projects** | Only READ | Only GET | Missing |

---

## Step 1: ProjectUpdate Model

### Learning: Why All Fields Are Optional in Update Models

**Question:** Why are all fields `Optional` in `CategoryUpdate` model?

**Answer:** To allow **partial updates**.

**Explanation:**

```python
# CategoryCreate - When CREATING
class CategoryCreate(BaseModel):
    name: str = Field(...)      # REQUIRED
    slug: Optional[str] = None  # Optional
    description: Optional[str]  # Optional

# CategoryUpdate - When UPDATING
class CategoryUpdate(BaseModel):
    name: Optional[str] = None        # Optional - only update if sent
    slug: Optional[str] = None        # Optional
    description: Optional[str] = None # Optional
```

**Real Example:**
```json
// Only want to change description, keep name and slug
PUT /api/categories/{id}
{
  "description": "New description"
}
```

In repository, `model_dump(exclude_none=True)` removes `None` fields, only updating what was sent.

---

### Bug Found: Default Empty List vs None

**Original Code (Wrong):**
```python
class ProjectUpdate(BaseModel):
    tech_stack: Optional[List[str]] = []  # BUG!
```

**Problem:** With `model_dump(exclude_none=True)`:

| Value | Excluded by `exclude_none=True`? |
|-------|----------------------------------|
| `None` | Yes, removed |
| `[]` (empty list) | No, kept! |

**Bug Scenario:**
```json
// User only wants to update title
PUT /api/projects/{id}
{
  "title": "New Title"
}

// But tech_stack defaults to [], so data becomes:
{
  "title": "New Title",
  "tech_stack": []  // Accidentally clears project's tech_stack!
}
```

**Fixed Code:**
```python
class ProjectUpdate(BaseModel):
    tech_stack: Optional[List[str]] = None  # Correct!
```

---

## Step 2: Repository Methods

### Key Differences from Categories/Tags

| Aspect | Categories/Tags | Projects |
|--------|-----------------|----------|
| Has slug? | Yes, auto-generated | No slug column |
| Slug generation needed? | Yes | No |

**Projects table schema:**
```
projects table:
├── id UUID
├── title VARCHAR(255)
├── description TEXT
├── thumbnail_url TEXT
├── tech_stack TEXT[]
├── demo_url TEXT
├── github_url TEXT
├── sort_order INTEGER
└── created_at TIMESTAMP

// No slug column - identified by id only
```

### Repository Implementation Pattern

```python
def create(self, project_data: ProjectCreate) -> dict:
    """Create new project."""
    data = project_data.model_dump(exclude_none=True)
    # No slug generation needed for projects
    response = supabase.table(self.TABLE_NAME).insert(data).execute()
    return response.data[0] if response.data else None

def update(self, project_id: UUID, project_data: ProjectUpdate) -> Optional[dict]:
    """Update project by ID."""
    data = project_data.model_dump(exclude_none=True)

    # Handle empty update - return existing record
    if not data:
        return self.get_by_id(project_id)

    response = supabase.table(self.TABLE_NAME).update(data).eq(
        "id", str(project_id)
    ).execute()
    return response.data[0] if response.data else None

def delete(self, project_id: UUID) -> bool:
    """Delete project by ID."""
    response = supabase.table(self.TABLE_NAME).delete().eq(
        "id", str(project_id)
    ).execute()
    return len(response.data) > 0  # Consistent pattern
```

---

## Python Concept: `__init__.py` and Re-exports

### Question Asked

> "I don't know why I need to export models at `models/__init__.py`"

### Explanation

`__init__.py` turns a folder into a **Python package** and allows **re-exporting** modules.

#### Without `__init__.py` exports:

```python
# main.py - Must import from each file separately
from app.models.post import PostCreate, PostResponse, PostUpdate
from app.models.category import CategoryCreate, CategoryResponse, CategoryUpdate
from app.models.tag import TagCreate, TagResponse, TagUpdate
from app.models.project import ProjectCreate, ProjectResponse, ProjectUpdate
# Long, hard to maintain
```

#### With `__init__.py` exports:

```python
# main.py - Clean import from one place
from app.models import (
    PostCreate, PostResponse, PostUpdate,
    CategoryCreate, CategoryResponse, CategoryUpdate,
    TagCreate, TagResponse, TagUpdate,
    ProjectCreate, ProjectResponse, ProjectUpdate,
)
# Clean, readable, single source
```

#### How it works:

```python
# models/__init__.py
from app.models.post import PostCreate, PostResponse      # Re-export
from app.models.category import CategoryCreate            # Re-export

# Now other modules can:
from app.models import PostCreate  # Instead of from app.models.post
```

### Benefits

| Benefit | Explanation |
|---------|-------------|
| **Clean imports** | One import line instead of many |
| **Encapsulation** | Hide internal folder structure |
| **Easy refactoring** | Rename files without affecting other code |
| **Central registry** | Know immediately which models are available |

### Documentation Reference

- [Python Packages Documentation](https://docs.python.org/3/tutorial/modules.html#packages)
- [Real Python - Python Modules and Packages](https://realpython.com/python-modules-packages/)

---

## Bug Encountered: Supabase Chaining

### Error

```
AttributeError: 'SyncQueryRequestBuilder' object has no attribute 'select'
```

### Wrong Code

```python
response = supabase.table(self.TABLE_NAME).insert(data).select("*").single().execute()
```

### Problem

Supabase Python client does **NOT** support chaining `.select()` after `.insert()`.

### Correct Code

```python
response = supabase.table(self.TABLE_NAME).insert(data).execute()
return response.data[0] if response.data else None
```

### Lesson Learned

Always follow existing patterns in the codebase. When trying new syntax, verify it's supported by the library.

---

## Files Modified/Created

```
backend/
├── app/
│   ├── models/
│   │   ├── project.py            ← MODIFIED: Added ProjectUpdate class
│   │   └── __init__.py           ← MODIFIED: Export ProjectUpdate
│   ├── services/
│   │   └── project_repository.py ← MODIFIED: Added CRUD methods
│   └── main.py                   ← MODIFIED: Added protected endpoints
```

---

## Completed Tasks

- [x] Add `ProjectUpdate` model to `project.py`
- [x] Add `create()`, `update()`, `delete()` to `project_repository.py`
- [x] Export `ProjectUpdate` in `models/__init__.py`
- [x] Add POST/PUT/DELETE endpoints in `main.py`
- [x] Test all endpoints with Postman

---

## Test Results

| Endpoint | Method | Auth Required | Result |
|----------|--------|---------------|--------|
| `/api/projects` | POST | ✅ Yes | ✅ Passed |
| `/api/projects/{id}` | PUT | ✅ Yes | ✅ Passed |
| `/api/projects/{id}` | DELETE | ✅ Yes | ✅ Passed |

---

## Key Learnings Summary

1. **Partial Updates**: Use `Optional` fields + `exclude_none=True` for PATCH-like behavior
2. **Default Values**: Use `None` not `[]` for Optional lists to avoid accidental overwrites
3. **Consistency**: Follow existing patterns in codebase (return types, error handling)
4. **Python Packages**: `__init__.py` enables clean imports through re-exports
5. **No Slug for Projects**: Unlike Posts/Categories/Tags, Projects are identified by UUID only
6. **Supabase Chaining**: Not all method chains are supported - stick to documented patterns

---

## Project Status After This Session

| Feature | Repository | API Endpoints | Auth |
|---------|------------|---------------|------|
| Posts | ✅ Full CRUD | ✅ GET/POST/PUT/DELETE | ✅ Protected |
| Categories | ✅ Full CRUD | ✅ GET/POST/PUT/DELETE | ✅ Protected |
| Tags | ✅ Full CRUD | ✅ GET/POST/PUT/DELETE | ✅ Protected |
| **Projects** | ✅ Full CRUD | ✅ GET/POST/PUT/DELETE | ✅ Protected |

**All backend CRUD operations are now complete!**

---

**Session completed: 18/12/2025**
