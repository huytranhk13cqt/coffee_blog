---
name: react-component-patterns
description: React component patterns and conventions for Coffee Blog frontend. Use when creating React components, writing hooks, handling state, managing side effects, or building UI features.
---

# React Component Patterns for Coffee Blog

## Component Structure

```
frontend/src/components/
├── common/         # Shared: Button, Input, Card, Modal
├── layout/         # Header, Footer, Sidebar, Container
├── post/           # PostCard, PostList, PostDetail
├── editor/         # MarkdownEditor, ImageUploader
└── admin/          # Dashboard widgets, AdminNav
```

## Component Template

```jsx
import { useState, useEffect } from 'react';
import styles from './ComponentName.module.css';

function ComponentName({ title, onAction, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data or setup
    return () => {
      // Cleanup
    };
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {children}
      <button onClick={onAction}>Action</button>
    </div>
  );
}

export default ComponentName;
```

## Common Patterns

### Conditional Rendering
```jsx
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <Content data={data} />}
{items.length === 0 && <EmptyState />}
```

### List Rendering
```jsx
{posts.map((post) => (
  <PostCard key={post.id} post={post} />
))}
```

### Event Handlers
```jsx
// Naming: handle + What + Action
const handleFormSubmit = (e) => {
  e.preventDefault();
  // logic
};

const handleInputChange = (e) => {
  setValue(e.target.value);
};

const handleDeleteClick = (id) => {
  // delete logic
};
```

### Loading States
```jsx
function DataComponent() {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    fetchData()
      .then((data) => setState({ data, isLoading: false, error: null }))
      .catch((error) => setState({ data: null, isLoading: false, error }));
  }, []);

  const { data, isLoading, error } = state;

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}
```

## Custom Hooks

### Hook Template
```jsx
// hooks/useDataFetch.js
import { useState, useEffect } from 'react';

function useDataFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useDataFetch;
```

### Project Hooks
```jsx
useAuth()       // Authentication state and methods
usePosts()      // Post CRUD operations
useTheme()      // Dark/light mode toggle
useDebounce()   // Debounced values (for search)
```

## Context Pattern

```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

## File Naming

| Type | Convention | Example |
|------|------------|---------|
| Component | PascalCase.jsx | `PostCard.jsx` |
| Hook | useCamelCase.js | `usePosts.js` |
| Context | PascalCaseContext.jsx | `AuthContext.jsx` |
| Styles | Component.module.css | `PostCard.module.css` |
| Utils | camelCase.js | `formatDate.js` |

## Do's and Don'ts

### Do
- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic to hooks
- Handle loading and error states
- Use meaningful prop names

### Don't
- Mutate state directly (use setState)
- Forget cleanup in useEffect
- Skip the key prop in lists
- Nest components inside other components
- Put async directly in useEffect (wrap in function)
