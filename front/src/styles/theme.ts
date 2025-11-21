export const theme = {
  colors: {
    primary: "#4f46e5",
    primaryHover: "#4338ca",
    secondary: "#0ea5e9",
    background: "#f8fafc",
    surface: "#ffffff",
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      muted: "#94a3b8",
      error: "#ef4444",
    },
    border: {
      light: "#f1f5f9",
      default: "#e2e8f0",
    },
    badge: {
      available: {
        bg: "#f0f9ff",
        border: "#bae6fd",
        text: "#0369a1",
      },
    },
  },
  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  shadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
  },
};

export type Theme = typeof theme;
