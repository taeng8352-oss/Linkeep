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

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.text.error};
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

export const BagCounter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: 500;
  color: ${theme.colors.text.primary};
`;

export const CounterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.md};
  padding: 0.5rem;
  width: fit-content;
`;

export const CounterButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: ${theme.radius.sm};
  border: 1px solid ${theme.colors.border.default};
  background: ${theme.colors.background};
  font-size: ${theme.fontSize.lg};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${theme.colors.border.light};
  }
`;

export const CounterValue = styled.span`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  min-width: 2rem;
  text-align: center;
`;

export const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${theme.colors.surface};
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.border.default};
  margin-top: 0.5rem;
`;

export const PriceLabel = styled.span`
  font-size: ${theme.fontSize.md};
  color: ${theme.colors.text.secondary};
`;

export const PriceValue = styled.span`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const ErrorText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.error};
  text-align: center;
`;
