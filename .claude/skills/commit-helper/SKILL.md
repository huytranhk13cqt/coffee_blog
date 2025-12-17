---
name: blog-commit-helper
description: Generate standardized commit messages for Coffee Blog CMS project. Use when creating commits, writing git messages, reviewing staged changes, or following commit conventions.
---

# Coffee Blog Commit Helper

## Quick Start

1. Run `git diff --staged` to see changes
2. Generate commit message using format below
3. Create commit with the message

## Commit Format

```
[type] Short description (max 50 chars)

Optional longer description explaining the what and why.

- Bullet points for multiple changes
- Keep each point concise
```

## Commit Types

| Type | When to Use | Example |
|------|-------------|---------|
| `[feat]` | New feature | `[feat] Add dark mode toggle` |
| `[fix]` | Bug fix | `[fix] Resolve login redirect loop` |
| `[style]` | UI/CSS changes | `[style] Update button hover effects` |
| `[refactor]` | Code restructure | `[refactor] Simplify post fetching logic` |
| `[docs]` | Documentation | `[docs] Update API documentation` |
| `[test]` | Tests | `[test] Add unit tests for auth service` |
| `[chore]` | Maintenance | `[chore] Update dependencies` |
| `[perf]` | Performance | `[perf] Optimize image loading` |

## Examples

### Feature Commit
```
[feat] Add PostCard component with excerpt display

- Create PostCard.jsx with title, excerpt, date
- Add responsive styling with CSS modules
- Include hover animation effect
```

### Bug Fix Commit
```
[fix] Correct date formatting in post list

Posts were showing UTC time instead of local time.
Updated formatDate utility to use user's timezone.
```

### Style Commit
```
[style] Improve mobile navigation menu

- Add slide-in animation
- Update hamburger icon size
- Fix z-index layering issue
```

### Refactor Commit
```
[refactor] Extract API calls to service layer

Move fetch logic from components to dedicated
service files for better separation of concerns.
```

## Rules

1. **First line**: Type + concise description (under 50 chars)
2. **Blank line**: Separate subject from body
3. **Body**: Explain what and why, not how
4. **Present tense**: "Add feature" not "Added feature"
5. **No period**: Don't end the subject line with a period

## Branch Naming

```
feature/add-dark-mode
bugfix/fix-login-redirect
hotfix/security-patch
refactor/cleanup-api-calls
```

## Before Committing Checklist

- [ ] Code compiles/runs without errors
- [ ] No console.log or print statements left
- [ ] Tests pass (if applicable)
- [ ] No sensitive data (API keys, passwords)
