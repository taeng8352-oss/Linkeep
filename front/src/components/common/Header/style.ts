import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "@/styles/theme";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid ${theme.colors.border.light};
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
`;

export const HeaderContent = styled.div`
  max-width: 40rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
`;

export const Logo = styled(Link)`
  font-weight: 700;
  font-size: 1.25rem;
  color: ${theme.colors.text.primary};
  letter-spacing: -0.025em;
`;

export const NavLink = styled(Link)`
  border-radius: ${theme.radius.full};
  border: 1px solid ${theme.colors.border.default};
  padding: 0.5rem 1rem;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colors.background};
    border-color: ${theme.colors.text.muted};
  }
`;

export const BackButton = styled.button`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.muted};
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: ${theme.colors.text.secondary};
  }
`;

export const HeaderSpacer = styled.div`
  width: 4rem;
`;
