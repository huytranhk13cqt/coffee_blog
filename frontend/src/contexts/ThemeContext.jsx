/**
 * ThemeContext.jsx
 * =================
 * Context để quản lý Dark/Light mode với Coffee theme.
 */

import { createContext, useContext, useState, useEffect, useRef } from "react";

// Tạo Context
const ThemeContext = createContext(undefined);

// Provider Component
export function ThemeProvider({ children }) {
    // 'light' = coffee đầy (sáng, năng lượng)
    // 'dark' = cốc rỗng (tối, nghỉ ngơi)
    const [theme, setTheme] = useState("light");
    const [isPouring, setIsPouring] = useState(false);
    const prevThemeRef = useRef(theme);

    // Đọc theme từ localStorage hoặc system preference khi mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) {
            setTheme(savedTheme);
            prevThemeRef.current = savedTheme;
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            const initialTheme = prefersDark ? "dark" : "light";
            setTheme(initialTheme);
            prevThemeRef.current = initialTheme;
        }
    }, []);

    // Cập nhật DOM và localStorage khi theme thay đổi
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Trigger pouring animation khi chuyển từ dark → light
    useEffect(() => {
        if (prevThemeRef.current === "dark" && theme === "light") {
            setIsPouring(true);
            const timer = setTimeout(() => {
                setIsPouring(false);
            }, 1800);
            return () => clearTimeout(timer);
        }
        prevThemeRef.current = theme;
    }, [theme]);

    // Toggle theme
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const value = {
        theme,
        toggleTheme,
        isDark: theme === "dark",
        isLight: theme === "light",
        isPouring,
    };

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

// Custom hook
export function useTheme() {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
