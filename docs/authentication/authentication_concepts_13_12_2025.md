# Authentication Concepts - Learning Session

**Date:** 13/12/2024
**Topic:** Understanding Authentication before Implementation
**Status:** Q&A Session

---

## Question 1: Authentication vs Authorization

### Your Answer

> Authentication is the process of verifying who the user is, whether it's the real person or an imposter. Authorization, on the other hand, is different; it's about granting permissions and specifying the authority of each individual user after authentication.

### Feedback: ✅ Correct!

Your understanding is accurate. Let me add some context:

| Concept            | Question it Answers | Example                                     |
| ------------------ | ------------------- | ------------------------------------------- |
| **Authentication** | "Who are you?"      | Login with email/password                   |
| **Authorization**  | "What can you do?"  | Admin can delete posts, regular user cannot |

**Real-world analogy:**

- **Authentication** = Showing your ID at the airport (proving who you are)
- **Authorization** = Your boarding pass (what flight you're allowed on)

---

## Question 2: JWT (JSON Web Token)

### Your Answer

> JWT is a token used for authentication or authorization.

### Feedback: ✅ Partially Correct - Needs More Depth

Your answer is correct but incomplete. Let me expand:

**WHY do we use tokens instead of sending username/password every time?**

1. **Security** - Sending password with every request is risky
2. **Stateless** - Server doesn't need to store session data
3. **Expiration** - Tokens can expire (e.g., after 1 hour)
4. **Information** - JWT can carry user info (user_id, role)

**How JWT works:**

```
1. User logs in with email/password
2. Server verifies credentials
3. Server creates JWT token with user info
4. Server sends token to client
5. Client stores token (localStorage or cookie)
6. Client sends token with every request (in header)
7. Server verifies token (no database lookup needed!)
```

**JWT Structure (3 parts separated by dots):**

```
xxxxx.yyyyy.zzzzz
  │      │      │
  │      │      └── Signature (verifies token wasn't tampered)
  │      └── Payload (user data: id, email, role)
  └── Header (algorithm info)
```

**Documentation to read:**

- JWT Introduction: https://jwt.io/introduction
- Supabase Auth: https://supabase.com/docs/guides/auth

---

## Question 3: Public vs Protected Endpoints

### Your Answer

> Endpoints that anyone should be able to access are: Categories API Endpoints, Projects API Endpoints (Portfolio), Tags API Endpoints, Gallery API Endpoints.
>
> Endpoints that only the admin should be able to access are: Posts API Endpoints

### Feedback: ⚠️ Partially Correct - Important Distinction Needed!

You're on the right track, but there's a key distinction:

**It's not about the RESOURCE, it's about the ACTION (HTTP method)**

| HTTP Method | Action          | Who Can Access         |
| ----------- | --------------- | ---------------------- |
| `GET`       | Read data       | Everyone (public)      |
| `POST`      | Create new      | Admin only (protected) |
| `PUT`       | Update existing | Admin only (protected) |
| `DELETE`    | Remove          | Admin only (protected) |

### Corrected Answer:

**PUBLIC (anyone can access):**

```
GET  /api/posts              ← Read posts (public)
GET  /api/posts/{slug}       ← Read single post (public)
GET  /api/posts/search       ← Search posts (public)
GET  /api/categories         ← Read categories (public)
GET  /api/categories/{slug}  ← Read single category (public)
GET  /api/tags               ← Read tags (public)
GET  /api/tags/{slug}        ← Read single tag (public)
GET  /api/projects           ← Read projects (public)
GET  /api/gallery            ← Read gallery (public)
```

**PROTECTED (admin only):**

```
POST   /api/posts            ← Create post (admin)
PUT    /api/posts/{id}       ← Update post (admin)
DELETE /api/posts/{id}       ← Delete post (admin)
```

**Why this distinction matters:**

- Visitors should READ your blog posts
- Only YOU (admin) should CREATE/EDIT/DELETE posts

### Key Learning

> Don't protect entire resources. Protect specific **actions** on resources.

---

## Summary of Understanding

| Topic                           | Your Level          | Notes                          |
| ------------------------------- | ------------------- | ------------------------------ |
| Authentication vs Authorization | ✅ Good             | Clear understanding            |
| JWT Basics                      | ⚠️ Needs depth      | Read jwt.io documentation      |
| Public vs Protected             | ⚠️ Needs refinement | Think in terms of HTTP methods |

---

## Next Step

Before we write code, you need to understand one more concept:

**Question for next session:**

> In your current project, you're using **Supabase Auth**. How does Supabase handle JWT tokens? Where does the token come from?

Hint: Check your Supabase dashboard → Authentication section

---

## Follow-up: Who Creates the JWT?

### Your Answer

> Supabase creates the JWT token.

### Feedback: ✅ Correct!

**This is a crucial understanding.** Here's what it means for our architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Frontend                Supabase              Our Backend  │
│  ────────                ────────              ───────────  │
│                                                             │
│  1. User enters                                             │
│     email/password                                          │
│         │                                                   │
│         ▼                                                   │
│  2. Send to Supabase ──────►  3. Verify credentials        │
│                               4. Create JWT token           │
│                                      │                      │
│         ◄────────────────────────────┘                      │
│  5. Receive token                                           │
│  6. Store token                                             │
│         │                                                   │
│         ▼                                                   │
│  7. Send request ─────────────────────────────► 8. Receive  │
│     with token                                     request  │
│     (Authorization                              9. Verify   │
│      header)                                       token    │
│                                                10. Process  │
│         ◄───────────────────────────────────── 11. Return  │
│  12. Show result                                   data     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### What Each Part Does

| Component       | Responsibility                                                   |
| --------------- | ---------------------------------------------------------------- |
| **Frontend**    | Sends login to Supabase, stores token, sends token with requests |
| **Supabase**    | Verifies credentials, CREATES the JWT token                      |
| **Our Backend** | VERIFIES the token (doesn't create it!)                          |

### Key Insight

> Our backend does NOT create tokens. It only VERIFIES tokens that Supabase created.

This is simpler because:

- We don't manage passwords
- We don't handle user registration
- We just check: "Is this token valid?"

---

## Understanding FastAPI Depends()

### Your Answer

> Depends trong FastAPI dùng để gắn tất cả các phụ thuộc là bao gồm biến và giá trị của nó theo để tiêm vào một hàm khác.
> (Depends in FastAPI is used to attach dependencies including variables and values to inject into another function)

### Feedback: ✅ Correct concept, needs more precision

You understand "dependency injection" - good! Let me clarify:

**What `Depends()` actually does:**

1. Runs a function BEFORE your route handler
2. Takes the RESULT of that function
3. Passes it as a parameter to your route

**Example - Without Depends (bad):**

```python
@app.get("/posts")
def get_posts():
    db = get_database_connection()  # You call it manually every time
    user = verify_token_and_get_user()  # You call it manually every time
    # ... rest of code
```

**Example - With Depends (good):**

```python
@app.get("/posts")
def get_posts(db = Depends(get_db), user = Depends(get_current_user)):
    # db and user are automatically provided!
    # If get_current_user fails → 401 error, route never runs
    pass
```

**Why this matters for auth:**

```python
# This function checks the token
def get_current_user(token: str):
    if token_is_invalid:
        raise HTTPException(401, "Not authorized")
    return user

# Protected route - only runs if token is valid
@app.post("/posts")
def create_post(user = Depends(get_current_user)):
    # If we reach here, user is authenticated!
    pass
```

### Key Learning

> `Depends()` = "Run this function first, give me the result. If it fails, stop everything."

---

## Understanding the Auth Flow (Final)

### Your Answer - Token Location

> Token từ http header mà user gửi đến api/login

### Correction

Token comes from `Authorization` header on **EVERY protected request**, not just login:

```text
Header: Authorization
Value:  Bearer eyJhbGciOiJIUzI1NiIs...
```

### Your Answer - Verify Function

> verifyProjectJWT

### Correction

Use Python SDK function:

```python
supabase.auth.get_user(token)
```

### Your Answer - Response Structure

When token is **valid**, `get_user()` returns:

```json
{
  "user": {
    "id": "11111111-1111-1111-1111-111111111111",
    "email": "email@example.com",
    "role": "authenticated",
    "created_at": "2023-02-19T00:01:51.142802Z",
    "last_sign_in_at": "2024-07-24T22:24:57.642878Z"
  }
}
```

### Key Fields We Use

| Field        | Purpose               |
| ------------ | --------------------- |
| `user.id`    | Identify the user     |
| `user.email` | Logging/debugging     |
| `user.role`  | Confirm authenticated |

---

## Ready to Code - Auth Middleware Plan

```
File: backend/app/middleware/auth.py

Function: get_current_user(token)
   │
   ├─ Step 1: Extract token from Authorization header
   │
   ├─ Step 2: Call supabase.auth.get_user(token)
   │
   └─ Step 3: Return user if valid, raise 401 if invalid
```

---

## Documentation Links

- [JWT Basics](https://jwt.io/introduction)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [FastAPI Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [Supabase get_user()](https://supabase.com/docs/reference/python/auth-getuser)

---
---

# Authentication Implementation - Testing Session

**Date:** 13/12/2025
**Topic:** Backend Authentication Middleware Implementation & Testing
**Status:** ✅ Completed & Verified

---

## Implementation Context

After completing the conceptual learning phase, we moved to implementation. The goal was to:

1. Create authentication middleware for FastAPI backend
2. Protect admin-only endpoints (POST/PUT/DELETE)
3. Test the complete authentication flow
4. Verify token validation works correctly

**Project State:**
- ✅ Public frontend complete (Home, Post Detail, Gallery, etc.)
- ❌ Admin dashboard not started (no Login page yet)
- ✅ Backend API endpoints functional
- 🎯 **Current task:** Add authentication to protect write operations

---

## Code Implementation

### File Created: `backend/app/middlewares/auth.py`

```python
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Depends, HTTPException
from app.database import supabase

# Initialize HTTPBearer instance
security = HTTPBearer()

# Authentication middleware function
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        response = supabase.auth.get_user(token)
        if response.user:
            return response.user
        raise HTTPException(status_code=401, detail="Unauthorized")
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid / Expired token")
```

**Key Components:**

| Component | Purpose | How It Works |
|-----------|---------|--------------|
| `HTTPBearer()` | Extract token from header | Automatically parses `Authorization: Bearer <token>` |
| `credentials.credentials` | Get pure token | Strips "Bearer" prefix, returns token only |
| `supabase.auth.get_user(token)` | Verify token validity | Calls Supabase to validate JWT |
| `Depends()` | Dependency injection | Runs before route handler, blocks if fails |

---

### File Modified: `backend/app/main.py`

**Changes:**

1. Added imports:
```python
from fastapi import Depends
from app.middlewares.auth import get_current_user
```

2. Protected 3 endpoints:

```python
@app.post("/api/posts", status_code=201)
def create_post(post_data: PostCreate, current_user = Depends(get_current_user)):
    # Only runs if token is valid
    ...

@app.put("/api/posts/{post_id}")
def update_post(post_id: UUID, post_data: PostUpdate, current_user = Depends(get_current_user)):
    ...

@app.delete("/api/posts/{post_id}", status_code=204)
def delete_post(post_id: UUID, current_user = Depends(get_current_user)):
    ...
```

**Why these endpoints?**
- GET requests remain public (anyone can read posts)
- POST/PUT/DELETE require authentication (only admin can modify)

---

## Testing Process

### Challenge: No Login Page Yet

**Problem:** Frontend admin dashboard doesn't exist yet, so no UI to login and get token.

**Solution:** Use Supabase Auth REST API directly to obtain token.

### Step 1: Obtain Valid JWT Token

**Documentation Reference:**
- https://supabase.com/docs/reference/auth/sign-in-with-password

**API Call (Postman):**

```
Method: POST
URL: https://<project-id>.supabase.co/auth/v1/token?grant_type=password

Headers:
  apikey: <SUPABASE_ANON_KEY>
  Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password"
}
```

**Response (Success):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 3600,
  "user": {
    "id": "...",
    "email": "user@example.com",
    "role": "authenticated"
  }
}
```

**Key Learning:**
> The `access_token` is the JWT token we need to authenticate with our backend.

---

### Step 2: Understanding Token Storage & Transmission

**Q&A Session:**

**Question 1:** Where is token stored in frontend?

**Your Answer:** "Token được gửi đi trong request api tới backend"

**Correction:** ⚠️ This describes transmission, not storage.

**Token Storage Options:**

| Storage Type | Pros | Cons | Use Case |
|--------------|------|------|----------|
| **localStorage** | Persistent across refresh | Vulnerable to XSS | Simple apps |
| **sessionStorage** | Auto-clear on tab close | Lost when tab closes | Temporary sessions |
| **Memory (React state)** | Most secure | Lost on refresh | High security apps |

**Token Transmission:**
- Sent in `Authorization` header
- Format: `Bearer <token>`

---

**Question 2:** What does `credentials.credentials` extract?

**Your Answer:** "extract sau khoảng trắng của Bearer, tức là extract token only thôi"

**Feedback:** ✅ **100% Correct!**

**Example:**
```
Header: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

HTTPBearer() parses:
  credentials.scheme = "Bearer"
  credentials.credentials = "eyJhbGciOiJIUzI1NiIs..."  ← Pure token
```

---

### Step 3: Testing Three Scenarios

**Test Environment:**
- Tool: Postman
- Backend: http://localhost:8000
- Endpoint: POST /api/posts

---

#### **Scenario 1: Valid Token (Expected: SUCCESS)**

**Request:**
```
POST http://localhost:8000/api/posts

Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  Content-Type: application/json

Body:
{
  "title": "Test Authentication Post",
  "slug": "test-auth-post",
  "excerpt": "Testing if auth middleware works",
  "content": "This post is created to test authentication.",
  "status": "published",
  "category_id": null
}
```

**Result:** ✅ **201 Created**

```json
{
  "id": "7a460b9b-38be-40fc-b498-0dd1115a8a1f",
  "title": "Test Authentication Post",
  "slug": "test-auth-post",
  "content": "This post is created to test authentication.",
  "excerpt": "Testing if auth middleware works",
  "status": "published",
  "created_at": "2025-12-13T09:19:47.907726+00:00",
  "published_at": "2025-12-13T09:19:47.757901+00:00"
}
```

**Analysis:**
- Middleware validated token successfully
- `get_current_user()` returned user object
- Route handler executed and created post
- Database insert successful

---

#### **Scenario 2: Invalid/Fake Token (Expected: REJECTED)**

**Request:**
```
Headers:
  Authorization: Bearer fake-invalid-token-12345
```

**Result:** ❌ **401 Unauthorized**

```json
{
  "detail": "Invalid / Expired token"
}
```

**Analysis:**
- `HTTPBearer()` extracted token successfully
- `supabase.auth.get_user(token)` threw exception (invalid token)
- Exception caught in `except` block
- Returned 401 with clear error message
- **Route handler never executed** (request blocked at middleware)

---

#### **Scenario 3: Missing Token (Expected: REJECTED)**

**Request:**
```
Headers:
  Content-Type: application/json
  (No Authorization header)
```

**Result:** ❌ **401 Unauthorized**

```json
{
  "detail": "Not authenticated"
}
```

**Analysis:**
- `HTTPBearer()` detected missing `Authorization` header
- Automatically returned 401 (FastAPI's built-in behavior)
- **Middleware function never called** (blocked before dependency injection)
- **Route handler never executed**

---

## Complete Authentication Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT REQUEST                                │
│                POST /api/posts                                   │
│                Authorization: Bearer <token>                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              FastAPI HTTPBearer Dependency                       │
│  ─────────────────────────────────────────────────              │
│  1. Check: Does request have Authorization header?              │
│     ├─ NO  → Return 401 "Not authenticated"                     │
│     └─ YES → Continue                                            │
│                                                                  │
│  2. Parse header: "Bearer <token>"                               │
│     ├─ Invalid format → Return 401                              │
│     └─ Valid format → Extract token                             │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              get_current_user(credentials)                       │
│  ─────────────────────────────────────────────────              │
│  3. Extract pure token:                                          │
│     token = credentials.credentials                              │
│                                                                  │
│  4. Verify with Supabase:                                        │
│     response = supabase.auth.get_user(token)                    │
│     ├─ Valid   → response.user exists                           │
│     └─ Invalid → Exception thrown                               │
│                                                                  │
│  5. Handle result:                                               │
│     ├─ if response.user → Return user object                    │
│     └─ else → Raise 401 "Invalid / Expired token"              │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              Route Handler: create_post()                        │
│  ─────────────────────────────────────────────────              │
│  6. Receives validated user object                               │
│  7. Executes business logic                                      │
│  8. Returns response                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Test Results Summary

| Scenario | Token | Status Code | Response | Middleware Behavior |
|----------|-------|-------------|----------|---------------------|
| **1** | Valid JWT from Supabase | ✅ 201 Created | Post created successfully | Token validated → User authenticated → Request allowed |
| **2** | Fake/Invalid token | ❌ 401 Unauthorized | "Invalid / Expired token" | Token verification failed → Request blocked |
| **3** | Missing (no header) | ❌ 401 Unauthorized | "Not authenticated" | No credentials found → Request blocked |

**Conclusion:** ✅ **Authentication middleware works correctly in all scenarios.**

---

## Key Learnings

### 1. Understanding Documentation Sources

**Question:** "Why did you know the Supabase login endpoint?"

**Answer:** Official documentation.

**How to find API documentation:**
1. Google: `<service name> + auth API documentation`
2. Visit official docs site
3. Look for "Reference" or "API" sections
4. Find examples and endpoints

**Example - Supabase:**
- Docs: https://supabase.com/docs/reference/auth
- Specific endpoint: https://supabase.com/docs/reference/auth/sign-in-with-password

**Pattern applies to all services:**
| Service | Documentation URL |
|---------|-------------------|
| FastAPI | https://fastapi.tiangolo.com/reference |
| React | https://react.dev/reference/react |
| Stripe | https://stripe.com/docs/api |

---

### 2. Token Flow Understanding

**Storage vs Transmission:**
- **Storage:** Where token lives (localStorage, sessionStorage, memory)
- **Transmission:** How token is sent (Authorization header)

**Header Format:**
```
Authorization: Bearer <token>
                ↑     ↑
              Scheme Token
```

**HTTPBearer extracts:**
- `credentials.scheme` = "Bearer"
- `credentials.credentials` = pure token string

---

### 3. Middleware Pattern in FastAPI

**Without Depends (bad):**
```python
@app.post("/posts")
def create_post():
    # Must manually verify token every time
    token = request.headers.get("Authorization")
    if not token:
        raise HTTPException(401)
    user = verify_token(token)
    if not user:
        raise HTTPException(401)
    # ... actual logic
```

**With Depends (good):**
```python
@app.post("/posts")
def create_post(user = Depends(get_current_user)):
    # Token already verified!
    # If we reach here, user is authenticated
    # ... actual logic
```

**Benefits:**
- ✅ DRY (Don't Repeat Yourself)
- ✅ Separation of concerns
- ✅ Automatic error handling
- ✅ Reusable across endpoints

---

### 4. Common API Testing Mistakes

**URL formatting errors:**
```
❌ https://https://example.com  (duplicate protocol)
✅ https://example.com

❌ example.comapi/login  (missing slash)
✅ example.com/api/login

❌ http://supabase.co  (wrong protocol)
✅ https://supabase.co  (Supabase requires HTTPS)
```

---

## What's Protected Now

### Protected Endpoints (Require Authentication):

```python
POST   /api/posts              # Create new post
PUT    /api/posts/{post_id}    # Update existing post
DELETE /api/posts/{post_id}    # Delete post
```

### Public Endpoints (No Authentication):

```python
GET    /api/posts              # List posts
GET    /api/posts/{slug}       # View single post
GET    /api/posts/search       # Search posts
GET    /api/categories         # List categories
GET    /api/tags               # List tags
GET    /api/projects           # List projects
GET    /api/gallery            # View gallery
```

---

## Next Steps

### Immediate Next Steps:

1. **Extend Authentication to Other Resources**
   - Add auth to Categories CRUD (POST/PUT/DELETE)
   - Add auth to Tags CRUD
   - Add auth to Projects CRUD

2. **Commit Changes**
   - Stage: `backend/app/main.py` + `backend/app/middlewares/`
   - Write commit message following convention
   - Push to repository

3. **Build Admin Dashboard (Frontend)**
   - Create Login page
   - Implement AuthContext
   - Create auth service layer
   - Build admin layout and routes

### Future Enhancements:

- Role-based authorization (admin vs editor)
- Refresh token implementation
- Rate limiting for auth endpoints
- Audit logging for admin actions

---

## Files Modified/Created

```
backend/
├── app/
│   ├── middlewares/
│   │   └── auth.py          ← NEW: Authentication middleware
│   └── main.py              ← MODIFIED: Added auth to 3 endpoints
```

**Git Status:**
```
M  backend/app/main.py
?? backend/app/middlewares/
```

---

## Documentation References Used

- [Supabase Auth Sign In](https://supabase.com/docs/reference/auth/sign-in-with-password)
- [Supabase get_user()](https://supabase.com/docs/reference/python/auth-getuser)
- [FastAPI Security - OAuth2](https://fastapi.tiangolo.com/tutorial/security/oauth2-jwt/)
- [FastAPI Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [HTTPBearer Documentation](https://fastapi.tiangolo.com/reference/security/)

---
---

# Categories CRUD Implementation - Extending Authentication

**Date:** 13/12/2025
**Topic:** Implementing CRUD with Authentication Protection
**Status:** ✅ Completed & Pushed

---

## Context

After completing authentication middleware and protecting Posts endpoints, we extended the pattern to Categories. This session demonstrates:

1. Understanding Repository pattern
2. Implementing CRUD methods
3. Adding protected API routes
4. Code organization best practices

---

## Why Categories CRUD?

### Initial State Analysis

```
Posts:       POST/PUT/DELETE → ✅ Protected
Categories:  POST/PUT/DELETE → ❌ Missing (only GET existed)
Tags:        POST/PUT/DELETE → ❌ Missing
Projects:    POST/PUT/DELETE → ❌ Missing
```

**Problem:** If only Posts are protected but Categories/Tags/Projects are not implemented, the CMS is incomplete.

**Decision:** Implement Categories CRUD first, then apply same pattern to Tags and Projects.

---

## Step 1: Understanding Existing Architecture

### Models Already Existed

**File:** `backend/app/models/category.py`

```python
class CategoryResponse(BaseModel):
    id: UUID
    name: str
    slug: str
    description: Optional[str] = None
    created_at: datetime

class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    slug: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None

class CategoryUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    slug: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None
```

**Key Learning:**

| Model | Purpose | Fields |
|-------|---------|--------|
| `CategoryResponse` | API output | All database fields |
| `CategoryCreate` | POST input | Only user-provided fields (no id, no created_at) |
| `CategoryUpdate` | PUT input | All Optional (partial updates) |

---

### Repository Pattern

**File:** `backend/app/services/category_repository.py`

**Before (only READ):**
```python
class CategoryRepository:
    def get_all(self) -> List[dict]: ...
    def get_by_slug(self, slug: str) -> Optional[dict]: ...
    def get_by_id(self, category_id: UUID) -> Optional[dict]: ...
```

**After (full CRUD):**
```python
class CategoryRepository:
    # READ
    def get_all(self) -> List[dict]: ...
    def get_by_slug(self, slug: str) -> Optional[dict]: ...
    def get_by_id(self, category_id: UUID) -> Optional[dict]: ...

    # WRITE (NEW)
    def create(self, category_data: CategoryCreate) -> Optional[dict]: ...
    def update(self, category_id: UUID, category_data: CategoryUpdate) -> Optional[dict]: ...
    def delete(self, category_id: UUID) -> bool: ...
```

---

## Step 2: Implementation

### Create Method

```python
def create(self, category_data: CategoryCreate) -> Optional[dict]:
    data = category_data.model_dump(exclude_none=True)

    # Auto-generate slug if not provided
    if not data.get("slug"):
        data["slug"] = self._generate_slug(data["name"])

    response = supabase.table(self.TABLE_NAME).insert(data).execute()

    return response.data[0] if response.data else None
```

**Key Points:**
- `model_dump(exclude_none=True)` converts Pydantic model to dict, removes None values
- Auto-generate slug from name if not provided
- Return created record or None

---

### Update Method

```python
def update(self, category_id: UUID, category_data: CategoryUpdate) -> Optional[dict]:
    data = category_data.model_dump(exclude_none=True)

    if not data:
        return self.get_by_id(category_id)

    response = supabase.table(self.TABLE_NAME).update(data).eq("id", str(category_id)).execute()

    return response.data[0] if response.data else None
```

**Key Points:**
- `exclude_none=True` is crucial - prevents overwriting fields with NULL
- If no data to update, return existing record
- `.eq("id", str(category_id))` - must convert UUID to string

---

### Delete Method

```python
def delete(self, category_id: UUID) -> bool:
    response = supabase.table(self.TABLE_NAME).delete().eq("id", str(category_id)).execute()

    return len(response.data) > 0
```

**Key Points:**
- Return `bool` (True = success, False = not found)
- Check `len(response.data) > 0` to verify deletion

---

### Common Mistakes Made & Corrected

**Mistake 1: Wrong Supabase syntax**
```python
# Wrong - missing column name
.eq(str(category_id))

# Correct
.eq("id", str(category_id))
```

**Mistake 2: Passing Pydantic model instead of dict**
```python
# Wrong - category_data is Pydantic model
.update(category_data)

# Correct - data is dict
data = category_data.model_dump(exclude_none=True)
.update(data)
```

**Mistake 3: Copy-paste without understanding**
```python
# Wrong - Categories don't have "title" field, they have "name"
data["slug"] = self._generate_slug(data["title"])

# Correct
data["slug"] = self._generate_slug(data["name"])
```

---

## Step 3: API Routes

### Protected Endpoints Added

```python
# ----- WRITE (Protected) -----

@app.post("/api/categories", status_code=201, response_model=CategoryResponse)
def create_category(category_data: CategoryCreate, current_user=Depends(get_current_user)):
    """Create a new category. Requires authentication."""
    category = category_repository.create(category_data)
    if not category:
        raise HTTPException(status_code=400, detail="Failed to create category")
    return category


@app.put("/api/categories/{category_id}", response_model=CategoryResponse)
def update_category(category_id: UUID, category_data: CategoryUpdate, current_user=Depends(get_current_user)):
    """Update an existing category. Requires authentication."""
    category = category_repository.update(category_id, category_data)
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@app.delete("/api/categories/{category_id}", status_code=204)
def delete_category(category_id: UUID, current_user=Depends(get_current_user)):
    """Delete a category. Requires authentication."""
    success = category_repository.delete(category_id)
    if not success:
        raise HTTPException(status_code=404, detail="Category not found")
    return None
```

---

## Step 4: Understanding status_code vs response_model

### Q&A Session

**Question:** Why do some endpoints have `response_model` but not `status_code`, and vice versa?

**Answer:**

| Attribute | Purpose | Default |
|-----------|---------|---------|
| `status_code` | HTTP status number (200, 201, 204, etc.) | 200 OK |
| `response_model` | Shape/structure of response body | None (raw dict) |

**They serve DIFFERENT purposes:**

```
HTTP Response:
┌─────────────────────────────────┐
│ Status Line: HTTP/1.1 200 OK   │  ← status_code
│ Headers: Content-Type: json    │
│ Body: {"id": "...", ...}       │  ← response_model validates this
└─────────────────────────────────┘
```

**When to use:**

| Operation | status_code | response_model |
|-----------|-------------|----------------|
| GET | Default (200) | ✅ Yes (filter fields) |
| POST | **201** Created | ✅ Yes |
| PUT | Default (200) | ✅ Yes |
| DELETE | **204** No Content | ❌ No body |

---

### Misconception Corrected

**Your answer:** "204 là thay đổi data sẵn có trong database"

**Correction:** ❌ Wrong!

- **200 OK** = Success (GET, PUT)
- **201 Created** = New resource created (POST)
- **204 No Content** = Success but no response body (**DELETE**)

---

## Step 5: Code Organization

### Final Structure

```python
# =============================================================================
# Categories API Endpoints
# =============================================================================

# ----- READ (Public) -----

@app.get("/api/categories", response_model=List[CategoryResponse])
def get_categories(): ...

@app.get("/api/categories/{slug}", response_model=CategoryResponse)
def get_category_by_slug(slug: str): ...

# ----- WRITE (Protected) -----

@app.post("/api/categories", status_code=201, response_model=CategoryResponse)
def create_category(..., current_user=Depends(get_current_user)): ...

@app.put("/api/categories/{category_id}", response_model=CategoryResponse)
def update_category(..., current_user=Depends(get_current_user)): ...

@app.delete("/api/categories/{category_id}", status_code=204)
def delete_category(..., current_user=Depends(get_current_user)): ...
```

**Pattern:**
1. Group by resource (Categories, Posts, Tags, etc.)
2. Separate READ (Public) and WRITE (Protected)
3. Order: GET list → GET single → POST → PUT → DELETE

---

## Git Commits

### Commit 1: Authentication Middleware
```
[w1 6c651bd] feat: add authentication middleware for admin endpoints
 - backend/app/main.py
 - backend/app/middlewares/auth.py
```

### Commit 2: Categories CRUD
```
[w1 d35b694] feat: add Categories CRUD with authentication
 - backend/app/main.py (reorganized)
 - backend/app/services/category_repository.py (CRUD methods)
```

---

## Files Modified

```
backend/
├── app/
│   ├── main.py                    ← MODIFIED (routes + reorganized)
│   ├── middlewares/
│   │   └── auth.py                ← CREATED (previous session)
│   └── services/
│       └── category_repository.py ← MODIFIED (CRUD methods)
```

---

## Architecture Documentation Created

A separate document was created to explain:
- Model vs Repository pattern
- DTO, DAO, Repository (Enterprise Java patterns)
- Why this project uses simplified architecture

**File:** `docs/architecture/architecture_patterns_13_12_2025.md`

---

## Next Steps (Tomorrow)

### Remaining Tasks

```
□ Add Tags CRUD
  □ tag_repository.py: create(), update(), delete()
  □ main.py: POST/PUT/DELETE /api/tags
  □ Test with Postman

□ Add Projects CRUD
  □ project_repository.py: create(), update(), delete()
  □ main.py: POST/PUT/DELETE /api/projects
  □ Test with Postman

□ Test all protected endpoints
  □ Verify auth works for all resources
  □ Test error cases (invalid token, missing token)
```

### Pattern to Follow

Same as Categories:
1. Check existing models (models/{resource}.py)
2. Add CRUD methods to repository
3. Add protected routes to main.py
4. Test with Postman

---

## Key Learnings Summary

1. **Repository Pattern:** Separates database logic from API routes
2. **Model Types:** Response, Create, Update - each serves different purpose
3. **Pydantic model_dump():** Convert model to dict with options like `exclude_none=True`
4. **Supabase syntax:** `.eq("column", value)` needs BOTH column name and value
5. **status_code vs response_model:** Different purposes (HTTP status vs body shape)
6. **Code Organization:** Group by resource, separate READ/WRITE, consistent structure

---

## Documentation References

- [Supabase Python Client - Update](https://supabase.com/docs/reference/python/update)
- [Supabase Python Client - Delete](https://supabase.com/docs/reference/python/delete)
- [FastAPI Response Model](https://fastapi.tiangolo.com/tutorial/response-model/)
- [FastAPI Status Codes](https://fastapi.tiangolo.com/tutorial/response-status-code/)
- [Pydantic model_dump()](https://docs.pydantic.dev/latest/api/base_model/#pydantic.BaseModel.model_dump)

---

**End of Categories CRUD Session**
