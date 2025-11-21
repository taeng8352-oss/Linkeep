import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variants = {
  primary: css`
    background-color: ${theme.colors.text.primary};
    color: white;

    &:hover:not(:disabled) {
      background-color: #1e293b;
    }
  `,
  secondary: css`
    background-color: ${theme.colors.primary};
    color: white;

    &:hover:not(:disabled) {
      background-color: ${theme.colors.primaryHover};
    }
  `,
  outline: css`
    background-color: white;
    color: ${theme.colors.text.primary};
    border: 1px solid ${theme.colors.border.default};

    &:hover:not(:disabled) {
      background-color: ${theme.colors.background};
    }
  `,
};

const sizes = {
  sm: css`
    padding: 0.5rem 0.875rem;
    font-size: ${theme.fontSize.xs};
  `,
  md: css`
    padding: 0.75rem 1.25rem;
    font-size: ${theme.fontSize.sm};
  `,
  lg: css`
    padding: 1rem 1.5rem;
    font-size: ${theme.fontSize.md};
  `,
};

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $fullWidth?: boolean;
}>`
  border-radius: ${theme.radius.full};
  font-weight: 600;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  ${({ $variant }) => variants[$variant]}
  ${({ $size }) => sizes[$size]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
