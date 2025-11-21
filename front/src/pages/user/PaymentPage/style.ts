import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
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

export const OrderSummary = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border.default};
  border-radius: ${theme.radius.lg};
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

export const SummaryLabel = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const SummaryValue = styled.span`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
`;

export const TotalPrice = styled.span`
  font-size: ${theme.fontSize.lg};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${theme.colors.border.light};
  margin: 0.5rem 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${theme.fontSize.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const CardRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const ErrorText = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.error};
  text-align: center;
`;
