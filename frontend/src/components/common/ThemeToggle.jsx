/**
 * ThemeToggle.jsx
 * ================
 * Coffee-themed toggle button for Dark/Light mode.
 *
 * Light Mode = Coffee cup full (energized, awake)
 * Dark Mode = Empty glass (rest, night time)
 */

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {
  const { isLight, toggleTheme, isPouring } = useTheme();

  return (
    <motion.button
      className={`coffee-toggle ${
        isLight ? "coffee-toggle--light" : "coffee-toggle--dark"
      }`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={
        isLight
          ? "Switch to dark mode (empty cup)"
          : "Switch to light mode (fill coffee)"
      }
      animate={{
        backgroundColor: isLight ? "#92400e" : "#374151",
      }}
    >
      {/* Background decorations */}
      <motion.div className="coffee-toggle__bg">
        {isLight ? (
          <motion.div
            className="coffee-toggle__bg-decor coffee-toggle__bg-decor--light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="decor-circle decor-circle--1"></div>
            <div className="decor-circle decor-circle--2"></div>
            <div className="decor-line decor-line--1"></div>
            <div className="decor-line decor-line--2"></div>
          </motion.div>
        ) : (
          <motion.div
            className="coffee-toggle__bg-decor coffee-toggle__bg-decor--dark"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="decor-star decor-star--1"></div>
            <div className="decor-star decor-star--2"></div>
            <div className="decor-star decor-star--3"></div>
          </motion.div>
        )}
      </motion.div>

      {/* Toggle knob with cup/glass */}
      <motion.div
        className="coffee-toggle__knob"
        layout
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 60,
          duration: 3,
        }}
      >
        {isLight ? <CoffeeCup isPouring={isPouring} /> : <EmptyGlass />}
      </motion.div>
    </motion.button>
  );
}

/**
 * Coffee Cup SVG - Shown in Light Mode
 */
function CoffeeCup({ isPouring }) {
  return (
    <div className="cup-container">
      <svg viewBox="0 0 100 100" className="cup-svg">
        {/* Cup body */}
        <motion.path
          d="M20,30 L20,80 Q20,90 30,90 L70,90 Q80,90 80,80 L80,30 Z"
          fill="rgba(255, 255, 255, 0.2)"
          stroke="#8B4513"
          strokeWidth="2"
        />

        {/* Cup handle */}
        <path
          d="M80,40 Q95,40 95,55 Q95,70 80,70"
          fill="none"
          stroke="#8B4513"
          strokeWidth="3"
        />

        {/* Coffee liquid */}
        <AnimatePresence>
          {isPouring ? (
            <motion.path
              d="M22,80 L78,80 L78,75 Q78,88 70,88 L30,88 Q22,88 22,75 Z"
              fill="#5D4037"
              initial={{
                d: "M22,80 L78,80 L78,75 Q78,88 70,88 L30,88 Q22,88 22,75 Z",
              }}
              animate={{
                d: "M22,48 L78,48 L78,75 Q78,88 70,88 L30,88 Q22,88 22,75 Z",
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ) : (
            <motion.path
              d="M22,48 L78,48 L78,75 Q78,88 70,88 L30,88 Q22,88 22,75 Z"
              fill="#5D4037"
            />
          )}
        </AnimatePresence>

        {/* Coffee surface wave */}
        <AnimatePresence>
          {isPouring ? (
            <motion.path
              d="M22,48 C30,47 40,49 50,48 C60,47 70,49 78,48"
              fill="#8D6E63"
              stroke="#8D6E63"
              strokeWidth="1"
              initial={{
                d: "M22,80 C30,80 40,80 50,80 C60,80 70,80 78,80",
                opacity: 0,
              }}
              animate={{
                d: "M22,48 C30,47 40,49 50,48 C60,47 70,49 78,48",
                opacity: 1,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ) : (
            <motion.path
              d="M22,48 C30,47 40,49 50,48 C60,47 70,49 78,48"
              fill="#8D6E63"
              stroke="#8D6E63"
              strokeWidth="1"
              animate={{
                d: [
                  "M22,48 C30,44 40,52 50,48 C60,44 70,52 78,48",
                  "M22,48 C30,52 40,44 50,48 C60,52 70,44 78,48",
                  "M22,48 C30,44 40,52 50,48 C60,44 70,52 78,48",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          )}
        </AnimatePresence>

        {/* Coffee foam */}
        <AnimatePresence>
          {isPouring ? (
            <motion.path
              d="M24,47 C32,46 40,48 50,47 C60,46 68,48 76,47"
              fill="#D7CCC8"
              stroke="#D7CCC8"
              strokeWidth="1"
              initial={{
                d: "M24,79 C32,79 40,79 50,79 C60,79 68,79 76,79",
                opacity: 0,
              }}
              animate={{
                d: "M24,47 C32,46 40,48 50,47 C60,46 68,48 76,47",
                opacity: 1,
              }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
            />
          ) : (
            <motion.path
              d="M24,47 C32,46 40,48 50,47 C60,46 68,48 76,47"
              fill="#D7CCC8"
              stroke="#D7CCC8"
              strokeWidth="1"
              animate={{
                d: [
                  "M24,47 C32,43 40,51 50,47 C60,43 68,51 76,47",
                  "M24,47 C32,51 40,43 50,47 C60,51 68,43 76,47",
                  "M24,47 C32,43 40,51 50,47 C60,43 68,51 76,47",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          )}
        </AnimatePresence>

        {/* Pouring stream */}
        <AnimatePresence>
          {isPouring && (
            <>
              <motion.path
                d="M50,0 C52,10 48,20 50,30 C52,40 48,50 50,60 C52,70 48,80 50,80"
                fill="none"
                stroke="#5D4037"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <motion.circle
                cx="48"
                cy="45"
                r="2"
                fill="#5D4037"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: [0, 1, 0], y: 10 }}
                transition={{ duration: 0.5, times: [0, 0.2, 1], delay: 0.3 }}
              />
              <motion.circle
                cx="52"
                cy="55"
                r="1.5"
                fill="#5D4037"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: [0, 1, 0], y: 10 }}
                transition={{ duration: 0.4, times: [0, 0.2, 1], delay: 0.5 }}
              />
              <motion.circle
                cx="49"
                cy="65"
                r="2"
                fill="#5D4037"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: [0, 1, 0], y: 10 }}
                transition={{ duration: 0.6, times: [0, 0.2, 1], delay: 0.7 }}
              />
            </>
          )}
        </AnimatePresence>

        {/* Steam */}
        <AnimatePresence>
          {!isPouring && (
            <>
              <motion.path
                d="M40,30 Q35,25 40,20 Q45,15 40,10"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.4, 0.8, 0.4],
                  d: [
                    "M40,30 Q35,25 40,20 Q45,15 40,10",
                    "M40,30 Q37,25 42,20 Q47,15 42,10",
                    "M40,30 Q35,25 40,20 Q45,15 40,10",
                  ],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M50,30 Q55,22 50,15 Q45,10 50,5"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                  d: [
                    "M50,30 Q55,22 50,15 Q45,10 50,5",
                    "M50,30 Q53,22 48,15 Q43,10 48,5",
                    "M50,30 Q55,22 50,15 Q45,10 50,5",
                  ],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
              />
              <motion.path
                d="M60,30 Q65,25 60,20 Q55,15 60,10"
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  d: [
                    "M60,30 Q65,25 60,20 Q55,15 60,10",
                    "M60,30 Q63,25 58,20 Q53,15 58,10",
                    "M60,30 Q65,25 60,20 Q55,15 60,10",
                  ],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                  delay: 0.6,
                }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/**
 * Empty Glass SVG - Shown in Dark Mode
 */
function EmptyGlass() {
  return (
    <div className="cup-container">
      <svg viewBox="0 0 100 100" className="cup-svg">
        {/* Glass body */}
        <motion.path
          d="M30,20 L25,80 Q25,90 35,90 L65,90 Q75,90 75,80 L70,20 Z"
          fill="rgba(240, 240, 255, 0.2)"
          stroke="rgba(200, 200, 220, 0.8)"
          strokeWidth="1"
        />

        {/* Glass rim */}
        <ellipse
          cx="50"
          cy="20"
          rx="20"
          ry="5"
          fill="rgba(240, 240, 255, 0.3)"
          stroke="rgba(200, 200, 220, 0.8)"
          strokeWidth="1"
        />

        {/* Glass bottom */}
        <ellipse
          cx="50"
          cy="90"
          rx="15"
          ry="3"
          fill="rgba(240, 240, 255, 0.3)"
          stroke="rgba(200, 200, 220, 0.8)"
          strokeWidth="1"
        />

        {/* Glass reflections */}
        <motion.path
          d="M35,30 L33,70"
          fill="none"
          stroke="rgba(255, 255, 255, 0.7)"
          strokeWidth="1"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.path
          d="M65,30 L67,70"
          fill="none"
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth="1"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Coffee drops at bottom */}
        <circle cx="45" cy="85" r="2" fill="rgba(160, 82, 45, 0.2)" />
        <circle cx="55" cy="86" r="1.5" fill="rgba(160, 82, 45, 0.15)" />
      </svg>
    </div>
  );
}

export default ThemeToggle;
