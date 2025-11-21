import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.p`
  color: ${theme.colors.text.muted};
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
  margin-bottom: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ErrorText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.error};
  text-align: center;
`;
