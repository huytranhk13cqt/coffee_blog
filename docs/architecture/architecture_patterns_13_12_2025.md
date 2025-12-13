# Software Architecture Patterns - Learning Session

**Date:** 13/12/2025
**Topic:** Understanding Models, Repositories, DTOs, DAOs
**Context:** Before implementing Categories CRUD, understanding WHY we organize code this way
**Status:** Foundational Knowledge

---

## Part 1: Model & Repository Pattern (This Project)

### Why Separate Model and Repository?

#### Analogy: Building a House

```
Model      = Blueprint (defines what a house looks like)
Database   = Warehouse (stores materials)
Repository = Construction Worker (builds/modifies the house)
```

#### Real Code Example

**Model (What data looks like):**
```python
# models/category.py
class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    slug: Optional[str] = None
    description: Optional[str] = None
```

**Repository (How to work with database):**
```python
# services/category_repository.py
class CategoryRepository:
    def create(self, data: CategoryCreate) -> dict:
        response = supabase.table("categories").insert(...).execute()
        return response.data[0]
```

#### Benefits of Separation

| Benefit | Explanation |
|---------|-------------|
| **Separation of Concerns** | Model: validates data. Repository: talks to database. Each does ONE thing. |
| **Reusability** | Same Model used in API routes, tests, documentation |
| **Testability** | Test Model validation separately from database operations |
| **Maintainability** | Change database? Only modify Repository, not entire app |

---

### Order of Development

```
Step 1: DATABASE SCHEMA (Supabase/PostgreSQL)
        ↓ Defines available columns

Step 2: MODELS (Pydantic classes)
        ↓ Define data structures & validation

Step 3: REPOSITORY (Database operations)
        ↓ CRUD methods using Models

Step 4: API ROUTES (FastAPI endpoints)
        ↓ Use Repository methods

Step 5: CLIENT (Frontend/Postman)
```

---

### Three Types of Models

#### 1. Response Model (What API returns)

```python
class CategoryResponse(BaseModel):
    id: UUID              # Database generates this
    name: str
    slug: str
    description: Optional[str]
    created_at: datetime  # Database generates this
```

**Use case:** All database fields, read-only fields included

---

#### 2. Create Model (What user sends to create)

```python
class CategoryCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)  # Required
    slug: Optional[str] = None                             # Optional (auto-generate)
    description: Optional[str] = None                      # Optional
    # NO id, NO created_at (database generates these)
```

**Use case:** Only fields user provides when creating new record

---

#### 3. Update Model (What user can modify)

```python
class CategoryUpdate(BaseModel):
    name: Optional[str] = None        # Optional - only update if provided
    slug: Optional[str] = None        # Optional
    description: Optional[str] = None # Optional
```

**Use case:** All updatable fields are Optional (partial updates allowed)

---

### Mapping Database to Models

```
Database Column          Python Type         Notes
───────────────────────  ─────────────────   ──────────────────
id UUID                  UUID                Auto-generated
name VARCHAR(100)        str                 Required
slug VARCHAR(100)        str                 Required
description TEXT         Optional[str]       Can be NULL
created_at TIMESTAMP     datetime            Auto-generated
updated_at TIMESTAMP     Optional[datetime]  Can be NULL
```

---

## Part 2: Enterprise Java Patterns (DTO, DAO, Repository)

### Context: Viettel High Tech (Java/Play Framework)

In enterprise Java applications, you typically see more layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    ENTERPRISE JAVA ARCHITECTURE             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Controller (REST endpoints)                                │
│       ↓                                                     │
│  DTO (Data Transfer Object)  ← Data shape for transfer     │
│       ↓                                                     │
│  Service Layer              ← Business logic                │
│       ↓                                                     │
│  Repository                 ← High-level data access       │
│       ↓                                                     │
│  DAO (Data Access Object)   ← Low-level database queries   │
│       ↓                                                     │
│  Entity                     ← Database table mapping        │
│       ↓                                                     │
│  Database                                                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### What is DTO (Data Transfer Object)?

**Definition:** An object that carries data between processes/layers.

**Java Example:**
```java
// UserDTO.java - for transferring data
public class UserDTO {
    private String username;
    private String email;
    // NO password (security)
    // NO internal IDs

    // Getters and Setters
}

// User Entity - database mapping
@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String email;
    private String passwordHash;  // Internal, not exposed
    private LocalDateTime createdAt;
}
```

**Why separate DTO from Entity?**

| Entity | DTO |
|--------|-----|
| Maps to database table | Maps to API request/response |
| Contains ALL fields | Contains only PUBLIC fields |
| Has database annotations | Plain object |
| Internal representation | External representation |

**Example: User Registration**
```java
// Client sends UserDTO (no password hash)
// Server converts to Entity (adds password hash, id, timestamps)
// Server saves Entity to database
// Server converts Entity back to DTO (removes sensitive data)
// Server returns DTO to client
```

---

### What is DAO (Data Access Object)?

**Definition:** An object that provides abstract interface to database operations.

**Java Example:**
```java
// UserDAO.java - low-level database access
public interface UserDAO {
    User findById(Long id);
    User findByEmail(String email);
    List<User> findAll();
    void save(User user);
    void update(User user);
    void delete(Long id);
}

// UserDAOImpl.java - actual implementation
public class UserDAOImpl implements UserDAO {
    @Override
    public User findById(Long id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public void save(User user) {
        entityManager.persist(user);
    }
}
```

**DAO handles:**
- Raw SQL queries
- Database connections
- Transaction management
- Result set mapping

---

### What is Repository?

**Definition:** A higher-level abstraction over DAO, focused on business logic.

**Java Example:**
```java
// UserRepository.java - business-focused data access
public interface UserRepository {
    User getActiveUserByEmail(String email);
    List<User> getRecentlyRegisteredUsers(int days);
    boolean isEmailAvailable(String email);
}

// UserRepositoryImpl.java
public class UserRepositoryImpl implements UserRepository {
    private final UserDAO userDAO;

    @Override
    public User getActiveUserByEmail(String email) {
        User user = userDAO.findByEmail(email);
        if (user != null && user.isActive()) {
            return user;
        }
        return null;
    }

    @Override
    public List<User> getRecentlyRegisteredUsers(int days) {
        LocalDateTime since = LocalDateTime.now().minusDays(days);
        return userDAO.findAll().stream()
            .filter(u -> u.getCreatedAt().isAfter(since))
            .collect(Collectors.toList());
    }
}
```

---

### DAO vs Repository

| Aspect | DAO | Repository |
|--------|-----|------------|
| **Level** | Low-level (raw queries) | High-level (business logic) |
| **Focus** | Database operations | Domain operations |
| **Methods** | `findById`, `save`, `delete` | `getActiveUsers`, `findRecentPosts` |
| **Returns** | Database entities | Domain objects |
| **SQL Knowledge** | Knows SQL/ORM | Abstracts away database details |

**Relationship:**
```
Repository
    └── uses DAO internally
            └── uses Database
```

---

### Complete Enterprise Java Flow

```java
// 1. Controller receives request
@PostMapping("/users")
public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO dto) {
    UserDTO result = userService.createUser(dto);
    return ResponseEntity.ok(result);
}

// 2. Service handles business logic
public class UserService {
    public UserDTO createUser(UserDTO dto) {
        // Validate business rules
        if (!isEmailValid(dto.getEmail())) {
            throw new ValidationException("Invalid email");
        }

        // Convert DTO to Entity
        User entity = mapper.toEntity(dto);
        entity.setPasswordHash(hashPassword(dto.getPassword()));
        entity.setCreatedAt(LocalDateTime.now());

        // Save via Repository
        User saved = userRepository.save(entity);

        // Convert back to DTO
        return mapper.toDTO(saved);
    }
}

// 3. Repository handles data access
public class UserRepository {
    public User save(User user) {
        return userDAO.save(user);
    }
}

// 4. DAO executes database operation
public class UserDAO {
    public User save(User user) {
        entityManager.persist(user);
        return user;
    }
}
```

---

## Part 3: Why This Project Uses Simplified Architecture

### Our Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│             COFFEE BLOG ARCHITECTURE (Simplified)            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  API Routes (main.py)                                       │
│       ↓                                                     │
│  Pydantic Models          ← DTO + Entity combined          │
│       ↓                                                     │
│  Repository               ← DAO + Repository combined      │
│       ↓                                                     │
│  Supabase Client          ← Database abstraction           │
│       ↓                                                     │
│  PostgreSQL                                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

### Why Not Full Enterprise Pattern?

#### 1. Project Scale

| Factor | Enterprise (Viettel) | This Project |
|--------|---------------------|--------------|
| Team size | 10-50+ developers | 1 developer (you) |
| Codebase | 100,000+ lines | ~5,000 lines |
| Features | Complex business logic | Simple CRUD blog |
| Lifespan | 5-10+ years | Learning project |

**Rule:** Architecture complexity should match project complexity.

---

#### 2. Framework Philosophy

**Java (Play Framework):**
- Verbose by design
- Enterprise patterns expected
- Strong typing everywhere
- ORM (JPA/Hibernate) requires entities

**Python (FastAPI):**
- Concise and pragmatic
- "Simple is better than complex"
- Pydantic handles DTO + validation
- Supabase client abstracts DAO layer

---

#### 3. Trade-offs

**More Layers (Enterprise):**
```
+ Better separation of concerns
+ Easier to test in isolation
+ Team can work independently
+ Easier to change database
- More files to maintain
- More boilerplate code
- Slower development
- Steeper learning curve
```

**Fewer Layers (This Project):**
```
+ Faster development
+ Less code to maintain
+ Easier to understand
+ Good enough for small projects
- Harder to scale to large teams
- Business logic mixed with data access
- Tighter coupling to database
```

---

### Mapping Concepts Between Architectures

| Enterprise Java | This Project (Python/FastAPI) |
|----------------|-------------------------------|
| Entity (JPA) | Supabase table schema |
| DTO | Pydantic Model (CategoryCreate, CategoryUpdate) |
| Response DTO | Pydantic Model (CategoryResponse) |
| DAO | Supabase client methods |
| Repository | Our Repository classes |
| Service | Combined in Routes/Repository |
| Controller | FastAPI route handlers |

---

### When to Add More Layers

**Consider adding Service layer when:**
- Business logic becomes complex
- Same logic needed in multiple routes
- Need to coordinate multiple repositories

**Consider adding DAO layer when:**
- Switching databases (Supabase → MongoDB)
- Need complex SQL queries
- Want to abstract ORM details

**For this project:**
- Current architecture is appropriate
- Add complexity only when needed
- YAGNI: "You Ain't Gonna Need It"

---

## Part 4: Practical Comparison

### Same Feature, Different Architectures

**Feature:** Create a new Category

#### Enterprise Java (Full Layers)

```java
// CategoryDTO.java
public class CategoryDTO {
    private String name;
    private String slug;
    private String description;
}

// CategoryEntity.java
@Entity
@Table(name = "categories")
public class CategoryEntity {
    @Id @GeneratedValue
    private UUID id;
    private String name;
    private String slug;
    private String description;
    private LocalDateTime createdAt;
}

// CategoryDAO.java
public interface CategoryDAO {
    CategoryEntity save(CategoryEntity entity);
}

// CategoryDAOImpl.java
public class CategoryDAOImpl implements CategoryDAO {
    public CategoryEntity save(CategoryEntity entity) {
        return entityManager.persist(entity);
    }
}

// CategoryRepository.java
public class CategoryRepository {
    private CategoryDAO dao;

    public CategoryEntity create(CategoryEntity entity) {
        return dao.save(entity);
    }
}

// CategoryService.java
public class CategoryService {
    private CategoryRepository repo;
    private CategoryMapper mapper;

    public CategoryDTO create(CategoryDTO dto) {
        CategoryEntity entity = mapper.toEntity(dto);
        entity.setCreatedAt(LocalDateTime.now());
        CategoryEntity saved = repo.create(entity);
        return mapper.toDTO(saved);
    }
}

// CategoryController.java
@Controller
public class CategoryController {
    private CategoryService service;

    @PostMapping("/categories")
    public Result create(@Body CategoryDTO dto) {
        CategoryDTO result = service.create(dto);
        return ok(Json.toJson(result));
    }
}
```

**Files needed: 7+ files**

---

#### This Project (Simplified)

```python
# models/category.py
class CategoryCreate(BaseModel):
    name: str
    slug: Optional[str] = None
    description: Optional[str] = None

# services/category_repository.py
class CategoryRepository:
    def create(self, data: CategoryCreate) -> dict:
        info = data.model_dump(exclude_none=True)
        response = supabase.table("categories").insert(info).execute()
        return response.data[0]

# main.py
@app.post("/api/categories")
def create_category(data: CategoryCreate):
    return category_repository.create(data)
```

**Files needed: 3 files**

---

## Summary

### Key Takeaways

1. **DTO (Data Transfer Object)** = Object for transferring data between layers
   - In this project: Pydantic models (CategoryCreate, CategoryResponse)

2. **DAO (Data Access Object)** = Low-level database operations
   - In this project: Supabase client handles this

3. **Repository** = High-level business-focused data access
   - In this project: Our Repository classes

4. **Entity** = Database table mapping
   - In this project: Supabase table schema

5. **Service** = Business logic layer
   - In this project: Combined in Repository/Routes

### When Working at Enterprise Companies

- Expect more layers and patterns
- Each layer has specific responsibility
- More files, but clearer separation
- Team collaboration benefits

### For Personal/Small Projects

- Simplified architecture is fine
- Add complexity as needed
- Focus on learning core concepts
- Understand WHY patterns exist

---

## Documentation References

- [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html)
- [Data Transfer Object](https://martinfowler.com/eaaCatalog/dataTransferObject.html)
- [DAO Pattern](https://www.oracle.com/java/technologies/data-access-object.html)
- [FastAPI Project Structure](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- [Pydantic Models](https://docs.pydantic.dev/latest/concepts/models/)

---

**End of Architecture Patterns Session**
