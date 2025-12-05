/**
 * ThemeToggle.jsx
 * ================
 * Button để switch giữa Dark và Light mode.
 */

import { useTheme } from "../../contexts/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        // Sun icon for dark mode (click to switch to light)
        <span className="theme-toggle__icon">☀️</span>
      ) : (
        // Moon icon for light mode (click to switch to dark)
        <span className="theme-toggle__icon">🌙</span>
      )}
    </button>
  );
}

export default ThemeToggle;
