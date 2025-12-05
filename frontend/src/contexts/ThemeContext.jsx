/**
 * ThemeContext.jsx
 * =================
 * Context để quản lý Dark/Light mode.
 *
 * Context giúp chia sẻ theme state cho tất cả components
 * mà không cần truyền props qua từng level.
 */

import { createContext, useContext, useState, useEffect } from "react";

// 1. Tạo Context
const ThemeContext = createContext(undefined);

// 2. Tạo Provider Component
export function ThemeProvider({ children }) {
  // State lưu theme hiện tại ('light' hoặc 'dark')
  const [theme, setTheme] = useState("light");

  // Khi component mount, đọc theme từ localStorage hoặc system preference
  useEffect(() => {
    // Thử đọc từ localStorage trước
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // Nếu user đã chọn theme trước đó, dùng theme đó
      setTheme(savedTheme);
    } else {
      // Nếu chưa, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  // Khi theme thay đổi, cập nhật DOM và localStorage
  useEffect(() => {
    // Set attribute trên <html> element
    document.documentElement.setAttribute("data-theme", theme);

    // Lưu vào localStorage để nhớ cho lần sau
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function để toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Giá trị được chia sẻ cho tất cả components
  const value = {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// 3. Custom hook để dùng theme dễ dàng hơn
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
