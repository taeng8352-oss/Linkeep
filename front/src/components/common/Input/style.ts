import styled from "styled-components";
import { theme } from "@/styles/theme";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: 500;
  color: ${theme.colors.text.secondary};
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
  background-color: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
  background-color: white;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${theme.colors.secondary};
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.15);
  }
`;

export const Hint = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.muted};
`;
