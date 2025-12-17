# Project Scope

> **Document Type**: Scope Definition
> **Project**: Coffee's Personal Blog CMS
> **Version**: 1.0
> **Last Updated**: 16/12/2024

---

## 1. Scope Overview

This document defines **what is included** and **what is NOT included** in each phase of the project.

```
┌─────────────────────────────────────────────────────────────────┐
│                    SCOPE HIERARCHY                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  MVP (Must Have)                                         │   │
│  │  - Core functionality to make blog usable                │   │
│  │  ┌─────────────────────────────────────────────────┐    │   │
│  │  │  Phase 2 (Should Have)                           │    │   │
│  │  │  - Design polish and better UX                   │    │   │
│  │  │  ┌─────────────────────────────────────────┐    │    │   │
│  │  │  │  Phase 3+ (Nice to Have)                │    │    │   │
│  │  │  │  - Advanced features                    │    │    │   │
│  │  │  └─────────────────────────────────────────┘    │    │   │
│  │  └─────────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. MVP Scope (Phase 1) - CURRENT FOCUS

### In Scope - Must Complete

| Category | Feature | Status |
|----------|---------|--------|
| **Public Site** | | |
| | Homepage with post list | ✅ Done |
| | Post detail page | ✅ Done |
| | Category filtering | ✅ Done |
| | Tag filtering | ✅ Done |
| | Search functionality | ✅ Done |
| | Portfolio page | ✅ Done |
| | About page | ✅ Done |
| | Dark/Light mode | ✅ Done |
| **Admin System** | | |
| | Login authentication | ❌ Not Done |
| | Admin dashboard | ❌ Not Done |
| | Create new post | ❌ Not Done |
| | Edit existing post | ❌ Not Done |
| | Delete post | ❌ Not Done |
| | Manage categories | ❌ Not Done |
| | Manage tags | ❌ Not Done |
| **Backend** | | |
| | Posts CRUD API | ✅ Done |
| | Categories CRUD API | ✅ Done |
| | Tags READ API | ✅ Done |
| | Tags CRUD API | ❌ Not Done |
| | Projects CRUD API | ❌ Not Done |
| | Auth endpoints | ❌ Not Done |

### Out of Scope for MVP

| Feature | Reason | When |
|---------|--------|------|
| Image upload | Can use external URLs for now | Phase 2 |
| Rich text editor | Markdown is enough for MVP | Phase 2 |
| Comments | Using Giscus (GitHub) is fine | Phase 3 |
| Analytics | Not needed to launch | Phase 3 |
| SEO optimization | Basic meta tags are enough | Phase 2 |
| Email notifications | Not needed for personal blog | Phase 4 |

---

## 3. Phase 2 Scope - Design & Polish

### In Scope

| Category | Feature |
|----------|---------|
| **Design** | |
| | Implement full pixel art style |
| | Custom sprites and icons |
| | Loading animations |
| | Hover effects and micro-interactions |
| | Mobile responsive refinement |
| **Features** | |
| | Image upload and management |
| | Markdown editor with toolbar |
| | Live preview while editing |
| | Auto-save drafts |
| **SEO** | |
| | Meta tags for posts |
| | Open Graph images |
| | Sitemap generation |

### Out of Scope for Phase 2

| Feature | When |
|---------|------|
| Multi-language support | Phase 4+ |
| Newsletter subscription | Phase 4+ |
| RSS feed | Phase 3 |

---

## 4. Phase 3 Scope - Content & Growth

### In Scope

| Category | Feature |
|----------|---------|
| **Analytics** | |
| | Page view tracking |
| | Popular posts |
| | Traffic sources |
| **Content** | |
| | Series/Collections |
| | Related posts |
| | Reading progress indicator |
| **Social** | |
| | Share buttons |
| | RSS feed |

---

## 5. Phase 4 Scope - Production Ready

### In Scope

| Category | Feature |
|----------|---------|
| **DevOps** | |
| | Docker containerization |
| | CI/CD pipeline |
| | Automated testing |
| | Production deployment |
| **Performance** | |
| | Image optimization |
| | Caching strategy |
| | CDN integration |
| **Security** | |
| | Rate limiting |
| | Input sanitization |
| | Security headers |

---

## 6. Phase 5+ Scope - Future Expansion

### Potential Features

| Feature | Description |
|---------|-------------|
| Data Engineering Showcase | Interactive data pipelines demos |
| Cloud Architecture | AWS/GCP project showcases |
| Code Playground | Interactive code examples |
| Guest Posts | Allow other authors |
| API for Public | Open API for portfolio data |

---

## 7. Explicit Exclusions (Never in Scope)

| Feature | Reason |
|---------|--------|
| User registration | Personal blog, single author |
| E-commerce | Not selling anything |
| Real-time chat | Not a social platform |
| Mobile app | Web-responsive is enough |
| Multi-tenant | Single blog only |

---

## 8. MVP Completion Checklist

### Backend MVP

```
[✅] Database schema created
[✅] Posts CRUD endpoints
[✅] Categories CRUD endpoints
[  ] Tags CRUD endpoints (missing create, update, delete)
[  ] Projects CRUD endpoints (missing create, update, delete)
[  ] Auth login endpoint
[  ] Auth middleware protecting routes
```

### Frontend MVP

```
[✅] Public pages working
[  ] Login page
[  ] Admin dashboard
[  ] Post editor (create/edit)
[  ] Category manager
[  ] Tag manager
```

### Integration MVP

```
[  ] Frontend can login
[  ] Frontend can create posts
[  ] Frontend can edit posts
[  ] Frontend can delete posts
[  ] All CRUD operations work end-to-end
```

---

## 9. Scope Change Process

If you want to add something new:

```
1. Ask: "Is this needed for MVP?"
   │
   ├── YES → Add to MVP scope
   │
   └── NO → "Is this needed for Phase 2?"
            │
            ├── YES → Add to Phase 2 backlog
            │
            └── NO → Add to "Future" list
```

### Red Flags (Scope Creep)

- "It would be cool if..."
- "Just one more feature..."
- "This should be easy to add..."
- "Other blogs have this..."

**Rule**: Finish MVP first. Polish later.

---

## 10. Current Priority

```
RIGHT NOW (MVP Focus):
────────────────────────────────────────────
1. Complete Tags CRUD (backend)
2. Complete Projects CRUD (backend)
3. Create Auth login endpoint (backend)
4. Create Login page (frontend)
5. Create Admin Dashboard (frontend)
6. Create Post Editor (frontend)
────────────────────────────────────────────

DO NOT START UNTIL MVP DONE:
- Pixel art sprites
- Animations
- Image upload
- SEO
- Analytics
```

---

*This document helps you stay focused. When in doubt, ask: "Is this MVP?"*
