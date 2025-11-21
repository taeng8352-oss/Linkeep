import styled from "styled-components";
import { theme } from "@/styles/theme";

export const CardContainer = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.xl};
  border: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadow.sm};
  padding: 1.25rem;
`;

export const CardTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.75rem;
`;

export const CardDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;
