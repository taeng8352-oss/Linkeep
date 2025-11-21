import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const MainContent = styled.main`
  max-width: 430px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const Title = styled.h1`
  font-size: ${theme.fontSize["2xl"]};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  text-align: center;
  margin-bottom: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.error};
  text-align: center;
`;

export const LoginLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};

  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
`;
